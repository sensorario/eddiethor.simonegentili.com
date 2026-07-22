import { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import { Button } from "@sensorario/sg-components";

const SERVER_URL = "http://127.0.0.1:8090";

type Book = {
    slug: string;
    title: string;
};

type TreeNode =
    | { type: "file"; name: string; path: string }
    | { type: "folder"; name: string; children: TreeNode[] };

type GenerationState =
    | { status: "idle" }
    | { status: "generating" }
    | { status: "done"; pdfs: string[] }
    | { status: "error"; message: string };

type SaveStatus = "idle" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 1500;
const FIXED_FINAL_CHAPTER = "99-conclusioni-finali";

function reorderArray<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
    const copy = [...arr];
    const [moved] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, moved);
    return copy;
}

function TreeNodes({
    nodes,
    slug,
    parentKey,
    expandedFolders,
    onToggleFolder,
    selectedSlug,
    selectedFilePath,
    onSelectFile,
    onReorder,
}: {
    nodes: TreeNode[];
    slug: string;
    parentKey: string;
    expandedFolders: Set<string>;
    onToggleFolder: (key: string) => void;
    selectedSlug: string | null;
    selectedFilePath: string | null;
    onSelectFile: (slug: string, path: string) => void;
    onReorder?: (order: string[]) => void;
}) {
    const reorderableNames = onReorder
        ? nodes.filter((node) => node.name !== FIXED_FINAL_CHAPTER).map((node) => node.name)
        : null;

    function handleDrop(targetName: string, e: React.DragEvent) {
        e.preventDefault();
        if (!reorderableNames || !onReorder) return;
        const draggedName = e.dataTransfer.getData("text/plain");
        const fromIndex = reorderableNames.indexOf(draggedName);
        const toIndex = reorderableNames.indexOf(targetName);
        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
        onReorder(reorderArray(reorderableNames, fromIndex, toIndex));
    }

    return (
        <ul className="tree-list">
            {nodes.map((node) => {
                const draggable = !!reorderableNames && node.name !== FIXED_FINAL_CHAPTER;
                const dragProps = draggable
                    ? {
                          draggable: true,
                          onDragStart: (e: React.DragEvent) => e.dataTransfer.setData("text/plain", node.name),
                          onDragOver: (e: React.DragEvent) => e.preventDefault(),
                          onDrop: (e: React.DragEvent) => handleDrop(node.name, e),
                      }
                    : {};

                if (node.type === "folder") {
                    const key = `${parentKey}/${node.name}`;
                    const expanded = expandedFolders.has(key);
                    return (
                        <li key={key} {...dragProps}>
                            <button className="tree-toggle" onClick={() => onToggleFolder(key)}>
                                {expanded ? "▾" : "▸"} {node.name}
                            </button>
                            {expanded && (
                                <TreeNodes
                                    nodes={node.children}
                                    slug={slug}
                                    parentKey={key}
                                    expandedFolders={expandedFolders}
                                    onToggleFolder={onToggleFolder}
                                    selectedSlug={selectedSlug}
                                    selectedFilePath={selectedFilePath}
                                    onSelectFile={onSelectFile}
                                />
                            )}
                        </li>
                    );
                }

                const isSelected = slug === selectedSlug && node.path === selectedFilePath;
                return (
                    <li key={node.path} {...dragProps}>
                        <button
                            className={`tree-file${isSelected ? " selected" : ""}`}
                            onClick={() => onSelectFile(slug, node.path)}
                            aria-current={isSelected}
                        >
                            {node.name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export function BooksAdmin() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [states, setStates] = useState<Record<string, GenerationState>>({});

    const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
    const [treesBySlug, setTreesBySlug] = useState<Record<string, TreeNode[]>>({});
    const [treeErrorsBySlug, setTreeErrorsBySlug] = useState<Record<string, string>>({});
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [contentError, setContentError] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
    const saveTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        fetch(`${SERVER_URL}/api/books`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(setBooks)
            .catch(() => setLoadError("Server locale non raggiungibile. Avvia `npm run book-server`."));
    }, []);

    useEffect(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = null;
        }
        if (!selectedSlug || !selectedFilePath) {
            return;
        }
        let cancelled = false;
        fetch(`${SERVER_URL}/api/books/${selectedSlug}/files/${selectedFilePath}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.text();
            })
            .then((text) => {
                if (cancelled) return;
                setFileContent(text);
                setContentError(null);
                setSaveStatus("idle");
            })
            .catch(() => {
                if (cancelled) return;
                setContentError("Impossibile caricare il contenuto del file.");
            });
        return () => {
            cancelled = true;
        };
    }, [selectedSlug, selectedFilePath]);

    async function toggleBook(slug: string) {
        if (selectedSlug !== slug) {
            setSelectedFilePath(null);
        }
        setSelectedSlug(slug);
        setExpandedBooks((prev) => {
            const next = new Set(prev);
            if (next.has(slug)) {
                next.delete(slug);
            } else {
                next.add(slug);
            }
            return next;
        });
        if (treesBySlug[slug]) return;
        try {
            const res = await fetch(`${SERVER_URL}/api/books/${slug}/tree`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: TreeNode[] = await res.json();
            setTreesBySlug((prev) => ({ ...prev, [slug]: data }));
        } catch {
            setTreeErrorsBySlug((prev) => ({ ...prev, [slug]: "Impossibile caricare i file del libro." }));
        }
    }

    function toggleFolder(key: string) {
        setExpandedFolders((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    }

    async function reorderChapters(slug: string, order: string[]) {
        try {
            const res = await fetch(`${SERVER_URL}/api/books/${slug}/chapters/reorder`, {
                method: "POST",
                body: JSON.stringify({ order }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data: { tree: TreeNode[]; renamed: Record<string, string> } = await res.json();
            setTreesBySlug((prev) => ({ ...prev, [slug]: data.tree }));
            if (selectedSlug === slug && selectedFilePath) {
                const renamedFrom = Object.keys(data.renamed).find(
                    (oldPrefix) => selectedFilePath === oldPrefix || selectedFilePath.startsWith(`${oldPrefix}/`)
                );
                if (renamedFrom) {
                    setSelectedFilePath(selectedFilePath.replace(renamedFrom, data.renamed[renamedFrom]));
                }
            }
        } catch {
            setTreeErrorsBySlug((prev) => ({ ...prev, [slug]: "Impossibile riordinare i capitoli." }));
        }
    }

    function selectFile(slug: string, path: string) {
        setSelectedSlug(slug);
        setSelectedFilePath(path);
    }

    async function saveFileContent(slug: string, path: string, content: string) {
        setSaveStatus("saving");
        try {
            const res = await fetch(`${SERVER_URL}/api/books/${slug}/files/${path}`, {
                method: "PUT",
                body: content,
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setSaveStatus("saved");
        } catch {
            setSaveStatus("error");
        }
    }

    function handleContentChange(value: string) {
        setFileContent(value);
        if (!selectedSlug || !selectedFilePath) return;
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = window.setTimeout(() => {
            saveFileContent(selectedSlug, selectedFilePath, value);
        }, AUTOSAVE_DELAY_MS);
    }

    async function generate(slug: string) {
        setStates((prev) => ({ ...prev, [slug]: { status: "generating" } }));
        try {
            const res = await fetch(`${SERVER_URL}/api/books/${slug}/generate`, { method: "POST" });
            const data = await res.json();
            setStates((prev) => ({
                ...prev,
                [slug]: data.success
                    ? { status: "done", pdfs: data.pdfs }
                    : { status: "error", message: data.error || data.output },
            }));
        } catch {
            setStates((prev) => ({
                ...prev,
                [slug]: { status: "error", message: "Richiesta al server locale fallita" },
            }));
        }
    }

    const previewHtml = useMemo(() => marked(fileContent ?? "", { async: false }), [fileContent]);

    if (loadError) {
        return <p>{loadError}</p>;
    }

    const breadcrumb =
        selectedSlug && selectedFilePath ? [selectedSlug, ...selectedFilePath.split("/")].join(" / ") : null;
    const selectedState = selectedSlug ? states[selectedSlug] ?? { status: "idle" } : null;

    return (
        <div>
            {breadcrumb && <p className="breadcrumb">{breadcrumb}</p>}
            {selectedSlug && selectedState && (
                <div className="generate-bar">
                    <Button
                        label={selectedState.status === "generating" ? "Generazione in corso…" : "Genera PDF"}
                        onClick={() => generate(selectedSlug)}
                        disabled={selectedState.status === "generating"}
                    />
                    {selectedState.status === "done" && (
                        <span className="pdf-links">
                            {selectedState.pdfs.map((pdf) => (
                                <a key={pdf} href={`${SERVER_URL}${pdf}`} target="_blank" rel="noreferrer">
                                    {pdf.split("/").pop()}
                                </a>
                            ))}
                        </span>
                    )}
                    {selectedState.status === "error" && (
                        <span className="generation-error">Errore: {selectedState.message}</span>
                    )}
                </div>
            )}
            <div className="workspace-layout">
                <nav className="file-tree">
                    <ul className="tree-list">
                        {books.map((book) => {
                            const expanded = expandedBooks.has(book.slug);
                            const tree = treesBySlug[book.slug];
                            const treeError = treeErrorsBySlug[book.slug];
                            return (
                                <li key={book.slug}>
                                    <button
                                        className={`tree-toggle${book.slug === selectedSlug ? " active" : ""}`}
                                        onClick={() => toggleBook(book.slug)}
                                    >
                                        {expanded ? "▾" : "▸"} {book.slug}
                                    </button>
                                    {expanded && treeError && <p className="tree-error">{treeError}</p>}
                                    {expanded && tree && (
                                        <ul className="tree-list">
                                            {tree.map((rootNode) => {
                                                if (rootNode.type !== "folder") return null;
                                                const rootKey = `${book.slug}/${rootNode.name}`;
                                                const rootExpanded = expandedFolders.has(rootKey);
                                                return (
                                                    <li key={rootKey}>
                                                        <button
                                                            className="tree-toggle"
                                                            onClick={() => toggleFolder(rootKey)}
                                                        >
                                                            {rootExpanded ? "▾" : "▸"} {rootNode.name}
                                                        </button>
                                                        {rootExpanded && (
                                                            <TreeNodes
                                                                nodes={rootNode.children}
                                                                slug={book.slug}
                                                                parentKey={rootKey}
                                                                expandedFolders={expandedFolders}
                                                                onToggleFolder={toggleFolder}
                                                                selectedSlug={selectedSlug}
                                                                selectedFilePath={selectedFilePath}
                                                                onSelectFile={selectFile}
                                                                onReorder={
                                                                    rootNode.name === "chapters"
                                                                        ? (order) => reorderChapters(book.slug, order)
                                                                        : undefined
                                                                }
                                                            />
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <section className="editor-panel">
                    {contentError && <p className="content-error">{contentError}</p>}
                    {fileContent !== null && (
                        <>
                            <p className={`status-line ${saveStatus}`}>
                                {saveStatus === "saving" && "Salvataggio…"}
                                {saveStatus === "saved" && "Salvato"}
                                {saveStatus === "error" && "Errore nel salvataggio"}
                            </p>
                            <div className="editor-columns">
                                <textarea
                                    className="editor-source"
                                    value={fileContent}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                />
                                <div
                                    className="editor-preview"
                                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                                />
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
