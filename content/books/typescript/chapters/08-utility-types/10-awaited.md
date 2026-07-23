## Awaited<T>

Con l'async/await le funzioni restituiscono spesso `Promise<T>`. Awaited estrae il tipo racchiuso in una Promise, anche annidata.

```typescript
async function caricaUtente(): Promise<{ nome: string; eta: number }> {
  return { nome: "Simone", eta: 42 };
}

type Utente = Awaited<ReturnType<typeof caricaUtente>>;
// { nome: string; eta: number }
```

Senza Awaited otterresti `Promise<{ nome: string; eta: number }>`. Con Awaited ottieni il tipo del valore che ti interessa davvero. È particolarmente utile quando si compongono più utility types insieme.
