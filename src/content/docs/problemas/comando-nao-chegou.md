---
title: O comando não chegou no aparelho
description: >-
  A regra rodou, a tela confirmou, e o relé não mexeu. Onde olhar.
sidebar:
  order: 10
---

Primeiro separe as duas coisas: **a regra rodar** e **o comando chegar** são
etapas diferentes, e falham por motivos diferentes.

Se a tela de Eventos **não** mostra a execução, o problema é anterior — veja [Por
que não tocou](/guia/por-que-nao-tocou/). Esta página é para quando ela mostra.

## 1. O aparelho está online?

Olhe a tela do aparelho. Se ele está offline, o comando ficou na fila e não foi
entregue.

A queda é detectada em cerca de um segundo, então "offline" ali é informação
fresca e confiável.

Causas comuns, em ordem: tomada, roteador reiniciado, sinal de Wi-Fi fraco no
ponto onde a placa está, senha da rede trocada. Nesse último caso a placa abre o
[portal de configuração](/hardware/portal-wifi/) sozinha.

## 2. O comando venceu antes de ser entregue

Todo comando carrega prazo de validade. Um comando de abrir portão que ficou
parado enquanto a placa estava fora **não dispara** quando ela volta.

Isso é proposital, e é uma proteção: não há ninguém lá, e um portão que abre
sozinho duas horas depois é pior que um portão que não abriu.

Se a placa estava offline no momento da regra, é esse o caso. Acione de novo.

## 3. A saída está no canal que você acha que está

Abra a configuração de entradas e saídas do aparelho e confira o número do canal
que a automação aciona. Em placa com muitos canais é o erro mais frequente.

## 4. O teto de tempo truncou

Se o relé **mexeu**, mas por menos tempo do que você esperava, é o [tempo máximo
ligado](/guia/tempo-maximo-ligado/) do canal. Ele ganha da automação, sempre.

## 5. A fiação

Se o painel mostra a saída acionada e o equipamento não respondeu, o sistema fez
a parte dele. Confira:

- o relé está clicando? (dá para ouvir)
- a alimentação do equipamento acionado está presente?
- o relé aguenta a carga? Um relé de 10 A não aciona um motor de partida.
- o contato usado é o certo? Relé costuma ter NA e NF; ligar no errado inverte
  tudo.

## 6. A placa recusou o canal

Se o canal **sumiu** da tela depois de você salvar, a placa recusou o pino ao
aplicar a configuração. Veja [Por que o painel recusou esse
pino](/guia/pino-recusado/) — a tela do aparelho mostra o que foi recusado.
