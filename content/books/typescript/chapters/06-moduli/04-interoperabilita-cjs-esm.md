## Interoperabilità CJS/ESM

Il problema: la complessità nel far coesistere moduli CommonJS e moduli ECMAScript nello stesso progetto.

Il flag: utilizzo di esModuleInterop nel tsconfig.json.

Effetto: TypeScript introduce dei wrapper nell'output per importare file CommonJS come se avessero un export default.
