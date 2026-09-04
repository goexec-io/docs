---
title: Contato NA × NF
description: >-
  Resistor e inversão são coisas diferentes, e mantê-las separadas é o que
  permite trocar de sensor sem reescrever automação.
sidebar:
  order: 2
---

Esse par confunde, e vale a página inteira. **São independentes**, e é
proposital.

## Resistor: é elétrico

O resistor interno da placa segura o pino num nível conhecido quando nada está
puxando ele.

Um contato seco sem resistor **flutua** — o pino fica solto, captando ruído
elétrico do ambiente, e você vê o sensor "acionando" sozinho.

| Opção | Quando usar |
|---|---|
| Para cima (*pull-up*) | O caso comum: o contato fecha para o terra |
| Para baixo (*pull-down*) | O contato fecha para o positivo |
| Nenhum | O circuito já tem resistor externo |

:::caution[Alguns pinos não têm resistor interno]
Na DevKit WROOM, os pinos 34 a 39 não têm. Um contato seco neles precisa de um
resistor externo de 10 kΩ para o 3,3 V. Veja [Placas compatíveis e
pinos](/hardware/placas-e-pinos/).
:::

## Inversão: é lógica

Um sensor **normalmente fechado** (NF) fecha o circuito quando está *tudo bem*, e
abre quando dispara. É o contrário de um normalmente aberto (NA).

Sem inversão, o servidor entenderia "circuito aberto" como repouso — e um cabo
cortado passaria despercebido, que é exatamente o motivo de existir sensor NF.

Marcando **contato invertido**, o nível é traduzido na própria placa, e o
servidor sempre vê "acionou" significando acionou.

## Por que dois campos e não um

Porque respondem perguntas diferentes:

| | Pergunta |
|---|---|
| Resistor | *Como esse pino se comporta eletricamente quando nada acontece?* |
| Inversão | *O que significa, no mundo, o nível que estou lendo?* |

Manter separados é o que permite **trocar um sensor NA por um NF sem reescrever
automação nenhuma** — você marca a inversão no canal, e todas as regras
continuam valendo.

## Na prática

| Seu sensor | Resistor | Inversão |
|---|---|---|
| Botão comum, fecha para o terra | Para cima | Não |
| Sensor magnético de porta NA | Para cima | Não |
| Sensor magnético de porta NF | Para cima | **Sim** |
| Boia de nível NF | Para cima | **Sim** |
| Saída de outro equipamento, já com nível definido | Nenhum | conforme o caso |

Na dúvida: monte, olhe a tela do aparelho com a porta fechada, e veja se o canal
mostra repouso. Se mostrar acionado, marque a inversão.

## Próximo passo

[Tempo máximo ligado](/guia/tempo-maximo-ligado/) — a proteção que não depende
da rede.
