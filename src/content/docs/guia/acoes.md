---
title: Ações
description: >-
  O que uma regra faz quando dispara: acionar uma saída, enviar uma
  notificação, chamar outro sistema ou tirar uma foto.
sidebar:
  order: 11
---

Uma automação pode ter até 25 ações, e elas rodam **na ordem** em que estão.
O campo **Tipo de ação** tem quatro opções:

| Tipo de ação | O que faz |
|---|---|
| **Acionar saída** | Liga, desliga ou inverte um relé |
| **Enviar notificação** | Manda uma mensagem para um destino cadastrado |
| **Chamar URL (webhook)** | Faz uma chamada HTTP para outro sistema |
| **Capturar foto** | Pede uma foto a uma ESP32-CAM |

## O que toda ação tem

| Campo | Para quê |
|---|---|
| **Esperar antes de executar (ms)** | Atraso antes desta ação, em milissegundos — 1000 ms = 1 segundo, máximo 1 hora |
| **Continuar se esta ação falhar** | Sem ela marcada, uma ação que falha para as seguintes |
| **Ação ativa** | Desligue para manter a ação salva sem que ela rode |

A espera serve para escalonar: acender a luz, e só 30 segundos depois tocar a
sirene. Enquanto uma regra espera, o resto do sistema segue normalmente — e se
você **desativar a regra durante a espera**, o que falta não roda.

## Acionar saída

| Campo | Opções |
|---|---|
| **Tipo de saída** | Ligar · Desligar · **Inverter** |
| **Duração** | Permanente · **Temporizada** |
| **Tempo ligado (ms)** | Na temporizada: em milissegundos, até 24 horas |

O campo em milissegundos mostra ao lado quanto aquilo dá — *"Equivale a 30
min"* —, porque 1800000 não se lê.

**Inverter** resolve contra o estado que a placa **reportou** no momento da
execução — não contra o último comando enviado. Se alguém acionou o relé pela
tela, inverter desliga.

E lembre que o [tempo máximo ligado](/guia/tempo-maximo-ligado/) do canal ganha:
uma ação de 5 segundos num canal com teto de 2 roda 2. O formulário avisa antes
de salvar.

## Enviar notificação

| Campo | O que aceita |
|---|---|
| **Destino** | Um dos seus [canais de aviso](/guia/canais-de-aviso/) |
| **Assunto** | Opcional |
| **Mensagem** | O texto, com variáveis |

Um destino que ainda não foi confirmado aparece na lista com **(não
verificado)**. Ele não recebe nada até a confirmação — veja [Canais de
aviso](/guia/canais-de-aviso/).

A mensagem aceita variáveis entre chaves duplas, para dizer o que aconteceu em
vez de um texto fixo: `{{device_name}}`, `{{value}}`, `{{unit}}` e outras. A
lista está em [Variáveis da mensagem](/guia/variaveis-da-mensagem/).

Não existe duração aqui — um aviso acontece ou não acontece.

## Chamar URL (webhook)

URL, método, cabeçalhos, corpo, autorização, tempo limite e tentativas. É por
aqui que entram Slack, Discord e qualquer sistema seu que aceite receber uma
chamada. Os campos, um a um, estão em [Chamar outro
sistema](/integracoes/acao-http/).

Se o destino precisa ter certeza de que a chamada veio do GoExec.io, preencha o
**Segredo de assinatura**: veja [Conferir a assinatura do
webhook](/integracoes/assinatura-do-webhook/).

## Capturar foto

Pede uma foto a uma ESP32-CAM da organização, com **Câmera**, **Resolução**,
**Qualidade JPEG** e **Acender o flash**.

A foto não vai sozinha para lugar nenhum: as ações **abaixo** desta que
marcarem **Anexar a foto** a levam junto. Veja [Fotos da
câmera](/guia/fotos-da-camera/).

## A ordem importa

As ações rodam em sequência. Numa regra que aciona uma sirene **e** avisa no
WhatsApp, ponha a sirene primeiro: ela é a que precisa acontecer no segundo em
que o sensor acionou.

Uma **Chamar URL** para um destino lento, antes da sirene, atrasa a sirene.

E, numa regra com foto, a **Capturar foto** vem antes das notificações que a
anexam. A automação não espera a foto para seguir; é a notificação que espera
por ela.

## Próximo passo

[Variáveis da mensagem](/guia/variaveis-da-mensagem/) — o que escrever dentro
de `{{ }}`.
