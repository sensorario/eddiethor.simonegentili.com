## async/await

La sintassi async/await è zucchero sintattico sopra le Promise. Rende il codice asincrono molto più leggibile. Una funzione `async` restituisce sempre una `Promise`, automaticamente.

```typescript
async function caricaUtente(id: number): Promise<{ nome: string; eta: number }> {
  const risposta = await fetch(`/api/utenti/${id}`);
  const dati = await risposta.json();
  return dati;
}
```

L'`await` sospende l'esecuzione della funzione fino a quando la promise non si risolve, poi restituisce il valore. Dal punto di vista del codice sembra sincrono, ma non blocca il thread.

Se non specifichi il tipo di ritorno, TypeScript lo inferisce comunque. Ma dichiararlo esplicitamente è una buona pratica: rende chiaro cosa ci si aspetta dalla funzione e TypeScript ti avvisa se il valore restituito non corrisponde.
