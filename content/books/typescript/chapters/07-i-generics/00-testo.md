# i generics

## Cosa sono

Diciamo che adesso io voglio provare a realizzare una classe per gestire una collezione di numeri. Poi voglio anche crearmi qualche metodo per aggiungerne o per toglierne da una certa mia lista.

```typescript
class CollezioneDiNumeri {
    private items: number[] = [];

    aggiungi(item: number): void {
        this.items.push(item);
    }

    togli(): number | undefined {
        return this.items.shift();
    }

    dimensione(): number {
        return this.items.length;
    }
}
```

E poi mi rendo anche conto che vorrei fare la stessa cosa con delle stringhe.

```typescript
class CollezioneDiStringhe {
    private items: string[] = [];

    aggiungi(item: string): void {
        this.items.push(item);
    }

    togli(): string | undefined {
        return this.items.shift();
    }

    dimensione(): number {
        return this.items.length;
    }
}
```

Come si può vedere le due classi sono praticamente identiche e l'unica cosa che cambia è il tipo di dato: numero stringa. Queste classi in realtà non devono esistere perché basta ne esista una sola che si adatti al bisogno dello sviluppatore. Esiste una sintassi che ci permette di creare una classe generica che si aspetta di ricevere un tipo T. Questo tipo può essere, come negli esempi qui sopra, un numero o una stringa. Attenzione che il tipo di dato gestito può essere un dato qualsiasi e persino un tipo di dato custom. Ecco questa sintassi speciale:

```typescript
// ./typescript/generics/generics-example.ts
class Coda<T> {
    private items: T[] = [];

    aggiungi(item: T): void {
        this.items.push(item);
    }

    togli(): T | undefined {
        return this.items.shift();
    }

    dimensione(): number {
        return this.items.length;
    }
}
```

Quella T sta ad indicare il tipo di dato. E noi possiamo creare una coda di stringhe piuttosto che di numeri in questi modi:

- **const codaDiNumeri = new Coda<number>()**
  Come si vede, T viene sostituito con il tipo di dato.

- **const codaDiStringhe = new Coda<string>()**
  Come si vede, T viene sostituito con il tipo di dato.

Ovviamente possiamo creare tutte le code che vogliamo in questo modo.

## Compilazione

Adesso se voglio vedere questo codice compilato non devo fare altro che lanciare il comando

```sh
tsc typescript/generics/generics-example.ts
```

e verrà generato un file JavaScript:

```typescript
// ./typescript/generics/generics-example.js
var Coda = /** @class */ (function () {
    function Coda() {
        this.items = [];
    }
    Coda.prototype.aggiungi = function (item) {
        this.items.push(item);
    };
    Coda.prototype.togli = function () {
        return this.items.shift();
    };
    Coda.prototype.dimensione = function () {
        return this.items.length;
    };
    return Coda;
}());

var numberQueue = new Coda();
numberQueue.aggiungi(10);
numberQueue.aggiungi(20);
numberQueue.aggiungi(30);
console.log(numberQueue.togli());
console.log(numberQueue.dimensione());
```
