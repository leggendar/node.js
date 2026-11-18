#!/usr/bin/env node
// Uso: node calc.js <numero> <operazione> <numero>
// Esempio: node calc.js 5 add 3
 
// 1. Tabella delle operazioni: ogni nome è associato a una funzione.
//    Aggiungere un'operazione = aggiungere una riga, senza toccare il resto.
const operations = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => {
    if (b === 0) throw new Error("Divisione per zero non consentita.");
    return a / b;
  },
  pow: (a, b) => a ** b,
  mod: (a, b) => {
    if (b === 0) throw new Error("Modulo per zero non consentito.");
    return a % b;
  },
};
 
function usage() {
  console.error("Uso: node calc.js <numero> <operazione> <numero>");
  console.error("Operazioni disponibili: " + Object.keys(operations).join(", "));
  console.error("Esempio: node calc.js 5 add 3");
}
 
function main() {
  // 2. process.argv contiene [percorso node, percorso script, ...argomenti].
  //    slice(2) tiene solo gli argomenti passati dall'utente.
  const args = process.argv.slice(2);
 
  if (args.length !== 3) {
    usage();
    process.exit(1);
  }
 
  const [rawA, opName, rawB] = args;
 
  // 3. Gli argomenti arrivano sempre come stringhe: vanno convertiti.
  //    Number("abc") dà NaN, quindi si controlla con Number.isNaN.
  const a = Number(rawA);
  const b = Number(rawB);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error("Errore: gli operandi devono essere numeri validi.");
    usage();
    process.exit(1);
  }
 
  // 4. Si cerca l'operazione nella tabella; se non esiste, errore chiaro.
  const fn = operations[opName.toLowerCase()];
  if (!fn) {
    console.error(`Errore: operazione sconosciuta "${opName}".`);
    usage();
    process.exit(1);
  }
 
  // 5. Si esegue e si stampa il risultato. Gli errori di calcolo
  //    (es. divisione per zero) vengono intercettati qui.
  try {
    console.log(fn(a, b));
  } catch (err) {
    console.error("Errore: " + err.message);
    process.exit(1);
  }
}
 
main();
