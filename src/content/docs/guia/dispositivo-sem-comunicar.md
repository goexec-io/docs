---
title: Dispositivo sem comunicar
description: >-
  O gatilho que avisa quando uma placa some: quanto tempo esperar, por que
  existe um mínimo, e por que o celular pode tocar duas vezes.
sidebar:
  order: 6
---

"Me avise se o gateway do galpão ficar 15 minutos sem comunicar" é uma regra
como outra qualquer. O gatilho se chama **Dispositivo sem comunicar**.

| Campo | O que aceita |
|---|---|
| **Dispositivo** | Uma placa, ou **Qualquer dispositivo** (o padrão) |
| **Minutos sem comunicar** | Minutos inteiros, de 1 a 10080 (uma semana) |

"Qualquer dispositivo" cobre todas as placas da organização — e continua
valendo quando uma placa é trocada por outra.

O tempo conta a partir do **último sinal** da placa, não do instante em que o
painel a mostrou como desconectada.

## Por que existe um mínimo

O servidor não declara uma placa desconectada no primeiro segundo de silêncio.
Hoje ele espera **3 minutos** sem sinal antes de dizer que ela caiu — e uma
regra de 1 minuto teria um número na tela que nunca pode cumprir.

Então, abaixo desse tempo, a regra é **recusada** ao salvar, com o número na
mensagem. Ela não é arredondada por baixo dos panos: uma regra arredondada
dispararia num tempo que a tela não prometeu.

:::note[Queda por energia é percebida antes]
Uma placa que perde a energia costuma aparecer como desconectada em cerca de
30 segundos. Os 3 minutos são o caso em que ninguém avisou o servidor — por
exemplo, quando o próprio serviço de mensagens caiu junto. A regra conta a
partir do último sinal nos dois casos.
:::

## Como a regra decide

Com uma regra de 15 minutos, a queda chega ao motor por volta dos 3 minutos, e
a resposta honesta é *"ainda não"*. A regra **espera** até completar os 15
minutos de silêncio e só então olha de novo:

| O que ela encontra | Resultado |
|---|---|
| A placa continua sem comunicar | Dispara |
| A placa voltou antes do prazo | Não dispara. O motivo registrado é *"O dispositivo voltou a comunicar antes do prazo"* |
| A placa não pertence mais à organização | Não dispara. Alerta sobre uma placa que a regra não enxerga é alerta sobre nada |

Consequências que valem saber:

- **Uma queda dispara uma vez.** A mesma queda chega ao servidor por mais de um
  caminho, e só o primeiro roda.
- **Não existe gatilho "voltou a comunicar".** A volta só serve para cancelar a
  espera.
- **Liberar uma placa** desativa as regras que a nomeiam. As regras de
  "Qualquer dispositivo" continuam, e simplesmente deixam de vê-la.

## O celular pode tocar duas vezes

O aplicativo já avisa sozinho, sem regra nenhuma, quando uma placa é declarada
desconectada. Se você também criar uma regra que manda para o canal **App no
celular**, são dois avisos da mesma queda: o automático, e o da regra no tempo
que você escolheu.

Os dois não se deduplicam, de propósito — a regra é o caminho quando você quer
decidir o tempo, a placa e o que acontece.

## O que escrever na mensagem

A mensagem pode dizer qual placa caiu e há quanto tempo. As variáveis
`{{device_name}}`, `{{offline_since}}` e `{{offline_for_minutes}}` servem
exatamente para isso:

```text
{{device_name}} está sem comunicar desde {{offline_since}}
({{offline_for_minutes}} min).
```

A lista completa está em [Variáveis da mensagem](/guia/variaveis-da-mensagem/).

## Próximo passo

[Agendamento](/guia/agendamento/) — regras que rodam pelo relógio.
