## Gestione degli errori

Le Promise possono anche rigettarsi, cioè fallire. Con async/await si gestisce l'errore con un normale `try/catch`.

```typescript
async function caricaUtente(id: number): Promise<{ nome: string; eta: number }> {
  try {
    const risposta = await fetch(`/api/utenti/${id}`);

    if (!risposta.ok) {
      throw new Error(`Errore HTTP: ${risposta.status}`);
    }

    return await risposta.json();
  } catch (errore) {
    console.error("Impossibile caricare l'utente", errore);
    throw errore;
  }
}
```

C'è una cosa da sapere: in TypeScript il tipo di `errore` nel blocco `catch` è `unknown`, non `Error`. Questo perché in JavaScript puoi lanciare qualsiasi cosa, non solo oggetti `Error`. Prima di usare le proprietà dell'errore devi fare narrowing.

```typescript
} catch (errore) {
  if (errore instanceof Error) {
    console.error(errore.message); // adesso TypeScript sa che è un Error
  }
  throw errore;
}
```
