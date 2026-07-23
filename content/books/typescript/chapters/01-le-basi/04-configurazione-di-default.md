## Configurazione di default

Non è necessario creare il file di configurazione a mano perché volendo c'è un comando che ci permette di creare il file di configurazione per noi. Se provi a lanciare questo comando otterrai un file pieno zeppo di configurazioni commentate. In questo modo non devi andarti a cercare nulla. Sta tutto lì e basta rimuovere i commenti. All'interno ci sono, quindi, tutte le possibili voci che il file di configurazione ti permette di gestire, tra cui quelle che si sono viste nel box di codice precedente. Se vuoi generare un file di configurazione automaticamente lancia il comando che segue. Verrà generato un file conforme alla versione ECMAScript più recente.

```sh
tsc --init
```

Lanciando questo comando dovresti ricevere un output simile a quello che segue:

```sh
ciambella tsc --init
Created a new tsconfig.json
You can learn more at https://aka.ms/tsconfig
```

Se apri il file generato cosa vedi? Vedi un file abbastanza grosso con dentro un sacco di opzioni commentate. Quelli che vedi non commentati, sono i valori abilitati di default. Tutti quelli che è possibile configurare sono presenti dentro al file e si possono decommentare alla bisogna.

Si può leggere il file generato per scoprire che cosa, in effetti, puoi modificare della configurazione di default. Il file che viene generato è moderatamente lungo, ma non così tanto da non proportene una versione. Dovrei solo lanciare il comando per vedere che cosa si trova nel file "./tsconfig.json".

Ho appena lanciato il comando sulla mia macchina e questo è il risultato che ho ottenuto. Suppongo che sia bene o male il medesimo contenuto che potresti vedere anche tu facendo lo stesso.

```typescript
// ./tsconfig.json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```
