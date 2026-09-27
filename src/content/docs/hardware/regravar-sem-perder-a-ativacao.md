---
title: Regravar sem perder a ativação
description: >-
  Regravar uma placa que já funciona não apaga a ativação, o Wi-Fi nem a
  identidade dela. O que o gravador preserva, e quando a placa volta de
  fábrica.
sidebar:
  order: 5
---

Regravar uma placa que já está ativada e no ar — para atualizar a firmware, ou
porque você escolheu o modelo errado — **não desfaz nada**. A placa volta com:

- a mesma identidade;
- a ativação;
- o Wi-Fi que você configurou;
- o acesso ao servidor.

Ela reinicia, entra na rede e reaparece no painel como antes, com os mesmos
canais e as mesmas automações.

## O código de ativação não é gasto

Se você colar um código de ativação ao regravar uma placa que **já** está
ativada, o gravador diz que ela já está ativada e **não usa o código**. Ele
continua valendo para outra placa.

## Placa gravada sem código: "Ativar placa"

Uma placa gravada sem código de ativação grava normalmente, mas fica
**inativa**: não abre o portal de Wi-Fi e não se registra. Isso é de propósito
— veja [O portal de Wi-Fi](/hardware/portal-wifi/).

Para ativar sem regravar:

1. Conecte a placa e clique em **Identificar a placa**.
2. Cole o **Código de ativação**.
3. Clique em **Ativar placa**.

O mesmo botão resolve a ativação que não respondeu logo depois da gravação — o
caso típico é [a ESP32-CAM na base de
gravação](/hardware/gravar-a-esp32-cam/).

## Gravadores antigos apagavam as placas ESP32

Até **26/09/2026**, o gravador escrevia a memória inteira das placas ESP32 (C3,
C3 Super Mini, WROOM e CAM) e, junto, apagava a ativação, o Wi-Fi e o acesso ao
servidor. A placa voltava sem ativação, e o servidor recusava ativá-la de novo.

Se isso aconteceu com uma placa sua, fale com o suporte em
[support@goexec.io](mailto:support@goexec.io). Para não acontecer mais, use o
gravador atual.

A D1 mini (ESP8266) nunca foi afetada: nela, os dados da placa ficam numa área
que a gravação não alcança.

## Quando a placa volta de fábrica

Só quando alguém pede isso explicitamente. A linha de comando do gravador tem a
opção `--apagar-dados`, que numa placa ESP32 apaga a ativação, o Wi-Fi e a
identidade junto com a firmware. A janela do gravador sempre preserva.

:::danger[Apagar os dados troca a identidade da placa]
A identidade de uma placa é sorteada por ela no primeiro uso e guardada na
própria placa — não vem do hardware. Apagar tudo apaga a identidade junto: a
placa sorteia outra e, para o servidor, **é outra placa**. A antiga fica no
painel sem ninguém por trás dela.

Para passar uma placa a outra pessoa, isso não é necessário: use
[Transferir](/hardware/transferir-a-placa/), no portal.
:::
