### D: Che differenza c'è tra any ed unknown?
Mentre con any possiamo usare un oggetto anche senza conoscerne il tipo, con unknown siamo costretti a fare un controllo prima. Se non si conosce il tipo di dato, unknown è la scelta più robusta.

### D: Quando viene usato il tipo never?
Si utilizza quando una funzione non arriva mai alla fine della sua esecuzione. Generalmente si usa in funzioni che tirano una eccezione interrompendo il flusso del codice. Per questo non arrivano mai in fondo.

### D: A cosa serve readonly?
Serve per indicare che un dato non può essere modificato. Può essere usato sia per proprietà indicate in una interfaccia ma anche con variabili ed array.

### D: Quale è il tipo di ritorno di una funzione che non restituisce nulla?
Il tipo di ritorno è void.

### D: Come si può creare un alias di un tipo?
Si utilizza la parola chiave type come in questo esempio:

```typescript
type NomeContatto = string;
let nome : NomeContatto = "Simone";
```
