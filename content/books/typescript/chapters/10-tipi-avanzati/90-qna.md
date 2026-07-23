### D: Qual è la differenza tra union e intersection?
Una union (`A | B`) significa che il valore può essere di uno dei tipi indicati. Una intersection (`A & B`) significa che il valore deve soddisfare tutti i tipi allo stesso tempo, quindi ha tutte le proprietà di entrambi.

### D: Cos'è un conditional type?
È un tipo che dipende da un altro tipo, con la sintassi `T extends U ? X : Y`. Funziona come un if/else ma a livello di tipi e viene valutato a compile time.

### D: Cosa fa la parola chiave infer?
Permette di catturare un tipo all'interno di un conditional type e dargli un nome. È usata per estrarre parti di tipi complessi, ad esempio il tipo degli elementi di un array o il tipo di ritorno di una funzione.

### D: Cos'è un mapped type?
È un tipo creato iterando sulle chiavi di un tipo esistente con la sintassi `[K in keyof T]`. È la base su cui sono costruiti Partial, Required, Readonly e molti altri utility types.

### D: A cosa serve il segno - davanti a readonly o ??
Rimuove quel modificatore. `-readonly` rende le proprietà scrivibili, `-?` le rende obbligatorie. È come dire "togli questo modificatore da tutte le proprietà".