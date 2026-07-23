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
