# Tipi

## Il Sistema: Gradual Typing

TypeScript ha scelto un approccio di tipizzazione graduale (Gradual typing). In parole povere, riesce a far coesistere statico e dinamico nella stessa codebase. É facile immaginare come questo sia possibile visto che TypeScript è un superset di JavaScript e se il primo ha una tipizzazione statica, il secondo ce l'ha dinamica. Va da sé che se JavaScript è compatibile con TypeScript, entrambe possono essere utilizzate. Esistono addirittura dei tool che calcolano la percentuale di codice tipizzato.

Semplicemente rinominando un file .js in .ts, otteniamo un file TypeScript. Funziona senza mettere subito le mani alla tipizzazione di ogni singola riga di codice. Questo ci permette potenzialmente di usare la flessibilità di una tipizzazione dinamica, consentendoci di prototipare velocemente con JavaScript, ma anche avere la sicurezza della tipizzazione statica, con autocompletamento, refactoring sicuro e rilevamento degli errori a compile time.

Alle volte non è semplice trovare il tipo giusto quando si passa da JavaScript a TypeScript. In questi casi si può usare la parola chiave any. Disabilita temporaneamente il controllo del compilatore e permette di non tipizzare il codice.

Il gradual typing agisce solo durante la compilazione. Una volta compilato il codice TypeScript otteniamo un codice totalmente JavaScript senza i fronzoli del superset. Questa transpilazione comporta la cancellazione dei tipi (Type Erasure).

Se si vuole migrare un progetto da JavaScript a TypeScript va configurato TypeScript in modo che accetti JavaScript. In una prima fase potrebbe essere necessario aggiungere "allowJs" a true nella configurazione. Successivamente si possono aggiungere tipi alle funzioni principali ed in una terza fase si arriva a controlli sempre più stringenti che portano allo strict mode.

Tornando al principio, al gradual typing, bisogna tenere conto del fatto che se se ne abusa, si rischia di perdere tutti i vantaggi dell'utilizzo di TypeScript ottenendo solo una versione JavaScript più lenta da compilare e priva di reali garanzie di sicurezza.

## I Primitivi e Inferenza

Prima di arrivare al dettaglio dei tipi di TypeScript bisogna parlare dei tipi di JavaScript. Ci sono dei tipi standard che bisogna conoscere per forza. Ne ho già parlato abbondantemente nel libro che ho scritto su JavaScript, uscito poco prima di questo.

Con JavaScript i tipi sono

- string
- number
- boolean
- null
- undefined

Ci sono tipi introdotti nelle versioni più recenti di ECMAScript e supportati da TypeScript.

- bigint
- symbol

In TypeScript si devono usare sempre i tipi con la minuscola (ad esempio string o number). Spiega perché in TypeScript si devono sempre usare i tipi con l'iniziale minuscola. Mentre String, Number oppure Boolean sono oggetti wrapper di JavaScript, quelli scritti con la minuscola sono i tipi primitivi TypeScript.

Che cosa è l'inferenza di tipo? È l'abilità del compilatore di capire il tipo di una variabile in base alla sua inizializzazione. Senza bisogno di scriverlo in modo esplicito.

```typescript
let x = "hello!";
```

In questo caso TypeScript capisce che x è una stringa. Se il tipo è ovvio, dice la filosofia di TypeScript, si può evitare di appesantire il codice evitando ridondanze.

```typescript
let x : string = "hello!";
```

In alcuni casi TypeScript è costretto ad inferire il tipo any. Tramite il concetto di Evolving any TypeScript è in grado di inferire normalmente il tipo se poche righe dopo viene assegnato un valore poche righe dopo.

Se il tipo è ovvio, si può evitare di appesantire il codice. Ad esempio, scrivere let x = "hello!"; basta a far capire a TypeScript che si tratta di una stringa, senza bisogno di scrivere : string.

## I Tipi Speciali: any, unknown, never

In questo capitolo approfondisco i tipi speciali di TypeScript. Any, per esempio, rappresenta la totale assenza di restrizioni. Usandolo si disabilita per un momento il controllo del tipo. È un tipo di dato che consente di usare la variabile che può assumere valori di qualsiasi tipo.

```typescript
let numero : any = 42;
let maiuscolo = numero.toUpperCase();
```

Avendo dichiarato "numero" di tipo any, TypeScript lascerà passare. Si fida di noi. Pensa che sappiamo quello che stiamo facendo quindi ci lascia fare. Quando però il codice viene effettivamente eseguito, il tentativo di convertire un numero in upper case, farà crashare lo script. Più nel dettaglio, dentro numero, non esiste nessun metodo toUpperCase ed a console si visualizza "toUpperCase is not a function". L'errore si verifica perché il motore V8 cerca di risalire al catena dei prototipi dell'oggetto senza trovare alcuna corrispondenza.

Any non esegue nessun controllo. Invece unknown ha una filosofia differente. Puoi dire che non conosci il tipo ma TypeScript non te lo lascia usare fino a che non gli si fa capire che tipo di dato deve contenere. Basta una una verifica sul tipo per risolvere "unknown". Se ad esempio esiste un typeof che ne verifica il tipo, siamo in una botte di ferro.

Il tipo unknown può essere utile ad esempio quando si riceve un dato dall'esterno, come una API. Oppure il valore di un dato impostato a mano dall'utente.

Esiste un tipo, never, che indica un tipo che non contiene alcun valore. Ad esempio ci sono funzioni che non restituiscono mai un valore. Se la funzione lancia un'eccezione, il tipo di ritorno sarà never. La funzione in questi casi non restituisce nulla, ma per il verificarsi di un'eccezione. Se non vi sono eccezioni ma comunque la funzione non restituisce nulla, il tipo di ritorno sarà void.

## Array e Tuple

JavaScript non pone vincoli nei tipi di valore che un array può contenere. Puoi metterci dentro numeri, stringhe, oggetti… e per JavaScript è tutto legale.

```typescript
let valori = ["ciao", 42, {foo:"bar"}];
valori.push(undefined);
```

Ebbene si, non solo possiamo caricare stringhe, numeri e poi anche oggetti. Possiamo anche aggiungere undefined. Se si sa apprezzare di più il rigore sui tipi di dati di una array, TypeScript accetta tipi omogenei.

```typescript
let colori: string[] = ["verde", "marrone"];
colori.push("giallo");
```

Ma così non siamo ancora abbastanza rigidi. Volendo possiamo rendere una collection di dati readonly.

```typescript
let numeri: readonly [number, number] = [44, 1];
numeri.push(12);
```

In questo modo possiamo blindare l'array usando la parola chiave readonly in questo modo non possiamo più aggiungere un altro item.

## Enums vs As Const

In TypeScript è possibile dire al compilatore che un certo oggetto deve essere letto come letterale ed immutabile, quindi "readonly". As const non genera alcun codice a runtime. Si tratta di una const assertion che applica implicitamente, ad un oggetto, la proprietà readonly. Svanisce completamente dopo la compilazione. Il compilato rimane un normalissimo oggetto JavaScript.

Al contrario, le enum, o enumerazioni, vanno a creare un vero e proprio oggetto. Quando si usa una enum si va ad aggiungere codice in fase di compilazione andando a violare il concetto di type erasure. Come se JavaScript avesse anche il codice proveniente dalle enum.

Quando in un nostro programma vengono utilizzate variabili che possono assumere un certo numero finito di valori possibili, è bene usare costanti al posto di stringhe o numeri. Sono maggiormente manutenibili. Sia con as const che con le enumerazioni è possibile gestire queste casistiche.

Sebbene siano una caratteristica molto utile quando si devono andare a sostituire valori scalari con costanti, le enum generano molto più codice di quanto non ne venga invece generato da una "as const". Nel primo listato appaiono delle normali enum. In questo caso abbiamo un normale ruolo degli utenti che può essere user normale o amministratore.

```typescript
enum RoleEnum {
    Admin = 'ADMIN',
    User = 'USER'
}
```

Se questo viene generato come JavaScript in una IIFE (una funzione anonima immediatamente invocata).

```typescript
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Admin"] = "ADMIN";
    RoleEnum["User"] = "USER";
})(RoleEnum || (RoleEnum = {}));
```

Al contrario con as const possiamo usare una sintassi relativamente simili a quelle delle enumerazioni.

```typescript
const RoleConst = {
    Admin: 'ADMIN',
    User: 'USER'
} as const;
```

Il quantitativo di righe di codice JavaScript generato partendo dal sorgente che usa "as const" è minore di quello necessario per tradurre una enumerazione. Basti pensare che con le enum si deve creare una funzione anonima mentre con "as const" tutto quello che abbiamo, e che ci rimane, è un oggetto JavaScript.

```typescript
const RoleConst = {
    Admin: 'ADMIN',
    User: 'USER'
};
```

Il costrutto "as const" agisce a livello di analisi statica del codice. In particolare dei tipi. Applica implicitamente la proprietà readonly. Durante la transpilazione "as const" viene completamente rimosso tramite alla type erasure.

## Oggetti, Interfacce e Aliases

Supponi di dover definire un oggetto con id e nome. Non devi necessariamente definire una classe e poi creare un oggetto di quel tipo. Puoi anche definire la classe in linea. Quando si usa la sintassi inline, è possibile indicare la struttura al momento. Non si deve per forza definire un'interfaccia.

```typescript
let utente: { id: number; nome: string } = {
    id: 42,
    nome: "Simone"
};
```

Per spiegarti che cosa sia l'inferenza strutturale, ti faccio un esempio. Ora, supponiamo che nel tuo software esista un tipo "Pippo" con due campi id e nome. E supponiamo che esista anche una funzione "foo" che accetta in ingresso un oggetto di tipo "Pippo"... In verità non siamo costretti a passare esattamente un oggetto di quel tipo ma basta che ciò che viene passato ne possiede le proprietà.

```typescript
type Pippo = {
    id: number;
    nome: string
}

function foo(item : Pippo) {
    // fai cose….
}

let utente: { id: number; nome: string } = {
    id: 42,
    nome: "Simone"
};

foo(utente); // corretto!!!
```

Detto questo, se viene passato un oggetto con delle proprietà in più, TypeScript si ferma lì e non prosegue. Quel che potrebbe sembrare un paradosso si chiama Excess Property Checking.

```typescript
type Pippo = {
    id: number;
    nome: string
}

function foo(item : Pippo) {
    // fai cose….
}

foo({
    id: 42,
    nome: "Simone",
    mamma: "mia"
}); // questo non va!!!
```

Le caratteristiche di type alias e delle interfacce, è fondamentalmente simile che porta molti sviluppatori a non sapere quale delle due feature usare. La verità è che bene o male fanno anche la stessa cosa con una differenza sostanziale che il type alias consente di tipizzare dei dati primitivi. Non posso, con una interfaccia, usare…

```typescript
type IDUtente = string; // Un'interfaccia non può farlo
```

## Gestione Risorse: Disposable

Quando il runtime di JavaScript ha terminato di usare un oggetto, questo diventa disposable. Il garbage collector può prendere la memoria che occupa e liberarla per dare spazio ad altri oggetti o variabili. Se da un lato il garbage collector capisce che cosa deve fare con la RAM quando deve liberare delle risorse, non sa quando deve chiudere una connessione al database o un file aperto su disco. Se queste risorse esterne rimangono aperte, il sistema potrebbe andare in crash.

Un modo per gestire la memoria manualmente è quello di usare un blocco try/catch. Supponiamo di avere un client che si connette ad un database. Dobbiamo essere certi che la connessione venga chiusa ad un certo punto se c'è un errore nella query. In caso di errore, in questo esempio, comunque vadano le cose il blocco finally rilascia risorse.

```typescript
const db = apriConnessione();

try {
    db.query("SELECT * FROM utenti");
} catch (errore) {
    console.error("Query fallita");
} finally {
    db.chiudi();
}
```

TypeScript introduce, grazie allo standard Excplicit Resource Management, la parola chiave using. Anziché utilizzare const, dichiariamo la variabile usando using. Al termine del suo scope, la risorsa verrà rilasciata senza scrivere codice ridondante. Per poter usare la parola chiave using, la risorsa in questione deve esporre un metodo Symbol.dispose grazie al quale dice al compilatore, in modo esplicito, che il simbolo deve essere ripulito.

```typescript
const db = apriConnessione();

{
    using risorsa = db;
    risorsa.query("SELECT * FROM utenti");
}
```

In ECMAScript 6, i simboli nativi sono un dato primitivo. Puoi usarli per creare degli identificatori per le proprietà degli oggetti. Essendo valori univoci evitano di creare collisioni. Dal punto di vista della gestione delle risorse sono uno strumento molto utile. Essendo univoci, possiamo anche creare due simboli partendo dalla stessa stringa ottenendo due valori differenti. La prossima espressione (dentro al console log) darà come risultato false.

```typescript
const simboloUno = Symbol("descrizione");
const simboloDue = Symbol("descrizione");

console.log(simboloUno === simboloDue);
```

Il punto però non è creare simboli uguali ma l'esatto contrario. Evitare che librerie differenti creino identificatori che collidono. Supponiamo di unire le risorse ricevute da più API differenti per creare un un super oggetto. In verità è abbastanza assurdo che capiti una cosa del genere, o almeno spero. L'esempio è banale per permetterci di concentrarci su di un punto. Unendo questi oggetti, il secondo valore di id sovrascrive il primo.

```typescript
const datiSicurezza = { id: "SECRET_123" };
const datiSpedizioni = { id: "40100" };

const risorsaUnificata = {
  ...datiSicurezza,
  ...datiSpedizioni
};

console.log(risorsaUnificata.id); // "40100"
```

Per non perdere il dato, possiamo usare Symbol che creerà identificatori univoci partendo dallo stesso valore della chiave "id".

```typescript
const datiSicurezza = { id: "SECRET_123", livello: "Alto" };
const datiSpedizioni = { id: "40100", corriere: "DHL" };

const KEY_ID_SICUREZZA = Symbol("id");
const KEY_ID_SPEDIZIONE = Symbol("id");

const risorsaUnificata = {
  ...datiSicurezza,
  ...datiSpedizioni,

  [KEY_ID_SICUREZZA]: datiSicurezza.id,
  [KEY_ID_SPEDIZIONE]: datiSpedizioni.id
};

console.log(risorsaUnificata[KEY_ID_SICUREZZA]);
console.log(risorsaUnificata[KEY_ID_SPEDIZIONE]);
console.log(risorsaUnificata)
```

In questo ultimo esempio non perdiamo alcun dato. Ma la cosa davvero interessante è che se stampiamo l'oggetto "risorsaUnificata" si vedrà il secondo valore dell'id ovvero 40100. Se invece usiamo i simboli, vediamo entrambi i dati. Detto questo, se si usano sempre i Symbol si ha la certezza di non aver sovrascritto da qualche parte una risorsa.
