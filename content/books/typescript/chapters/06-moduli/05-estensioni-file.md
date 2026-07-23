## Estensioni file

Rigidità ESM: l'ambiente ECMAScript nativo in Node.js impone regole severe sulle estensioni.

I tre formati sorgente:

.ts: estensione standard (emessa solitamente in .js).

.mts: forza il file a essere un modulo ESM (emesso in .mjs).

.cts: forza il file a essere un modulo CommonJS (emesso in .cjs).

Regola degli import: negli ambienti ESM puri, TypeScript obbliga a scrivere l'estensione finale (es. .js) nella stringa di import, anche se il file su disco è .ts.
