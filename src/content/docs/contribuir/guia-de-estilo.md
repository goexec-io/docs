---
title: Guia de estilo
description: >-
  Como escrever para estas páginas: para quem, com que tom, e as convenções de
  formato.
sidebar:
  order: 2
---

## Para quem você escreve

**Para quem usa, não para quem constrói.**

A pessoa do outro lado tem uma placa na mão e um problema para resolver. Ela não
sabe — e não precisa saber — como o servidor foi feito, que linguagem, que banco
de dados, quantos processos.

O teste é simples: se a frase só faz sentido para quem tem acesso ao código,
ela não pode ficar.

## As regras que mais mudam o texto

**Uma página responde uma pergunta.** Se o título precisa de "e" para caber no
assunto, provavelmente são duas páginas.

**Comece pelo que a pessoa vê.** "A placa não aparece na lista de portas" antes
de "o conversor USB não enumerou".

**Diga o porquê quando ele muda a decisão.** "Use cabo curto" é uma regra que
ninguém segue. "Cabo de mais de 5 metros derruba o sinal do sensor e você vê
leitura zerada" é uma regra que se lembra.

**Números medidos, não adjetivos.** "Rápido" não ajuda. "86 ms entre o comando e
a confirmação" ajuda.

**Diga o que não existe.** Uma página que descreve só o que funciona faz a pessoa
procurar por meia hora o que nunca foi construído.

**Segunda pessoa, português do Brasil.** "Você liga a placa" — não "o usuário
deve ligar", não "ligue-se a placa".

## Formato

**Título e descrição vão no frontmatter**, nunca como `# Título` no corpo. O
Starlight monta o `h1` a partir dele:

```markdown
---
title: O portal de Wi-Fi
description: >-
  Como conectar a placa à rede, quando o portal abre sozinho, e as duas
  informações que só aparecem nessa tela.
sidebar:
  order: 4
---
```

A `description` aparece no resultado do buscador e no cartão de link
compartilhado. Escreva-a como uma frase de verdade, não como uma lista de
palavras-chave.

**Quebre linha por volta de 80 colunas, por sentido.** Facilita o diff: mudar
uma frase muda uma linha, não o parágrafo inteiro.

**Escolha a forma pelo conteúdo:**

| Use | Quando |
|---|---|
| Tabela | Fatos comparáveis lado a lado |
| Lista numerada | Sequência que se executa na ordem |
| Lista com marcador | Itens sem ordem entre si |
| Prosa | Raciocínio, causa, decisão |

**Blocos de código com a linguagem marcada**, sempre — é o que dá cor e o botão
de copiar:

````markdown
```bash
sudo usermod -aG dialout $USER
```
````

**Sem captura de tela do painel.** A tela muda mais rápido que a documentação, e
uma imagem desatualizada engana mais do que texto ausente. Descreva o botão pelo
nome que está escrito nele.

## Avisos

Quatro tipos, e cada um tem um uso:

```markdown
:::note
Contexto útil que não muda o que a pessoa vai fazer.
:::

:::tip
Um atalho, um jeito melhor.
:::

:::caution
Vai dar errado se você não prestar atenção.
:::

:::danger
Vai quebrar alguma coisa, e pode não ter volta.
:::
```

Com título próprio: `:::caution[12 segundos é mais tempo do que parece]`.

**Use com parcimônia.** Página com seis caixas coloridas não tem nenhum destaque
— tem seis parágrafos pintados.

## Cor

Não invente cor no Markdown. Os avisos acima já saem nas cores certas.

A razão está no produto: **verde significa "online", e nada mais**. Se um link
ou um destaque aqui for verde, o site e o painel passam a discordar, e quem lê
aprende errado.

| Cor | Significa |
|---|---|
| Violeta | a marca |
| Verde | online / saudável |
| Rosa | alerta |
| Âmbar | atenção |

## Links

Internos, sempre com barra no fim e caminho absoluto:

```markdown
[O botão](/hardware/o-botao/)
```

Link interno morto **quebra o build**, então um erro de digitação aqui aparece
antes de ir ao ar.

Externos: escreva o link no texto que descreve o destino, não em "clique aqui".

## Onde a página vai

```text
src/content/docs/
├── comecar/      do zero ao primeiro acionamento
├── hardware/     placas, pinos, shields, botão
├── problemas/    "não funcionou, e agora"
└── contribuir/   este assunto
```

Dentro de uma pasta, a ordem no menu vem do `sidebar.order` do frontmatter. Se
você inserir uma página no meio, renumere as seguintes — números com buraco
funcionam, mas confundem quem mexer depois.
