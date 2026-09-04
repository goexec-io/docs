---
title: Entradas e saídas
description: >-
  O que define um canal, por que a configuração vive no servidor e não na
  placa, e o que isso muda no dia a dia.
sidebar:
  order: 1
---

**Você não configura pino na placa.** Ela sai de fábrica sem saber nada sobre a
instalação onde vai parar. Qual pino é entrada, qual é saída, se tem resistor,
quanto tempo de filtro, qual o estado de repouso — tudo isso vive no servidor e
é entregue à placa quando ela conecta.

Trocar um sensor do pino 4 para o 5 é uma edição na tela. Não há regravação, não
há visita técnica, não há cabo USB.

## O que define um canal

Cada canal descreve **um** pino:

| Campo | O que faz |
|---|---|
| Número do canal | De 1 até o limite da sua placa |
| Identificador | Nome curto, tipo `sensor_porta`, usado nos textos de mensagem |
| Nome | O que aparece na tela |
| Direção | Entrada ou saída |
| Pino | O pino físico — **conferido contra o modelo da sua placa** |
| Resistor | Nenhum, para cima (*pull-up*) ou para baixo (*pull-down*) |
| Contato invertido | Para sensor normalmente fechado |
| Filtro de ruído | Em milissegundos, aplicado **na placa** |
| Estado de repouso | Onde a saída volta quando um tempo expira |
| Tempo máximo ligado | Teto de segurança da saída |

Os três últimos têm páginas próprias, porque cada um resolve um problema
diferente: [contato NA × NF](/guia/contato-na-nf/) e [tempo máximo
ligado](/guia/tempo-maximo-ligado/).

## A configuração já está esperando a placa

Quando você salva, o servidor não tenta alcançar a placa naquele instante. Ele
deixa a configuração guardada, marcada como a mais recente.

Qualquer placa que conectar dali em diante recebe a versão atual assim que
entra — agora, ou daqui a três dias quando alguém religar a tomada.

:::tip[O que isso elimina]
Uma placa que ficou dois dias sem energia volta configurada, sozinha, no
segundo em que entra na rede. Não existe o estado "liguei e ela não sabe o que
fazer".
:::

A placa confirma o que aplicou — e, se recusou algum pino, diz qual e por quê.
Isso aparece na tela do aparelho.

## Uma entrada, uma saída, ou as duas

Um canal é uma coisa **ou** a outra. Um portão que abre e confirma que abriu usa
dois canais: um relé (saída) e um contato de confirmação (entrada).

Vale contar antes de comprar a placa — o número de canais é o que muda entre os
modelos. Veja [Qual placa escolher](/hardware/qual-placa-escolher/).

## Próximo passo

[Contato NA × NF](/guia/contato-na-nf/) — o par de campos que mais confunde, e
por que são dois e não um.
