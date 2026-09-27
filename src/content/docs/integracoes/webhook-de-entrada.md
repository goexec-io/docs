---
title: Webhook de entrada
description: >-
  Disparar uma automação a partir de outro sistema, e por que o endereço é uma
  credencial.
sidebar:
  order: 1
---

Qualquer sistema que saiba fazer uma requisição HTTP pode disparar uma
automação sua. Escolha **Webhook de entrada** como gatilho ("Dispara quando
alguém chama uma URL sua"), e a automação ganha um endereço próprio.

**Copie o endereço da tela da automação.** Depois de salvar, ela mostra a **URL
para chamar** e um **Exemplo com curl**, cada um com botão de copiar — não monte
o endereço à mão.

```bash
curl -X POST "<a URL para chamar que a tela mostrou>"
```

O **Método** faz parte da configuração: `GET`, `POST`, `PUT`, `PATCH` ou
`DELETE`. Uma chamada com outro verbo não dispara — assim a visita de um
pré-visualizador de link ou de um robô de segurança, que costuma ser um `GET`,
não aciona uma regra feita para `POST`.

A resposta é **202**, e ela significa *recebido e enfileirado* — não *"o portão
abriu"*. A rota não avalia nada; ela entrega para o mesmo motor que os sensores
usam. O corpo da resposta é:

```json
{ "accepted": true, "deliveryId": "…" }
```

## O endereço é a credencial

:::danger[Trate a URL como uma senha]
Sem **Exigir autorização**, quem tem o endereço dispara a automação. Não há
cabeçalho, cookie ou sessão: o caminho identifica a regra sozinho.
:::

Por isso o **Código do webhook** é gerado, não escolhido — a tela diz "Gerado
automaticamente e não editável". São 24 símbolos aleatórios, de um alfabeto sem
`0`, `O`, `1`, `l` nem `I`, porque esse endereço acaba sendo lido em voz alta ao
telefone.

### Se a URL vazou: Gerar outro

O botão **Gerar outro** troca o código. Ao salvar, a URL antiga para de
funcionar na hora, e quem já a usava precisa receber a nova.

### Onde ele não aparece

O caminho **não vai para log nenhum**. O que identifica a chamada nos registros é
o id da automação, nunca o endereço.

## Exigir autorização

Marque **Exigir autorização** para que a URL sozinha não baste. A chamada passa a
precisar de uma credencial, em uma das duas formas:

**O token da regra.** Deixe o campo **Token** em branco para gerar um
automaticamente, ou escolha o seu com pelo menos 16 caracteres. Ele aparece uma
vez só — "Guarde este token agora" — e vai na chamada de um destes jeitos:

```bash
curl -X POST "<URL>" -H "Authorization: Bearer <token>"
curl -X POST "<URL>" -H "X-Webhook-Token: <token>"
```

O segundo existe porque muita central de alarme só consegue acrescentar um
cabeçalho com nome livre, e não sabe escrever `Bearer`.

**Uma chave de API da organização.** Uma [chave de API](/api/chaves-de-api/) com
o escopo `webhooks:ingest` também autoriza, desde que:

- seja da **mesma organização** da automação;
- o dono dela ainda esteja na organização, com papel de membro ou acima — quem só
  visualiza não dispara regra;
- ela vá **só** em `Authorization: Bearer`.

:::caution[A chave de API nunca vai em X-Webhook-Token]
Uma chave vale para a organização inteira. `X-Webhook-Token` é o campo que um
instalador digita na tela de uma central, e nenhum sistema de log o esconde —
por isso a chave só é aceita no cabeçalho `Authorization`.
:::

A chamada que entra com a chave atualiza o **Último uso** dela na tela de chaves.

## Toda falha responde 404

Caminho desconhecido, regra desativada, organização suspensa, verbo errado, token
errado, chave de outra organização, chave sem o escopo, chave revogada ou
vencida — tudo responde o mesmo **404**.

É deliberado. Distinguir transformaria a rota num oráculo capaz de confirmar
quais endereços de estranhos existem.

Consequência prática ao depurar: um 404 **não** quer dizer que você errou a URL.
Confira, nesta ordem:

1. a automação está ativa?
2. o **Método** configurado é o que o seu sistema manda?
3. com **Exigir autorização**, a credencial está certa e no cabeçalho certo?
4. se é uma chave de API: o escopo `webhooks:ingest` está nela, e ela ainda está
   ativa?

:::note[Muitas chaves erradas bloqueiam até a certa]
Cada chave de API recusada conta contra o endereço de origem, no mesmo limite de
falhas da [API pública](/api/visao-geral/). Esgotado esse limite, **até a chave
certa** recebe 404 até a janela passar — e o 404 não diz por quê. Se você testou
muitas chaves em sequência, espere e tente de novo.

O token da própria regra não entra nessa conta.
:::

Um código com formato impossível — menos de 3 ou mais de 64 caracteres, ou com
símbolos fora de letras, números, hífen e sublinhado — responde **422**, antes
de qualquer busca.

## Limite de taxa

Cada automação aceita até **60 chamadas por minuto**. Passou disso, a resposta é
**429** com o cabeçalho `Retry-After` dizendo quantos segundos esperar.

O limite conta **só chamadas aceitas**. Contar as recusadas daria a quem
descobrisse a URL um jeito barato de silenciar a regra — bastaria estourar o
limite para o painel de alarme levar recusa bem na hora em que tem uma invasão
para reportar.

## Quando o servidor não pode aceitar

Duas situações respondem **503**, e nas duas o certo é repetir a chamada:

- a fila das automações está indisponível — o servidor recusa em vez de dizer
  202 para algo que ninguém vai avaliar, e manda `Retry-After`;
- uma janela de manutenção está em andamento.

## Repetição de entrega

O cabeçalho `Idempotency-Key` é respeitado. A maioria dos sistemas que envia
webhook repete a entrega quando o tempo esgota, e a chave faz a repetição colidir
em vez de disparar duas vezes. A resposta devolve o mesmo valor no cabeçalho
`Idempotency-Key`.

Se o seu sistema não manda esse cabeçalho, vale mandar.

## O corpo da chamada

O corpo viaja junto com o evento, limitado a 16 KB. Acima disso ele não é
guardado inteiro.

:::note[Hoje nada o lê]
Não existe condição sobre o conteúdo do corpo, e ele é deliberadamente mantido
fora dos textos de mensagem — dar o corpo cru ao template deixaria quem chama
escolher o que sai numa notificação sua.

Ele é guardado porque não guardá-lo seria irrecuperável, e porque é pré-requisito
de qualquer condição sobre corpo que venha a existir.
:::

## Combinar com um sensor

Uma mesma regra aceita o webhook de entrada **e** uma entrada como fontes:
*"quando meu sistema chamar, ou quando a porta abrir"* é **uma** automação.

Veja ["Ou também quando"](/guia/ou-tambem-quando/). O que continua exigindo duas
automações é ter **dois endereços** de webhook de entrada.

## O webhook não é a API

O webhook de entrada faz uma coisa só: dispara uma regra. Para ler o estado de
uma placa, acionar uma saída direto ou consultar o que aconteceu, use a [API
pública](/api/visao-geral/).
