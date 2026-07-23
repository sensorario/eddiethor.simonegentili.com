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
