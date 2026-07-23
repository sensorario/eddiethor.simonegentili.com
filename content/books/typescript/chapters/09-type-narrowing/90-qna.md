### D: Cos'è il type narrowing?
È il processo con cui TypeScript restringe il tipo di una variabile a qualcosa di più preciso, analizzando il flusso del codice. All'interno di un blocco `if` che controlla `typeof`, TypeScript sa già che tipo ha la variabile.

### D: Qual è la differenza tra typeof e instanceof per il narrowing?
`typeof` funziona con i tipi primitivi come string, number e boolean. `instanceof` funziona con le classi e verifica se un oggetto è un'istanza di una certa classe.

### D: Quando si usa l'operatore in per il narrowing?
Quando si vuole fare narrowing tra interfacce o type alias, dove non ci sono classi e quindi `instanceof` non funziona. Si verifica se una certa proprietà esiste nell'oggetto.

### D: Cos'è un type predicate?
È la sintassi `valore is Tipo` nel tipo di ritorno di una funzione. Dice a TypeScript che se la funzione restituisce true, allora il parametro è di quel tipo. Permette di scrivere type guard personalizzati.

### D: Cos'è una discriminated union?
È una union di tipi che condividono una proprietà comune con valori letterali diversi. Quella proprietà, chiamata discriminante, permette a TypeScript di capire con quale tipo sta lavorando all'interno di un `switch` o di un `if`.