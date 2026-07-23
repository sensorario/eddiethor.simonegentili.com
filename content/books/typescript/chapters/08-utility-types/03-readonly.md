## Readonly<T>

Quando un oggetto è immutabile, non può cambiare di valore e due oggetti con gli stessi valori sono uguali. Non è quindi possibile cambiare dei valori o proprietà di un oggetto: sarà necessario creare un nuovo insieme di proprietà che daranno vita ad un nuovo oggetto immutabile. Questo consente di evitare che un valore complesso (l'oggetto immutabile) non possa subire modifiche accidentali. Esiste quindi un tipo che si chiama Readonly e si può utilizzare grazie alla parola chiave Readonly<T>. Con la parola chiave readonly (minuscola) il concetto è simile ma riguarda un singolo campo. Gli altri valori della classe possono ancora essere modificato ma non quello marcato come readonly. Con la R maiuscola, invece, si creano istanze di classi che saranno poi oggetti immutabili. Adesso un esempio pratico di oggetto creato con Readonly<T>.

```typescript
type Persona = {
  nome: string;
  eta: number;
  indirizzo: {
    via: string;
    citta: string;
  };
};

const utente: Readonly<Persona> = {
  nome: "Simone",
  eta: 42,
  indirizzo: {
    via: "Via Roma",
    citta: "Forlì"
  }
};
```

In questo caso esiste un tipo Persona. Da questo tipo viene creato un nuovo oggetto, ma Readonly<Persona>. L'oggetto utente quindi è immutabile. Essendo, l'oggetto "utente" readonly, questo comando genererà un errore.

```typescript
utente.nome = "Simone";
```

Ma abbiamo anche un comportamento un po' strano che potrebbe sembrare un bug. Infatti possiamo modificare una proprietà di indirizzo.

```typescript
utente.indirizzo.citta = "Cesena";
```

Questo succede perché Readonly<T> è "superficiale" (shallow). Mentre nome ed età non sono modificabili, indirizzo lo é. Questo succede perché il riferimento ad indirizzo continua a non variare anche se ne modifichiamo il valore. Come peraltro succede quando dichiariamo usando const un oggetto JavaScript e possiamo tranquillamente modificarne i valori delle proprietà fino anche ad aggiungerne di nuove. Per rimediare a questo potenziale inconveniente possiamo usare un altro tipo fatto da noi che consente di rendere non modificabile alcun valore a tutti i livelli.

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
```
