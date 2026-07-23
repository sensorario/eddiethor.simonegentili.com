## Import elision

Definizione: ottimizzazione automatica applicata dal compilatore in fase di generazione del codice.

Funzionamento: se un import serve solo a recuperare dei tipi (e non codice runtime), viene completamente rimosso dal JavaScript finale.

Vantaggi: alleggerisce il codice emesso ed evita l'importazione di moduli superflui a runtime.
