### D: Che differenza c'è tra import foo … e import { foo } from …?
Nel primo caso viene importato l'export di default. Nel secondo viene importato precisamente un elemento.

### D: A cosa serve import type in TypeScript?
Serve a importare solo i tipi. Sparisce dopo la compilazione e rende il codice più chiaro e leggibile. Serve più che altro per rendere il codice più leggibile.

### D: Come posso importare tutte le funzioni e classi da un file in un unico oggetto?
Usando la sintassi import * as nome from "./file". Ad esempio:

```typescript
// ./init.ts
import * as utils from "./utils";
utils.funzione();
```

### D: Cosa fa un'"importazione nulla" come import "./init";?
Esegue il file senza importare nulla. Utile se si vogliono definire variabili globali oppure per eseguire codice di inizializzazione.

### D: Cosa succede se importo un tipo ed una classe dallo stesso file?
Il tipo nel codice sparisce mentre la classe verrà importata normalmente.
