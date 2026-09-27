---
title: Limites, erros e versões
description: >-
  Quantas chamadas cabem por minuto, como ler um erro, e o que pode mudar na
  API sem aviso.
sidebar:
  order: 6
---

## Limites de uso

Os limites são contados em janelas de 60 segundos e são **os mesmos em todos
os planos**:

| Limite | Teto | Contado por |
|---|---|---|
| Chamadas | 600 | chave |
| Chamadas | 3 000 | organização, todas as chaves juntas |
| Comandos | 60 | chave |
| Comandos para a mesma placa | 20 | placa, todas as chaves juntas |

O último é por placa de propósito: um teto só por chave não protegeria uma
placa alvo de duas integrações.

Falhas de autenticação são contadas por endereço IP: **60 em 15 minutos**. Um
script que testa chaves erradas é barrado cedo — e isso vale também para a
chave certa enviada do mesmo endereço, até a janela passar. Se você está colando
chaves no meio de um incidente, confira o valor antes de gastar essas tentativas.

`GET /api/v1/me` devolve em `rateLimits` os números que valem de fato.

### Os cabeçalhos

Toda resposta de sucesso traz o saldo da chave:

| Cabeçalho | Conteúdo |
|---|---|
| `X-RateLimit-Limit` | O teto da janela |
| `X-RateLimit-Remaining` | Quanto sobra |
| `X-RateLimit-Reset` | Quando a janela reinicia |

Leia esses três em vez de calibrar o seu cliente batendo no teto. Um **429**
traz `Retry-After`, em segundos, e em `details` o `scope` que estourou
(`token`, `org`, `command`, `device` ou `wait`) e o `retryAfterMs`.

As duas exceções: `POST /me/revoke` e o contrato `openapi.json` não gastam
limite e não trazem esses cabeçalhos.

## Como ler um erro

Toda recusa tem o mesmo corpo:

```json
{
  "code": "auth.forbidden",
  "message": "Forbidden.",
  "details": {"required": ["commands:write"], "reason": "scope_missing"},
  "correlationId": "01J8Z3K9V0X1Y2Z3A4B5C6D7E8"
}
```

Decida por `code` e `details.reason`, **nunca** por `message` — é texto em
inglês para gente e pode mudar.

| Status | `code` | Quando |
|---|---|---|
| 401 | `auth.required` · `auth.token_invalid` | Veja [Autenticação e escopos](/api/autenticacao-e-escopos/) |
| 403 | `auth.forbidden` | Falta escopo, ou o papel do dono foi rebaixado |
| 404 | `resource.not_found` | Não existe, ou é de outra organização |
| 409 | `resource.conflict` | A placa está desabilitada, ou não aceita o pedido agora |
| 422 | `validation.failed` | `details.field` diz o campo, `details.reason` a regra |
| 429 | `auth.rate_limited` | Um limite estourou — veja acima |
| 503 | `service.maintenance` | Janela de manutenção |
| 503 | `internal.error` | Com `rate_limiter_unavailable`: o controle de limites está fora |

O `correlationId` também vem no cabeçalho `X-Correlation-ID`. Cite-o num pedido
de suporte a [support@goexec.io](mailto:support@goexec.io): é o que identifica a chamada nos registros.

### Os dois 503

- **`service.maintenance`**: numa janela de manutenção, as **escritas** são
  recusadas até o fim da janela; as leituras seguem. `details.retryAfterMs` diz
  quanto falta.
- **`internal.error` com `rate_limiter_unavailable`**: se o controle de limites
  cair, a API inteira responde 503, com `Retry-After: 5` — inclusive leituras.
  É de propósito: esta API aciona relés, e ela prefere parar a funcionar sem
  freio.

Trate os dois do mesmo jeito — espere e repita —, mas registre separado: o
primeiro é planejado, o segundo é incidente.

## Versões

O caminho `/api/v1` é fixo. A versão do contrato (hoje `1.0.0`) está em
`info.version` do OpenAPI e não acompanha a versão do produto.

Estas mudanças acontecem **sem aviso** e sem mudar o caminho:

- campo novo numa resposta;
- valor novo numa lista de valores de resposta;
- rota nova;
- parâmetro opcional novo.

O seu cliente precisa ignorar o que não conhece. Se ele quebra com um campo
novo, ele quebra numa terça-feira qualquer.

Uma mudança incompatível nasce em `/api/v2`. A partir daí, a `v1` passa a
responder os cabeçalhos `Deprecation`, `Sunset` (a data de desligamento) e
`Link` (para as notas da mudança), e continua funcionando por **no mínimo 6
meses**.
