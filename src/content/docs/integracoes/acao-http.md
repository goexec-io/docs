---
title: Chamar outro sistema
description: >-
  A ação HTTP de saída — como levar um acionamento para Slack, Discord ou para
  um sistema seu.
sidebar:
  order: 2
---

Toda automação pode, entre as suas ações, **chamar um endereço HTTP**. É o
caminho de saída para qualquer coisa que não seja e-mail, WhatsApp ou Telegram.

| Campo | O que aceita |
|---|---|
| URL | O endereço a chamar |
| Método | O verbo HTTP |
| Cabeçalhos | Os que o destino exigir |
| Autenticação | Nenhuma · token · usuário e senha · cabeçalho próprio |

## Slack e Discord

Os dois entram por aqui, e é assim que eles existem no produto: você cria um
webhook de entrada no Slack ou no Discord, cola o endereço, e pronto.

Nenhum dos dois precisa de integração dedicada — eles já aceitam receber uma
chamada HTTP.

## Um sistema seu

O caso mais comum é avisar um ERP, um sistema de chamados ou um painel próprio.

Vale lembrar que a ação roda **na ordem** em que está entre as ações. Se ela
precede o acionamento de uma sirene, um destino lento atrasa a sirene — ponha a
ação física primeiro.

## Nos dois sentidos

Somando com a [chamada externa](/integracoes/webhook-de-entrada/), o GoExec.io
conversa nos dois sentidos: outro sistema pode disparar uma automação sua, e uma
automação sua pode chamar outro sistema.

As duas pontas são opcionais — o produto funciona inteiro sem nenhuma delas.
