## Record<K, V>

A volte si ha bisogno di costruire un oggetto che funziona come una mappa, dove le chiavi e i valori hanno tipi precisi. Record è perfetto per questo.

```typescript
type Ruolo = "admin" | "editor" | "viewer";
type Permessi = { leggi: boolean; scrivi: boolean };

const permessiPerRuolo: Record<Ruolo, Permessi> = {
  admin:  { leggi: true,  scrivi: true  },
  editor: { leggi: true,  scrivi: true  },
  viewer: { leggi: true,  scrivi: false }
};
```

Se provi ad aggiungere una chiave che non fa parte di `Ruolo`, TypeScript ti avvisa. E se dimentichi uno dei ruoli, stesso errore. È un modo elegante per costruire dizionari tipizzati.
