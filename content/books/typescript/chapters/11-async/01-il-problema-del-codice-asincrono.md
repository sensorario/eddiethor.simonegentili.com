## Il problema del codice asincrono

JavaScript è single-threaded. Non può fare due cose contemporaneamente. Eppure le applicazioni web moderne devono aspettare risposte dalle API, leggere file, accedere al database. Se tutto fosse sincrono, l'intera applicazione si bloccherebbe in attesa.

La soluzione è il codice asincrono. JavaScript lo gestisce tramite le Promise. E TypeScript aggiunge i tipi per rendere tutto più prevedibile.
