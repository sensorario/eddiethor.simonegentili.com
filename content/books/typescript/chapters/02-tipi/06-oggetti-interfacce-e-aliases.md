## Oggetti, Interfacce e Aliases

Supponi di dover definire un oggetto con id e nome. Non devi necessariamente definire una classe e poi creare un oggetto di quel tipo. Puoi anche definire la classe in linea. Quando si usa la sintassi inline, è possibile indicare la struttura al momento. Non si deve per forza definire un'interfaccia.

```typescript
let utente: { id: number; nome: string } = {
    id: 42,
    nome: "Simone"
};
```

Per spiegarti che cosa sia l'inferenza strutturale, ti faccio un esempio. Ora, supponiamo che nel tuo software esista un tipo "Pippo" con due campi id e nome. E supponiamo che esista anche una funzione "foo" che accetta in ingresso un oggetto di tipo "Pippo"... In verità non siamo costretti a passare esattamente un oggetto di quel tipo ma basta che ciò che viene passato ne possiede le proprietà.

```typescript
type Pippo = {
    id: number;
    nome: string
}

function foo(item : Pippo) {
    // fai cose….
}

let utente: { id: number; nome: string } = {
    id: 42,
    nome: "Simone"
};

foo(utente); // corretto!!!
```

Detto questo, se viene passato un oggetto con delle proprietà in più, TypeScript si ferma lì e non prosegue. Quel che potrebbe sembrare un paradosso si chiama Excess Property Checking.

```typescript
type Pippo = {
    id: number;
    nome: string
}

function foo(item : Pippo) {
    // fai cose….
}

foo({
    id: 42,
    nome: "Simone",
    mamma: "mia"
}); // questo non va!!!
```

Le caratteristiche di type alias e delle interfacce, è fondamentalmente simile che porta molti sviluppatori a non sapere quale delle due feature usare. La verità è che bene o male fanno anche la stessa cosa con una differenza sostanziale che il type alias consente di tipizzare dei dati primitivi. Non posso, con una interfaccia, usare…

```typescript
type IDUtente = string; // Un'interfaccia non può farlo
```
