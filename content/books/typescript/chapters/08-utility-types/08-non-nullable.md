## NonNullable<T>

Questo utility type rimuove `null` e `undefined` da un tipo. È utile quando sai che un valore sarà presente ma il suo tipo include comunque `null` o `undefined`.

```typescript
type ForseStringa = string | null | undefined;
type Stringa = NonNullable<ForseStringa>;
// string
```

In pratica lo si usa spesso per ripulire il tipo di ritorno di funzioni che a volte potrebbero non trovare un risultato, prima di passarlo a un'altra funzione che richiede un valore certo.
