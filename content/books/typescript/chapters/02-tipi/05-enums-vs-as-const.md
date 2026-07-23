## Enums vs As Const

In TypeScript è possibile dire al compilatore che un certo oggetto deve essere letto come letterale ed immutabile, quindi "readonly". As const non genera alcun codice a runtime. Si tratta di una const assertion che applica implicitamente, ad un oggetto, la proprietà readonly. Svanisce completamente dopo la compilazione. Il compilato rimane un normalissimo oggetto JavaScript.

Al contrario, le enum, o enumerazioni, vanno a creare un vero e proprio oggetto. Quando si usa una enum si va ad aggiungere codice in fase di compilazione andando a violare il concetto di type erasure. Come se JavaScript avesse anche il codice proveniente dalle enum.

Quando in un nostro programma vengono utilizzate variabili che possono assumere un certo numero finito di valori possibili, è bene usare costanti al posto di stringhe o numeri. Sono maggiormente manutenibili. Sia con as const che con le enumerazioni è possibile gestire queste casistiche.

Sebbene siano una caratteristica molto utile quando si devono andare a sostituire valori scalari con costanti, le enum generano molto più codice di quanto non ne venga invece generato da una "as const". Nel primo listato appaiono delle normali enum. In questo caso abbiamo un normale ruolo degli utenti che può essere user normale o amministratore.

```typescript
enum RoleEnum {
    Admin = 'ADMIN',
    User = 'USER'
}
```

Se questo viene generato come JavaScript in una IIFE (una funzione anonima immediatamente invocata).

```typescript
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Admin"] = "ADMIN";
    RoleEnum["User"] = "USER";
})(RoleEnum || (RoleEnum = {}));
```

Al contrario con as const possiamo usare una sintassi relativamente simili a quelle delle enumerazioni.

```typescript
const RoleConst = {
    Admin: 'ADMIN',
    User: 'USER'
} as const;
```

Il quantitativo di righe di codice JavaScript generato partendo dal sorgente che usa "as const" è minore di quello necessario per tradurre una enumerazione. Basti pensare che con le enum si deve creare una funzione anonima mentre con "as const" tutto quello che abbiamo, e che ci rimane, è un oggetto JavaScript.

```typescript
const RoleConst = {
    Admin: 'ADMIN',
    User: 'USER'
};
```

Il costrutto "as const" agisce a livello di analisi statica del codice. In particolare dei tipi. Applica implicitamente la proprietà readonly. Durante la transpilazione "as const" viene completamente rimosso tramite alla type erasure.
