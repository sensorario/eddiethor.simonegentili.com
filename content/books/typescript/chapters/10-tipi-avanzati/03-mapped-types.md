## Mapped Types

I mapped types permettono di creare un nuovo tipo trasformando le proprietà di un tipo esistente. La sintassi usa `keyof` e un ciclo sulle chiavi.

```typescript
type Persona = {
  nome: string;
  eta: number;
  email: string;
};

type TuttoOpzionale<T> = {
  [K in keyof T]?: T[K];
};

type PersonaOpzionale = TuttoOpzionale<Persona>;
// { nome?: string; eta?: number; email?: string }
```

Questo è esattamente quello che fa `Partial<T>` internamente. I mapped types sono la base su cui sono costruiti quasi tutti gli utility types di TypeScript. Puoi aggiungere o rimuovere modificatori come `readonly` o `?`.

```typescript
type SenzaReadonly<T> = {
  -readonly [K in keyof T]: T[K]; // il - rimuove il modificatore
};
```

Il segno `-` davanti a `readonly` o `?` rimuove quel modificatore. È il modo in cui `Required<T>` è implementato internamente: rimuove il `?` da tutte le proprietà.
