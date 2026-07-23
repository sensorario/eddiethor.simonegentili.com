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
