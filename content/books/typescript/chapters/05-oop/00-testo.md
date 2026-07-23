# OOP

## Programmazione ad oggetti

Vorrei fare una premessa sull'argomento. Un libro completo sulla programmazione ad oggetti penso possa richiedere un volume tre volte e più di questo libro. E comunque non credo basterebbe. Quello che riporto qui sono solo alcuni concetti della programmazione ad oggetti ed in particolar modo parlerò di elementi sintattici. Quando ho parlato di questo libro ad un mio contatto LinkedIn mi è stato chiesto come mai avessi deciso di parlare di TypeScript. TypeScript a molti non piace. Io non sono tra questi e devo spiegarne la ragione. TypeScript offre un supporto alla programmazione ad oggetti che JavaScript non offre. Un esempio è la tipizzazione statica ad attirarmi verso questo linguaggio. Indicando il tipo di una variabile o di una funzione, possiamo prevenire errori e rendere il codice più leggibile e manutenibile. Con TypeScript ci sono le interfacce. Uno strumento che ci permette di definire le proprietà ed i metodi di un oggetto. Questa feature permette invece di creare codice riusabile e più flessibile. La creazione di classi e di moduli, poi, consente al programmatore di organizzare il codice al meglio, separando le varie unità logiche e rendendo il codice più facile da comprendere e mantenere. Già nel prossimo capitolo scrivo di una caratteristica che può essere molto ma molto utile per supportare il programmatore nel suo sviluppo quotidiano: le enumerazioni.

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

## Interfacce

Adoro le interfacce di TypeScript. Le adoro in generale quando si parla di programmazione ad oggetti. Ti permettono di definire tutte le proprietà di un certo tipo di dato custom. Puoi anche indicare se un dato è o meno opzionale. Grazie al compilatore TypeScript se un oggetto non è completamente definito, è possibile riconoscere i campi mancanti in modo visuale anche dall'editor. Nel prossimo riquadro vediamo un tipo di dato Categoria che ci permette di definire la gerarchia delle categorie all'interno della nostra applicazione.

```typescript
// ./categoria.ts
interface Categoria {
  name: string,
  display: boolean,
  sottoCategorie: { name : string, display : boolean }[]
}
```

Grazie da una interfaccia cosi composta, puoi dichiarare una variabile di un tipo in questo modo:

```typescript
// ./categoria.ts
let cat : Categoria = {
  name: "Categoria",
  display: true,
  sottoCategorie: [{
    name: "nome sotto categoria",
    display: false
  }]
}
```

Se un campo è opzionale puoi indicarlo con un punto interrogativo. In questo modo, mettendolo, l'editor non ti mostrerà alcun errore e potrai buildare il tuo codice.

```typescript
// ./contact.ts
interface Contact {
  id: number
  name: string
  birthDate? : Date
}

let primary : Contact = { id: 42, name: 'nominativo'}
```

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

## Declaration merging

Con questo trucco è possibile definire un'interfaccia in più momenti. Oppure unire più definizioni se hanno lo stesso nome. Magari per tenere il codice ordinato o per raggruppare la definizione in proprietà semanticamente associate tra loro. In questo esempio ti mostro come Warriors viene definita due volte. Sotto, il ninja viene definito usando la stessa interfaccia Warriors che, completa, richiede tutti e tre i campi definiti poco prima.

```typescript
// ./warriors.ts
interface Warriors {
  weapon: string;
  skills: number;
  name: string;
}
```

Questo non vale solo per le proprietà ma anche per le funzioni. Fino ad ora hai visto solo delle interfacce ma la cosa si estende anche ai namespace. Non li abbiamo ancora visti in questo testo. Un namespace viene usato per raggruppare classi ed interfacce semanticamente collegate tra loro più di quanto non siano legate al resto dell'applicazione. Ora provo a ripetere il codice qui sopra arricchendolo con un namespace.

```typescript
// ./TheSpace.ts
namespace TheSpace {
    interface Warriors {
        weapon : string
        skills : number
    }
}

namespace TheSpace {
    interface Warriors {
        name : string
    }
}
```

Nel box di codice precedente abbiamo una interfaccia definita all'interno di un namespace chiamato TheSpace. Successivamente si vede una nuova interfaccia all'interno dello stesso namespace. Il risultato finale sarà ovviamente l'equivalente di quel che puoi trovare le box seguente.

```typescript
// ./TheSpace.ts
namespace TheSpace {
  interface Warriors {
    weapon: string;
    skills: number;
    name: string;
  }
}
```

Io però ho parlato di namespace senza introdurLi seriamente e senza spiegare davvero di che si tratta, a che cosa servono e perché sono stati introdotti. Tocca dedicare una parentesi anche a questa cosa

## Namespace

I namespace servono per organizzare il codice in modo più ordinato. Consentono di evitare collisioni di nomi nel progetto al quale stiamo lavorando.

Possiamo immaginare i namespace come se fossero delle cartelle sul nostro computer. Se cerchiamo di spostare un file in una cartella dove esiste già un altro file con lo stesso identico nome, il sistema operativo ci avverte e ci chiede se vogliamo sovrascrivere. Per mantenere entrambi i file senza rinominarli, l'unica soluzione è metterli in due cartelle separate.

Allo stesso modo, due classi con lo stesso nome non possono coesistere nello stesso spazio, ma possono trovarsi senza problemi in due namespace differenti.

Pensiamo ad esempio alla parola Squadra. Questa parola assume significati diversi in base al contesto: possiamo avere una squadra di calcio o una squadra da disegno. In TypeScript, possiamo gestire questa ambiguità creando una classe Squadra dentro il namespace del calcio e un'altra classe Squadra dentro il namespace del disegno.

```typescript
// ./leSquadre.ts
namespace Calcio {
  interface Squadra {
    nome : string
  }
}

namespace Disegno {
  interface Squadra {
    lunghezza : number
  }
}
```

L'esempio non è completo se non vediamo come poi possiamo usare queste squadre. Questo codice di esempio serve più che altro per vedere con i propri occhi la sintassi e non di più. Non è un esempio eccellente ma contiene in sé quanto basta per capire il potenziale di questa feature. Spero.

```typescript
// ./leSquadre.ts
let squadraCalcio: Calcio.Squadra = {
  nome: "Squadra di Calcio",
};

let squadraDisegno: Disegno.Squadra = {
  lunghezza: 10,
};

console.log(squadraCalcio.nome); // Stampa "Squadra di Calcio"
console.log(squadraDisegno.lunghezza); // Stampa 10
```

E con questo snippet di codice, termina la parte dedicata ai namespace.

## Decorators

Sono una caratteristica che consente di modificare o estendere il comportamento di una classe, un metodo o una proprietà in TypeScript. Questo cambiamento avviene a tempo di esecuzione. Sono basati sulle specifiche definite nella proposta ECMAScript. Si possono utilizzare grazie al simbolo "@". I decorator non vengono eseguiti quando viene richiamato un metodo ma direttamente alla dichiarazione della classe. Quindi già quando vengono caricati in memoria.

## Versione semplice

Questo caso è il più semplice che mi veniva in mente quando dovevo buttare giù un po' di codice per preparare questa sezione del capitolo su TypeScript.

```typescript
// ./prova.ts
function decoratore() {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginale = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`dentro al decorator decoratore`);
      return metodoOriginale.apply(this, args);
    };

    return descriptor;
  };
}

function cose(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginale = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`dentro al decorator cose`);
    return metodoOriginale.apply(this, args);
  };

  return descriptor;
}

class Foo {
  @decoratore()
  @cose
  funzione() {
    console.log(`dentro alla funzione`);
  }
}
```

In questo esempio volevo mostrare la scrittura del decoratore in due modi differenti ovvero con o senza parentesi. Quando usare uno o l'altro? Dipende dal fatto che il decoratore accetti o meno dei parametri in ingresso. Ed ecco il comando per compilare il codice e poi eseguirlo.

```sh
tsc -p tsconfig.json && node ./build/prova.js
```

Se eseguiamo questo codice istanziando la classe e chiamando il metodo, l'output nel terminale mostrerà l'ordine esatto di esecuzione:

```typescript
const istanza = new Foo();
istanza.funzione();
```

Il log risultante…

```sh
dentro al decorator decoratore
dentro al decorator cose
dentro alla funzione
```

I decoratori di TypeScript vengono valutati una sola volta dal motore JavaScript. Questo avviene nel momento in cui la classe viene definita ovvero all'avvio dell'applicazione.

Un decoratore di metodo corretto intercetta la funzione originale e la sostituisce con una creata da noi. Quindi i messaggi di log e la logica interna del metodo vengono eseguiti esclusivamente quando l'utente invoca quel metodo.

## Versione con parametri

Ho pensato di fare un esempio di un decoratore che accetta in ingresso dei parametri. Nello specifico una indicazione "duplica" impostata a true va a raddoppiare il valore di un numero che il metodo riceve in ingresso. Questo esempio è fine a se stesso ma ci permette di toccare con mano del codice di esempio che interagisce con un valore in ingresso ad una determinata funzione.

```typescript
// ./prova.ts
function raddoppia(options: { duplica: boolean }): any {
  return (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (options.duplica === true) {
        args[0] *= 2;
        console.log(args);
      }

      return originalMethod.apply(
        this,
        args
      );
    };
    return descriptor;
  };
}


class UnaClasse {
  @raddoppia({ duplica: true })
  unMetodo(numero : number) {
    console.log(`Dentro alla funzione il numero è ${numero}`);
  }
}

const unaIstanza = new UnaClasse();
unaIstanza.unMetodo(654);
```

Eseguendo questo codice otteniamo questo output:

```sh
$ tsc -p tsconfig.json && node build/prova.js
[ 1308 ]
[ 2616 ]
[ 5232 ]
Dentro alla funzione il numero è 5232
```

## Come cache

Abbiamo visto che con un decoratore possiamo fare cose prima o anche dopo la chiamata ad un metodo. Sappiamo anche che ci sono certe operazioni che richiedono un grosso lavoro in termini computazionali. Oppure sappiamo che in alcuni casi vengono effettuate chiamate ad api esterne per reperire valori e questo può richiedere del tempo. Potremmo vedere come fare ad implementare un sistema di cache. Non faremo chiamate http. Non faremo grandi calcoli. Faremo invece un esempio di come si possa memorizzare il valore di una certa funzione per non ricalcolare ogni volta. Nella mia idea un decoratore che faccia da cache potrebbe avere questa faccia:

```typescript
// ./prova.ts
function cache(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const memory = new Map<any, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (!memory.has(key)) {
      console.log('calcolo valore')
      const result = originalMethod.apply(this, args);
      memory.set(key, result);
      return result;
    }

    console.log('recupero valore')
    return memory.get(key);
  };

  return descriptor;
}
```

Al suo interno questo decoratore si crea una mappa. Quando non conosce il risultato, perché non se lo è mai memorizzato, calcola il valore richiamando la funzione direttamente. Quindi se lo memorizza. La seconda volta che viene richiamato il metodo, con lo stesso valore, non verrà chiamata la funzione ma verrà reso il risultato memorizzato. Per verificare questo fatto ho scritto questo codice qua che richiama un metodo tre volte.

```typescript
// ./prova.ts
class NonEAcqua {
  @cache
  doSomething(x: number): number {
    return x * 2;
  }
}

const obj = new NonEAcqua()
obj.doSomething(42)
obj.doSomething(42)
obj.doSomething(42)
```

Il risultato è il seguente:

```sh
$ tsc -p tsconfig.json && node build/prova.js
calcolo valore
recupero valore
recupero valore
```
