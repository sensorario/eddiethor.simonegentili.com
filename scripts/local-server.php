<?php
// Local-only admin server used by the React UI to trigger book PDF builds.
// Run with: php -S 127.0.0.1:8090 scripts/local-server.php

$root = dirname(__DIR__);
$booksDir = $root . '/content/books';
$sharedDir = $root . '/content/shared';
$buildDir = $root . '/build';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

function bookSlugs(string $booksDir): array
{
    $slugs = [];
    foreach (scandir($booksDir) as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }
        if (is_file($booksDir . '/' . $entry . '/book.yaml')) {
            $slugs[] = $entry;
        }
    }
    sort($slugs);
    return $slugs;
}

function bookTitle(string $bookYamlPath): string
{
    $contents = file_get_contents($bookYamlPath);
    if (preg_match('/^title:\s*"(.*)"\s*$/m', $contents, $m)) {
        return $m[1];
    }
    return basename(dirname($bookYamlPath));
}

// Recursively mirrors a directory as a folder/file tree (numeric name
// prefixes like 00-, 01-, 99- sort naturally and decide ordering, matching
// build-book.mjs). Only .md files and folders that contain at least one are
// included, so non-content entries (book.yaml, assets/) are left out.
function buildTree(string $dir, string $relativePrefix): array
{
    $entries = array_diff(scandir($dir), ['.', '..']);
    sort($entries);
    $nodes = [];
    foreach ($entries as $entry) {
        $entryPath = $dir . '/' . $entry;
        $entryRelative = $relativePrefix === '' ? $entry : $relativePrefix . '/' . $entry;
        if (is_dir($entryPath)) {
            $children = buildTree($entryPath, $entryRelative);
            if (empty($children)) {
                continue;
            }
            $nodes[] = ['type' => 'folder', 'name' => $entry, 'children' => $children];
        } elseif (str_ends_with($entry, '.md')) {
            $nodes[] = ['type' => 'file', 'name' => $entry, 'path' => $entryRelative];
        }
    }
    return $nodes;
}

// File-explorer-style tree for a book: the shared/ folder (rights,
// acknowledgments - part of every generated PDF, see build-book.mjs) and
// the book's own chapters/ folder, mirroring what's actually on disk.
function bookTree(string $sharedDir, string $bookDir): array
{
    return [
        ['type' => 'folder', 'name' => 'shared', 'children' => buildTree($sharedDir, 'shared')],
        ['type' => 'folder', 'name' => 'chapters', 'children' => buildTree($bookDir . '/chapters', 'chapters')],
    ];
}

// Strips a chapter folder's leading "NN-" ordering prefix, if any, leaving
// its descriptive slug (e.g. "02-comandi-di-base" -> "comandi-di-base").
function chapterSlug(string $folderName): string
{
    return preg_replace('/^\d+-/', '', $folderName, 1);
}

// Resolves a "shared/..." or "chapters/..." relative path to a real file
// path, confined to its base directory. Returns null if it doesn't resolve
// to an existing .md file inside that base (unknown chapter or traversal).
function resolveContentFile(string $sharedDir, string $booksDir, string $slug, string $relative): ?string
{
    if (str_starts_with($relative, 'shared/')) {
        $base = $sharedDir;
        $withinBase = substr($relative, strlen('shared/'));
    } else {
        $base = $booksDir . '/' . $slug . '/chapters';
        $withinBase = substr($relative, strlen('chapters/'));
    }

    $realBase = realpath($base);
    $filePath = realpath($base . '/' . $withinBase);
    if (
        $filePath === false
        || $realBase === false
        || !str_starts_with($filePath, $realBase . DIRECTORY_SEPARATOR)
        || !is_file($filePath)
        || !str_ends_with($filePath, '.md')
    ) {
        return null;
    }
    return $filePath;
}

if ($uri === '/api/books' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $books = [];
    foreach (bookSlugs($booksDir) as $slug) {
        $books[] = [
            'slug' => $slug,
            'title' => bookTitle($booksDir . '/' . $slug . '/book.yaml'),
        ];
    }
    header('Content-Type: application/json');
    echo json_encode($books);
    exit;
}

if (preg_match('#^/api/books/([a-z0-9-]+)/tree$#', $uri, $m) && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $slug = $m[1];
    if (!in_array($slug, bookSlugs($booksDir), true)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => "Unknown book \"$slug\""]);
        exit;
    }
    header('Content-Type: application/json');
    echo json_encode(bookTree($sharedDir, $booksDir . '/' . $slug));
    exit;
}

// Reorders the top-level chapter folders of a book: renames each one so its
// "NN-" prefix reflects the submitted order, keeping its descriptive slug.
// "99-conclusioni-finali" is never included/moved - it's always last.
if (preg_match('#^/api/books/([a-z0-9-]+)/chapters/reorder$#', $uri, $m) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $slug = $m[1];
    if (!in_array($slug, bookSlugs($booksDir), true)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => "Unknown book \"$slug\""]);
        exit;
    }

    $body = json_decode(file_get_contents('php://input'), true);
    $order = is_array($body['order'] ?? null) ? array_values($body['order']) : null;
    if ($order === null) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Missing "order" array']);
        exit;
    }

    $chaptersDir = $booksDir . '/' . $slug . '/chapters';
    $existing = array_values(array_diff(scandir($chaptersDir), ['.', '..']));
    $reorderable = array_values(array_filter(
        $existing,
        fn($entry) => is_dir($chaptersDir . '/' . $entry) && $entry !== '99-conclusioni-finali'
    ));

    $sortedExisting = $reorderable;
    $sortedOrder = $order;
    sort($sortedExisting);
    sort($sortedOrder);
    if ($sortedOrder !== $sortedExisting) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Order must contain exactly the current chapter folders']);
        exit;
    }

    $renamed = [];
    foreach ($order as $index => $name) {
        $newName = sprintf('%02d-%s', $index + 1, chapterSlug($name));
        if ($newName !== $name) {
            rename($chaptersDir . '/' . $name, $chaptersDir . '/' . $newName);
            $renamed["chapters/$name"] = "chapters/$newName";
        }
    }

    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'renamed' => $renamed,
        'tree' => bookTree($sharedDir, $booksDir . '/' . $slug),
    ]);
    exit;
}

if (
    preg_match('#^/api/books/([a-z0-9-]+)/files/(shared/.+|chapters/.+)$#', $uri, $m)
    && in_array($_SERVER['REQUEST_METHOD'], ['GET', 'PUT'], true)
) {
    $slug = $m[1];
    $relative = $m[2];
    if (!in_array($slug, bookSlugs($booksDir), true)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => "Unknown book \"$slug\""]);
        exit;
    }

    $filePath = resolveContentFile($sharedDir, $booksDir, $slug, $relative);
    if ($filePath === null) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'File not found']);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        file_put_contents($filePath, file_get_contents('php://input'));
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
        exit;
    }

    header('Content-Type: text/markdown; charset=utf-8');
    echo file_get_contents($filePath);
    exit;
}

if (preg_match('#^/api/books/([a-z0-9-]+)/generate$#', $uri, $m) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $slug = $m[1];
    if (!in_array($slug, bookSlugs($booksDir), true)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => "Unknown book \"$slug\""]);
        exit;
    }

    $command = sprintf(
        'cd %s && node scripts/build-book.mjs %s 2>&1',
        escapeshellarg($root),
        escapeshellarg($slug)
    );
    exec($command, $outputLines, $exitCode);

    header('Content-Type: application/json');
    echo json_encode([
        'success' => $exitCode === 0,
        'output' => implode("\n", $outputLines),
        'pdfs' => $exitCode === 0 ? [
            "/build/$slug/$slug-text.pdf",
            "/build/$slug/$slug-image.pdf",
        ] : [],
    ]);
    exit;
}

if (str_starts_with($uri, '/build/')) {
    $relative = substr($uri, strlen('/build/'));
    $filePath = realpath($buildDir . '/' . $relative);
    $realBuildDir = realpath($buildDir);
    if ($filePath === false || !str_starts_with($filePath, $realBuildDir . DIRECTORY_SEPARATOR) || !is_file($filePath)) {
        http_response_code(404);
        exit;
    }
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="' . basename($filePath) . '"');
    readfile($filePath);
    exit;
}

http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Not found']);
