# Utility types

## Da sapere

Si tratta di tipi built-in in TypeScript che, quindi, non devono essere definiti. Sono stati pensati per rendere il codice più leggibile e riusabile. Trasformano i tipi già esistenti. Esistono solo in fase di compilazione quindi spariscono quando il codice viene traspilato. Sono stati introdotti perché spesso i programmatori utilizzano gli stessi pattern. Sono basati sui Generics. Con questo sistema si evita di scrivere molto codice. Nelle prossime sezioni del capitolo vedremo insieme alcuni tra gli Utility Types più usati. Con questi risparmierai tanto tempo e righe di codice.

## Partial<T> & Required<T>

Nel capitolo precedente si è parlato di Generics. Ebbene Partial e Required sono basati proprio sui Generics. Come tante cose di TypeScript esistono solo a compile time e non ce li ritroviamo nel codice transpilato. Per farla semplice se abbiamo una certa classe Persona, possiamo definire un tipo Partial<Persona> o Required<Persona> se vogliamo che tutte le sue proprietà siano rispettivamente facoltative od obbligatorie. Un caso di utilizzo potrebbe essere quello di passare come parametro di una funzione un oggetto di tipo Required<Persona> per garantire che l'oggetto è completamente valorizzato. Ma non solo. Possono essere applicati a classi, interfacce o type alias.

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

## ReadonlyArray<T>

Questo Utility Type, consente di gestire array immutabili. Come gli oggetti, anche gli array possono mutare di valori anche se dichiararti const. Mentre un array normale può essere modificato, un array dichiarato con ReadonlyArray<T> non può. Tornando al concetto di immutabilità raccontato qualche pagina fa, un array dichiarato in questo modo è quindi immutabile. Essendo immutabile, un array dichiarato in questo modo non può essere usato con…

- .push()
- .splice()
- …

Perché sono funzioni che vanno ad alterare il contenuto dell'array. Se vogliamo però possiamo generare un array normale da uno ReadonlyArray<T> con…

```typescript
const arrayNormale = [...arrayDichiaratoReadonly];
```

## Pick & Omit

Servono entrambi per creare nuovi tipi partendo da tipi esistenti. Servono rispettivamente per conservare o omettere alcune proprietà di un altro tipo. Credo di non riuscire a spiegarla meglio di un esempio. Alla domanda "Come faccio a prendere solo alcuni elementi della classe User?" rispondo con questo esempio.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, "id" | "name">;
```

Se ora creassimo un oggetto di tipo UserPreview, e cercassimo poi di modificare la proprietà email, otterremmo un errore a compile time. Omit è complementare di Pick. Anziché definire un nuovo tipo mantenendo delle proprietà, ne definisce uno escludendone alcune. Nel prossimo box di codice si può vedere lo stesso esempio di Pick scritto usando Omit. Quando usare uno o l'altro dipende dall'oggetto di partenza e da quanto convenga omettere o mantenere dei campi. Se l'interfaccia di partenza ha molti campi e vogliamo tenerne solo un paio, Pick è ideale. Al contrario se ne vogliamo escludere solo qualcuno, la cosa migliore è certamente quella di usare Omit. Quando usarli? Ad esempio se passiamo un oggetto ad un metodo ma risulta incompleto.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Omit<User, "email" | "age">;
```

Ecco un esempio di oggetto incompleto dove, tra l'altro, si vede come non serva per forza creare un nuovo tipo, ma basta usare omit per passare un oggetto JavaScript che non rispecchia completamente un certo tipo.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const metodo = (oggetto : Omit<User, "email" | "age">) => {
  // cose
}

metodo({
  id: 42,
  name: "Simone"
});
```
