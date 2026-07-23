## Transpilazione

Per partire con TypeScript ci vuole l'abc. Come lo devi configurare? Come puoi infine trasformarlo in JavaScript e come puoi eseguirlo? Alla fine non viene eseguito TypeScript ma del codice JavaScript e JavaScript funziona già di suo. Si parla ovviamente del runtime Node, perché con runtime moderni come Deno o altri le cose cambiano. Dicevamo che JavaScript funziona senza transpilazioni. Ma allora TypeScript chi lo esegue? Nessuno, perché non ha un runtime nativo, e viene invece transpilato in JavaScript.

La transpilazione consente di tradurre il codice TypeScript in corrispondente codice JavaScript. Si passa da un superset a codice compatibile. Questa transizione da superset a codice compatibile avviene tramite due azioni: Type Erasure (che rimuove la tipizzazione) e Down Leveling (che converte in modo selettivo e condizionale il codice JavaScript moderno in istruzioni datate a seconda del target indicato in tsconfig.json).
