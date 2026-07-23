## Dove installare TypeScript

TypeScript può essere installato sia localmente, quindi a livello di singolo progetto, che globalmente, quindi a livello di macchina. Il comando per entrambe le tipologie di installazione è il medesimo. L'unica cosa che cambia è un "-g" alla fine del comando che fa sì che l'installazione avvenga globalmente.

```sh
npm install typescript -g
```

Una volta aggiunto sarà possibile richiamare il compilatore in ogni momento usando tsc.

Se provi ad installare TypeScript il tuo sistema operativo potrebbe bloccare l'operazione a causa di problemi di sicurezza. Se hai questo genere di problemi su sistemi Linux o MacOS dovrai usare il comando sudo. A quel punto ti verrà chiesta la password e potrai completare l'installazione. Su Windows sudo non esiste, ma se dovessi riscontrare qualche problema con questo sistema operativo ti consiglio di aprire il terminale come amministratore. Se vuoi stare al sicuro ti consiglio di installare localmente TypeScript. Installato in questo modo non richiede privilegi particolari.

Non serve per forza decidere di far nascere un progetto utilizzando TypeScript. Infatti può essere aggiunto in un qualsiasi momento. In gergo un progetto del genere si chiama brownfield.

La transizione di un progetto da JavaScript può avvenire anche gradualmente. Banalmente si possono convertire i file JavaScript uno per volta modificando l'estensione da .js a .ts. Il compilatore, opportunamente configurato, dovrebbe essere in grado di leggere entrambi i tipi di file. Prima è necessario attivare l'opzione dentro il tsconfig.json.

```typescript
// ./tsconfig.json
{
  "compilerOptions": {
    /* Abilita la convivenza: permette a TS di importare file .js */
    "allowJs": true,
    /* Opzionale: permette a TS di segnalare errori anche nei file .js */
    "checkJs": false,
    "target": "ES2022",
    "outDir": "./dist"
  }
}
```

Ricorda che il codice TypeScript viene usato solo in fase di sviluppo quindi, particolare non trascurabile, va installato con --save-dev.

```sh
npm install typescript --save-dev
```

Esiste anche una versione breve ossia

```sh
npm i -D typescript
```

Se TypeScript viene installato globalmente può essere utilizzato con tutti i progetti presenti nella macchina. Però questo porta presto o tardi a dover lavorare con versioni differenti e incompatibili. Ora stai per imparare TypeScript 6. Prova ad immaginare che cosa può succedere se ti arriva un progetto in TypeScript 4.

Una buona pratica da seguire prevede di far sì che ciascun progetto sia auto-consistente. Chiunque scarichi il progetto sulla propria macchina deve poterlo compilare senza dover indovinare qualche versione di TypeScript deve essere usata.

La scelta giusta, è quella che ti permette di riprodurre il progetto nella macchina di chiunque ci lavori e senza troppe rogne da gestire. Io personalmente tendo a mettere dentro un container tutto quanto, in questo modo una installazione globale o una locale non avranno differenze: il progetto potrà girare sempre, perché dentro al proprio container.

Spero di averti trasmesso qualche concetto utile per fare questo genere di scelta in modo consapevole. Ciò detto, ogni team ed ogni processo di lavoro è a sé ed ha le proprie ragioni d'essere fatto come è fatto. Nel senso che ho lavorato in tanti contesti, da aziende di tre persone a grandi società da migliaia di dipendenti. Ciascuno ha un proprio modo di lavorare. Io qui voglio solo raccontare qualche soluzione che ho incontrato nella mia carriera o nei miei studi.
