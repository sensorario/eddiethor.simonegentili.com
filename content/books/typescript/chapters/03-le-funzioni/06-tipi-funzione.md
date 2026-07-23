## Tipi Funzione

Fin qui abbiamo tipizzato i parametri e il valore di ritorno delle funzioni. Ma a volte vogliamo tipizzare la funzione stessa, ad esempio quando vogliamo passarla come parametro ad un'altra funzione oppure memorizzarla in una variabile.

```typescript
type Trasformatore = (valore: string) => string;

const maiuscolo: Trasformatore = (v) => v.toUpperCase();
const minuscolo: Trasformatore = (v) => v.toLowerCase();

function applica(testo: string, fn: Trasformatore): string {
  return fn(testo);
}

applica("ciao", maiuscolo); // CIAO
applica("CIAO", minuscolo); // ciao
```

Definire un tipo per una funzione ci permette di riusare quella definizione in più punti del codice. Se cambia la firma della funzione basta cambiarla in un posto solo.
