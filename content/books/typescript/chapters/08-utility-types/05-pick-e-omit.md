## Pick & Omit

Servono entrambi per creare nuovi tipi partendo da tipi esistenti. Servono rispettivamente per conservare o omettere alcune proprietà di un altro tipo. Credo di non riuscire a spiegarla meglio di un esempio. Alla domanda "Come faccio a prendere solo alcuni elementi della classe User?" rispondo con questo esempio.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, "id" | "name">;
```

Se ora creassimo un oggetto di tipo UserPreview, e cercassimo poi di modificare la proprietà email, otterremmo un errore a compile time. Omit è complementare di Pick. Anziché definire un nuovo tipo mantenendo delle proprietà, ne definisce uno escludendone alcune. Nel prossimo box di codice si può vedere lo stesso esempio di Pick scritto usando Omit. Quando usare uno o l'altro dipende dall'oggetto di partenza e da quanto convenga omettere o mantenere dei campi. Se l'interfaccia di partenza ha molti campi e vogliamo tenerne solo un paio, Pick è ideale. Al contrario se ne vogliamo escludere solo qualcuno, la cosa migliore è certamente quella di usare Omit. Quando usarli? Ad esempio se passiamo un oggetto ad un metodo ma risulta incompleto.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Omit<User, "email" | "age">;
```

Ecco un esempio di oggetto incompleto dove, tra l'altro, si vede come non serva per forza creare un nuovo tipo, ma basta usare omit per passare un oggetto JavaScript che non rispecchia completamente un certo tipo.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const metodo = (oggetto : Omit<User, "email" | "age">) => {
  // cose
}

metodo({
  id: 42,
  name: "Simone"
});
```
