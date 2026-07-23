## Vincoli Generici

C'è un problema con i generics troppo liberi. Se `<T>` può essere qualsiasi cosa, non possiamo accedere a nessuna proprietà o metodo specifico. Ad esempio, questo codice non compila:

```typescript
function lunghezza<T>(valore: T): number {
  return valore.length; // errore! T potrebbe non avere .length
}
```

TypeScript si lamenta giustamente: non sa se `T` ha una proprietà `length`. Per risolvere questo usiamo `extends` per vincolare il tipo generico.

```typescript
function lunghezza<T extends { length: number }>(valore: T): number {
  return valore.length; // adesso va bene
}

lunghezza("ciao");    // 4
lunghezza([1, 2, 3]); // 3
lunghezza(42);        // errore! number non ha .length
```

Un altro caso frequente è vincolare `T` alle chiavi di un oggetto. Immagina una funzione che legge una proprietà da un oggetto: vogliamo essere certi che la chiave esista davvero nell'oggetto.

```typescript
function leggiProprieta<T, K extends keyof T>(oggetto: T, chiave: K): T[K] {
  return oggetto[chiave];
}

const utente = { nome: "Simone", eta: 42 };

leggiProprieta(utente, "nome"); // restituisce string
leggiProprieta(utente, "eta");  // restituisce number
leggiProprieta(utente, "foo");  // errore! "foo" non esiste in utente
```

Il `K extends keyof T` garantisce che la chiave passata sia una chiave valida dell'oggetto. E il tipo di ritorno `T[K]` è il tipo esatto della proprietà. TypeScript riesce a inferire tutto automaticamente.
