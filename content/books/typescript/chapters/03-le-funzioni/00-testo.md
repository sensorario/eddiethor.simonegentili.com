# le funzioni

## Principi architetturali

Le funzioni consentono di mettere insieme tante istruzioni al fine di poterle richiamare con un certo nome (il nome della funzione) anche in più parti del codice. Se qualche riga di codice va ripetuta in tutto un programma, la possiamo "etichettare" ed anziché replicare quelle istruzioni ci basterà richiamare la funzione. Questo riduce il codice, migliora la manutenibilità, evita ripetizioni… e così via.

Il discorso vale tanto per JavaScript quanto per TypeScript. Con il primo le cose sono più semplici. Con il secondo possiamo dare più regole e rendere il codice più robusto. Ma in generale le funzioni sono quello strumenti che i linguaggi di programmazione hanno per incapsulare istruzioni in un blocco nominato. Consentono di applicare il principio DRY (Don't Repeat Yourself).

## Tipo di ritorno

Prendiamo ad esempio la definizione di una funzione usando JavaScript. Per creare una funzione basta usare la parola chiave "function" seguita dal nome della funzione. Poi vengono le parentesi tonde che saranno vuote se non ci sono parametri, mentre conterranno un elenco di parole che saranno i nomi delle variabili che questa funzione si aspetta in ingresso. Ecco un esempio di funzione in JavaScript. Non vi è traccia di alcun tipo. Non vi sono nemmeno tipi di ritorno. Siamo di fronte ad un normalissimo codice JavaScript.

```typescript
function fooBar(varName) {
  // fai cose
}
```

Ora, proviamo a convertire la funzione in TypeScript. Con TypeScript possiamo indicare il tipo delle variabili in ingresso. Quelle che verranno passate come parametro. Se non lo facciamo TypeScript si arrabbia e ci palesa un errore grazie al nostro editor. Lo abbiamo più o meno detto qualche pagina fa quando ti ho mostrato che un certo codice non compila. L'editor, parlo dando un poco per scontato che si usi un ide come vscode, guarda il tuo codice TypeScript e ti dice se va bene oppure no. In TypeScript possiamo anche definire se c'è un tipo di ritorno quindi dovremo ritornare una variabile dello stesso tipo. Se diciamo ad esempio che la funzione deve restituire un valore di tipo string, il codice non sarà compilabile fino a quando non sarà comparso un return seguito da una variabile, o un valore, del tipo che si aspetta di restituire la funzione. Tutto questo è possibile perché abbiamo degli errori a compile time. Questo codice quindi diventa compilabile…

```typescript
function fooBar(varName : string) : string {
  return "some string";
}
```

Ma questo proprio no…

```typescript
function fooBar(varName : string) : string {
  return 42;
}
```

## Tipo di parametro

Nel definire il tipo, invece, del parametro in ingresso, andiamo ancor di più a rendere solido il codice. Se ci aspettiamo una stringa, un numero o l'istanza di una certa classe, siamo certi che quel codice sarà compilabile solo con dati corretti. E non quando potrebbe essere richiamato con dati errati. Ho modificato il codice un poco per mostrarti una cosa che ormai dovresti già sapere. Voglio mostrarti un pezzo di codice e vorrei tu provassi ad indovinare che cosa succede se proviamo a compilarlo.

```typescript
function fooBar(varName : string) : string {
  return "some string";
}

fooBar(42);
```

Succede che un bel messaggio di errore ci avvertirà che un argomento di tipo "number" non è assegnabile ad un parametro di tipo stringa. In conclusione le funzioni ci permettono di raggruppare una serie di istruzioni, assegnare a questo agglomerato un nome, e ci permettono anche di definire il tipo di dati che si aspetta questo agglomerato in ingresso ed il tipo di dato che questo agglomerato rilascerà in uscita.
