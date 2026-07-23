## Promise.all

Quando devi aspettare più promise in parallelo, usi `Promise.all`. TypeScript inferisce correttamente il tipo dell'array risultante come una tupla.

```typescript
async function caricaTutto(id: number) {
  const [utente, ordini] = await Promise.all([
    fetch(`/api/utenti/${id}`).then(r => r.json()) as Promise<{ nome: string }>,
    fetch(`/api/ordini/${id}`).then(r => r.json()) as Promise<string[]>
  ]);

  return { utente, ordini };
}
```

`Promise.all` restituisce una tupla con i tipi delle singole promise nello stesso ordine. Se una delle promise si rigetta, tutte le altre vengono ignorate e l'intera operazione fallisce.

Se hai bisogno di gestire i fallimenti individualmente, puoi usare `Promise.allSettled`. Ogni risultato avrà uno stato `fulfilled` o `rejected` e TypeScript lo sa.

```typescript
const risultati = await Promise.allSettled([promise1, promise2]);

for (const risultato of risultati) {
  if (risultato.status === "fulfilled") {
    console.log(risultato.value); // TypeScript sa che value esiste
  } else {
    console.error(risultato.reason); // TypeScript sa che reason esiste
  }
}
```
