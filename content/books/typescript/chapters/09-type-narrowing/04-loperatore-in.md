## L'operatore in

L'operatore `in` verifica se una certa proprietà esiste in un oggetto. TypeScript lo usa per fare narrowing tra tipi che hanno strutture diverse.

```typescript
type Pesce = { nuota: () => void };
type Uccello = { vola: () => void };

function muovi(animale: Pesce | Uccello): void {
  if ("nuota" in animale) {
    animale.nuota(); // TypeScript sa che è un Pesce
  } else {
    animale.vola(); // TypeScript sa che è un Uccello
  }
}
```

È particolarmente utile quando si hanno tipi definiti come interfacce o type alias, dove `instanceof` non funziona perché non ci sono classi.
