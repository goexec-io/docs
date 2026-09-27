---
title: O que é o GoExec.io
description: >-
  Uma placa lê entradas e aciona saídas; um servidor decide o que fazer e avisa
  quem precisa saber. Sem escrever código.
sidebar:
  order: 1
---

Uma placa pequena, ligada na tomada e no seu Wi-Fi, observa coisas do mundo
físico — um contato que abriu, um sensor que passou de uma temperatura, um botão
que alguém apertou. Quando a condição que **você** escreveu acontece, ela aciona
uma saída (um relé, uma sirene) e avisa quem precisa saber.

A frase inteira do produto cabe em quatro palavras: **qualquer entrada, qualquer
saída.**

## O que dá para combinar hoje

**De um lado, o que acorda uma regra:**

- contato seco, normalmente aberto ou normalmente fechado — porta, boia, botão,
  chave de fim de curso;
- presença ou movimento (sensor PIR);
- temperatura passando de um limite, com o limite avaliado **na própria placa**;
- confirmação de que uma saída ligou de verdade;
- um aparelho que ficou sem comunicar por mais tempo do que você tolera;
- uma chamada HTTP que outro sistema faz;
- horário e agenda.

**Do outro, o que ela faz:**

- aciona um relé — em pulso, em trava, ou por um tempo determinado;
- manda WhatsApp, Telegram, e-mail ou um aviso no
  [aplicativo do celular](/aplicativo/o-aplicativo/);
- tira uma foto com uma [ESP32-CAM](/hardware/esp32-cam/) e a manda junto com o
  aviso;
- chama um endereço HTTP (é assim que Slack e Discord entram), com uma
  assinatura que o destino pode conferir.

Uma regra pode ter várias condições, e você escolhe se elas são alternativas
("ou também quando") ou obrigatórias ("somente se").

**E de fora para dentro:** um sistema seu pode ler o estado das placas, acionar
uma saída e consultar o histórico pela [API pública](/api/visao-geral/), com uma
chave de acesso que você emite e revoga no painel.

## A ideia que sustenta tudo

**O aparelho não sabe nada sobre a instalação onde está.**

Ele descobre no boot. Ao ligar, o servidor entrega o mapa de pinos — o que é
entrada, o que é saída, qual sensor está em qual canal — e a placa aplica.

A consequência prática é grande: trocar um sensor de pino é uma edição na tela.
Não é abrir a caixa, achar o cabo USB e regravar. E uma placa nova recebe a
configuração no primeiro segundo em que entra na rede, sem intervenção.

## Números medidos

Não são estimativas. Foram aferidos contra a plataforma real, com uma placa
falando o protocolo de verdade sobre uma conexão segura:

| | Hoje | Como era antes |
|---|---|---|
| Comando → aparelho → confirmação | **86 ms** | até 10 s |
| Detecção de queda — placa que se desconecta | **1,0 s** | palpite de 3 minutos |
| Detecção de queda — falta de energia | **cerca de 30 s** | palpite de 3 minutos |
| Configuração chegar num aparelho novo | **0 ms** — já está lá | uma tentativa no boot; se falhasse, aparelho inerte |
| Sensor oscilando 20 vezes | **1 notificação** | 20 notificações |

A exceção é a linha da falta de energia: ela vem do desenho da conexão, não de
um cronômetro. A placa dá sinal de vida a cada 20 segundos, e o servidor a
declara fora depois de uma vez e meia esse tempo sem notícia.

## O que ainda não existe

Vale dizer com todas as letras, porque a diferença aparece rápido:

- **atualização de firmware pela internet** — hoje a gravação é por USB;
- **o aplicativo nas lojas** — o [aplicativo](/aplicativo/o-aplicativo/) para
  iOS e Android existe, mas por enquanto só para quem entra no programa de beta
  testers; ele ainda não está publicado na App Store nem no Google Play;
- **notificação no navegador** (web push);
- **aprender um controle remoto de RF ou de ar-condicionado** — os shields
  existem no desenho, não no produto.

:::note
Estas páginas descrevem o que o produto **faz**, não o que está planejado. Se
você leu aqui, existe. Se não achou, ou não existe ainda, ou falta escrever — e
nesse caso [abra uma issue](https://github.com/goexec-io/docs/issues), que é a
forma mais rápida de a página aparecer.
:::

## Próximo passo

[Como funciona, em uma página](/comecar/como-funciona/) explica o desenho por
baixo — vale a leitura se você vai instalar em cliente. Se você só quer ligar a
sua placa, pule direto para [Antes de começar](/comecar/antes-de-comecar/).
