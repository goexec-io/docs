---
title: Chamar outro sistema
description: >-
  A ação "Chamar URL (webhook)" — como levar um acionamento para um sistema
  seu, para o Slack ou para o Discord.
sidebar:
  order: 2
---

Toda automação pode, entre as suas ações, **chamar um endereço HTTP**. É o
caminho de saída para qualquer coisa que não seja e-mail, WhatsApp, Telegram ou o
aplicativo. Na lista de ações, ela se chama **Chamar URL (webhook)**.

| Campo | O que aceita |
|---|---|
| URL | O endereço a chamar. Precisa começar com `http://` ou `https://` |
| Método | O verbo HTTP |
| Cabeçalhos | Os que o destino exigir — **Adicionar cabeçalho** para cada um |
| Corpo | Opcional. JSON ou texto, **enviado exatamente como você escreveu** |
| Autorização | Nenhuma · Bearer · Basic · Cabeçalho. Nenhuma é o padrão |
| Segredo de assinatura | Opcional. Veja [Conferir a assinatura](/integracoes/assinatura-do-webhook/) |
| Tempo limite | Quanto esperar a resposta: de 1 ms a 2 minutos. Padrão, 10 s |
| Tentativas | Quantas vezes repetir se falhar: de 0 a 10. Padrão, 3 |

Os campos comuns a todas as ações também valem aqui: **Esperar antes de
executar (ms)**, **Continuar se esta ação falhar** e **Ação ativa** — veja
[Ações](/guia/acoes/).

Com **Autorização** diferente de Nenhuma, o campo **Segredo** recebe o token (em
Bearer), `usuário:senha` (em Basic) ou o valor do cabeçalho (em Cabeçalho, com o
**Nome do cabeçalho** ao lado). Depois de salvo, ele não aparece de novo.

## O corpo vai como está

O GoExec.io **não embrulha** o corpo num formato próprio: o que está no campo
**Corpo** é o que o destino recebe. Se o destino espera um JSON com um campo
específico, é você quem escreve esse JSON.

Com o corpo vazio, a chamada vai sem corpo — o que serve para um sistema que só
precisa saber que *foi chamado*, e não serve para Slack nem Discord.

## Slack e Discord

Slack e Discord não são tipos de canal no produto: eles entram por esta ação.
Crie um webhook de entrada no Slack ou no Discord, cole o endereço em **URL**,
use o método `POST`, e escreva o corpo no formato que cada um exige:

```json
{"text": "O portão da garagem ficou aberto."}
```

```json
{"content": "O portão da garagem ficou aberto."}
```

O primeiro é o do **Slack**; o segundo, o do **Discord**. O corpo sai como
`application/json`, que é o que os dois esperam.

:::note[Canais antigos de Slack e Discord]
Os formulários de canal não oferecem mais Slack e Discord. Um canal desses tipos
criado antes continua aparecendo na lista de **Canais**; para um novo, use esta
ação.
:::

## Com a foto da câmera

Se a automação tem uma ação **Capturar foto** antes desta, marque **Anexar a
foto**. O corpo passa a aceitar três variáveis:

| Variável | O que vira |
|---|---|
| `{{capture.url}}` | Um link assinado para a imagem, válido por 24 h |
| `{{capture.id}}` | A identidade da foto |
| `{{capture.state}}` | O estado da captura, por exemplo se ela chegou ou falhou |

A imagem em si não viaja no corpo — só o link. Veja [Fotos da
câmera](/guia/fotos-da-camera/).

## Um sistema seu

O caso mais comum é avisar um ERP, um sistema de chamados ou um painel próprio.

Três cuidados:

- **A ação roda na ordem** em que está entre as ações. Se ela precede o
  acionamento de uma sirene, um destino lento atrasa a sirene — ponha a ação
  física primeiro.
- **Uma repetição pode chegar.** Se o seu sistema demora mais que o **Tempo
  limite**, ou responde com erro temporário, a ação tenta de novo. Faça o seu
  lado aguentar receber a mesma mensagem duas vezes. Com a assinatura ligada, o
  cabeçalho `X-GoExec-Delivery` é o mesmo em todas as tentativas e serve para
  reconhecer a repetição.
- **Prove a origem.** Um endereço público pode ser chamado por qualquer um.
  Preencha o **Segredo de assinatura** e confira cada chamada — o passo a passo
  está em [Conferir a assinatura do
  webhook](/integracoes/assinatura-do-webhook/).

## Nos dois sentidos

Somando com o [webhook de entrada](/integracoes/webhook-de-entrada/), o
GoExec.io conversa nos dois sentidos: outro sistema pode disparar uma automação
sua, e uma automação sua pode chamar outro sistema.

Para ir além de disparar regras — ler o estado das placas, acionar uma saída
direto, consultar o histórico —, existe a [API pública](/api/visao-geral/).

Todas essas pontas são opcionais — o produto funciona inteiro sem nenhuma delas.
