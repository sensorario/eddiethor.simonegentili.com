# le basi

## Transpilazione

Per partire con TypeScript ci vuole l'abc. Come lo devi configurare? Come puoi infine trasformarlo in JavaScript e come puoi eseguirlo? Alla fine non viene eseguito TypeScript ma del codice JavaScript e JavaScript funziona già di suo. Si parla ovviamente del runtime Node, perché con runtime moderni come Deno o altri le cose cambiano. Dicevamo che JavaScript funziona senza transpilazioni. Ma allora TypeScript chi lo esegue? Nessuno, perché non ha un runtime nativo, e viene invece transpilato in JavaScript.

La transpilazione consente di tradurre il codice TypeScript in corrispondente codice JavaScript. Si passa da un superset a codice compatibile. Questa transizione da superset a codice compatibile avviene tramite due azioni: Type Erasure (che rimuove la tipizzazione) e Down Leveling (che converte in modo selettivo e condizionale il codice JavaScript moderno in istruzioni datate a seconda del target indicato in tsconfig.json).

## Dove installare TypeScript

TypeScript può essere installato sia localmente, quindi a livello di singolo progetto, che globalmente, quindi a livello di macchina. Il comando per entrambe le tipologie di installazione è il medesimo. L'unica cosa che cambia è un "-g" alla fine del comando che fa sì che l'installazione avvenga globalmente.

```sh
npm install typescript -g
```

Una volta aggiunto sarà possibile richiamare il compilatore in ogni momento usando tsc.

Se provi ad installare TypeScript il tuo sistema operativo potrebbe bloccare l'operazione a causa di problemi di sicurezza. Se hai questo genere di problemi su sistemi Linux o MacOS dovrai usare il comando sudo. A quel punto ti verrà chiesta la password e potrai completare l'installazione. Su Windows sudo non esiste, ma se dovessi riscontrare qualche problema con questo sistema operativo ti consiglio di aprire il terminale come amministratore. Se vuoi stare al sicuro ti consiglio di installare localmente TypeScript. Installato in questo modo non richiede privilegi particolari.

Non serve per forza decidere di far nascere un progetto utilizzando TypeScript. Infatti può essere aggiunto in un qualsiasi momento. In gergo un progetto del genere si chiama brownfield.

La transizione di un progetto da JavaScript può avvenire anche gradualmente. Banalmente si possono convertire i file JavaScript uno per volta modificando l'estensione da .js a .ts. Il compilatore, opportunamente configurato, dovrebbe essere in grado di leggere entrambi i tipi di file. Prima è necessario attivare l'opzione dentro il tsconfig.json.

```typescript
// ./tsconfig.json
{
  "compilerOptions": {
    /* Abilita la convivenza: permette a TS di importare file .js */
    "allowJs": true,
    /* Opzionale: permette a TS di segnalare errori anche nei file .js */
    "checkJs": false,
    "target": "ES2022",
    "outDir": "./dist"
  }
}
```

Ricorda che il codice TypeScript viene usato solo in fase di sviluppo quindi, particolare non trascurabile, va installato con --save-dev.

```sh
npm install typescript --save-dev
```

Esiste anche una versione breve ossia

```sh
npm i -D typescript
```

Se TypeScript viene installato globalmente può essere utilizzato con tutti i progetti presenti nella macchina. Però questo porta presto o tardi a dover lavorare con versioni differenti e incompatibili. Ora stai per imparare TypeScript 6. Prova ad immaginare che cosa può succedere se ti arriva un progetto in TypeScript 4.

Una buona pratica da seguire prevede di far sì che ciascun progetto sia auto-consistente. Chiunque scarichi il progetto sulla propria macchina deve poterlo compilare senza dover indovinare qualche versione di TypeScript deve essere usata.

La scelta giusta, è quella che ti permette di riprodurre il progetto nella macchina di chiunque ci lavori e senza troppe rogne da gestire. Io personalmente tendo a mettere dentro un container tutto quanto, in questo modo una installazione globale o una locale non avranno differenze: il progetto potrà girare sempre, perché dentro al proprio container.

Spero di averti trasmesso qualche concetto utile per fare questo genere di scelta in modo consapevole. Ciò detto, ogni team ed ogni processo di lavoro è a sé ed ha le proprie ragioni d'essere fatto come è fatto. Nel senso che ho lavorato in tanti contesti, da aziende di tre persone a grandi società da migliaia di dipendenti. Ciascuno ha un proprio modo di lavorare. Io qui voglio solo raccontare qualche soluzione che ho incontrato nella mia carriera o nei miei studi.

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

## Buildare

TypeScript è installato. Configurato. Adesso provo a creare un piccolo file per buildarlo e vedere che cosa ne viene fuori. Beh, per prima cosa creiamo un file TypeScript che altro non è che un file JavaScript con estensione ".ts". Questo vale solo perché TypeScript è un superset di JavaScript. Nell'atto pratico TypeScript ci porta a tipizzare di tutto ma questo aspetto lo vediamo più avanti.

```typescript
// ./prova.ts
class HelloTypeScript {
    public hello() {
        console.log('world')
    }
}

const hts = new HelloTypeScript();

hts.hello();
```

Questo codice è TypeScript e così com'è va. Se lanciamo il comando "tsc", il comando va a cercare automaticamente il file tsconfig.json visto poco fa. Il risultato finale sarà verosimilmente uguale al seguente.

```typescript
// ./prova.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloTypeScript {
    hello() {
        console.log("world");
    }
}
const hts = new HelloTypeScript();
hts.hello();
//# sourceMappingURL=prova.js.map
```
