---
title: Avisos e eventos no celular
description: >-
  O canal App no celular, a queda de uma placa chegando sem regra nenhuma, a
  aba Eventos com filtros, e o que o aplicativo faz quando o sinal oscila.
sidebar:
  order: 5
  label: Avisos e eventos
---

## O canal App no celular

É ele que faz uma regra tocar o seu telefone. Crie em **Mais → Canais → Novo
canal**, com o tipo **App no celular**.

Não há número nem endereço para preencher: **quem recebe são todos os celulares
da organização que instalaram o aplicativo e permitiram notificações.** Por
isso existe um só por organização.

:::note
Este tipo de canal só se cria **pelo aplicativo**. Depois de criado, ele
aparece também na lista de canais do painel web, e qualquer automação pode
usá-lo.
:::

### A queda de uma placa, sem regra

O canal tem a opção **Avisar também sobre eventos do sistema**, com **A partir
de qual gravidade**. Ligada, ela manda para o celular o que o próprio sistema
registra — uma placa que caiu, por exemplo — sem você escrever regra nenhuma.

Se você também tem uma regra de [dispositivo sem
comunicar](/guia/dispositivo-sem-comunicar/) mandando para este canal, a mesma
queda chega duas vezes: uma pelo sistema, outra pela regra.

### A permissão do celular

O aplicativo pede para mandar notificações **depois** do primeiro login, não
antes. Se você negar, o aplicativo funciona normalmente — só não toca. Para
mudar de ideia, libere as notificações do GoExec.io nos ajustes do celular.

No Android, os avisos chegam no canal de notificação **Alertas**, de alta
importância. Os avisos aparecem também com o aplicativo aberto.

Ao **sair** da conta, aquele celular para de receber.

## Os outros canais

Em **Mais → Canais** você vê e cria todos os [canais de
aviso](/guia/canais-de-aviso/) — e-mail, WhatsApp, Telegram, HTTP — com a
etiqueta de cada um: **Verificado**, **Sem teste**, **Aguardando confirmação**
ou **Inativo**.

Para WhatsApp e Telegram, o aplicativo abre a tela de confirmação logo depois
de criar o canal: **Copiar código**, **Abrir no WhatsApp** ou **Abrir no
Telegram**, e ela se atualiza sozinha quando o código chega — **Canal
confirmado.** Criar e confirmar do próprio celular que vai receber é o caminho
mais curto.

**Enviar teste** mostra a resposta de quem entregou, então dá para ver na hora
se o e-mail ou o endereço HTTP estão certos.

## A aba Eventos

Tudo o que aconteceu, do mais novo para o mais antigo: cada evento com a
gravidade (**Depuração**, **Informação**, **Aviso**, **Erro**, **Crítico**), a
hora, a mensagem e a placa. Role para carregar mais; arraste para baixo para
atualizar.

**Filtros** abre:

| Filtro | Como usar |
|---|---|
| **Severidade** | Uma ou várias |
| **Tipo** | O tipo exato, como `device.offline` |
| **Aparelho** | Uma placa, ou **Todos os aparelhos** |

**Limpar** volta tudo ao normal.

## A Visão geral

Dois números — placas conectadas do total, e automações ativas — e a lista
**Precisa de atenção**: os seis últimos eventos de aviso para cima. Quando está
tudo bem, ela diz: **Nada exigindo atenção agora.**

## Ao vivo, e quando o sinal cai

Eventos e Visão geral se atualizam sozinhos, sem você arrastar a tela. Quando a
conexão ao vivo não dá, uma faixa no pé da tela avisa:

| Faixa | O que quer dizer |
|---|---|
| **Instável** | Canal ao vivo caiu. Atualizando a cada 10 segundos. |
| **Sem conexão** | Sem conexão com o servidor. Os dados na tela podem estar velhos. |

Sem faixa, está ao vivo. Voltar ao aplicativo depois de um tempo em outro
aplicativo também atualiza os dados.

O aplicativo não guarda nada para ver sem internet: o que ele mostra é sempre
o que o servidor respondeu.

Mais sobre o funcionamento ao vivo, no painel e no aplicativo, em [Eventos ao
vivo](/guia/eventos-ao-vivo/).
