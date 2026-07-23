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
