---
title: Variáveis da mensagem
description: >-
  O que você pode escrever dentro de {{ }} numa notificação ou numa chamada de
  URL, e o que cada nome vira quando a regra dispara.
sidebar:
  order: 13
---

A **Mensagem** e o **Assunto** de uma notificação, e o **Corpo** de uma
**Chamar URL**, aceitam variáveis entre chaves duplas. Quando a regra dispara,
cada uma vira o valor daquele instante:

```text
{{device_name}}: temperatura em {{value}} {{unit}}.
```

vira

```text
Câmara fria 2: temperatura em 9.4 °C.
```

## A lista completa

| Variável | O que vira |
|---|---|
| `{{automation}}` | O nome da automação |
| `{{automation_id}}` | O número da automação |
| `{{trigger}}` | O tipo de gatilho: `device_input`, `device_output_confirmed`, `inbound_webhook`, `schedule` ou `device_offline` |
| `{{edge}}` | O sentido da mudança: `rising` (acionou) ou `falling` (desacionou). Vazio quando não há mudança de nível |
| `{{occurred_at}}` | O instante do acontecimento, em formato ISO e em UTC |
| `{{value}}` | A última leitura do canal do gatilho |
| `{{unit}}` | A unidade dessa leitura |
| `{{device_name}}` | O nome da placa |
| `{{device_code}}` | O identificador público da placa |
| `{{device_status}}` | A situação da placa: `online`, `offline`… |
| `{{device_id}}` | O número interno da placa |
| `{{channel_id}}` | O número interno do canal |
| `{{offline_since}}` | Desde quando a placa está sem comunicar, como `26/09/2026 14:30`, no fuso da automação |
| `{{offline_for_minutes}}` | Há quantos minutos ela está sem comunicar |

Com **Anexar a foto** marcado, entram mais três — veja [Fotos da
câmera](/guia/fotos-da-camera/):

| Variável | O que vira |
|---|---|
| `{{capture.url}}` | Um link para a foto, que expira em 24 horas |
| `{{capture.id}}` | O identificador da foto |
| `{{capture.state}}` | `ready` quando a foto chegou; `failed` ou `expired` quando não |

## Quando uma variável sai vazia

Uma variável que não se aplica ao acontecimento sai **vazia**, nunca como a
palavra `None` nem como o `{{nome}}` cru:

- `{{value}}` e `{{unit}}` saem vazios num contato seco, que não mede número.
- Saem vazios **também** quando a última leitura já não é atual. Numa câmara
  fria cujo alarme disparou porque a sonda parou de responder, a mensagem não
  vai dizer "4.0 °C" com o último número que a sonda morta mandou — uma
  mensagem que diz menos é melhor que uma que diz algo falso.
- As variáveis de placa saem vazias num webhook ou num agendamento, que não vêm
  de placa nenhuma.
- `{{offline_since}}` e `{{offline_for_minutes}}` só são preenchidas enquanto a
  placa está sem comunicar. São feitas para o gatilho [Dispositivo sem
  comunicar](/guia/dispositivo-sem-comunicar/).

## Nome que não existe sai vazio

Um nome fora da lista não dá erro: ele simplesmente some da mensagem. Se uma
mensagem chegou com um buraco no meio, confira a grafia da variável.

:::caution[`{{device}}` não é uma variável de automação]
O exemplo dentro do campo de mensagem do painel sugere `{{device}}`, mas numa
automação ele sai vazio. Use `{{device_name}}`.

O mesmo vale para o **Identificador** de um canal, como `sensor_porta`: ele não
vira variável. Para dizer qual sensor acionou, escreva o nome no próprio texto
da mensagem.
:::

## Numa chamada de URL

Só o **Corpo** recebe as variáveis. A URL e os cabeçalhos vão exatamente como
foram escritos.

O valor entra no corpo como texto puro, sem nenhum tratamento. Num corpo JSON,
um nome de placa com aspas — `Portão "B"` — quebra o documento. Se você controla
os nomes, evite aspas neles; se não controla, prefira variáveis numéricas como
`{{device_id}}`.

## Próximo passo

[Fotos da câmera](/guia/fotos-da-camera/) — capturar, anexar e o que cada
destino recebe.
