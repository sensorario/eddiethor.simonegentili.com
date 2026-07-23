## Promise<T>

Una Promise è un oggetto che rappresenta il risultato futuro di un'operazione asincrona. In TypeScript si tipizza con `Promise<T>` dove `T` è il tipo del valore che la promise restituirà quando si risolve.

```typescript
function caricaUtente(id: number): Promise<{ nome: string; eta: number }> {
  return fetch(`/api/utenti/${id}`)
    .then(risposta => risposta.json());
}
```

Qui la funzione dice esplicitamente: "restituisce una promise che, quando si risolve, avrà un oggetto con nome ed eta". TypeScript controlla che il valore con cui la promise si risolve corrisponda al tipo dichiarato.
