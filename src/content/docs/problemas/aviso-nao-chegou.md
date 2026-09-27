---
title: O aviso não chegou
description: >-
  A regra disparou, mas o WhatsApp, o Telegram ou o e-mail não chegou. Onde
  olhar e como mandar de novo.
sidebar:
  order: 11
---

Primeiro, confirme que a regra **disparou**. Se ela nem rodou, o problema é
anterior — veja [Por que não tocou](/guia/por-que-nao-tocou/). Esta página é
para quando a regra rodou e a mensagem não apareceu.

## 1. O canal está pronto?

Abra **Canais** e olhe a etiqueta do canal:

- **Aguardando confirmação** — WhatsApp ou Telegram cujo código ainda não foi
  enviado. Nada sai por ele até a pessoa do destino mandar o código. Veja
  [Canais de aviso](/guia/canais-de-aviso/#whatsapp-e-telegram-o-código).
- **Sem teste** — e-mail ou HTTP que ainda não teve um **Enviar teste**
  entregue.
- **Inativo** — o canal foi desligado.

Na ação da automação, um canal que não está pronto aparece como **(não
verificado)** ao lado do nome.

## 2. Alertas que não saíram

Quando o envio falha, o GoExec.io tenta de novo, com esperas cada vez maiores.
Depois de **5 tentativas** sem sucesso, ele desiste daquele alerta e o põe na
seção **Alertas que não saíram**, em **Canais**.

A seção só aparece quando há algo nela. Cada linha mostra o destino (mascarado),
o erro que o provedor devolveu e quantas tentativas foram feitas.

Para mandar de novo:

1. **Corrija a causa primeiro** — o erro da linha costuma dizer qual é: endereço
   de e-mail recusado, número que bloqueou o GoExec.io, bot removido do grupo,
   sistema HTTP fora do ar.
2. Toque em **Reprocessar**. O alerta volta para a fila e sai de novo, com o
   mesmo texto.

Reprocessar sem corrigir só faz o alerta voltar para esta lista.

### Quando não dá para reprocessar

Duas situações deixam o botão desligado:

- **Canal removido** — o canal foi excluído depois do alerta. Crie o canal de
  novo; o alerta antigo não volta.
- **Webhook da automação** — a falha foi numa ação **Chamar URL (webhook)**, que
  não é um canal. Corrija a ação na automação.

Quem só tem permissão de ver a organização também vê o botão desligado.

### Por quanto tempo

Um alerta que não saiu fica na lista por **90 dias**. Depois disso ele é
apagado e não dá mais para reprocessar.

## 3. WhatsApp: o ritmo

O WhatsApp espaça as mensagens de propósito — mostra "digitando" e espera
alguns segundos entre uma e outra. Numa rajada de alertas, os últimos chegam com
atraso, mas chegam.

Acima de **30 mensagens por hora para o mesmo destino**, as seguintes esperam e
saem mais tarde. Se uma regra manda tanto assim para a mesma pessoa, vale rever o
[intervalo mínimo](/guia/filtro-intervalo-e-janela/) dela.

## 4. A foto não veio

Se a mensagem chegou com "📷 Foto indisponível" e um motivo, o **aviso** está
certo — foi a câmera que não entregou a foto a tempo. O texto do motivo diz o
que houve; veja [Fotos da câmera](/guia/fotos-da-camera/).

## 5. Chegou, mas não onde você olhou

- **E-mail**: confira a pasta de spam e a de promoções.
- **Grupo**: a mensagem vai para o grupo onde o código foi enviado, não para o
  privado de quem enviou.
