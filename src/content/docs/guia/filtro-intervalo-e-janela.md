---
title: Filtro, intervalo e janela
description: >-
  Os três controles que decidem se uma regra que foi acordada realmente roda —
  e a armadilha de horário que vale conhecer.
sidebar:
  order: 6
---

## Filtro de ruído

O sinal precisa **permanecer** pelo tempo que você definir. Um sensor oscilando
vinte vezes em dois segundos gera **um** aviso, não vinte.

O detalhe que importa: o filtro conta por **acomodação**, não por evento. Todas
as oscilações de uma mesma acomodação colapsam numa execução só.

Uma acomodação física, uma execução.

:::tip[Valores de partida]
Contato de porta: 50 a 200 ms. Boia de nível, que balança com a água: 1 a 5
segundos. Botão: 20 a 50 ms.
:::

## Intervalo mínimo

Tempo mínimo entre duas execuções da **mesma** regra. É o amortecedor para
situações que se repetem legitimamente — um portão que alguém segura aberto, uma
porta de estoque em dia de carga.

Sem ele, "me avise quando a porta abrir" vira vinte mensagens numa manhã movimentada.

## Máximo por hora

Teto duro. Diferente do intervalo mínimo, que espaça, este simplesmente **para**
depois de N execuções na hora.

Use como rede de segurança em regra que aciona algo caro ou barulhento.

## Janela de horário e dias

"Só depois das 19h" é uma janela. O sistema lida corretamente com janela que
**vira a noite** — 19:00 às 06:00 é uma janela só, não duas.

A janela é avaliada no fuso que você escolher na automação, não no fuso do
servidor.

:::caution[A armadilha: horário julga quando o servidor ouviu]
Se a placa ficou sem conexão e voltou depois, a janela de horário e os dias da
semana são avaliados no **instante em que o servidor recebeu** — não no instante
em que o sensor realmente acionou.

Na prática: uma regra restrita a 22:00–06:00, cujo acionamento aconteceu às
03:00 mas cuja conexão só voltou às 09:00, é **pulada**. E o espelho é pior — um
acionamento do meio-dia, recuperado às 23:00, **entra** na janela noturna.

Se a regra precisa sobreviver a uma queda longa de rede, **não a restrinja por
horário.** A proteção contra repique nessa hora é o filtro, que é datado
corretamente.
:::

## Próximo passo

["Ou também quando" e "somente se"](/guia/ou-tambem-quando/) — como uma regra
passa a ter várias condições.
