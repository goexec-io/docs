---
title: Acionar uma saída pela API
description: >-
  Mandar um pulso para um relé e saber se a placa de fato executou — 202 não
  quer dizer que a saída mudou.
sidebar:
  order: 4
---

Acionar uma saída exige o escopo `commands:write`.

```bash
curl -si -X POST \
  -H "Authorization: Bearer $GOEXEC_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: portao-20260926-0815" \
  -d '{"op":"pulse","pulseMs":500,"reason":"portaria"}' \
  https://api.goexec.io/api/v1/devices/<placa>/io/<canal>/command
```

- `<placa>` é o id numérico que a própria API devolve, ou o identificador da
  placa (o que aparece no painel e na etiqueta).
- `<canal>` é o índice do canal na placa.

## O corpo

| Campo | Valores | Obrigatório |
|---|---|---|
| `op` | `set` · `pulse` · `toggle` | sim |
| `level` | `on` · `off` — para `set` | depende |
| `pulseMs` | 1 a 86 400 000 (24 h) — para `pulse` | depende |
| `expiresInMs` | 1 000 a 3 600 000; padrão **30 000** | não |
| `reason` | Texto livre, até 64 caracteres | não |

Os nomes são exatamente esses, em camelCase. Um campo desconhecido — como
`pulse_ms` — é recusado com 422 nomeando o campo, e não ignorado. Um pulso sem
duração nunca sai por engano.

## 202 quer dizer "registrado"

A resposta é **202**, com o `commandId` e um cabeçalho `Location`. Isso
significa que o comando entrou no registro e está a caminho — **não** que o relé
mudou de posição. Quem responde por isso é a placa, e a prova é o estado do
comando:

```bash
curl -s -H "Authorization: Bearer $GOEXEC_TOKEN" \
  "https://api.goexec.io/api/v1/commands/<commandId>?wait=5000"
```

Leia essa consulta com o escopo `commands:read`.

| `state` | Significa |
|---|---|
| `pending` · `sent` | Ainda a caminho |
| `acked` | A placa confirmou. Com `result: "ok"`, executou |
| `expired` | A placa não pegou o comando dentro da validade |
| `failed` | A placa recusou |
| `dead_letter` | O envio desistiu |

Num portão, `expired` é exatamente o que você precisa saber: o comando **não**
vai acontecer mais tarde, de surpresa. Por isso a validade padrão é curta — 30
segundos. Um comando que chega duas horas depois abre um portão que ninguém
está olhando.

### Esperar pela confirmação

`?wait=<ms>` segura a resposta até o estado ficar final, com teto de **10 000
ms**. Um valor maior é reduzido ao teto, não recusado. Cada chave pode ter até
**duas esperas simultâneas**; a terceira volta 429. A espera não substitui
reconsultar: se a resposta vier com um estado não final, pergunte de novo.

## Não abrir o portão duas vezes

Mande sempre um `Idempotency-Key` — até 64 caracteres de letras, números e
`_ : . -`.

- A mesma chave com o **mesmo corpo** em até **6 horas** responde **200**, com
  o mesmo `commandId` e o cabeçalho `Idempotent-Replayed: true`. Nada novo é
  enfileirado.
- A mesma chave com **corpo diferente** é 422, `idempotency_key_reused`.

É o que resolve o caso mais chato de uma integração: o `POST` estourou o tempo
sem resposta. Repita com a mesma `Idempotency-Key` e você sabe que o portão
abriu uma vez só.

## Ensaiar sem mover nada

`?dryRun=true` confere a placa, o canal e o corpo e responde **200** com
`{"wouldEnqueue": true, "normalized": {…}}`. Nada vai para a placa, nada entra
no registro. É o jeito de testar uma integração contra a instalação de verdade
sem acionar um relé.

```bash
curl -s -X POST -H "Authorization: Bearer $GOEXEC_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"op":"pulse","pulseMs":500,"reason":"ensaio"}' \
  "https://api.goexec.io/api/v1/devices/<placa>/io/<canal>/command?dryRun=true"
```

## Quando o comando é recusado

| Resposta | Por quê |
|---|---|
| 404 | A placa ou o canal não existe, ou não é da sua organização |
| 409 | A placa está desabilitada, ou num estado em que não aceita comando |
| 422 | Corpo inválido — `details.field` diz qual campo |
| 429 | Mais de 60 comandos por minuto na chave, ou 20 para a mesma placa |
| 503 | Janela de manutenção — tente de novo depois |

Um comando registrado que terminou em `expired` ou `failed` tem as mesmas
causas de um comando do painel que não chegou — veja
[O comando não chegou no aparelho](/problemas/comando-nao-chegou/).
