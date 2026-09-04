/**
 * Gera o hash de um literal para a lista opaca do gate.
 *
 *   node scripts/vazamento-hash.mjs "um literal que nao pode ir a publico"
 *
 * Cole a saida em scripts/vazamento-literais.json. O literal em si NUNCA entra
 * em arquivo versionado -- e esse o ponto.
 */
import { createHash } from 'node:crypto';
import { SAL, normalizar } from './vazamento-comum.mjs';

const alvo = process.argv.slice(2).join(' ');
if (!alvo) {
  console.error('uso: node scripts/vazamento-hash.mjs "<literal>"');
  process.exit(2);
}
const n = normalizar(alvo);
console.log(createHash('sha256').update(SAL + n).digest('hex'));
console.error(`(normalizado para: ${JSON.stringify(n)})`);
