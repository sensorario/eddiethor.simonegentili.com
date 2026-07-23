## Enum

Prima di parlare delle enum, parliamo del problema che vanno a risolvere. Vanno a risolvere il problema della tipizzazione di valori discreti. Un valore discreto è un valore che può assumere solo una certa lista di valori. In JavaScript i valori discreti possono essere rappresentati da stringhe, numeri o altri tipi di dati primitivi. Questo può portare ad errori. E' possibile infatti passare un valore con un tipo sbagliato ad una funzione o ad una espressione. Con le enumerazioni, enum, si ha la possibilità di associare tra loro una lista di costanti. Si tratta di un sistema tanto semplice quanto efficace per scrivere codice più leggibile. Avendo a disposizione enum, possiamo sfruttare anche l'autocompletamento del nostro ide. Poi che dire? Dovessimo fare refactoring e cambiare uno dei possibili valori di una certa enum, non dovremmo cercare delle stringhe ma direttamente una enum. Se tante stringhe possono essere uguali per caso, una enum è un preciso valore.

```typescript
// ./giorni.ts
// i valori discreti sono i giorni della settimana
enum Giorni {
  Monday, // Giorni.Monday -> 0
  Tuesday,
  Wednesday,
  Thursday, // Giorni.Thursday -> 4
  Friday,
  Saturday,
  Sunday
}

// viene scelto un giorno della settimana
// dunque non una stringa o un valore numerico
const giorno = Giorni.Friday;
console.log(giorno); //4

switch (giorno) {
  case Giorni.Monday:
    console.log("Oggi è lunedì");
    break;
  case Giorni.Friday:
    console.log("Oggi è venerdì"); // stampa questo
    break;
  default:
    console.log("Oggi non è né lunedì né venerdì");
    break;
}
```

Se hai notato i valori inseriti all'interno di un enum hanno come valori un numero che parte da zero e viene incrementato di uno per ogni valore successivo. Questi valori partono da zero. Se vuoi puoi fare in modo che partano da uno semplicemente assegnando uno al primo dei giorni della settimana.

```typescript
// ./giorni.ts
// i valori discreti sono i giorni della settimana
enum Giorni {
  Monday = 1,
  Tuesday, // 2
  Wednesday, // 3
  ...
}
```

Se creiamo un enum, possiamo quindi assegnare un valore ad ogni suo elemento ma questo valore non deve essere necessariamente un numero. Ad esempio, può essere anche una stringa. Te lo mostro nel codice qui sotto

```typescript
// ./giorni.ts
// i valori discreti sono i giorni della settimana
enum Giorni {
  Monday = "lunedì",
  Tuesday = "martedì",
  Wednesday ...,
  ...
}
```

Prova a giocare ed a fare esperimenti. Ti anticipo che tutti gli elementi di un enum devono essere dello stesso tipo. Se scegli numeri avrai solo numeri. Se scegli stringhe avrai solo stringhe. Un altro utilizzo che mi viene in mente potrebbe essere quello dei nomi degli stati dei task di un progetto ovvero

```typescript
// ./stati.ts
enum TaskStatus {
  ToDo = "to do ",
  InProgress = "in progress",
  Done = "done",
}
```

Un altro esempio ancora, potrebbe essere la rappresentazione dello stato di un ordine in un e-commerce.

```typescript
// ./stati.ts
enum OrderStatus {
  Pending = 'Pending', // In attesa di elaborazione
  Processing = 'Processing', // In fase di elaborazione
  Shipped = 'Shipped', // Spedito
  Delivered = 'Delivered', // Consegnato
  Cancelled = 'Cancelled', // Annullato
  Returned = 'Returned' // Restituito
}
```

Prova a pensare dove potrebbe essere utile l'utilizzo di una enum.
