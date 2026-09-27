---
title: Autenticação e escopos
description: >-
  Como a chave vai na chamada, o que cada escopo libera, e o que significam 401
  e 403.
sidebar:
  order: 3
---

Toda chamada leva a chave no cabeçalho `Authorization`, no formato Bearer:

```bash
curl -s -H "Authorization: Bearer an_pat_XXXXXXXXXXXX_..." \
  https://api.goexec.io/api/v1/devices
```

## Chave e sessão do painel não se misturam

O token que o navegador usa quando você entra no painel **não** funciona na
API, e a chave de API não funciona no painel. Se uma credencial "funciona no
navegador" e dá 401 aqui, é isso.

## O que a chave pode fazer

O poder de uma chave é a **interseção** de duas coisas:

1. os escopos marcados quando ela foi emitida;
2. o que o papel de quem a emitiu permite **agora**.

Rebaixar o dono de Administrador para Operador encolhe todas as chaves dele na
próxima chamada, sem precisar revogar nada. Remover o dono da organização
revoga as chaves.

## Os escopos

| Escopo | Libera | Papel mínimo |
|---|---|---|
| `devices:read` | Placas, canais, medições, telemetria | Visualizador |
| `commands:read` | Ler comandos e o histórico de comandos | Visualizador |
| `events:read` | Eventos | Visualizador |
| `automations:read` | Ler automações | Visualizador |
| `notifications:read` | O que as automações mandaram avisar | Visualizador |
| `commands:write` | Acionar saídas | Operador |
| `automations:write` | Ligar e desligar automações | Operador |
| `webhooks:ingest` | Disparar um webhook de entrada | Operador |

Como só Dono e Administrador emitem chaves, na prática quem emite tem todos os
escopos acima à disposição — mas marque só o que o sistema precisa. Uma
integração de leitura não deve carregar `commands:write`.

A lista de emissão mostra também `devices:write`, desabilitado com "Ainda não
disponível nesta versão da API": ele existe no vocabulário e entra quando
houver uma rota que o use.

### `webhooks:ingest`

Esse escopo não serve para nada dentro de `/api/v1`. Ele autoriza uma coisa
só: disparar o [webhook de entrada](/integracoes/webhook-de-entrada/) de uma
automação **da mesma organização** que exige autorização, no lugar do token
próprio da regra. A chave vai só no `Authorization: Bearer`.

:::caution[Uma chave só para o webhook ainda diz quem a emitiu]
Duas rotas não exigem escopo: `GET /api/v1/me`, que descreve a própria chave —
incluindo o nome e o e-mail de quem a emitiu —, e `POST /api/v1/me/revoke`,
que a desliga. Quem entrega essa chave a um fornecedor entrega esses dois
dados junto.
:::

## `GET /me`: o diagnóstico

```bash
curl -s -H "Authorization: Bearer $GOEXEC_TOKEN" \
  https://api.goexec.io/api/v1/me
```

Responde a organização, o papel do dono, os escopos da chave, as permissões
**efetivas**, os limites que valem e quando a chave expira. A diferença entre
os escopos da chave e as permissões efetivas **é** a explicação de um 403.

## 401 e 403

| Resposta | `code` | `details.reason` | O que fazer |
|---|---|---|---|
| 401 | `auth.required` | — | O cabeçalho `Authorization` não veio |
| 401 | `auth.token_invalid` | — | Não é uma chave de API (ou é o token do painel) |
| 401 | `auth.token_invalid` | `token_revoked` | A chave foi revogada — emita outra |
| 401 | `auth.token_invalid` | `token_expired` | Passou da data — emita outra |
| 401 | `auth.token_invalid` | `token_owner_removed` | Quem emitiu saiu da organização |
| 403 | `auth.forbidden` | `scope_missing` | A chave nunca recebeu esse escopo |
| 403 | `auth.forbidden` | `permission_missing` | O papel do dono foi rebaixado |

Um recurso de **outra** organização responde **404**, igual a um que não
existe. É de propósito: a resposta não confirma o que existe fora da sua
organização.

Os outros erros — 404, 409, 422, 429 e 503 — estão em
[Limites, erros e versões](/api/limites-erros-e-versoes/).
