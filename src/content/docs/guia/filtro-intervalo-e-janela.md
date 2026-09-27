---
title: Filtro, intervalo e janela
description: >-
  Os controles que decidem se uma regra que foi acordada realmente roda — e a
  armadilha de horário que vale conhecer.
sidebar:
  order: 8
---

| Na tela | Aceita |
|---|---|
| **Ignorar repetições (debounce)** | De 1 ms a 1 hora |
| **Intervalo mínimo entre execuções** | De 1 ms a 24 horas |
| **Limite por hora** | De 1 a 3600 execuções |
| **Somente em uma faixa de horário** | **Das** / **Até**, num **Fuso horário** |
| **Somente nestes dias** | Os dias marcados; nenhum marcado vale para todos |

## Ignorar repetições (debounce)

O sinal precisa **permanecer** pelo tempo que você definir. Um sensor oscilando
vinte vezes em dois segundos gera **um** aviso, não vinte.

O detalhe que importa: o filtro conta por **acomodação**, não por evento. Todas
as oscilações de uma mesma acomodação colapsam numa execução só.

Uma acomodação física, uma execução.

:::tip[Valores de partida]
Contato de porta: 50 a 200 ms. Boia de nível, que balança com a água: 1 a 5
segundos. Botão: 20 a 50 ms.
:::

Se o servidor não conhece o nível atual do canal — ele nunca reportou —, não dá
para provar que o sinal se manteve, e a regra **não roda**. Disparar sem poder
conferir é justamente o que o filtro existe para evitar.

## Intervalo mínimo entre execuções

Tempo mínimo entre duas execuções da **mesma** regra. É o amortecedor para
situações que se repetem legitimamente — um portão que alguém segura aberto, uma
porta de estoque em dia de carga.

Sem ele, "me avise quando a porta abrir" vira vinte mensagens numa manhã
movimentada.

A diferença para o filtro: no filtro, o problema é o sensor; aqui, a entrada é
legítima, mas o destino da ação não aguenta o ritmo.

## Limite por hora

Teto duro. Diferente do intervalo mínimo, que espaça, este simplesmente **para**
depois de N execuções na hora.

Use como rede de segurança em regra que aciona algo caro ou barulhento.

## Faixa de horário e dias

"Só depois das 19h" é uma faixa. Se o fim for **menor ou igual** ao início, a
faixa atravessa a meia-noite: 19:00 até 06:00 é uma faixa só, não duas.

A faixa é avaliada no fuso que você escolher na automação, não no fuso do
servidor. Uma regra nova começa com o fuso do seu navegador.

Se o fuso guardado numa regra for um que o servidor não conhece, a regra é
**pulada** — em vez de derrubar junto as outras regras do mesmo evento — e o
histórico diz *"Abra a automação e escolha o fuso de novo."*

:::caution[A armadilha: horário julga quando o servidor ouviu]
Se a placa ficou sem conexão e voltou depois, a faixa de horário e os dias da
semana são avaliados no **instante em que o servidor recebeu** — não no instante
em que o sensor realmente acionou.

Na prática: uma regra restrita a 22:00–06:00, cujo acionamento aconteceu às
03:00 mas cuja conexão só voltou às 09:00, é **pulada**. E o espelho é pior — um
acionamento do meio-dia, recuperado às 23:00, **entra** na faixa noturna.

Se a regra precisa sobreviver a uma queda longa de rede, **não a restrinja por
horário.** A proteção contra repique nessa hora é o filtro, que é datado
corretamente.
:::

## Próximo passo

["Ou também quando" e "somente se"](/guia/ou-tambem-quando/) — como uma regra
passa a ter várias condições.
