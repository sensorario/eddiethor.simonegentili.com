## Template Literal Types

TypeScript supporta i template literal non solo per le stringhe a runtime ma anche come tipi. Puoi combinare tipi stringa letterale per creare nuovi tipi.

```typescript
type Direzione = "nord" | "sud" | "est" | "ovest";
type ComandoVai = `vai-${Direzione}`;
// "vai-nord" | "vai-sud" | "vai-est" | "vai-ovest"
```

Questo è utile per creare tipi che rappresentano stringhe con una struttura precisa. Un caso d'uso comune è la gestione degli eventi.

```typescript
type Evento = "click" | "focus" | "blur";
type HandlerEvento = `on${Capitalize<Evento>}`;
// "onClick" | "onFocus" | "onBlur"
```

`Capitalize` è uno degli utility types per le stringhe che TypeScript offre. Ce ne sono altri: `Uppercase`, `Lowercase`, `Uncapitalize`. Sono utili proprio in combinazione con i template literal types.
