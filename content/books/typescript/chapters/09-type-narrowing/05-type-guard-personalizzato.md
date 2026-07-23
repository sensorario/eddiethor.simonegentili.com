## Type Guard personalizzato

A volte la logica per identificare un tipo è più complessa di un semplice `typeof` o `instanceof`. In questi casi si può scrivere una funzione che fa da "guardiano" del tipo. La sua firma ha una sintassi speciale.

```typescript
interface Gatto {
  tipo: "gatto";
  miagola: () => void;
}

interface Cane {
  tipo: "cane";
  abbaia: () => void;
}

function èUnGatto(animale: Gatto | Cane): animale is Gatto {
  return animale.tipo === "gatto";
}

function parla(animale: Gatto | Cane) {
  if (èUnGatto(animale)) {
    animale.miagola(); // TypeScript sa che è un Gatto
  } else {
    animale.abbaia(); // TypeScript sa che è un Cane
  }
}
```

Il `animale is Gatto` nel tipo di ritorno è il type predicate. Dice a TypeScript: "se questa funzione restituisce true, allora il parametro è di tipo Gatto". Non si tratta solo di un controllo booleano ma di un'informazione che il compilatore usa per fare narrowing.
