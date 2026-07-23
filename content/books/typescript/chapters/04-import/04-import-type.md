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
