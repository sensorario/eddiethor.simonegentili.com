## Importazione nulla

Un particolare tipo di importazione, non importa nulla. Ed allora a che cosa serve? Esegue il file importato. Ad esempio si possono definire le variabili globali ed usarle nel codice. In questo snippet di codice viene importato init e da li si vede che è possibile usare la variabile "variabile" senza averla mai dichiarata. Si tratta infatti, ora, di una variabile globale.

```typescript
// ./programma.ts
import "./init";

console.log("Programma.ts is running", variabile);
```

Con questa sintassi è possibile definire un oggetto global ed assegnare ad esso dei valori. Ad esempio il valore di "variabile" visto nel precedente snippet di codice.

```typescript
// ./init.ts
export { };

declare global {
    var variabile: string;
}

globalThis.variabile = "1.0.0";
```
