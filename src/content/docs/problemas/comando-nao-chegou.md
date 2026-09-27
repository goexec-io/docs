---
title: O comando não chegou no aparelho
description: >-
  A regra rodou, a tela confirmou, e o relé não mexeu. Onde olhar.
sidebar:
  order: 10
---

Primeiro separe as duas coisas: **a regra rodar** e **o comando chegar** são
etapas diferentes, e falham por motivos diferentes.

Se a tela de Eventos **não** mostra a execução, o problema é anterior — veja [Por
que não tocou](/guia/por-que-nao-tocou/). Esta página é para quando ela mostra.

Se o que não chegou foi a **mensagem** — o WhatsApp, o e-mail —, e não o
acionamento, veja [O aviso não chegou](/problemas/aviso-nao-chegou/).

## 1. O aparelho está online?

Olhe a tela do aparelho. Se ele está offline, o comando não foi entregue.

"Offline" chega à tela em prazos diferentes, conforme o jeito que a placa caiu:

| Como caiu | Quanto leva para aparecer |
|---|---|
| A placa se desconectou normalmente | cerca de 1 segundo |
| Faltou energia, ou o cabo foi arrancado | cerca de 30 segundos |
| O servidor de mensagens caiu junto | até cerca de 3,5 minutos |

Ou seja: nos primeiros 30 segundos depois de um corte de energia, a tela ainda
pode mostrar a placa online. Veja [Quando a placa reinicia ou falta
energia](/hardware/quando-falta-energia/).

Causas comuns, em ordem: tomada, roteador reiniciado, sinal de Wi-Fi fraco no
ponto onde a placa está, senha da rede trocada. Nesse último caso a placa abre o
[portal de configuração](/hardware/portal-wifi/) sozinha.

## 2. O comando venceu antes de ser entregue

Todo comando carrega prazo de validade: **30 segundos** para um comando dado no
painel, **20 segundos** para um comando de automação. Enquanto o prazo vale, o
servidor reenvia se a placa não confirmar. Depois dele, o comando não vale mais
— e **não dispara** quando a placa voltar.

Isso é proposital, e é uma proteção: não há ninguém lá, e um portão que abre
sozinho duas horas depois é pior que um portão que não abriu.

Se a placa estava offline no momento da regra, é esse o caso. Acione de novo.

No painel, um comando manual sem resposta aparece como "Sem confirmação de
<saída> em 8 s. Estado revertido." — a tela volta a mostrar o último estado que
a placa confirmou, em vez de fingir que o relé mexeu.

## 3. A placa recusou o comando

A mensagem "O dispositivo recusou o comando para <saída>" quer dizer que o
comando **chegou**, mas a placa não o executou. Duas causas frequentes:

- **O relógio da placa não é confiável.** Sem saber a hora certa, a placa não
  consegue conferir o prazo de validade, e recusa em vez de arriscar executar um
  comando velho. Acontece em redes que bloqueiam a sincronização de hora — hotel,
  rede de visitante, rede corporativa. O servidor manda a hora pela conexão
  segura, e a placa volta a aceitar comandos quando a recebe.
- **A placa não está rodando a configuração que a tela mostra** — por exemplo,
  quando volta do estoque com a configuração vazia. A tela do aparelho avisa.

## 4. O aparelho está em modo de segurança

:::caution[Em validação]
O modo de segurança é recente e ainda está sendo validado em placa real.
:::

Se a tela do aparelho mostra o cartão **Aparelho em modo de segurança**, a placa
reiniciou de forma anormal três vezes seguidas e subiu com a configuração padrão
da placa — sem os canais e as automações que você configurou. Nesse estado ela
não aciona o que você espera.

Confira a instalação (fonte, fiação, o que mudou por último) e toque em
**Confirmar e reenviar a configuração**. Veja [Quando a placa reinicia ou falta
energia](/hardware/quando-falta-energia/#modo-de-segurança).

## 5. A saída está no canal que você acha que está

Abra a configuração de entradas e saídas do aparelho e confira o número do canal
que a automação aciona. Em placa com muitos canais é o erro mais frequente.

## 6. O teto de tempo truncou

Se o relé **mexeu**, mas por menos tempo do que você esperava, é o [tempo máximo
ligado](/guia/tempo-maximo-ligado/) do canal. Ele ganha da automação, sempre.

## 7. A fiação

Se o painel mostra a saída acionada e o equipamento não respondeu, o sistema fez
a parte dele. Confira:

- o relé está clicando? (dá para ouvir)
- a alimentação do equipamento acionado está presente?
- o relé aguenta a carga? Um relé de 10 A não aciona um motor de partida.
- o contato usado é o certo? Relé costuma ter NA e NF; ligar no errado inverte
  tudo.

## 8. A placa recusou o canal

Se o canal **sumiu** da tela depois de você salvar, a placa recusou o pino ao
aplicar a configuração. Veja [Por que o painel recusou esse
pino](/guia/pino-recusado/) — a tela do aparelho mostra o que foi recusado.

## Comandos enviados pela API

Se o comando saiu de um sistema seu pela [API pública](/api/visao-geral/):

- **202 não quer dizer que o relé mexeu.** Quer dizer que o comando foi
  registrado. Consulte o comando pelo endereço que veio no cabeçalho `Location`
  e espere um estado final: `acked` (a placa confirmou), `expired`, `failed` ou
  `dead_letter`.
- **O prazo padrão é de 30 segundos**, e você pode mudar com `expiresInMs`.
- **429** com o limite por aparelho quer dizer comandos demais para a mesma placa
  num minuto.
- Mande um `Idempotency-Key`: se a sua chamada for repetida, o relé não aciona
  duas vezes.

O passo a passo está em [Acionar uma saída pela API](/api/acionar-uma-saida/).
