/**
 * O gate de vazamento.
 *
 *   node scripts/check-vazamento.mjs
 *
 * Este repositorio e publico. O material de origem destas paginas veio de um
 * repositorio privado de produto comercial, onde convivem runbook de operacao,
 * planos internos e descricoes de fraqueza conhecida. Sanitizar por leitura
 * humana funciona nas tres primeiras paginas e falha na decima.
 *
 * ---------------------------------------------------------------------------
 * POR QUE ESTE ARQUIVO NAO TEM UMA LISTA DE PALAVRAS PROIBIDAS
 *
 * A primeira versao tinha, e era um defeito grave: um arquivo publico que lista
 * "nao escreva o host X, nem o e-mail Y, nem o identificador Z" e um inventario
 * pronto de X, Y e Z. O gate virava o maior vazamento do repositorio.
 *
 * Entao a regra e: NUNCA escreva aqui o que voce quer esconder. Ha tres formas
 * de expressar uma proibicao sem enuncia-la:
 *
 *   1. LISTA DE PERMISSAO. Em vez de "bloqueie tal subdominio", diga "so estes
 *      subdominios sao publicos". A lista revela o que ja e publico, e de
 *      quebra pega o host interno que ninguem pensou em bloquear.
 *   2. REGRA ESTRUTURAL. "Um IP de rede privada", "um caminho absoluto de
 *      servidor", "uma variavel de ambiente do produto". Descreve a forma, nao
 *      o valor.
 *   3. LISTA OPACA. Para o que nao cabe nas duas anteriores, so o hash em
 *      vazamento-literais.json. Ver a ressalva honesta em vazamento-comum.mjs:
 *      hash protege o que nao da para adivinhar; nao protege o obvio -- e o
 *      obvio, por ser obvio, pertence a regra 1 ou a 2.
 * ---------------------------------------------------------------------------
 *
 * Falso positivo legitimo? Ponha na linha ANTERIOR:
 *
 *     <!-- permitir-vazamento: o motivo, em uma frase -->
 *
 * Isso libera a linha seguinte, e so ela. O motivo e obrigatorio: uma isencao
 * sem justificativa e uma isencao que ninguem consegue revisar depois.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hash } from './vazamento-comum.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * O que e varrido. Nao e so `src/content/docs`: a primeira versao deste proprio
 * arquivo vazou justamente o que deveria esconder, e o README e o CONTRIBUTING
 * sao tao publicos quanto qualquer pagina. Tudo que vai ao repositorio e
 * legivel por gente passa por aqui.
 */
const ALVOS = [
  { dir: join(raiz, 'src', 'content', 'docs'), ext: /\.mdx?$/ },
  { dir: join(raiz, 'scripts'), ext: /\.mjs$/ },
  { dir: raiz, ext: /^(?:README|CONTRIBUTING|CODE_OF_CONDUCT)\.md$|^astro\.config\.mjs$/, raso: true },
];

/* -------------------------------------------------------------------------
   1. LISTAS DE PERMISSAO — o que pode aparecer. Tudo mais da mesma forma cai.
   ------------------------------------------------------------------------- */

/**
 * Os unicos enderecos do dominio que sao publicos. `api.` entra porque e o
 * endereco que o proprio contrato publico da API divulga, servido sem chave.
 */
const HOSTS_PUBLICOS = new Set([
  'goexec.io',
  'www.goexec.io',
  'docs.goexec.io',
  'app.goexec.io',
  'api.goexec.io',
]);

/** O unico e-mail do dominio que se pode divulgar. */
const EMAILS_PUBLICOS = new Set(['support@goexec.io']);

/** A unica organizacao do GitHub ligada a este produto. */
const ORGS_PUBLICAS = new Set(['goexec-io']);

/* -------------------------------------------------------------------------
   2. REGRAS ESTRUTURAIS — descrevem a forma, nunca o valor.
   ------------------------------------------------------------------------- */

/** @type {{ re: RegExp, porque: string }[]} */
const ESTRUTURAIS = [
  {
    re: /\bAN_[A-Z0-9_]{2,}\b/,
    porque: 'variavel de ambiente do produto. Quem le esta documentacao nao configura o servidor.',
  },
  {
    re: /\b(?:(?:10|127)\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/,
    porque: 'endereco de rede privada ou de loopback. E topologia interna.',
    // A excecao 192.168.4.1 (o portal da placa) vive em EXCECOES_ESTRUTURAIS.
  },
  {
    re: /(?:^|\s)\/(?:opt|etc|var|srv|usr\/local)\/[a-z0-9._-]+/i,
    porque: 'caminho absoluto de servidor.',
  },
  {
    re: /\b[a-z0-9_.-]+\.(?:py|tsx?|jsx?|cpp|hpp|ini|conf|sql)\b/i,
    porque: 'referencia a arquivo de codigo. Quem le nao tem esse arquivo.',
  },
  {
    re: /\b(?:docker[ -]compose|alembic|make (?:deploy|nuke|backup|restore)|pytest|gunicorn|uvicorn|testcontainers|systemctl|certbot)\b/i,
    porque: 'comando de operacao do servidor.',
  },
  {
    re: /\b(?:plano-[a-z-]+\.md|ESTADO\.md|PENDING\.md|CONTRIBUTING\.md do produto)\b/,
    porque: 'documento interno, que nao existe deste lado.',
  },
  {
    re: /\bmigrations?\s+\d{3,4}\b|\brevis(?:ao|ão)\s+`?\d{4}`?/i,
    porque: 'numero de migration do banco.',
  },
  {
    re: /\b[0-9a-f]{7,40}\b(?=\s*\((?:commit|hash)\)|\s*—\s*commit)/i,
    porque: 'hash de commit do repositorio privado.',
  },
];

/**
 * Excecoes as regras estruturais: valores que TEM de poder aparecer porque o
 * usuario os digita. Cada um com o motivo.
 */
const EXCECOES_ESTRUTURAIS = [
  { valor: '192.168.4.1', porque: 'o endereco do portal da propria placa; o usuario digita' },
];

/* -------------------------------------------------------------------------
   3. LISTA OPACA — so hashes. O literal nunca entra em arquivo versionado.
   Para acrescentar: node scripts/vazamento-hash.mjs "<literal>"
   ------------------------------------------------------------------------- */
const opacos = new Set(
  JSON.parse(await readFile(join(raiz, 'scripts', 'vazamento-literais.json'), 'utf8')).hashes,
);

const ISENCAO = /permitir-vazamento:\s*\S/;

/** Candidatos de uma linha que valem ser conferidos contra a lista opaca. */
function candidatos(linha) {
  const fora = new Set();
  const minus = linha.toLowerCase();

  // Corridas de identificador, com e sem hifen -- um identificador com hifen
  // precisa das duas formas, porque o extrator sem hifen o partiria em pedacos
  // curtos demais para significarem alguma coisa.
  for (const m of minus.matchAll(/[a-z0-9_]{4,}/g)) fora.add(m[0]);
  for (const m of minus.matchAll(/[a-z0-9_-]{4,}/g)) fora.add(m[0]);

  // Palavras coladas por CamelCase viram tambem a forma inteira ja em minuscula
  // (NomeAssim -> nomeassim), coberto acima.

  // Bigramas e trigramas de palavras, para termos que sao uma expressao de
  // duas ou tres palavras, e nao um identificador unico.
  const palavras = minus.match(/[a-zà-ÿ]+/g) ?? [];
  for (let i = 0; i < palavras.length; i++) {
    if (i + 1 < palavras.length) fora.add(`${palavras[i]} ${palavras[i + 1]}`);
    if (i + 2 < palavras.length) fora.add(`${palavras[i]} ${palavras[i + 1]} ${palavras[i + 2]}`);
  }
  return fora;
}

/** Arquivos de um alvo que casam com a extensao dele. */
async function varrer({ dir, ext, raso = false }) {
  const achados = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name);
    if (item.isDirectory()) {
      if (!raso) achados.push(...(await varrer({ dir: caminho, ext })));
    } else if (ext.test(item.name)) {
      achados.push(caminho);
    }
  }
  return achados;
}

const listas = await Promise.all(
  ALVOS.map((alvo) =>
    varrer(alvo).catch((erro) => {
      if (erro.code === 'ENOENT') return [];
      throw erro;
    }),
  ),
);
const arquivos = [...new Set(listas.flat())].sort();

const problemas = [];
const anotar = (onde, trecho, porque) => problemas.push({ onde, trecho, porque });

for (const arquivo of arquivos) {
  const linhas = (await readFile(arquivo, 'utf8')).split('\n');
  const ehOProprioGate = arquivo.endsWith('check-vazamento.mjs');

  linhas.forEach((linha, i) => {
    // Uma isencao vale para a linha seguinte, e so para ela.
    if (i > 0 && ISENCAO.test(linhas[i - 1])) return;
    const onde = `${relative(raiz, arquivo)}:${i + 1}`;

    // --- 1. listas de permissao ---
    for (const m of linha.matchAll(/\b([a-z0-9-]+(?:\.[a-z0-9-]+)*\.goexec\.io|goexec\.io)\b/gi)) {
      const host = m[1].toLowerCase();
      // Um e-mail e tratado pela regra de e-mail, nao pela de host.
      if (linha.slice(Math.max(0, m.index - 1), m.index).includes('@')) continue;
      if (!HOSTS_PUBLICOS.has(host)) {
        anotar(onde, host, 'host do dominio que nao esta na lista de enderecos publicos.');
      }
    }

    for (const m of linha.matchAll(/\b([a-z0-9._%+-]+@goexec\.io)\b/gi)) {
      const email = m[1].toLowerCase();
      if (!EMAILS_PUBLICOS.has(email)) {
        anotar(onde, email, 'endereco de e-mail que nao e o canal publico de contato.');
      }
    }

    for (const m of linha.matchAll(/github\.com\/([A-Za-z0-9-]+)/g)) {
      if (!ORGS_PUBLICAS.has(m[1].toLowerCase())) {
        anotar(onde, m[0], 'organizacao do GitHub que nao e a do produto.');
      }
    }

    // --- 2. regras estruturais ---
    /*
     * Este arquivo enuncia as proprias regras estruturais, entao ele casa com
     * todas elas. A isencao vale SO para elas, e SO aqui: sao nomes genericos
     * de ferramenta (um servidor de aplicacao, um cliente de certificado) que
     * nao dizem nada sobre o GoExec -- qualquer projeto Python usa os mesmos.
     * As listas de permissao e a lista opaca continuam valendo para este
     * arquivo, e sao elas que impedem o erro que a versao anterior cometeu.
     */
    for (const { re, porque } of ehOProprioGate ? [] : ESTRUTURAIS) {
      // Global na hora de usar: uma linha pode carregar duas ocorrencias da
      // mesma regra, e relatar so a primeira esconde metade do conserto.
      const global = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
      for (const achou of linha.matchAll(global)) {
        if (EXCECOES_ESTRUTURAIS.some((e) => achou[0].includes(e.valor))) continue;
        anotar(onde, achou[0].trim(), porque);
      }
    }

    // --- 3. lista opaca ---
    for (const c of candidatos(linha)) {
      if (opacos.has(hash(c))) {
        anotar(
          onde,
          c,
          'consta da lista de literais que nao podem ser publicados. Reescreva sem esse termo; ' +
            'se achar que e engano, fale com quem mantem o repositorio.',
        );
      }
    }
  });
}

if (problemas.length === 0) {
  console.log(`gate de vazamento: ${arquivos.length} arquivos, nada a relatar`);
  process.exit(0);
}

console.error(`\ngate de vazamento: ${problemas.length} ocorrencia(s)\n`);
for (const { onde, trecho, porque } of problemas) {
  console.error(`  ${onde}`);
  console.error(`    achou:  ${trecho}`);
  console.error(`    porque: ${porque}\n`);
}
console.error(
  'Reescreva o trecho do ponto de vista de quem USA o produto. Se for mesmo\n' +
    'falso positivo, ponha na linha anterior:\n' +
    '  <!-- permitir-vazamento: <o motivo, em uma frase> -->\n',
);
process.exit(1);
