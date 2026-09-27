---
title: Agendamento
description: >-
  Regras que rodam pelo relógio: dias e horário ou expressão cron, onde ver a
  próxima execução, e o que acontece depois de uma queda do servidor.
sidebar:
  order: 7
---

O gatilho **Agendamento** dispara por horário, sem depender de nenhuma placa.
"Todo dia às 19h, ligue a luz da fachada" é uma regra de agendamento.

## Dois jeitos de dizer o horário

O campo **Como definir o horário** tem duas opções:

| Opção | Para quê |
|---|---|
| **Dias e horário** | O caso comum: escolha a que horas e em quais dias |
| **Expressão cron** | Repetições que os controles não cobrem — "a cada 15 minutos", "no dia 1 de cada mês" |

### Dias e horário

Você marca um ou mais **Horários** e os **Dias da semana**. Sem nenhum dia
marcado, vale para todos.

:::caution[Todos os horários precisam ter o mesmo minuto]
07:30 e 19:30 cabem na mesma regra; 07:30 e 19:00 não. É uma limitação do cron,
que é como o agendamento é guardado, e não da tela. Para dois minutos
diferentes, crie duas regras.
:::

A tela mostra a **Expressão gerada** logo abaixo. Se você abrir uma regra cuja
expressão usa algo que os controles não desenham — um passo, um intervalo, um
dia do mês —, ela abre direto como cron. Nada foi alterado; muda só a tela em
que ela é editada.

### Expressão cron

Cinco campos, nesta ordem: **minuto hora dia mês dia-da-semana**.

| Expressão | Quando |
|---|---|
| `0 19 * * *` | Todo dia às 19:00 |
| `30 7 * * 1-5` | Segunda a sexta, às 07:30 |
| `*/15 * * * *` | A cada 15 minutos |
| `0 8 1 * *` | No dia 1 de cada mês, às 08:00 |

Duas regras do cron que pegam todo mundo uma vez:

- **Domingo é 0 e também 7.** `0 19 * * 7` e `0 19 * * 0` são a mesma noite.
- **Dia do mês e dia da semana se somam, não se cruzam.** `0 0 13 * 5` é "todo
  dia 13 **e** toda sexta" — não "sexta-feira 13".

## O fuso horário

Toda regra de agendamento tem um **Fuso horário**, e o horário é o daquele fuso
— não o do servidor. Uma regra nova começa com o fuso do seu navegador.

## Expressão impossível é recusada

Uma expressão malformada, ou uma que nunca pode acontecer — `0 0 31 2 *` pede o
dia 31 de fevereiro —, é **recusada ao salvar**. Hoje a recusa aparece com o
código `cron_invalid` na mensagem.

Antes, uma regra assim ficava salva, ativa, e simplesmente nunca rodava, sem
deixar rastro. É o pior tipo de defeito: o que parece funcionar.

## Onde ver a próxima execução

Na lista de automações, uma regra de agendamento ativa mostra **Próxima
execução** e quando ela vai ser — "em 3 horas", por exemplo.

Se aparecer **Nunca dispara: nenhuma data atende ao agendamento**, a regra foi
salva antes dessa conferência existir e tem uma expressão impossível. Abra e
corrija.

## Depois de uma queda do servidor

Se o servidor ficou fora do ar por alguns minutos, os agendamentos daquele
intervalo **rodam atrasados, em ordem, uma vez cada** — até 10 minutos para
trás.

Uma parada maior que isso perde os minutos excedentes, de propósito: uma
sirene das 07:00 tocando às 11:00 porque o servidor voltou às 11:00 é pior que
uma sirene que não tocou.

## Próximo passo

[Filtro, intervalo e janela](/guia/filtro-intervalo-e-janela/) — os controles
que decidem se uma regra acordada realmente roda.
