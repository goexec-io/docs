---
title: Quando a placa reinicia ou falta energia
description: >-
  O que sobrevive a um reinício e o que não sobrevive a um corte de energia,
  quanto tempo o painel leva para ver a placa cair, e o modo de segurança.
sidebar:
  order: 9
---

Reiniciar e perder energia parecem a mesma coisa, e não são. A regra, em uma
linha: **reinício mantém o pulso; falta de energia volta tudo ao padrão.**

## O que acontece com as saídas

| O que estava acontecendo | Reinício (travamento, erro, comando de reiniciar) | Falta de energia |
|---|---|---|
| Uma saída ligada **por um tempo** | Continua, **só pelo tempo que faltava** | Volta ao padrão |
| Uma saída ligada **permanente** | Volta ao padrão | Volta ao padrão |
| Saída no padrão | Fica no padrão | Fica no padrão |

Uma sirene de 60 segundos que pega um reinício aos 20 toca os 40 que faltavam —
não recomeça do zero.

Falta de energia volta **tudo** ao padrão de propósito. Se a placa lembrasse o
pulso depois de um apagão, a sirene tocaria sozinha quando a luz voltasse, horas
depois.

Duas ressalvas:

- a placa só retoma um pulso depois de acertar o relógio com o servidor. Se não
  conseguir, a saída fica no padrão;
- em [modo de segurança](#modo-de-segurança), nada é retomado.

## Comandos não repetem

Um comando que a placa já executou não é executado de novo depois de um
reinício. Um "abrir portão" não vira dois porque a placa caiu no meio.

## Quanto tempo o painel leva para ver a placa cair

| O que aconteceu | O painel mostra "offline" em |
|---|---|
| A placa perdeu energia ou o cabo de rede foi arrancado | cerca de **30 segundos** |
| A placa se desconectou normalmente (reinício pedido, por exemplo) | cerca de **1 segundo** |
| A placa e o servidor de mensagens caíram juntos | até cerca de **3,5 minutos** |

O caso mais comum é o primeiro. A placa sem energia não consegue avisar que
caiu: o servidor percebe pela falta de sinal, depois de uma margem de
segurança.

:::note[Firmware antiga leva mais]
Os 30 segundos valem para placas com firmware **2.14.1 ou mais nova**. Uma
placa com firmware anterior leva cerca de **90 segundos** para aparecer offline
depois de um corte de energia. Regravar resolve, e [não apaga
nada](/hardware/regravar-sem-perder-a-ativacao/).
:::

## A placa precisa saber a hora

Cada comando tem prazo de validade, e a placa só consegue conferir o prazo se
souber a hora certa. **Sem relógio confiável, a placa recusa comandos** — e
pede a hora ao servidor pela própria conexão segura, o que normalmente resolve
em segundos.

Redes que bloqueiam a sincronização de horário — algumas de hotel, de visitante
ou corporativas — são o caso em que isso aparece. Nelas:

- **ativar** uma placa nova funciona;
- **transferir** a placa para outra conta fica esperando e não conclui.

## Travamento vira reinício

Uma placa ESP32 que trava por **30 segundos** reinicia sozinha. Uma D1 mini que
fica sem memória de forma persistente também reinicia, em vez de ficar entrando
e saindo do ar.

:::tip[Placa ESP32 presa depois de ativar]
Uma placa ESP32 (C3, WROOM ou CAM) pode ficar presa logo depois da ativação,
sem conectar ao servidor. A causa foi corrigida na firmware em 26/09/2026;
enquanto a sua placa não tiver essa correção, **desligue e religue a placa** —
ela conecta normalmente.
:::

## Modo de segurança

:::caution[Em validação]
O modo de segurança está pronto no servidor e na firmware, mas ainda não passou
pela prova em bancada com placa real.
:::

Se uma configuração faz a placa travar em loop — um sensor num pino que trava o
chip, por exemplo —, a placa se protege. Depois de **três reinícios anormais
seguidos**, ela sobe com a **configuração padrão da placa**, deixando a sua de
lado.

Conta como reinício anormal:

- um travamento ou erro da firmware;
- o travamento que a própria placa detecta e reinicia;
- queda de tensão da fonte (só nas placas ESP32);
- uma placa que chega ao servidor mas não termina de se apresentar em
  **5 minutos**.

Ficar sem Wi-Fi, com a senha errada ou com o portal aberto **não conta**: o
problema aí é a rede, não a configuração.

### O que você vê

O aparelho ganha a marca **Modo de segurança**, e a tela dele mostra o cartão
**Aparelho em modo de segurança**, com a data em que isso aconteceu.

Enquanto isso:

- a placa não aplica configurações novas;
- o servidor não reenvia a sua configuração sozinho;
- nenhum pulso interrompido é retomado.

### O que fazer

1. **Confira a instalação antes.** Um fio encostado, um sensor com defeito, uma
   fonte fraca — o que mudou desde que a placa funcionava.
2. Toque em **Confirmar e reenviar a configuração**.

A placa aplica a configuração sem reiniciar. Se o problema continuar, ela volta
ao modo de segurança em até três reinícios — sinal de que a causa ainda está lá.

:::note[Fonte fraca também leva ao modo de segurança]
Numa placa ESP32 — e principalmente na [ESP32-CAM](/hardware/esp32-cam/) —, a
queda de tensão de uma fonte fraca conta como reinício anormal. Três seguidas e
a placa entra em modo de segurança, sem nada de errado na configuração. Antes de
confirmar, confira a fonte.
:::
