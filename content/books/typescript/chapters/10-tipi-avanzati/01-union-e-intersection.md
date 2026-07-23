## Union e Intersection

Ci sono due operatori fondamentali per combinare i tipi in TypeScript. Il primo è l'operatore `|`, che crea una union. Una union significa "questo valore può essere di uno di questi tipi".

```typescript
type ID = string | number;

let id: ID = "abc-123";
id = 42; // va bene anche questo
```

Il secondo è l'operatore `&`, che crea una intersection. Un'intersection significa "questo valore deve soddisfare tutti questi tipi allo stesso tempo".

```typescript
type ConNome = { nome: string };
type ConEta = { eta: number };

type Persona = ConNome & ConEta;

const p: Persona = {
  nome: "Simone",
  eta: 42
  // entrambe le proprietà sono obbligatorie
};
```

Le intersection sono molto usate per comporre tipi complessi partendo da pezzi più semplici. In pratica equivalgono a prendere tutte le proprietà di tutti i tipi messi insieme.
