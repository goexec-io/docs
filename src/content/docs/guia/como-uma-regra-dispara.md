---
title: Como uma regra dispara
description: >-
  O caminho de uma automação, do sensor até a ação — e os quatro tipos de
  gatilho que podem acordá-la.
sidebar:
  order: 5
---

```text
a entrada muda
      ↓
a placa avisa o servidor
      ↓
o motor de regras confere as condições
  (filtro, intervalo mínimo, janela de horário, dias, teto por hora)
      ↓
as ações rodam, na ordem:
  acionar saída · avisar alguém · chamar um endereço
```

O motor existe **uma vez só**. Não importa se o evento veio de um sensor, de uma
chamada externa ou do relógio — todos passam pelo mesmo lugar.

## Os quatro tipos de gatilho

| Gatilho | Dispara quando |
|---|---|
| **Entrada** | Um sensor muda de nível — ao acionar, ao desacionar, ou nos dois |
| **Saída confirmada** | Uma saída **confirmou** que acionou |
| **Chamada externa** | Alguém chama uma URL sua |
| **Agenda** | Um horário, no fuso da automação |

### "Saída confirmada" merece atenção

Ele dispara pelo estado que **a placa reportou**, nunca pelo comando que o
servidor mandou.

A diferença é a que separa *"avisei que mandei abrir"* de *"avisei que abriu"*.
É o que permite encadear com segurança: acione o portão, e só avise quando ele
tiver de fato aberto.

## As condições que seguram a regra

Toda automação tem cinco controles, e cada um resolve um problema diferente:

| Controle | Para quê |
|---|---|
| **Filtro** | O sinal precisa permanecer. Um sensor oscilando vinte vezes gera **um** aviso |
| **Intervalo mínimo** | Tempo mínimo entre duas execuções da mesma regra |
| **Máximo por hora** | Teto duro de segurança |
| **Janela de horário** | "Só depois das 19h" — e lida certo com janela que vira a noite |
| **Dias da semana** | Só nos dias escolhidos |

Cada um deles tem detalhe que vale conhecer: [Filtro, intervalo e
janela](/guia/filtro-intervalo-e-janela/).

## Quando a regra não dispara, fica registrado

Isso é o mais útil da tela de Eventos: uma regra que **não** rodou aparece lá
com o motivo. Não é preciso adivinhar.

Veja [Por que não tocou](/guia/por-que-nao-tocou/).

## Próximo passo

[Filtro, intervalo e janela](/guia/filtro-intervalo-e-janela/).
