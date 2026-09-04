---
title: Por que não tocou
description: >-
  Quando uma regra não roda, o motivo fica registrado. Como ler a tela de
  Eventos e o que cada situação significa.
sidebar:
  order: 10
---

Esta é a pergunta mais comum, e ela tem resposta — não precisa adivinhar.

**Abra a tela de Eventos.** Uma regra que foi acordada mas **não** executou
aparece lá, com o motivo.

## Os motivos, e o que fazer

### O sinal não permaneceu

O sensor acionou e voltou antes do [filtro](/guia/filtro-intervalo-e-janela/)
completar. A regra funcionou como configurada.

Se acontece demais, o filtro está longo para esse sensor — ou o sensor está
oscilando por problema elétrico. Confira o [resistor](/guia/contato-na-nf/).

### Ainda estava no intervalo mínimo

A regra rodou há pouco. É o comportamento pedido.

### Fora da janela de horário, ou fora dos dias

Confira dois pontos: o fuso configurado na automação, e se houve **queda de
conexão**. O horário é julgado pelo instante em que o servidor ouviu — veja a
[armadilha da janela](/guia/filtro-intervalo-e-janela/).

### Teto por hora atingido

A regra bateu o máximo de execuções da hora.

### A condição não estava satisfeita

A regra tem um "somente se" que não bateu. *"A porta estava fechada."* A regra
funcionou — não há conserto.

### A condição nunca foi observada

O "somente se" aponta para um canal que **nunca** reportou nível nenhum.

Isso não é problema de regra, é de instalação: aquele canal nunca foi ligado, ou
a placa dele nunca subiu. Vá conferir a fiação.

### A informação estava velha

O canal do "somente se" reportou um dia, mas não recentemente. Aquela placa está
muda.

De novo: é presença, não regra. Veja se a placa aparece online.

### A medição não bateu

A placa emitiu a travessia, mas o último valor medido não satisfaz a condição
numérica. Quase sempre é *"a temperatura já voltou"*, e está certo.

Se persistir, o limiar da placa e o número da automação divergiram — confira os
dois em [Limiar e histerese](/guia/limiar-e-histerese/).

## Se nem apareceu na tela de Eventos

Aí a regra nem foi acordada. Confira, nesta ordem:

1. **A automação está ativa?**
2. **O aparelho está online?** Uma placa offline não reporta nada.
3. **O gatilho é o certo?** Um gatilho "ao acionar" não dispara quando o sensor
   desaciona.
4. **O canal do gatilho é o certo?** É o erro mais comum em placa com muitos
   canais.
5. **O sensor está acionando mesmo?** Abra a tela do aparelho e olhe o canal
   enquanto alguém aciona.

## Se a saída não mexeu, mas a regra rodou

A regra e a entrega são coisas separadas. Se a tela de Eventos mostra a execução,
o problema é do outro lado: veja [Comando não chegou no
aparelho](/problemas/comando-nao-chegou/).
