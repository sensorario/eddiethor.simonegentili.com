# Tipi e funzioni

PHP permette di dichiarare esplicitamente i tipi dei parametri e dei
valori di ritorno delle funzioni. Questo rende il codice più leggibile e
consente agli strumenti di analisi statica di individuare errori prima
dell'esecuzione.

```php
function somma(int $a, int $b): int
{
    return $a + $b;
}
```

Oltre ai tipi scalari (`int`, `float`, `string`, `bool`), PHP supporta
tipi unione, tipi nullable e proprietà tipizzate nelle classi, per
modellare con precisione i dati che una funzione si aspetta di ricevere.

Una volta presa confidenza con la dichiarazione dei tipi, scrivere
funzioni robuste diventa naturale.
