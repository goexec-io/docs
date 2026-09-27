---
title: Por que não tocou
description: >-
  Quando uma regra não roda, o motivo fica registrado. Onde olhar, o que cada
  situação significa, e o que conferir quando nada foi registrado.
sidebar:
  order: 17
---

Esta é a pergunta mais comum, e ela tem resposta — não precisa adivinhar.

**Abra o histórico da regra.** Na lista de automações, clique na contagem de
execuções. Uma regra que foi acordada mas **não** executou aparece lá como
**Pulou**, com o motivo. A lista completa de motivos está em [Histórico de uma
regra](/guia/historico-de-uma-regra/); os mais comuns estão aqui.

## Os motivos mais comuns, e o que fazer

### O sinal não permaneceu

O sensor acionou e voltou antes do [filtro](/guia/filtro-intervalo-e-janela/)
completar. A regra funcionou como configurada.

Se acontece demais, o filtro está longo para esse sensor — ou o sensor está
oscilando por problema elétrico. Confira o [resistor](/guia/contato-na-nf/).

### Ainda estava no intervalo mínimo

A regra rodou há pouco. É o comportamento pedido.

### Fora da faixa de horário, ou fora dos dias

Confira dois pontos: o fuso configurado na automação, e se houve **queda de
conexão**. O horário é julgado pelo instante em que o servidor ouviu — veja a
[armadilha da janela](/guia/filtro-intervalo-e-janela/).

### Limite por hora atingido

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

### A placa voltou antes do prazo

Numa regra de [dispositivo sem
comunicar](/guia/dispositivo-sem-comunicar/), a placa reconectou antes de
completar o tempo pedido. É exatamente o que o prazo existe para tolerar.

## Se nem apareceu no histórico

Aí a regra nem foi acordada. Confira, nesta ordem:

1. **A automação está ativa?** Uma integração pela [API
   pública](/api/visao-geral/) também pode ligar e desligar regras — se ela
   desligou sozinha, pergunte quem integra.
2. **O aparelho está online?** Uma placa offline não reporta nada.
3. **O gatilho é o certo?** Um gatilho "ao acionar" não dispara quando o sensor
   desaciona.
4. **O canal do gatilho é o certo?** É o erro mais comum em placa com muitos
   canais.
5. **O sensor está acionando mesmo?** Abra a tela do aparelho e olhe o canal
   enquanto alguém aciona.
6. **É um agendamento?** Veja se a lista mostra **Próxima execução**, ou **Nunca
   dispara**. Veja [Agendamento](/guia/agendamento/).
7. **É um webhook?** Uma chamada recusada não chega a acordar a regra. Veja
   [Webhook de entrada](/integracoes/webhook-de-entrada/).

:::note[Um acontecimento muito atrasado é descartado]
Se, por uma falha do lado do servidor, um acontecimento só chega para ser
avaliado **mais de uma hora** depois de ter ocorrido, ele é descartado em vez
de executado. É de propósito: uma borda de terça não abre um portão na sexta.
:::

## Se a regra rodou, mas nada aconteceu

A regra e a entrega são coisas separadas. Se o histórico mostra **Disparou**, o
problema é do outro lado:

- **A saída não mexeu?** Veja [Comando não chegou no
  aparelho](/problemas/comando-nao-chegou/).
- **O aviso não chegou?** Veja [O aviso não chegou](/problemas/aviso-nao-chegou/)
  — inclusive a lista de alertas que não saíram, e como reenviar.
- **Mostra Falhou?** Uma ação deu erro, e a linha diz em qual ação a regra
  parou. Se a ação seguinte precisava rodar mesmo assim, marque **Continuar se
  esta ação falhar** na que falhou.
