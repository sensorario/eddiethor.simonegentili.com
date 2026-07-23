## Come cache

Abbiamo visto che con un decoratore possiamo fare cose prima o anche dopo la chiamata ad un metodo. Sappiamo anche che ci sono certe operazioni che richiedono un grosso lavoro in termini computazionali. Oppure sappiamo che in alcuni casi vengono effettuate chiamate ad api esterne per reperire valori e questo può richiedere del tempo. Potremmo vedere come fare ad implementare un sistema di cache. Non faremo chiamate http. Non faremo grandi calcoli. Faremo invece un esempio di come si possa memorizzare il valore di una certa funzione per non ricalcolare ogni volta. Nella mia idea un decoratore che faccia da cache potrebbe avere questa faccia:

```typescript
// ./prova.ts
function cache(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const memory = new Map<any, any>();

  descriptor.value = function (...args: any[]) {
    const key = JSON.stringify(args);

    if (!memory.has(key)) {
      console.log('calcolo valore')
      const result = originalMethod.apply(this, args);
      memory.set(key, result);
      return result;
    }

    console.log('recupero valore')
    return memory.get(key);
  };

  return descriptor;
}
```

Al suo interno questo decoratore si crea una mappa. Quando non conosce il risultato, perché non se lo è mai memorizzato, calcola il valore richiamando la funzione direttamente. Quindi se lo memorizza. La seconda volta che viene richiamato il metodo, con lo stesso valore, non verrà chiamata la funzione ma verrà reso il risultato memorizzato. Per verificare questo fatto ho scritto questo codice qua che richiama un metodo tre volte.

```typescript
// ./prova.ts
class NonEAcqua {
  @cache
  doSomething(x: number): number {
    return x * 2;
  }
}

const obj = new NonEAcqua()
obj.doSomething(42)
obj.doSomething(42)
obj.doSomething(42)
```

Il risultato è il seguente:

```sh
$ tsc -p tsconfig.json && node build/prova.js
calcolo valore
recupero valore
recupero valore
```
