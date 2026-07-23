## Declaration merging

Con questo trucco è possibile definire un'interfaccia in più momenti. Oppure unire più definizioni se hanno lo stesso nome. Magari per tenere il codice ordinato o per raggruppare la definizione in proprietà semanticamente associate tra loro. In questo esempio ti mostro come Warriors viene definita due volte. Sotto, il ninja viene definito usando la stessa interfaccia Warriors che, completa, richiede tutti e tre i campi definiti poco prima.

```typescript
// ./warriors.ts
interface Warriors {
  weapon: string;
  skills: number;
  name: string;
}
```

Questo non vale solo per le proprietà ma anche per le funzioni. Fino ad ora hai visto solo delle interfacce ma la cosa si estende anche ai namespace. Non li abbiamo ancora visti in questo testo. Un namespace viene usato per raggruppare classi ed interfacce semanticamente collegate tra loro più di quanto non siano legate al resto dell'applicazione. Ora provo a ripetere il codice qui sopra arricchendolo con un namespace.

```typescript
// ./TheSpace.ts
namespace TheSpace {
    interface Warriors {
        weapon : string
        skills : number
    }
}

namespace TheSpace {
    interface Warriors {
        name : string
    }
}
```

Nel box di codice precedente abbiamo una interfaccia definita all'interno di un namespace chiamato TheSpace. Successivamente si vede una nuova interfaccia all'interno dello stesso namespace. Il risultato finale sarà ovviamente l'equivalente di quel che puoi trovare le box seguente.

```typescript
// ./TheSpace.ts
namespace TheSpace {
  interface Warriors {
    weapon: string;
    skills: number;
    name: string;
  }
}
```

Io però ho parlato di namespace senza introdurLi seriamente e senza spiegare davvero di che si tratta, a che cosa servono e perché sono stati introdotti. Tocca dedicare una parentesi anche a questa cosa
