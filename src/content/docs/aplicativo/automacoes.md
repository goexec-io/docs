---
title: Automações no celular
description: >-
  Criar uma regra do zero no telefone, num passo a passo de quatro etapas;
  ligar, desligar, editar e excluir — e o que só se ajusta no painel.
sidebar:
  order: 4
  label: Automações
---

O aplicativo não é só para olhar: dá para **criar uma automação inteira** no
celular, com os mesmos gatilhos, condições e ações do painel.

## A lista

Na aba **Automações**, cada regra aparece escrita como uma frase — "Quando o
sensor da porta abrir, então avisar a portaria." — com:

- um interruptor para **ligar e desligar** a regra ali mesmo;
- quando ela rodou pela última vez;
- o aviso **Disparou, mas foi suprimida por uma condição**, quando é o caso.

A busca acha pelo nome da automação.

## Criar, em quatro etapas

O botão de nova automação abre um passo a passo, uma etapa por tela:

| Etapa | O que você decide |
|---|---|
| 1. **O que dispara** | O gatilho |
| 2. **Só se, ao mesmo tempo** | As condições — opcional |
| 3. **O que acontece** | As ações, na ordem |
| 4. **Nome e revisão** | O nome, e a regra inteira para conferir antes de **Salvar automação** |

### O que dispara

Os mesmos cinco gatilhos do painel: **Entrada de dispositivo**, **Saída
confirmada**, **Webhook de entrada**, **Agendamento** e **Dispositivo sem
comunicar**. Dá também para somar outras entradas com **Ou também quando** e
usar um [limiar numa medição](/guia/limiar-e-histerese/).

O que cada um faz está em [Como uma regra dispara](/guia/como-uma-regra-dispara/).

### Só se, ao mesmo tempo

Filtro de repetição, intervalo mínimo entre execuções, limite por hora, faixa
de horário, dias da semana e o estado de outra entrada ou saída. Tudo
explicado em [Filtro, intervalo e janela](/guia/filtro-intervalo-e-janela/) e
[Ou também quando](/guia/ou-tambem-quando/).

### O que acontece

**Acionar saída** (ligar, desligar ou inverter; permanente ou temporizada),
**Enviar notificação** e **Chamar URL (webhook)**. Até 25 ações por regra, e dá
para reordenar — lembre que a [ordem importa](/guia/acoes/).

:::caution[O token aparece uma vez]
Se o gatilho é um **Webhook de entrada** com autorização, o token aparece uma
única vez, logo depois de salvar. Toque em **Copiar** antes de **Copiei,
continuar** — depois disso não dá para vê-lo de novo, só gerar outro.
:::

## Editar e excluir

Tocar numa regra abre tudo numa página só, para ajustar sem refazer o passo a
passo. **Salvar** grava; **Excluir** pede confirmação e não tem volta.

## A ação "Capturar foto"

A ação da [ESP32-CAM](/guia/fotos-da-camera/) aparece no aplicativo, com a
câmera que ela usa — mas **não se cria nem se ajusta por aqui**. Uma regra que
já tem a foto pode ser editada no celular normalmente: a ação da foto é salva
exatamente como estava.

Para escolher a câmera, a resolução ou o flash, abra a automação no painel web.

## O que é só no painel

O **histórico de uma regra** — cada vez que ela disparou, pulou, esperou ou
falhou, e por quê — fica no painel web. Veja [Histórico de uma
regra](/guia/historico-de-uma-regra/).
