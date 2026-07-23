## Indexed Access Types

Puoi accedere al tipo di una proprietà di un tipo usando la sintassi `T[K]`, chiamata indexed access.

```typescript
type Utente = {
  id: number;
  nome: string;
  indirizzo: {
    via: string;
    citta: string;
  };
};

type IdUtente = Utente["id"];                    // number
type NomeUtente = Utente["nome"];                // string
type CittaUtente = Utente["indirizzo"]["citta"]; // string
```

Puoi anche usarli con gli array per ottenere il tipo degli elementi.

```typescript
type Colori = ("rosso" | "verde" | "blu")[];
type Colore = Colori[number];
// "rosso" | "verde" | "blu"
```

`Colori[number]` significa: "il tipo che ottengo accedendo a qualsiasi indice numerico di questo array". È un modo compatto per estrarre il tipo degli elementi di un array letterale.
