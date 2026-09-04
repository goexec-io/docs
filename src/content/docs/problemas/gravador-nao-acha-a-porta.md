---
title: O gravador não acha a porta
description: >-
  A placa acende mas não aparece na lista. As causas, na ordem em que vale
  testar.
sidebar:
  order: 1
---

Sintoma: você abre o gravador, clica em **Identificar a placa**, e ele diz que
não há nenhuma porta. A placa está acesa.

Teste nesta ordem — está do mais comum para o menos.

## 1. O cabo

**Muitos cabos USB têm só os fios de energia.** A placa acende, parece viva, e
não existe para o computador.

É a causa mais comum, de longe, e a mais fácil de descartar: troque o cabo. Use
um que você sabe que já transferiu arquivo de um celular — não o cabo que veio
com uma fonte de parede.

:::note[Por que o gravador não avisa]
"Nenhuma porta" e "cabo só de energia" são exatamente a mesma coisa do ponto de
vista do computador: não há nada conectado. Não há como distinguir.
:::

## 2. O driver do conversor USB

A placa não fala USB diretamente. Ela tem um chip conversor no meio, e esse chip
precisa de driver:

| Chip | Onde aparece |
|---|---|
| **CH340** | Nas placas mais baratas — a maioria das clonadas |
| **CP2102** | Nas placas originais e nas mais caras |

No Windows, sem o driver, a placa aparece no Gerenciador de Dispositivos como um
item com ponto de exclamação, ou não aparece.

Como saber qual você tem: olhe o chip retangular menor na placa, ao lado do
conector USB. O nome está escrito nele.

Instale o driver do fabricante do chip, desconecte, reconecte, e abra o gravador
de novo.

## 3. A porta está ocupada

Se você deixou aberto o monitor serial de outro programa — a IDE do Arduino, um
terminal, outra janela do próprio gravador — a porta fica presa.

Feche tudo e tente de novo.

## 4. É uma ESP32-C3 e a porta trocou de nome

Nas placas ESP32-C3 a porta USB é criada pelo próprio chip. No reset, **ela
some e volta** — às vezes com outro nome.

O gravador lida com isso: fecha, espera reaparecer e reabre. Mas se você
interrompeu o processo no meio, pode ter sobrado uma porta fantasma. Desconecte
a placa, espere cinco segundos, reconecte.

## 5. É um módulo sem auto-reset

Módulos ESP-WROOM-02 avulsos — o módulo puro, não uma placa de desenvolvimento —
não têm o circuito que reseta a placa automaticamente.

Nesses, segure o pino de boot em nível baixo e dê o reset manualmente.

## Caso especial: ESP8266 que entra em modo de gravação sozinha

Na D1 mini e similares, **o botão de configuração e o pino de boot são o mesmo
pino**. Se você ligar a placa segurando esse botão, ela entra no carregador USB
em vez de rodar o firmware.

Sintoma: a placa liga, o LED não pisca o padrão de sempre e ela não sobe o ponto
de acesso. Solte o botão e desligue/religue.

## Ainda nada

- Teste a placa em **outra porta USB** — preferencialmente uma na traseira do
  computador, não num hub.
- Teste em **outro computador**. Isso separa problema de placa de problema de
  máquina em um minuto.
- No Linux, o sintoma costuma ser diferente: a porta aparece mas dá
  `Permission denied`. Veja [essa página](/problemas/permission-denied-no-linux/).
