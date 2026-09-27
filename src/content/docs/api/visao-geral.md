---
title: API pública — visão geral
description: >-
  O que outro sistema consegue fazer com a sua instalação pela API, e o que ele
  precisa para começar.
sidebar:
  order: 1
  label: Visão geral
---

A API pública deixa **um sistema seu** — um ERP, um sistema de portaria, um
painel de monitoramento — ler a frota e acionar saídas sem uma sessão do
painel. É uma API de servidor para servidor: a credencial é uma
[chave de API](/api/chaves-de-api/) que fica guardada no seu servidor.

| | |
|---|---|
| Endereço base | `https://api.goexec.io/api/v1` |
| Credencial | `Authorization: Bearer an_pat_…` |
| Contrato | OpenAPI, em `https://api.goexec.io/api/v1/openapi.json` |
| Formato | JSON, instantes em UTC, durações em milissegundos |

O contrato é público e não precisa de chave: dá para gerar um cliente ou abrir
num visualizador de OpenAPI antes de emitir qualquer credencial.

```bash
curl -s https://api.goexec.io/api/v1/openapi.json | head -40
```

## O que dá para fazer

- **Ler a frota:** as placas da organização, o estado de cada canal de entrada
  e saída, a telemetria da placa.
- **Acionar uma saída** e saber se a placa confirmou — veja
  [Acionar uma saída pela API](/api/acionar-uma-saida/).
- **Acompanhar o que aconteceu:** eventos, medições, o histórico de comandos
  de uma placa, e o que as automações mandaram avisar.
- **Ligar e desligar uma automação.**

As rotas estão todas em
[Ler o estado, os eventos e o histórico](/api/ler-estado-eventos-e-historico/).

## O primeiro teste

Com a chave na mão, a primeira chamada é sempre a mesma:

```bash
export GOEXEC_TOKEN='an_pat_XXXXXXXXXXXX_...'
curl -s -H "Authorization: Bearer $GOEXEC_TOKEN" \
  https://api.goexec.io/api/v1/me
```

Ela responde de qual organização é a chave, qual o papel de quem a emitiu, quais
escopos ela tem, quando expira e quais limites valem. Se algo der 401 ou 403
mais tarde, é aqui que você olha primeiro — veja
[Autenticação e escopos](/api/autenticacao-e-escopos/).

## A seção "API" do painel

No menu do painel, **API** monta uma chamada de exemplo com os dados da sua
organização: você escolhe a chave, a rota, a placa ou a automação, e ela gera o
`curl` ou o JavaScript pronto para colar. Se a chave escolhida não tem o escopo
que a rota exige, a tela avisa que a chamada responderia 403.

## Dois caminhos parecidos que não são a API

- O **[webhook de entrada](/integracoes/webhook-de-entrada/)** é um endereço
  que dispara *uma* automação. Serve para um sistema de fora cutucar uma regra;
  não lê nada nem aciona saída diretamente.
- A **[ação "Chamar URL"](/integracoes/acao-http/)** é o caminho inverso: uma
  automação sua chamando o seu sistema. Ela pode ir
  [assinada](/integracoes/assinatura-do-webhook/).

## O que a API não faz

- **Não serve a navegador de terceiro.** Não há CORS nem OAuth: a chave é
  segredo de servidor, e uma chave dentro de uma página web é uma chave
  publicada.
- **Não tem fotos da câmera.** As capturas ficam no painel e seguem nos avisos.
- **Não é tempo real.** Não há streaming; acompanhe eventos consultando
  `/events` com cursor.
- **Não tem SDK oficial nem ambiente de testes hospedado.** Para ensaiar sem
  mover um relé, use o `dryRun` da rota de comando.
- **Não cria nem apaga placas, automações ou canais.** Pela API você lê tudo e,
  por enquanto, só escreve duas coisas: comandos de saída e o liga/desliga de
  uma automação.
