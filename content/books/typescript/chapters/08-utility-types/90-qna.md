### D: Cosa sono gli utility types?
Sono tipi built-in di TypeScript che trasformano tipi esistenti. Esistono solo a compile time e spariscono dopo la transpilazione.

### D: Quando uso Partial e quando Required?
Partial rende tutte le proprietà opzionali ed è utile ad esempio per gli aggiornamenti parziali di un oggetto. Required fa l'opposto e serve per garantire che un oggetto sia completamente valorizzato.

### D: Perché Readonly<T> non protegge le proprietà annidate?
Perché è "superficiale" (shallow): rende immutabile il riferimento all'oggetto esterno ma non i valori delle proprietà che sono a loro volta oggetti. Per la deep immutability bisogna costruire un tipo custom ricorsivo.

### D: Qual è la differenza tra Pick e Omit?
Pick conserva solo le proprietà elencate, Omit le esclude. Conviene usare Pick quando si vogliono tenere poche proprietà da un tipo grande, e Omit quando si vogliono escludere poche proprietà da un tipo grande.

### D: A cosa serve Record<K, V>?
Serve per costruire un oggetto tipizzato dove le chiavi appartengono a un tipo preciso e i valori ad un altro. È ideale per i dizionari o le mappe.