## Discriminated Union

Questo è un pattern molto usato in TypeScript. Quando hai una union di tipi che condividono una proprietà comune con valori letterali diversi, puoi usare quella proprietà per discriminare tra i tipi.

```typescript
type Cerchio = {
  forma: "cerchio";
  raggio: number;
};

type Rettangolo = {
  forma: "rettangolo";
  larghezza: number;
  altezza: number;
};

type Forma = Cerchio | Rettangolo;

function calcolaArea(forma: Forma): number {
  switch (forma.forma) {
    case "cerchio":
      return Math.PI * forma.raggio ** 2;
    case "rettangolo":
      return forma.larghezza * forma.altezza;
  }
}
```

La proprietà `forma` con valori letterali `"cerchio"` e `"rettangolo"` è il discriminante. All'interno di ogni `case`, TypeScript sa esattamente con quale tipo sta lavorando e ti dà l'autocompletamento corretto.
