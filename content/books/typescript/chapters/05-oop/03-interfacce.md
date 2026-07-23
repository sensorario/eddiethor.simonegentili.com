## Interfacce

Adoro le interfacce di TypeScript. Le adoro in generale quando si parla di programmazione ad oggetti. Ti permettono di definire tutte le proprietà di un certo tipo di dato custom. Puoi anche indicare se un dato è o meno opzionale. Grazie al compilatore TypeScript se un oggetto non è completamente definito, è possibile riconoscere i campi mancanti in modo visuale anche dall'editor. Nel prossimo riquadro vediamo un tipo di dato Categoria che ci permette di definire la gerarchia delle categorie all'interno della nostra applicazione.

```typescript
// ./categoria.ts
interface Categoria {
  name: string,
  display: boolean,
  sottoCategorie: { name : string, display : boolean }[]
}
```

Grazie da una interfaccia cosi composta, puoi dichiarare una variabile di un tipo in questo modo:

```typescript
// ./categoria.ts
let cat : Categoria = {
  name: "Categoria",
  display: true,
  sottoCategorie: [{
    name: "nome sotto categoria",
    display: false
  }]
}
```

Se un campo è opzionale puoi indicarlo con un punto interrogativo. In questo modo, mettendolo, l'editor non ti mostrerà alcun errore e potrai buildare il tuo codice.

```typescript
// ./contact.ts
interface Contact {
  id: number
  name: string
  birthDate? : Date
}

let primary : Contact = { id: 42, name: 'nominativo'}
```
