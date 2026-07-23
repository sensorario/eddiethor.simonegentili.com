# import

## Importare file

Credo valga la pena spendere due righe per spiegare nel dettaglio come si usa la parola chiave import. Per farla semplice, puoi porre in un file funzioni e variabili, e renderle accessibili al mondo esterno usando la parola chiave "export". Anche perché magari ci siamo costruiti un piccolo framework con tutte le nostre funzioni e le nostre costanti, ok, ma come le usiamo in tutto il codice? Puoi importare in altri file quelle variabili e quelle funzioni usando la parola chiave "import". Con un esempio semplice ti spiego la differenza tra…

```typescript
import foo from "bar"
```

e…

```typescript
import { foo } from "bar"
```

Creo un file semplicissimo e creo al suo interno un tipo ed una classe. Il tipo lo dichiaro in modo normalissimo. La classe, invece, preceduta dalla parola chiave export.

```typescript
// ./esterno.ts
type NonEsportato = {
  foo: string;
  bar: string;
};

export class Esportato {
  foo: string;
  bar: string;

  constructor(foo: string, bar: string) {
    this.foo = foo;
    this.bar = bar;
  }
}
```

Grazie a quella parola chiave, posso utilizzare la classe "Esportato" anche in altri file. Ecco un esempio:

```typescript
// ./programma.ts
import { Esportato } from "./esterno";

const ciao = new Esportato("ciaone", "mondone");

console.log(ciao.foo); // "ciaone"
console.log(ciao.bar); // "mondone"
```

Ci sarebbe da chiedersi come mai quelle parentesi graffe. Il file "esterno.ts" ha indicato che sta esportando una classe. Però nel file programma.ts noi dobbiamo indicare la classe, o la funzione che vogliamo importare. Se non ce n'è una di default, dobbiamo usare le parentesi graffe, altrimenti nel caso vi siano più classi non si capirebbe quale di queste scegliere. Se invece ne abbiamo una di default, non servono. Ecco come posso modificare il file:

```typescript
// ./esterno.ts
type NonEsportato = {
  foo: string;
  bar: string;
};

class Esportato {
  foo: string;
  bar: string;

  constructor(foo: string, bar: string) {
    this.foo = foo;
    this.bar = bar;
  }
};

export default Esportato;
```

Se utilizzo un export default, non dovrò utilizzare le parentesi graffe quando vorrò utilizzare quella classe. In buona sostanza, se viene indicato un default, non servono le parentesi graffe quando importiamo. Viceversa, se non c'è un default, si dovranno utilizzare.

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

## Import con alias

L'importazione da più file esterni potrebbe causare dei conflitti se più file esportano classi con lo stesso nome. A tal proposito si possono assegnare degli alias per far sì che in un certo file una classe abbia un altro nome. In questo esempio, per la classe Esportato viene creato un alias e grazie a questo sarà possibile usare lo stesso al posto del nome originale.

```typescript
// ./programma.ts
import { Esportato as Hello } from "./esterno";

const ciao = new Hello("ciaone", "mondone");

console.log(ciao.foo); // "ciaone"
console.log(ciao.bar); // "mondone"
```

## Import Type

Con questo tipo di importazione, tipica di TypeScript, il codice transpilato risulta più pulito. In poche parole, non esistendo in JavaScript i tipi, il codice transpilato non conterrà l'importazione di un tipo. Il tipo sarà implicito. Ad esempio posso creare un file con un tipo come questo.

```typescript
// ./type.ts
export type Persona = {
  id: string;
  name: string;
  age: number;
  email: string;
};
```

E posso creare un programma che lo usa.

```typescript
// ./programma.ts
import type { Persona } from "./type";

const persona: Persona = {
  id: "1",
  name: "Mario Rossi",
  age: 30,
  email: "mario.rossi@example.com"
};

console.log(persona);
```

Il codice transpilato di "programma.ts" sarà questo. Senza import.

```typescript
// ./programma.ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var persona = {
  id: "1",
  name: "Mario Rossi",
  age: 30,
  email: "mario.rossi@example.com"
};
console.log(persona);
```

Al contrario, se modifichiamo il file "type.ts" in modo che contenga anche una classe…

```typescript
// ./type.ts
export type Persona = {
  id: string;
  name: string;
  age: number;
  email: string;
};

export class UnaPersona {
  private persona: Persona;

  constructor(persona: Persona) {
    this.persona = persona;
  }
}
```

E la classe la usiamo nel programma

```typescript
// ./programma.ts
import { Persona, UnaPersona } from "./type";

const persona: Persona = {
  id: "1",
  name: "Mario Rossi",
  age: 30,
  email: "mario.rossi@example.com"
};

const unaPersona = new UnaPersona(persona);

console.log(unaPersona);
```

Il codice transpilato conterrà l'importazione del file tramite require.

```typescript
// ./programma.ts
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("./type");
var persona = {
  id: "1",
  name: "Mario Rossi",
  age: 30,
  email: "mario.rossi@example.com"
};
var unaPersona = new type_1.UnaPersona(persona);
console.log(unaPersona);
```

Ad essere precisi, il codice transpilato non cambia se si usa import type o import nel senso che comunque risulta uguale perché type verrà comunque eliminato. La differenza sta soprattutto nel codice più leggibile. Alcuni editor mostrano in modo diverso tipi e classi. Inoltre, in Visual Studio Code il colore dell'icona della classe e del tipo sono differenti.

## Importa tutto

Fino ad ora si sono viste solo le importazioni di una classe o di un tipo. In realtà potremmo avere un file con decine di classi e dunque importarle tutte a mano potrebbe risultare verboso. Ecco perché esiste un modo di importare tutto da un file.

```typescript
// ./programma.ts
import * as utils from "./utils";
```

## Importazione nulla

Un particolare tipo di importazione, non importa nulla. Ed allora a che cosa serve? Esegue il file importato. Ad esempio si possono definire le variabili globali ed usarle nel codice. In questo snippet di codice viene importato init e da li si vede che è possibile usare la variabile "variabile" senza averla mai dichiarata. Si tratta infatti, ora, di una variabile globale.

```typescript
// ./programma.ts
import "./init";

console.log("Programma.ts is running", variabile);
```

Con questa sintassi è possibile definire un oggetto global ed assegnare ad esso dei valori. Ad esempio il valore di "variabile" visto nel precedente snippet di codice.

```typescript
// ./init.ts
export { };

declare global {
    var variabile: string;
}

globalThis.variabile = "1.0.0";
```
