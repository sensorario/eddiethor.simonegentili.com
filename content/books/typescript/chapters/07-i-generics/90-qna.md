### D: Che cosa rappresenta la <T> in un generic di TypeScript?
Rappresenta un tipo generico. Può essere sostituito da un qualsiasi tipo definito in fase di istanziazione di un oggetto.

### D: I generics valgono solo per le classi?
No. Valgono anche con le funzioni. Una funzione generica si comporta esattamente come una classe generica: riceve un tipo T e lo usa nella sua firma.

### D: Posso usare tipi personalizzati come parametro di un generic?
Si possono usare interfacce o tipi definiti dall'utente, rendendo le classi e le funzioni generiche ancora più flessibili.

### D: Cos'è un vincolo generico?
È una restrizione sul tipo T che si indica con `extends`. Serve quando vogliamo garantire che T abbia certe proprietà o metodi. Ad esempio `<T extends { length: number }>` garantisce che T abbia una proprietà length.

### D: Come si usano più parametri di tipo in un generic?
Si separano con la virgola: `<T, K extends keyof T>`. Questo è utile ad esempio quando vogliamo collegare il tipo di una chiave al tipo dell'oggetto che la contiene.
