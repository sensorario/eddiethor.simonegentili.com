## typeof

Il modo più semplice di fare narrowing è usare `typeof`. È lo stesso operatore che esiste in JavaScript, ma TypeScript lo capisce e usa quell'informazione per affinare il tipo.

```typescript
function formatta(valore: string | number): string {
  if (typeof valore === "string") {
    return valore.toUpperCase(); // qui TypeScript sa che è una string
  }
  return valore.toFixed(2); // qui sa che è un number
}
```

All'interno del blocco `if`, TypeScript è certo che `valore` è una `string`. Fuori dall'`if`, nella parte `else` implicita, sa che è un `number`. Si tratta di una cosa abbastanza naturale se ci pensi: il compilatore segue lo stesso ragionamento che farebbe un programmatore attento.
