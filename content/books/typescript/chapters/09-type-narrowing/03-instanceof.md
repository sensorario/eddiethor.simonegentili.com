## instanceof

Quando si lavora con le classi, `instanceof` fa lo stesso lavoro di `typeof` ma verifica se un oggetto è istanza di una certa classe.

```typescript
class Cane {
  abbaia() { return "bau"; }
}

class Gatto {
  miagola() { return "miao"; }
}

function parla(animale: Cane | Gatto): string {
  if (animale instanceof Cane) {
    return animale.abbaia(); // TypeScript sa che è un Cane
  }
  return animale.miagola(); // TypeScript sa che è un Gatto
}
```
