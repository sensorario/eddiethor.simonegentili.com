## Classi

Se stiamo parlando di programmazione ad oggetti, non possiamo non parlare di classi. A scuola ci ho messo un po' a capire che cosa fosse un oggetto, una istanza di una classe, una classe, un'interfaccia. Provo a dare una definizione secondo il mio modestissimo punto di vista. Partiamo. Dunque un valore noi lo mettiamo in una variabile. Più valori, correlati tra loro, sono un oggetto. Se questo oggetto corrisponde ad un preciso insieme di tipologie di valori, allora abbiamo un'istanza di quei valori, che poi sono la classe. La classe sta ad un tipo di dato come un oggetto sta ad una singola variabile. Ecco. Non so se questa definizione aiuta, ma è il modo più semplice che mi viene in mente per spiegare a chi non riesce ancora a comprendere la differenza tra una classe ed una sedia, che cosa sia una classe e che cosa sia un oggetto. E' un concetto astratto che si può trovare nei linguaggi che implementano il paradigma ad oggetti. TypeScript è uno di questi linguaggi. Ed ora veniamo alla domanda: si ma… in codice… che cosa è una classe? Fino a prima della versione 3.8 non era possibile indicare un campo come privato. Stiamo parlando di febbraio 2020. Come si è visto e si vede anche in altri linguaggi, i programmatori adottano un sistema per identificare questo genere di campi. Ad esempio qualcuno utilizza la convenzione di mettere un underscore per indicare che un certo campo veniva considerato privato. Ecco un esempio ricavato da un'antica pergamena di codice miniato di quell'epoca. In questo esempio ho pensato di creare un inventario per un negozio online. Ho anche aggiunto una proprietà foo utilizzando una getter function. Questa funzione restituisce il valore della proprietà privata _foo. La proprietà privata viene definita nel costruttore usando la convenzione _foo. Il valore iniziale di _foo è un array vuoto. Come detto in precedenza, per ora abbiamo solo una definizione. Per avere un'istanza di questa classe dobbiamo definirla con "const is = new InventoryStore()".

```typescript
// ./InventoyStore.ts
class InventoryStore {

  // le proprietà...
  get foo() {
    return this._foo
  }

  // _ indica che è privata
  // crea la prop se non esiste
  constructor() {
    this._foo = []
  }

}

const is = new InventoryStore()
```

Lo stesso si ottiene usando le parole chiave public, private e protected. Eccone un esempio.:

```typescript
// ./InventoyStore.ts
class InventoryStore {
  private name : string
  private foo : string
}

const is = new InventoryStore()

is.name // sbagliato
```

Di cose da dire ce ne sarebbero tante. Ti invito a consultare la documentazione di TypeScript per approfondire questo argomento. Purtroppo questo non è un manuale su TypeScript e contiene solo qualche cenno. Avrò senza dubbio il piacere di approfondire l'argomento in futuro.
