---
title: Ler o estado, os eventos e o histórico
description: >-
  As rotas de leitura da API — placas, canais, eventos, medições, comandos,
  automações e avisos —, com paginação e fuso.
sidebar:
  order: 5
---

Todas as rotas abaixo ficam sob `https://api.goexec.io/api/v1`. O contrato
OpenAPI tem os campos de cada resposta; esta página diz para que serve cada
rota.

## Placas e canais — `devices:read`

| Rota | O que responde |
|---|---|
| `GET /devices` | As placas da organização, mais novas primeiro |
| `GET /devices/{ref}` | Uma placa |
| `GET /devices/{ref}/io` | Todos os canais: estado informado pela placa e estado desejado |
| `GET /devices/{ref}/io/{canal}` | Um canal |
| `GET /devices/{ref}/io/{canal}/measurements` | A série numérica de um canal |
| `GET /devices/{ref}/telemetry` | A saúde da própria placa: memória, sinal, tempo ligada |

`{ref}` aceita o id numérico que a API devolve ou o identificador da placa que
aparece no painel.

`/devices` filtra por `status` (`provisioning`, `online`, `offline`,
`disabled`) e aceita uma busca em `search`.

**Medições.** Escolha a janela com `range` — `1h`, `6h`, `24h` (padrão), `7d`,
`30d`, `90d` ou `1y` — ou com `from` e `to`. Com `agg` (`raw`, `avg`, `min`,
`max`, `median`) e `bucketMs` (de 1 000 a 86 400 000) você pede a série
agregada em faixas. As janelas de 90 dias e de um ano passam do que as leituras
brutas guardam, então pedem uma faixa por hora ou por dia.

**Telemetria.** `range` vai de `1h` a `30d`.

## Comandos — `commands:read`

| Rota | O que responde |
|---|---|
| `GET /commands/{commandId}` | Um comando, com `?wait` para esperar o fim |
| `GET /devices/{ref}/commands` | O que a placa recebeu, mais novo primeiro |

A lista filtra por `channelIndex`, `state`, `since` e `until`. O significado de
cada estado está em [Acionar uma saída](/api/acionar-uma-saida/).

## Eventos — `events:read`

```bash
curl -s -H "Authorization: Bearer $GOEXEC_TOKEN" \
  "https://api.goexec.io/api/v1/events?deviceId=42&since=2026-09-20T12:00:00Z&limit=100"
```

`GET /events` responde o que aconteceu na organização, mais novo primeiro.
Filtra por `deviceId`, `channelId`, `automationId`, `since`, `until`, e por
`type` e `severity` — esses dois podem ser repetidos na mesma chamada. As
severidades são `debug`, `info`, `warning`, `error` e `critical`.

Um evento pode trazer o id de um comando (`cmdId`). Ele serve para cruzar as
duas coisas; ler o comando em si exige `commands:read`.

## Automações

| Rota | Escopo | O que faz |
|---|---|---|
| `GET /automations` | `automations:read` | As regras, com filtro `active` |
| `GET /automations/{id}` | `automations:read` | Uma regra, com as ações |
| `POST /automations/{id}/active` | `automations:write` | Liga ou desliga a regra |

Para ligar ou desligar, o corpo tem um campo só, e obrigatório:

```bash
curl -s -X POST -H "Authorization: Bearer $GOEXEC_TOKEN" \
  -H "Content-Type: application/json" -d '{"active": false}' \
  https://api.goexec.io/api/v1/automations/<id>/active
```

Um corpo vazio ou com outro nome de campo é recusado, e não lido como
"desligar".

## O que as automações avisaram — `notifications:read`

`GET /deliveries` lista cada aviso que o sistema tentou entregar — e-mail,
WhatsApp, Telegram, chamada HTTP —, mais novo primeiro. Filtra por `state`,
`channelId` e `automationId`.

| `state` | Significa |
|---|---|
| `pending` | Na fila. Depois de uma falha, é uma nova tentativa que ainda vai acontecer |
| `processing` | Saindo agora |
| `delivered` | Entregue |
| `dead_letter` | O envio desistiu — veja [Canais de aviso](/guia/canais-de-aviso/) |

## Paginação

As listas usam **cursor**, nunca número de página:

```text
GET /api/v1/events?limit=100
GET /api/v1/events?limit=100&cursor=<nextCursor da resposta anterior>
```

- `limit` vai de 1 a 200; o padrão é 50.
- `nextCursor` ausente ou `null` quer dizer que acabou.
- O cursor é opaco. Não tente montar um: um valor que o servidor não emitiu é
  422.
- O cursor fixa a lista no tempo. O que foi criado durante a leitura aparece na
  próxima varredura, não no meio desta.

## Tempo

Todo instante que você **envia** (`since`, `until`, `from`, `to`) precisa ter
fuso: `2026-09-20T12:00:00Z` ou `2026-09-20T09:00:00-03:00`. Sem fuso, a
resposta é 422 com `datetime_not_aware`.

Não é rigor à toa: adivinhar o fuso produziria um relatório três horas mais
curto que **parece** um relatório.

Todo instante que você **recebe** está em UTC, com `Z`. Durações são inteiros
em milissegundos, e o nome do campo termina em `Ms`.
