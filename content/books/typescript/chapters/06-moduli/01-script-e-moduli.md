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
