---
title: Ações
description: >-
  O que uma regra faz quando dispara: acionar uma saída, avisar alguém, ou
  chamar outro sistema.
sidebar:
  order: 9
---

Uma automação pode ter várias ações, e elas rodam **na ordem** em que estão.

## Acionar uma saída

| Campo | Opções |
|---|---|
| Modo | Ligar · Desligar · **Inverter** |
| Duração | Permanente · Por um tempo |

**Inverter** resolve contra o estado que a placa **reportou** no momento da
execução — não contra o último comando enviado. Se alguém acionou o relé pela
tela, inverter desliga.

E lembre que o [tempo máximo ligado](/guia/tempo-maximo-ligado/) do canal ganha:
uma ação de 5 segundos num canal com teto de 2 roda 2.

## Avisar alguém

Escolha um canal de aviso já configurado e escreva a mensagem. O texto aceita os
identificadores dos canais, para a mensagem dizer o que aconteceu em vez de um
texto fixo.

Não existe duração aqui — um aviso acontece ou não acontece.

## Chamar um endereço

| Campo | O que aceita |
|---|---|
| URL | O endereço a chamar |
| Método | O verbo HTTP |
| Cabeçalhos | Os que o destino exigir |
| Autenticação | Nenhuma, token, usuário e senha, ou cabeçalho próprio |

É por aqui que entram Slack, Discord, e qualquer sistema seu que aceite receber
uma chamada.

## A ordem importa

As ações rodam em sequência. Numa regra que aciona uma sirene **e** avisa no
WhatsApp, ponha a sirene primeiro: ela é a que precisa acontecer no segundo em
que o sensor acionou.

## Próximo passo

[Por que não tocou](/guia/por-que-nao-tocou/) — quando a regra não roda, e como
descobrir o motivo.
