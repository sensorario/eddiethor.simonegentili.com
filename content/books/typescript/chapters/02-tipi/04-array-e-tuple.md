## Array e Tuple

JavaScript non pone vincoli nei tipi di valore che un array può contenere. Puoi metterci dentro numeri, stringhe, oggetti… e per JavaScript è tutto legale.

```typescript
let valori = ["ciao", 42, {foo:"bar"}];
valori.push(undefined);
```

Ebbene si, non solo possiamo caricare stringhe, numeri e poi anche oggetti. Possiamo anche aggiungere undefined. Se si sa apprezzare di più il rigore sui tipi di dati di una array, TypeScript accetta tipi omogenei.

```typescript
let colori: string[] = ["verde", "marrone"];
colori.push("giallo");
```

Ma così non siamo ancora abbastanza rigidi. Volendo possiamo rendere una collection di dati readonly.

```typescript
let numeri: readonly [number, number] = [44, 1];
numeri.push(12);
```

In questo modo possiamo blindare l'array usando la parola chiave readonly in questo modo non possiamo più aggiungere un altro item.
