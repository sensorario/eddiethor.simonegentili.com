## Il problema del tipo impreciso

Immagina di ricevere un dato di cui non conosci esattamente il tipo. Magari viene da una API esterna, o da una funzione che può restituire cose diverse. In questi casi il tipo dichiarato è spesso generico: `string | number`, oppure `unknown`.

Il problema è che con un tipo impreciso non puoi fare nulla di utile. Se hai una variabile `string | number`, TypeScript non ti lascia chiamare `.toUpperCase()` perché quel metodo non esiste su `number`. E ha ragione.

Il type narrowing è il modo in cui si "restringe" il tipo di una variabile a qualcosa di più preciso, all'interno di un certo blocco di codice. TypeScript analizza il flusso del codice e capisce da solo che tipo ha una variabile in un dato momento.
