## Configurazione

TypeScript nasce come superset di JavaScript e le regole che definiscono il passaggio dal primo al secondo sono definite nel file di configurazione. Ad esempio nel file di configurazione possiamo indicare anche il target, ovvero in che versione di ECMAScript vogliamo compilare il nostro codice di partenza.

È certamente buona prassi tenere in ordine i progetti sopra i quali si lavora. Magari il codice sorgente dentro ad una cartella "./src" ed il codice da "distribuire" dentro la cartella "./dist". A prescindere, è consigliabile separare le cartelle.

```typescript
// ./tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

Non si può parlare di TypeScript 6 senza parlare di { "strict": true } che impone la rigorosità dei tipi all'interno del compilatore.

Ultimo ma non meno importante, ti ricordo che "rootDir" specifica che i file sorgente si trovano nella cartella "./src", mentre la direttiva "include" serve a indicare quali file elaborare. Questo evita che file di sviluppo, file temporanei o altri elementi di supporto vengano inclusi nella build.
