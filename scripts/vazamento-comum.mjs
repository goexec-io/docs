/**
 * O que o gate de vazamento e o gerador de hash compartilham.
 */
import { createHash } from 'node:crypto';

/**
 * O sal e publico, e isso e deliberado -- ele nao esta aqui para resistir a
 * ataque, esta para que a lista opaca nao seja um dicionario pronto. Um literal
 * curto e adivinhavel (um hostname obvio) continua quebravel por forca bruta;
 * por isso os literais adivinhaveis NAO moram na lista opaca, e sim nas regras
 * de lista de permissao, que nao revelam nada. A lista opaca guarda so o que
 * nao da para adivinhar.
 */
export const SAL = 'goexec-docs/gate/v1:';

/** Minusculas, acentos fora, espaco colapsado. */
export function normalizar(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const hash = (s) => createHash('sha256').update(SAL + normalizar(s)).digest('hex');
