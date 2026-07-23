## Versione semplice

Questo caso è il più semplice che mi veniva in mente quando dovevo buttare giù un po' di codice per preparare questa sezione del capitolo su TypeScript.

```typescript
// ./prova.ts
function decoratore() {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginale = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`dentro al decorator decoratore`);
      return metodoOriginale.apply(this, args);
    };

    return descriptor;
  };
}

function cose(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginale = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`dentro al decorator cose`);
    return metodoOriginale.apply(this, args);
  };

  return descriptor;
}

class Foo {
  @decoratore()
  @cose
  funzione() {
    console.log(`dentro alla funzione`);
  }
}
```

In questo esempio volevo mostrare la scrittura del decoratore in due modi differenti ovvero con o senza parentesi. Quando usare uno o l'altro? Dipende dal fatto che il decoratore accetti o meno dei parametri in ingresso. Ed ecco il comando per compilare il codice e poi eseguirlo.

```sh
tsc -p tsconfig.json && node ./build/prova.js
```

Se eseguiamo questo codice istanziando la classe e chiamando il metodo, l'output nel terminale mostrerà l'ordine esatto di esecuzione:

```typescript
const istanza = new Foo();
istanza.funzione();
```

Il log risultante…

```sh
dentro al decorator decoratore
dentro al decorator cose
dentro alla funzione
```

I decoratori di TypeScript vengono valutati una sola volta dal motore JavaScript. Questo avviene nel momento in cui la classe viene definita ovvero all'avvio dell'applicazione.

Un decoratore di metodo corretto intercetta la funzione originale e la sostituisce con una creata da noi. Quindi i messaggi di log e la logica interna del metodo vengono eseguiti esclusivamente quando l'utente invoca quel metodo.
