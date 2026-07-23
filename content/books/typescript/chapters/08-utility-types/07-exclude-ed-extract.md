## Exclude<T, U> ed Extract<T, U>

Questi due utility types lavorano sulle union. Exclude rimuove dei tipi da una union, Extract ne conserva solo alcuni.

```typescript
type Stato = "attivo" | "inattivo" | "sospeso" | "eliminato";

type StatoVisibile = Exclude<Stato, "eliminato">;
// "attivo" | "inattivo" | "sospeso"

type StatoProblematico = Extract<Stato, "inattivo" | "sospeso">;
// "inattivo" | "sospeso"
```

Exclude è comodo quando hai una union ampia e vuoi escludere solo uno o due casi. Extract è l'opposto: parti da una union grande e tieni solo ciò che ti serve.
