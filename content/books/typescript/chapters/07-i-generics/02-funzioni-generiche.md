## Funzioni generiche

Fin ora ho mostrato solo classi generiche. Ma i generics funzionano benissimo anche con le funzioni. E spesso è l'uso più immediato che se ne fa.

Supponiamo di voler scrivere una funzione che restituisce il primo elemento di un array. Se scriviamo:

```typescript
function primo(array: number[]): number | undefined {
  return array[0];
}
```

funziona solo con i numeri. Se vogliamo che funzioni con qualsiasi tipo, possiamo renderla generica.

```typescript
function primo<T>(array: T[]): T | undefined {
  return array[0];
}

primo([1, 2, 3]);        // restituisce un number
primo(["a", "b", "c"]); // restituisce una string
primo([]);               // restituisce undefined
```

TypeScript è abbastanza intelligente da inferire il tipo dalla chiamata. Non sei costretto a scrivere `primo<number>([1, 2, 3])`, anche se puoi farlo se vuoi essere esplicito.
