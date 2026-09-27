---
title: Como uma regra dispara
description: >-
  O caminho de uma automação, do sensor até a ação — e os cinco tipos de
  gatilho que podem acordá-la.
sidebar:
  order: 5
---

```text
algo acontece (uma entrada muda, o relógio bate, alguém chama uma URL)
      ↓
o servidor recebe
      ↓
o motor de regras confere as condições
  (repetições, intervalo mínimo, faixa de horário, dias, limite por hora,
   "somente se")
      ↓
as ações rodam, na ordem:
  acionar saída · enviar notificação · chamar URL · capturar foto
```

O motor existe **uma vez só**. Não importa se o evento veio de um sensor, de um
webhook ou do relógio — todos passam pelo mesmo lugar.

## Os cinco tipos de gatilho

Na tela, o campo se chama **Tipo de gatilho**:

| Gatilho | Dispara quando |
|---|---|
| **Entrada de dispositivo** | Um sensor muda de nível — ao acionar, ao desacionar, ou nos dois |
| **Saída confirmada** | Uma saída **confirmou** que mudou |
| **Webhook de entrada** | Alguém chama uma URL sua |
| **Agendamento** | Um horário, no fuso da automação |
| **Dispositivo sem comunicar** | Uma placa fica sem falar com o servidor por mais tempo do que você tolera |

Os três últimos têm página própria: [Webhook de
entrada](/integracoes/webhook-de-entrada/),
[Agendamento](/guia/agendamento/) e [Dispositivo sem
comunicar](/guia/dispositivo-sem-comunicar/).

Num canal de medida (um sensor de temperatura, por exemplo), a entrada não
"aciona": ela **entra em alarme** e **sai do alarme**. Veja [Limiar e
histerese](/guia/limiar-e-histerese/).

### "Saída confirmada" merece atenção

Ele dispara pelo estado que **a placa reportou**, nunca pelo comando que o
servidor mandou.

A diferença é a que separa *"avisei que mandei abrir"* de *"avisei que abriu"*.
É o que permite encadear com segurança: acione o portão, e só avise quando ele
tiver de fato aberto.

## As condições que seguram a regra

Toda automação tem cinco controles, e cada um resolve um problema diferente:

| Controle, como aparece na tela | Para quê |
|---|---|
| **Ignorar repetições (debounce)** | O sinal precisa permanecer. Um sensor oscilando vinte vezes gera **um** aviso |
| **Intervalo mínimo entre execuções** | Tempo mínimo entre duas execuções da mesma regra |
| **Limite por hora** | Teto duro de segurança |
| **Somente em uma faixa de horário** | "Só depois das 19h" — e lida certo com faixa que vira a noite |
| **Somente nestes dias** | Só nos dias escolhidos |

Cada um deles tem detalhe que vale conhecer: [Filtro, intervalo e
janela](/guia/filtro-intervalo-e-janela/).

Além deles, uma regra pode ter mais jeitos de acordar e condições que só
autorizam. Somando os dois blocos, cabem **no máximo 8** condições extras por
regra — acima disso a frase da regra deixa de ser conferível. Veja ["Ou também
quando" e "somente se"](/guia/ou-tambem-quando/).

## Passo a passo ou tudo numa tela

Ao criar uma regra, o editor pergunta **Como preencher**:

- **Passo a passo** — uma pergunta de cada vez: *O que dispara*, *Só se, ao
  mesmo tempo*, *O que acontece*, *Nome e revisão*. É o padrão para quem cria a
  primeira regra.
- **Tudo numa tela** — a regra inteira de uma vez, para quem já sabe o que quer.

Ao editar uma regra existente, a tela inteira volta: aí você vem mexer num
campo específico, não percorrer quatro etapas.

Nos dois modos, o **Resumo** escreve a regra numa frase — *"Quando a entrada
Porta for acionada, se Alarme estiver acionado, então ligar a saída Sirene por
2 min."* Se a frase não diz o que você quer, a regra também não faz.

## Quando a regra não dispara, fica registrado

Uma regra que foi acordada e **não** rodou fica registrada com o motivo. Na
lista de automações, clique na contagem de execuções para abrir o [histórico
da regra](/guia/historico-de-uma-regra/). Não é preciso adivinhar.

Veja também [Por que não tocou](/guia/por-que-nao-tocou/).

## Próximo passo

[Dispositivo sem comunicar](/guia/dispositivo-sem-comunicar/) — o gatilho que
avisa quando uma placa some.
