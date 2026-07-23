## Overload

Gli overload permettono di definire una stessa funzione con firme diverse. È utile quando una funzione si comporta in modo diverso in base ai tipi di parametri ricevuti.

Il modo errato di gestire questa situazione è usare `any` e sperare nel meglio. Il modo corretto è dichiarare più firme per la stessa funzione.

```typescript
function elabora(input: string): number;
function elabora(input: number): number;
function elabora(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  }
  return input * 2;
}

elabora("ciao"); // 4
elabora(21);     // 42
```

Le prime due righe sono le "firme" dell'overload. L'ultima è l'implementazione reale. Chi chiama la funzione vede solo le firme, non l'implementazione. TypeScript si occupa di fare il controllo corretto.
