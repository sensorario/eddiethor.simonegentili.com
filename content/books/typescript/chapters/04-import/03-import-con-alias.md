## Import con alias

L'importazione da più file esterni potrebbe causare dei conflitti se più file esportano classi con lo stesso nome. A tal proposito si possono assegnare degli alias per far sì che in un certo file una classe abbia un altro nome. In questo esempio, per la classe Esportato viene creato un alias e grazie a questo sarà possibile usare lo stesso al posto del nome originale.

```typescript
// ./programma.ts
import { Esportato as Hello } from "./esterno";

const ciao = new Hello("ciaone", "mondone");

console.log(ciao.foo); // "ciaone"
console.log(ciao.bar); // "mondone"
```
