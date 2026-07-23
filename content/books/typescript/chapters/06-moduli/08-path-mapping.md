## Path mapping

Il problema: la scomodità e la fragilità dei percorsi relativi lunghi (es. ../../../../components).

La soluzione: uso di baseUrl e paths nel tsconfig.json per creare alias personalizzati (es. @core/*).

Vincolo di compilazione: risolve i percorsi solo per l'analisi statica dei tipi; a runtime serve un bundler o il supporto nativo di Node.js.
