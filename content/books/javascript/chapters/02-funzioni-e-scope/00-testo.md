# Funzioni e scope

In JavaScript le funzioni sono cittadine di prima classe: possono essere
assegnate a variabili, passate come argomenti e restituite da altre
funzioni.

```javascript
function saluta(nome) {
    return `Ciao, ${nome}!`;
}

const raddoppia = (n) => n * 2;
```

Lo scope determina dove una variabile è visibile: `let` e `const`
creano variabili con scope di blocco, mentre `var` ha uno scope di
funzione. Capire questa differenza evita molti bug comuni.
