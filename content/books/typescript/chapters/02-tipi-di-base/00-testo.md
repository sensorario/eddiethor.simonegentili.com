# Tipi di base

TypeScript mette a disposizione tipi primitivi (`string`, `number`,
`boolean`), tipi letterali, array tipizzati e la possibilità di definire
forme personalizzate con `type` e `interface`.

```typescript
type Persona = {
    nome: string;
    eta: number;
};

function saluta(persona: Persona): string {
    return `Ciao, ${persona.nome}!`;
}
```

Il compilatore verifica che ogni valore rispetti la forma dichiarata,
segnalando errori già in fase di scrittura del codice, prima ancora di
eseguirlo.
