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
