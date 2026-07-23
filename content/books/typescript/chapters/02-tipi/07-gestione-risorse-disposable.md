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
