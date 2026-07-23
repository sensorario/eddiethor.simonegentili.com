# Moduli

## Script e moduli

Entrambi sono scritti in TypeScript ma a seconda dello scopo o di quello che fanno sono script oppure moduli. L'ambito di visibilità che hanno indica se sono script (globali) oppure moduli.

Uno script globale non ha né import né export. Tutte le funzioni, variabili, classi, costanti e quant'altro si possa trovare al suo interno, è accessibile da qualsiasi altro file del progetto. Tutte le entità presenti in questi file sono accessibili ovunque.

Un modulo contiene almeno un import o un export. Lo scope è isolato ed a meno di un export variabili, funzioni e quant'altro sono accessibili solo dalle altre entità che si trovano nello stesso file. Grazie a questo isolamento si riescono ad evitare collisioni di nomi con altre librerie.

Però bisogna fare attenzione a TypeScript ed al target verso il quale si compila. Per esempio in Node.js, nel sistema CommonJS, gli script globali nel senso tradizionale del termine non esistono.

Mentre cercavo di produrre un esempio per questo libro mi sono trovato costretto a "trasformare" quello che poteva essere formalmente uno script globale in un modulo aggiungendo un export {} alla fine del file. Questo perché stavo usando Node.js per eseguirlo. Utilizzare export {} serve solo per forzare TypeScript a considerare il file come modulo.

Il punto è che Node.js, quando si usa il sistema CommonJS (CJS), non lancia il codice JavaScript direttamente nello scope globale ma il runtime avvolge il contenuto di un file all'interno di una funzione wrapper simile a…

```typescript
(function(exports, require, module, __filename, __dirname) {
    // Il codice del tuo file vive qui dentro!
    const miaVariabile = "Test";
});
```

Ecco perché tutte le entità definite dentro a questo file rimangono confinate all'interno della funzione.

## Module resolution

Definizione: l'algoritmo che il compilatore usa per trovare i file dei moduli partendo dalle stringhe di import.

Configurazione: si imposta tramite il flag moduleResolution nel tsconfig.json.

NodeNext: mima il comportamento moderno e nativo di Node.js (gesione ESM/CJS combinata).

Bundler: ottimizzato per tool esterni (Vite, Webpack); permette maggiore flessibilità nei percorsi.

## Emissione

Significato: definisce come la sintassi di import/export viene trasformata nel JavaScript finale.

Flag di controllo: gestito tramite l'opzione module del compilatore.

Target CommonJS: trasforma il codice nei classici require() e module.exports.

Target ESM: preserva la sintassi nativa import/export per i browser o runtime moderni.

## Interoperabilità CJS/ESM

Il problema: la complessità nel far coesistere moduli CommonJS e moduli ECMAScript nello stesso progetto.

Il flag: utilizzo di esModuleInterop nel tsconfig.json.

Effetto: TypeScript introduce dei wrapper nell'output per importare file CommonJS come se avessero un export default.

## Estensioni file

Rigidità ESM: l'ambiente ECMAScript nativo in Node.js impone regole severe sulle estensioni.

I tre formati sorgente:

.ts: estensione standard (emessa solitamente in .js).

.mts: forza il file a essere un modulo ESM (emesso in .mjs).

.cts: forza il file a essere un modulo CommonJS (emesso in .cjs).

Regola degli import: negli ambienti ESM puri, TypeScript obbliga a scrivere l'estensione finale (es. .js) nella stringa di import, anche se il file su disco è .ts.

## Module detection

Scopo: decide l'approccio con cui TypeScript etichetta un file come script o come modulo.

Opzione auto: comportamento standard basato sulla presenza visibile di import/export.

Opzione force: costringe il compilatore a trattare ogni singolo file come modulo isolato, blindando lo scope globale.

## Import elision

Definizione: ottimizzazione automatica applicata dal compilatore in fase di generazione del codice.

Funzionamento: se un import serve solo a recuperare dei tipi (e non codice runtime), viene completamente rimosso dal JavaScript finale.

Vantaggi: alleggerisce il codice emesso ed evita l'importazione di moduli superflui a runtime.

## Path mapping

Il problema: la scomodità e la fragilità dei percorsi relativi lunghi (es. ../../../../components).

La soluzione: uso di baseUrl e paths nel tsconfig.json per creare alias personalizzati (es. @core/*).

Vincolo di compilazione: risolve i percorsi solo per l'analisi statica dei tipi; a runtime serve un bundler o il supporto nativo di Node.js.

## Import dinamici

Sintassi: uso dell'espressione import() come funzione, anziché della dichiarazione statica in testa al file.

Natura asincrona: restituisce una Promise contenente il modulo caricato.

Scopo principale: permette il caricamento condizionale, il lazy loading e il code-splitting, mantenendo comunque la piena tipizzazione del modulo.
