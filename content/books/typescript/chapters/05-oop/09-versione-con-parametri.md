## Versione con parametri

Ho pensato di fare un esempio di un decoratore che accetta in ingresso dei parametri. Nello specifico una indicazione "duplica" impostata a true va a raddoppiare il valore di un numero che il metodo riceve in ingresso. Questo esempio è fine a se stesso ma ci permette di toccare con mano del codice di esempio che interagisce con un valore in ingresso ad una determinata funzione.

```typescript
// ./prova.ts
function raddoppia(options: { duplica: boolean }): any {
  return (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (options.duplica === true) {
        args[0] *= 2;
        console.log(args);
      }

      return originalMethod.apply(
        this,
        args
      );
    };
    return descriptor;
  };
}


class UnaClasse {
  @raddoppia({ duplica: true })
  unMetodo(numero : number) {
    console.log(`Dentro alla funzione il numero è ${numero}`);
  }
}

const unaIstanza = new UnaClasse();
unaIstanza.unMetodo(654);
```

Eseguendo questo codice otteniamo questo output:

```sh
$ tsc -p tsconfig.json && node build/prova.js
[ 1308 ]
[ 2616 ]
[ 5232 ]
Dentro alla funzione il numero è 5232
```
