## Il Sistema: Gradual Typing

TypeScript ha scelto un approccio di tipizzazione graduale (Gradual typing). In parole povere, riesce a far coesistere statico e dinamico nella stessa codebase. É facile immaginare come questo sia possibile visto che TypeScript è un superset di JavaScript e se il primo ha una tipizzazione statica, il secondo ce l'ha dinamica. Va da sé che se JavaScript è compatibile con TypeScript, entrambe possono essere utilizzate. Esistono addirittura dei tool che calcolano la percentuale di codice tipizzato.

Semplicemente rinominando un file .js in .ts, otteniamo un file TypeScript. Funziona senza mettere subito le mani alla tipizzazione di ogni singola riga di codice. Questo ci permette potenzialmente di usare la flessibilità di una tipizzazione dinamica, consentendoci di prototipare velocemente con JavaScript, ma anche avere la sicurezza della tipizzazione statica, con autocompletamento, refactoring sicuro e rilevamento degli errori a compile time.

Alle volte non è semplice trovare il tipo giusto quando si passa da JavaScript a TypeScript. In questi casi si può usare la parola chiave any. Disabilita temporaneamente il controllo del compilatore e permette di non tipizzare il codice.

Il gradual typing agisce solo durante la compilazione. Una volta compilato il codice TypeScript otteniamo un codice totalmente JavaScript senza i fronzoli del superset. Questa transpilazione comporta la cancellazione dei tipi (Type Erasure).

Se si vuole migrare un progetto da JavaScript a TypeScript va configurato TypeScript in modo che accetti JavaScript. In una prima fase potrebbe essere necessario aggiungere "allowJs" a true nella configurazione. Successivamente si possono aggiungere tipi alle funzioni principali ed in una terza fase si arriva a controlli sempre più stringenti che portano allo strict mode.

Tornando al principio, al gradual typing, bisogna tenere conto del fatto che se se ne abusa, si rischia di perdere tutti i vantaggi dell'utilizzo di TypeScript ottenendo solo una versione JavaScript più lenta da compilare e priva di reali garanzie di sicurezza.
