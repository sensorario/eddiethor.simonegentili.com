## Exhaustiveness check

C'è una cosa bellissima che puoi fare con le discriminated union e il tipo `never`. Se aggiungi un nuovo tipo alla union ma dimentichi di gestirlo nel `switch`, TypeScript te lo segnala a compile time.

```typescript
type Triangolo = {
  forma: "triangolo";
  base: number;
  altezza: number;
};

type FormaCompleta = Cerchio | Rettangolo | Triangolo;

function calcolaArea(forma: FormaCompleta): number {
  switch (forma.forma) {
    case "cerchio":
      return Math.PI * forma.raggio ** 2;
    case "rettangolo":
      return forma.larghezza * forma.altezza;
    default:
      const _check: never = forma; // errore! Triangolo non è never
      return 0;
  }
}
```

L'assegnazione `const _check: never = forma` nella clausola `default` dice a TypeScript: "se arrivi qui, il tipo deve essere `never`". Se hai gestito tutti i casi, `forma` nella clausola `default` sarà effettivamente `never`. Se hai dimenticato un caso, TypeScript ti avvisa perché `Triangolo` non è assegnabile a `never`.

È un trucco semplice ma efficace per garantire che ogni volta che aggiungi un tipo alla union, ti ricordi di aggiornare tutti i punti del codice che la gestiscono.
