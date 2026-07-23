## Tipo di parametro

Nel definire il tipo, invece, del parametro in ingresso, andiamo ancor di più a rendere solido il codice. Se ci aspettiamo una stringa, un numero o l'istanza di una certa classe, siamo certi che quel codice sarà compilabile solo con dati corretti. E non quando potrebbe essere richiamato con dati errati. Ho modificato il codice un poco per mostrarti una cosa che ormai dovresti già sapere. Voglio mostrarti un pezzo di codice e vorrei tu provassi ad indovinare che cosa succede se proviamo a compilarlo.

```typescript
function fooBar(varName : string) : string {
  return "some string";
}

fooBar(42);
```

Succede che un bel messaggio di errore ci avvertirà che un argomento di tipo "number" non è assegnabile ad un parametro di tipo stringa. In conclusione le funzioni ci permettono di raggruppare una serie di istruzioni, assegnare a questo agglomerato un nome, e ci permettono anche di definire il tipo di dati che si aspetta questo agglomerato in ingresso ed il tipo di dato che questo agglomerato rilascerà in uscita.
