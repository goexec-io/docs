# Como contribuir

Obrigado por estar aqui. Correção de erro de digitação vale tanto quanto página
nova — quem lê não distingue.

## O caminho curto

Toda página tem **"Editar esta página"** no rodapé. Ele abre o arquivo no editor
do GitHub, e ao salvar o próprio GitHub cria o fork, a branch e o Pull Request.
Para consertar uma frase, é esse o caminho: não precisa clonar nada.

## O caminho completo

```bash
git clone https://github.com/goexec-io/docs.git
cd docs
nvm use          # Node 22.12+
npm ci
npm run dev      # http://localhost:4321
```

Antes de abrir o PR:

```bash
npm run build    # gate de vazamento + link morto
```

Se isso passa, o CI passa.

## As duas regras que importam

### 1. Nada do repositório privado entra aqui

O GoExec.io é um produto comercial e seu código é fechado. Boa parte do texto
destas páginas nasceu de documentos internos, e o que sobrou de lá **não pode
aparecer**: nome de arquivo do código, variável de ambiente `AN_*`, endereço
interno, comando de operação do servidor, número de migration, hash de commit.

Isso não é etiqueta — é verificado. O `npm run build` roda
`scripts/check-vazamento.mjs`, que quebra o build ao achar qualquer um desses
padrões e diz por que aquele padrão existe. Se você bateu no gate, o conserto é
reescrever a frase do ponto de vista de quem usa o produto:

| Em vez de | Escreva |
|---|---|
| "o `<serviço>` publica em `<tópico>/v1/…`" | "o servidor manda a configuração para a placa" |
| "ajuste `AN_<ALGUMA_COISA>`" | "o aviso desiste depois de alguns segundos" |
| "veja `<pasta>/<arquivo>.py`" | (nada — quem lê não tem esse arquivo) |
| "corrigido na migration `<número>`" | "corrigido na versão 2.1" |

Os exemplos da coluna da esquerda estão com marcador no lugar do valor real, e
isso é de propósito: um guia que ensina o que não publicar usando o valor
verdadeiro publica o valor verdadeiro.

Falso positivo de verdade acontece. Nesse caso, ponha na **linha anterior**:

```markdown
<!-- permitir-vazamento: este termo é o que aparece escrito na própria tela -->
```

A justificativa é obrigatória: isenção sem motivo é isenção que ninguém
consegue revisar depois.

### 2. Verde significa "online", e nada mais

A cor é parte do produto, não decoração. No painel, verde `#10B77F` quer dizer
que o aparelho está no ar — e **só** isso. Se um link, um botão de destaque ou
um cabeçalho aqui for verde, o site e o produto passam a discordar, e quem lê
aprende errado.

| Cor | Significa |
|---|---|
| Violeta `#7C3AED` | a marca, e só a marca |
| Verde `#10B77F` | online / saudável |
| Rosa `#FB6F84` | alerta |
| Âmbar `#FABE23` | atenção |

Na prática: não invente cor no Markdown. Os avisos do Starlight (`:::note`,
`:::tip`, `:::caution`, `:::danger`) já saem nas cores certas.

## Como escrever

**Escreva para quem usa, não para quem constrói.** A pessoa do outro lado tem
uma placa na mão e um problema para resolver. Ela não sabe — e não precisa saber
— como o servidor foi feito.

**Uma página responde uma pergunta.** Se o título precisa de "e" para caber no
assunto, provavelmente são duas páginas.

**Comece pelo que a pessoa vê.** "A placa pisca vermelho três vezes" antes de
"o handshake TLS falhou".

**Diga o porquê quando ele muda a decisão.** "Use cabo curto" é uma regra que
ninguém segue. "Cabo de mais de 5 m derruba o sinal do sensor e você vê leitura
zerada" é uma regra que se lembra.

**Números medidos, não adjetivos.** "Rápido" não ajuda; "86 ms entre o comando e
a confirmação" ajuda.

**Português do Brasil, segunda pessoa.** "Você liga a placa", não "o usuário
deve ligar" nem "ligue-se a placa".

### Formato

- Título e descrição vão no frontmatter, não como `# Título` no corpo.
- Quebre linha por volta de 80 colunas, por sentido — facilita o diff.
- Comando que a pessoa vai colar: bloco de código com a linguagem marcada.
- Tabela quando são fatos comparáveis; lista quando é sequência; prosa quando é
  raciocínio.
- Sem captura de tela de coisa que muda toda semana. Descreva o botão pelo nome.

## Traduzir

Ainda não. O site é pt-BR e a configuração está preparada, mas declarar `en` e
`es` antes de haver tradução publicaria as páginas em português sob `/en/` e
`/es/` — o buscador as indexaria como conteúdo em inglês escrito em português.

Se você quer ajudar com isso, abra uma issue antes: a primeira tradução muda a
configuração do site, e vale combinar por onde começar.

## Estrutura

```
src/content/docs/
├── comecar/      do zero ao primeiro acionamento
├── guia/         regras, ações, canais de aviso, fotos
├── aplicativo/   o aplicativo do celular (beta)
├── conta/        entrar, duas etapas, sessões, papéis
├── hardware/     placas, pinos, gravador, portal, botão
├── integracoes/  chamar e ser chamado por outro sistema
├── api/          a API pública, para quem integra
├── problemas/    "não funcionou, e agora"
└── contribuir/   este assunto
```

O menu **não** é gerado por ordem alfabética: ele está escrito em
`astro.config.mjs`. Página nova numa seção com `autogenerate` entra sozinha; use
`sidebar: { order: N }` no frontmatter para posicioná-la.

## Código de conduta

Vale o [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Licença da sua contribuição

Ao mandar um PR você concorda em licenciar o texto sob **CC BY 4.0** e o código
sob **MIT**, os mesmos termos do resto do repositório.
