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
