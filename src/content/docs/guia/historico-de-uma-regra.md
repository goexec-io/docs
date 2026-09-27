---
title: Histórico de uma regra
description: >-
  Toda vez que uma regra é avaliada fica registrado: se disparou, pulou,
  esperou ou falhou, e por quê. Como abrir e como ler cada motivo.
sidebar:
  order: 16
---

Na lista de automações, a contagem de execuções de cada regra — *"12
execuções"* — é um botão. Ele abre o **Histórico** daquela regra: toda
avaliação dela, não só os disparos.

:::note[O contador soma só os disparos]
Por isso "12 execuções" pode abrir um histórico com dezenove linhas: as outras
sete são vezes em que a regra foi acordada e não rodou.
:::

## Os quatro resultados

O filtro **Resultado** separa:

| Resultado | O que aconteceu |
|---|---|
| **Disparou** | As ações rodaram. A linha diz quantas — *"3 de 3 ações"* — e quanto levou |
| **Pulou** | A regra foi acordada e não rodou. A linha diz o motivo |
| **Esperou** | A decisão ficou para depois — um filtro de repetições contando, uma placa que ainda não completou o tempo sem comunicar. A linha diz quando ela vai ser reavaliada |
| **Falhou** | A regra começou e alguma ação não deu certo. A linha diz em qual ação parou |

**Abrir no feed de eventos** leva para a tela de Eventos, já filtrada nessa
regra.

O histórico guarda **13 meses**.

## Os motivos de "Pulou"

Cada motivo aponta para um conserto diferente — e em vários deles o conserto é
nenhum: a regra fez o que você pediu.

### Configuração da regra

| O que aparece | O que fazer |
|---|---|
| *A regra está desativada.* | Ative, se era para estar ativa |
| *A regra não tem nenhuma ação ativa para executar.* | Ligue **Ação ativa** em pelo menos uma ação |
| *Esta regra tem um ajuste que o servidor não consegue aplicar — um fuso horário que ele não conhece…* | Abra a regra e escolha o fuso de novo |

### Calendário e ritmo

| O que aparece | O que fazer |
|---|---|
| *O evento caiu num dia da semana em que a regra não está armada.* | Nada — é o pedido. Confira **Somente nestes dias** |
| *O evento caiu fora da janela de horário da regra.* | Nada — é o pedido. A linha mostra a faixa e o fuso |
| *O intervalo mínimo desde a execução anterior ainda não passou.* | Nada. A linha diz quanto faltava |
| *A regra atingiu o teto de execuções por hora.* | Nada, ou aumente o **Limite por hora** |

### O sinal

| O que aparece | O que fazer |
|---|---|
| *O sinal não se manteve no novo nível pelo tempo de estabilização.* | Nada, se foi um repique. Se acontece demais, o filtro está longo ou o sensor oscila — confira o [resistor](/guia/contato-na-nf/). A linha diz quanto o sinal segurou |
| *O nível do canal é desconhecido, então não dá para provar que ele se manteve.* | O canal nunca reportou. Confira a placa e a fiação |
| *O nível veio do estado desejado; este gatilho só aceita o que o dispositivo confirmou.* | Nada. Uma **Saída confirmada** só dispara pelo que a placa confirmou |

### As condições "somente se"

| O que aparece | O que fazer |
|---|---|
| *Uma entrada exigida não estava no nível que a regra pede.* | Nada — *"a porta estava fechada"*. A linha diz o que estava e o que a regra pedia |
| *Uma entrada exigida nunca reportou nível…* | É instalação, não regra: o canal nunca foi ligado, ou a placa nunca subiu |
| *Uma entrada exigida não reporta há mais tempo do que a regra aceita.* | Aquela placa está muda. Veja se ela aparece online |
| *O dispositivo reportou a transição, mas a última medida não satisfaz a condição.* | Quase sempre *"a temperatura já voltou"*. Se persistir, veja [Limiar e histerese](/guia/limiar-e-histerese/) |

### Dispositivo sem comunicar

| O que aparece | O que fazer |
|---|---|
| *O dispositivo voltou a comunicar antes do prazo…* | Nada — é justamente o caso que o prazo existe para tolerar |
| *O dispositivo desta regra não foi encontrado…* | A placa saiu da organização. Aponte a regra para outra placa |

### Do lado do servidor

| O que aparece | O que significa |
|---|---|
| *Outra execução desta mesma regra, para este mesmo evento, já estava em curso.* | O mesmo acontecimento chegou duas vezes, e só uma rodou. É a proteção contra acionar um relé em dobro |
| *A trava de execução única estava indisponível…* | O servidor não conseguiu garantir que a regra rodaria uma vez só, e preferiu não rodar. Se repetir, fale com o suporte |
| *Pulou por um motivo que este painel ainda não conhece (maintenance).* | A plataforma estava em manutenção programada, e as ações não rodaram |

## Próximo passo

[Por que não tocou](/guia/por-que-nao-tocou/) — o roteiro completo, inclusive
quando a regra nem aparece no histórico.
