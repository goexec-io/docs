---
title: Eventos ao vivo
description: >-
  O painel e o aplicativo mostram o que acontece sem você recarregar. Como
  saber se a tela está ao vivo, e o que acontece quando a conexão cai.
sidebar:
  order: 15
---

Uma placa que cai, um sensor que aciona, uma regra que dispara: tudo isso
aparece na tela **na hora**, sem recarregar.

No painel, isso vale para **Dispositivos**, **Visão geral** e **Eventos**. No
aplicativo, para as abas **Visão geral** e **Eventos**.

## Como saber se a tela está ao vivo

O painel mostra o estado da **Conexão em tempo real**:

| Estado | O que significa |
|---|---|
| **Ao vivo** | Atualizações chegando em tempo real |
| **Conectando** | Abrindo o canal ao vivo |
| **Instável** | O canal ao vivo caiu. A tela se atualiza sozinha a cada 10 segundos |
| **Sem conexão** | Sem conexão com o servidor. Os dados na tela podem estar velhos |

Em **Instável**, nada se perde: a tela só fica até 10 segundos atrasada, até o
canal ao vivo voltar. **Reconectar agora** tenta de novo sem esperar.

O aplicativo faz o mesmo: ao vivo quando dá, e a cada 10 segundos quando não
dá.

:::note[Até 8 telas ao vivo por pessoa]
Cada aba do navegador e cada aplicativo aberto é uma conexão ao vivo. A partir
da nona, a tela nova não recebe as atualizações ao vivo — feche abas que não
está usando.
:::

## A tela de Eventos

**Tudo que aconteceu, do mais recente para o mais antigo.** No painel, o filtro
é por **Severidade**: Depuração, Informação, Aviso, Erro, Crítico.

No aplicativo, a folha **Filtros** tem mais dois:

| Filtro | Para quê |
|---|---|
| **Tipo** | O tipo exato do evento, como `device.offline` |
| **Aparelho** | Uma placa só, ou **Todos os aparelhos** |

Os eventos ficam guardados por 13 meses.

Para ver só o que aconteceu com **uma** regra — inclusive as vezes em que ela
não rodou —, use o [histórico da regra](/guia/historico-de-uma-regra/).

## Próximo passo

[Histórico de uma regra](/guia/historico-de-uma-regra/) — disparou, pulou,
esperou ou falhou, e por quê.
