## Output compilato

Per provare il codice qui sopra ho usato questa configurazione.

```typescript
// ./tsconfig.json
{
  "include": ["**/*.ts"],
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

Che ha generato, lanciando il comando "tsc -p tsconfig.json", questo codice per il file "esterno"...

```typescript
// ./dist/esterno.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Esportato = /** @class */ (function () {
    function Esportato(foo, bar) {
        this.foo = foo;
        this.bar = bar;
    }
    return Esportato;
}());
;
exports.default = Esportato;
```

E questo per il programma…

```typescript
// ./dist/programma.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// programma.ts
var esterno_1 = require("./esterno");
var ciao = new esterno_1.default("ciaone", "mondone");
console.log(ciao.foo); // "ciaone"
console.log(ciao.bar); // "mondone"
```
