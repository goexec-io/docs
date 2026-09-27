---
title: "\"Ou também quando\" e \"somente se\""
description: >-
  Uma regra com várias condições. O que acorda a automação, o que apenas
  autoriza, e por que a distinção existe.
sidebar:
  order: 9
---

Uma automação cabe numa frase:

> Dispara quando **o gatilho** ou **qualquer fonte** acontecer, **e** todas as
> condições estiverem satisfeitas agora.

São dois blocos na tela, com papéis diferentes:

| Bloco | Papel |
|---|---|
| **Ou também quando** | Pode **acordar** a regra. Mais um jeito de ela começar |
| **Somente se, no instante do disparo** | Nunca acorda nada. Apenas **autoriza** ou barra |

No modo passo a passo, o segundo bloco é a etapa **Só se, ao mesmo tempo**.

Somando os dois, uma regra aceita **no máximo 8** condições extras.

## "Ou também quando"

"Toca a sirene se a porta dos fundos **ou** a lateral abrir" era, antes, duas
regras que tocavam duas vezes. Agora é uma: **Adicionar outra entrada**.

Podem entrar aqui: uma entrada, uma saída confirmada, ou uma medição. Basta
**uma** delas acontecer — elas não precisam acontecer juntas.

:::note[Webhook e agendamento só como gatilho principal]
Eles podem ser o gatilho, e aí você pendura fontes extras neles — "toda noite
às 19h **ou** quando a porta abrir" funciona, e "o webhook **ou** a porta"
também.

O que não existe é o inverso: dois webhooks, ou dois agendamentos, na mesma
regra. Isso continua sendo duas automações.
:::

### Ele exige intervalo mínimo

Uma regra com fonte extra precisa declarar **intervalo mínimo entre execuções
de pelo menos 1 segundo** — a tela já preenche 60 s, e não deixa zerar.

O motivo é concreto: o "ou" não é deduplicado. A porta dos fundos e a lateral são
acontecimentos diferentes, então geram duas execuções. Isso está certo para "me
avise" e é uma sirene retocando para um portão que alguém segura aberto. O
intervalo mínimo já é o controle para isso.

## "Somente se, no instante do disparo"

"Toca a sirene quando a porta abrir — **somente se** o alarme estiver armado."

Aqui entram condições que são **lidas** no instante em que algo lá em cima
dispara. Todas precisam estar valendo ao mesmo tempo. Elas não acordam nada.

Há dois tipos:

| Tipo | Exemplo |
|---|---|
| **Estado de uma entrada ou saída** | "somente enquanto o alarme estiver armado" |
| **Comparação de medida** | "somente se a temperatura estiver acima de 8 °C" |

Numa saída, vale o estado que a placa **confirmou**, não o comando enviado.

### Faixa e tolerância são duas condições

Não existe um operador "entre". **Adicionar faixa (entre X e Y)** cria duas
comparações no mesmo canal — um "acima de" e um "abaixo de". **Adicionar igual
a, com tolerância** faz o mesmo em torno de um número.

São duas de propósito: só um dos dois limites cabe na placa, e o outro é
conferido pelo servidor. A tela marca qual com um selo âmbar. Veja [Limiar e
histerese](/guia/limiar-e-histerese/).

### Leitura velha não vale como prova

Uma comparação de medida só aceita uma leitura recente. A tela diz o prazo:
*"Só conta como prova uma leitura dos últimos …"* — entre 1 segundo e 24 horas.

Mais velha que isso, a regra não roda, e o motivo fica no
[histórico](/guia/historico-de-uma-regra/). Uma sonda que parou de responder não
pode autorizar nada com o último número que disse.

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
aplica.

## Próximo passo

[Limiar e histerese](/guia/limiar-e-histerese/) — como temperatura entra numa
regra.
