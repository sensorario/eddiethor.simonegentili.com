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
