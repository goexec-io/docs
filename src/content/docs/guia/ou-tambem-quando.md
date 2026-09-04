---
title: "\"Ou também quando\" e \"somente se\""
description: >-
  Uma regra com várias condições. O que acorda a automação, o que apenas
  autoriza, e por que a distinção existe.
sidebar:
  order: 7
---

Uma automação cabe numa frase:

> Dispara quando **o gatilho** ou **qualquer fonte** acontecer, **e** todas as
> condições estiverem satisfeitas agora.

São dois blocos na tela, com papéis diferentes:

| Bloco | Papel |
|---|---|
| **Ou também quando** | Pode **acordar** a regra. Mais um jeito de ela começar |
| **Somente se** | Nunca acorda nada. Apenas **autoriza** ou barra |

## "Ou também quando"

"Toca a sirene se a porta dos fundos **ou** a lateral abrir" era, antes, duas
regras que tocavam duas vezes. Agora é uma.

Podem entrar aqui: uma entrada, uma saída confirmada, ou uma medição.

:::note[Chamada externa e agenda só como gatilho principal]
Elas podem ser o gatilho, e aí você pendura fontes extras nelas — "toda noite às
19h **ou** quando a porta abrir" funciona, e "a chamada externa **ou** a porta"
também.

O que não existe é o inverso: dois endereços de chamada externa, ou duas
agendas, na mesma regra. Isso continua sendo duas automações.
:::

### Ele exige intervalo mínimo

Uma regra com fonte extra precisa declarar **intervalo mínimo de pelo menos 1
segundo** — a tela já preenche 60 s.

O motivo é concreto: o "ou" não é deduplicado. A porta dos fundos e a lateral são
acontecimentos diferentes, então geram duas execuções. Isso está certo para "me
avise" e é uma sirene retocando para um portão que alguém segura aberto. O
intervalo mínimo já é o controle para isso.

## "Somente se"

"Toca a sirene quando a porta abrir — **somente se** o alarme estiver armado."

Aqui entram condições que são **lidas** no instante da avaliação, do último
estado conhecido do canal. Elas não acordam nada.

:::tip[Por que isso não pesa]
Um canal usado como condição em duzentas regras não acorda nenhuma delas quando
oscila. É o que faz a funcionalidade caber sem tornar o sistema lento.
:::

## O que essa forma não expressa

Vale saber antes de desenhar uma regra complicada:

**Grupos aninhados não existem.** `(A e B) ou (C e D)` não é expressável. A forma
é plana: *(gatilho ou fontes) e condições*.

**Condição não tem histerese própria.** Um canal que oscila em torno do ponto de
decisão faz a mesma regra alternar entre disparar e recusar. O amortecedor é o
intervalo mínimo — e, no caso de temperatura, a histerese que a própria placa
aplica. Veja [Limiar e histerese](/guia/limiar-e-histerese/).

## Próximo passo

[Limiar e histerese](/guia/limiar-e-histerese/) — como temperatura entra numa
regra.
