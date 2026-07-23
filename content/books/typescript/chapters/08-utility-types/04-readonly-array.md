## ReadonlyArray<T>

Questo Utility Type, consente di gestire array immutabili. Come gli oggetti, anche gli array possono mutare di valori anche se dichiararti const. Mentre un array normale può essere modificato, un array dichiarato con ReadonlyArray<T> non può. Tornando al concetto di immutabilità raccontato qualche pagina fa, un array dichiarato in questo modo è quindi immutabile. Essendo immutabile, un array dichiarato in questo modo non può essere usato con…

- .push()
- .splice()
- …

Perché sono funzioni che vanno ad alterare il contenuto dell'array. Se vogliamo però possiamo generare un array normale da uno ReadonlyArray<T> con…

```typescript
const arrayNormale = [...arrayDichiaratoReadonly];
```
