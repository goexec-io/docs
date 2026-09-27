---
title: Conferir a assinatura do webhook
description: >-
  Como o seu servidor prova que uma chamada da ação "Chamar URL" saiu mesmo do
  GoExec.io, e não de alguém que descobriu o endereço.
sidebar:
  order: 3
---

Quem descobre o endereço do seu sistema consegue chamá-lo fingindo ser o
GoExec.io. A assinatura fecha essa porta: cada chamada leva uma prova, feita com
um segredo que só você e o GoExec.io conhecem.

## Ligar a assinatura

Na ação **Chamar URL (webhook)** da automação, preencha **Segredo de
assinatura**. A dica na tela resume: "Combine uma string com quem recebe".

- De **16 a 2000** caracteres. Use algo aleatório, não uma palavra.
- Depois de salvo, ele **não aparece de novo** — a tela só avisa "Um segredo de
  assinatura já está salvo". Para trocar, preencha outro.
- Para parar de assinar, marque **Parar de assinar e apagar o segredo salvo**.

Guarde o mesmo segredo no sistema que recebe.

## O que chega

Com o segredo preenchido, toda chamada leva três cabeçalhos a mais:

| Cabeçalho | Conteúdo |
|---|---|
| `X-GoExec-Signature` | `t=<instante>,v1=<assinatura>` |
| `X-GoExec-Delivery` | a identidade da entrega — **a mesma** em todas as tentativas da mesma mensagem |
| `X-GoExec-Event` | o tipo de gatilho que disparou a regra, como `device_input`, `schedule` ou `inbound_webhook` |

- `t` é o instante do envio, em segundos desde 1970 (Unix).
- `v1` é o HMAC-SHA256 do texto `"{t}.{corpo}"` com o seu segredo, em
  hexadecimal minúsculo.

Sem segredo na ação, nenhum dos três cabeçalhos vem.

## Como conferir

1. **Guarde o corpo cru**, os bytes exatamente como chegaram, antes de
   interpretar o JSON. Se você interpretar e serializar de novo, os espaços e
   separadores mudam e a assinatura não fecha — sem que nada, de nenhum dos dois
   lados, diga por quê.
2. **Separe `t` e `v1`** do cabeçalho `X-GoExec-Signature`.
3. **Confira a idade**: recuse se a diferença entre o seu relógio e `t` passar de
   **300 segundos**, para mais **ou para menos**. Sem limite, você aceita uma
   repetição de ontem; sem olhar os dois sentidos, um `t` carimbado no futuro
   passa para sempre. Mantenha o relógio do seu servidor sincronizado.
4. **Calcule** o HMAC-SHA256 de `"{t}.{corpo}"` com o segredo.
5. **Compare** com `v1` usando uma comparação de tempo constante, nunca `==` — a
   comparação comum vaza, pelo tempo que leva, quantos caracteres do começo
   batem.

Se o cabeçalho não veio e o seu sistema exige assinatura, **recuse**. Ausência
não é "confio nesta".

### Exemplo em Python

Só com a biblioteca padrão:

```python
import hashlib
import hmac
import time

TOLERANCIA_S = 300


def assinatura_valida(segredo: str, cabecalho: str, corpo: bytes) -> bool:
    """`corpo` são os bytes crus da requisição, antes de qualquer json.loads."""
    partes = dict(p.split("=", 1) for p in cabecalho.split(",") if "=" in p)
    try:
        t = int(partes["t"])
        recebida = partes["v1"]
    except (KeyError, ValueError):
        return False

    if abs(time.time() - t) > TOLERANCIA_S:
        return False

    assinado = f"{t}.".encode() + corpo
    esperada = hmac.new(segredo.encode(), assinado, hashlib.sha256).hexdigest()
    return hmac.compare_digest(esperada, recebida)
```

Num servidor Flask, por exemplo, o corpo cru é `request.get_data()` e o
cabeçalho é `request.headers.get("X-GoExec-Signature", "")`.

## Tentativas e repetição

Se o seu sistema não responde a tempo, ou responde com erro temporário (um 5xx,
por exemplo), a ação tenta de novo — quantas vezes, está no campo **Tentativas**
da ação. Duas consequências:

- **Cada tentativa é assinada de novo**, com um `t` novo. A janela de 300 s conta
  a partir do envio, não do evento que disparou a regra.
- **`X-GoExec-Delivery` não muda** entre tentativas. Use esse valor para
  reconhecer uma repetição e não processar a mesma mensagem duas vezes.

## O que a assinatura não cobre

Ela prova **de onde** a chamada veio e que o corpo não foi alterado. Ela não
esconde o conteúdo — para isso, use `https://` no endereço da ação.

Só a ação **Chamar URL (webhook)** de uma automação assina. Um canal do tipo
HTTP, em **Canais**, não tem segredo de assinatura.
