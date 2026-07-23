## Conditional Types

I tipi condizionali permettono di creare tipi che dipendono da altri tipi, proprio come un if/else ma a livello di tipo. La sintassi è `T extends U ? X : Y`.

```typescript
type ÈStringa<T> = T extends string ? "sì" : "no";

type A = ÈStringa<string>;  // "sì"
type B = ÈStringa<number>;  // "no"
```

All'inizio può sembrare strano. Ma diventa molto utile quando si vuole creare un tipo il cui risultato dipende dal tipo che gli viene passato. Un caso pratico: voglio un tipo che, dato un array, ne estrae il tipo degli elementi.

```typescript
type ElementoArray<T> = T extends (infer E)[] ? E : never;

type A = ElementoArray<string[]>;  // string
type B = ElementoArray<number[]>;  // number
type C = ElementoArray<boolean>;   // never (non è un array)
```

La parola chiave `infer` permette di "catturare" un tipo all'interno di un'espressione e dargli un nome. In questo caso `E` cattura il tipo degli elementi dell'array. È una delle feature più potenti di TypeScript per chi costruisce utility types custom.
