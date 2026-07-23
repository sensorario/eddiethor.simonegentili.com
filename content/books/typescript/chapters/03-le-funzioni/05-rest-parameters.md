## Rest Parameters

Ci sono situazioni in cui non si sa in anticipo quanti parametri arriveranno. In JavaScript si usava l'oggetto `arguments`. In TypeScript abbiamo i rest parameters, che raccolgono tutti gli argomenti rimanenti in un array tipizzato.

```typescript
function somma(...numeri: number[]): number {
  return numeri.reduce((acc, n) => acc + n, 0);
}

somma(1, 2, 3);        // 6
somma(10, 20, 30, 40); // 100
```

Il `...` davanti al nome del parametro dice a TypeScript che tutto ciò che arriva dopo i parametri fissi viene raccolto in quell'array. I rest parameters devono essere sempre l'ultimo parametro della funzione.
