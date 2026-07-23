### D: Cos'è una Promise in TypeScript?
È un oggetto che rappresenta il risultato futuro di un'operazione asincrona. In TypeScript si tipizza con `Promise<T>` dove `T` è il tipo del valore che la promise restituirà.

### D: Perché una funzione async restituisce sempre Promise<T>?
Perché async/await è zucchero sintattico sopra le Promise. Qualunque valore restituisci da una funzione async viene automaticamente racchiuso in una Promise.

### D: È obbligatorio dichiarare il tipo di ritorno di una funzione async?
No, TypeScript lo inferisce. Ma dichiararlo esplicitamente è una buona pratica perché rende chiaro il contratto della funzione e protegge da errori se il valore restituito non corrisponde a quanto atteso.

### D: Perché il tipo di errore nel blocco catch è unknown?
Perché in JavaScript puoi lanciare qualsiasi cosa, non solo oggetti Error. TypeScript usa unknown per obbligarti a fare un controllo sul tipo prima di usare le proprietà dell'errore.

### D: Qual è la differenza tra Promise.all e Promise.allSettled?
Promise.all fallisce non appena una delle promise si rigetta. Promise.allSettled aspetta tutte le promise e restituisce un array con lo stato di ognuna, sia che si siano risolte che rigettate.