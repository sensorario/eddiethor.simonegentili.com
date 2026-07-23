## Parametri opzionali e di default

Non tutte le funzioni hanno bisogno che ogni parametro venga passato. A volte un parametro può avere senso ometterlo e lasciare che la funzione usi un valore ragionevole. In JavaScript questo succedeva silenziosamente: passavi o non passavi un parametro e la funzione faceva del suo meglio. In TypeScript dobbiamo essere espliciti.

Per rendere opzionale un parametro si usa il punto interrogativo, esattamente come con le proprietà opzionali delle interfacce.

```typescript
function saluta(nome: string, titolo?: string): string {
  if (titolo) {
    return `Ciao, ${titolo} ${nome}`;
  }
  return `Ciao, ${nome}`;
}

saluta("Simone");          // Ciao, Simone
saluta("Simone", "Prof."); // Ciao, Prof. Simone
```

Però spesso ha ancora più senso avere un valore di default. In questo modo non devo neanche fare il controllo se titolo esiste.

```typescript
function saluta(nome: string, titolo: string = "Sig."): string {
  return `Ciao, ${titolo} ${nome}`;
}

saluta("Simone");          // Ciao, Sig. Simone
saluta("Simone", "Prof."); // Ciao, Prof. Simone
```

La differenza è sottile ma importante. Con il parametro opzionale `?` il tipo diventa `string | undefined`. Con il valore di default il tipo rimane `string` perché TypeScript sa già che se non viene passato niente, usa il default.
