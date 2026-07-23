## ReturnType<T> e Parameters<T>

Con ReturnType puoi estrarre il tipo di ritorno di una funzione senza doverlo riscrivere a mano.

```typescript
function creaOrdine(id: number, prodotto: string) {
  return { id, prodotto, data: new Date() };
}

type Ordine = ReturnType<typeof creaOrdine>;
// { id: number; prodotto: string; data: Date }
```

Se la firma di `creaOrdine` cambia, anche `Ordine` si aggiorna automaticamente. Non devi stare a inseguire le modifiche manualmente.

Parameters fa la cosa complementare: estrae i tipi dei parametri di una funzione come una tupla.

```typescript
type ParametriOrdine = Parameters<typeof creaOrdine>;
// [id: number, prodotto: string]
```
