---
title: ESP32-CAM, a placa com câmera
description: >-
  A quinta placa: tira foto quando uma regra manda, e em troca tem só dois
  canais. O que ela exige de fonte, de memória e de montagem.
sidebar:
  order: 3
---

:::caution[Em validação]
A ESP32-CAM já funciona com o servidor, mas a prova completa em bancada — da
gravação à foto chegando no aviso — ainda não foi concluída. Se algo nesta
página não bater com o que você vê, [abra uma
issue](https://github.com/goexec-io/docs/issues).
:::

A ESP32-CAM é a placa que tira foto. Uma automação pode pedir uma captura e
mandar a imagem junto do aviso por WhatsApp, Telegram, e-mail ou chamada HTTP —
o uso está em [Fotos da câmera](/guia/fotos-da-camera/).

No painel ela aparece como **GoExec.io CAM (ESP32-CAM AI-Thinker)**.

## Só o modelo AI-Thinker

Existem várias placas vendidas como "ESP32-CAM". A suportada é a
**AI-Thinker**, com câmera OV2640. Clones com outra ligação de pinos entre o
chip e a câmera não funcionam: a imagem conta com o mapa exato da AI-Thinker.

## Dois canais, e só dois

| Placa | Canais | Pinos que você pode usar |
|---|---|---|
| ESP32-CAM (AI-Thinker) | **2** | 13 e 14 — cada um entrada **ou** saída |

Câmera, memória extra e o slot de microSD ocupam quase todos os pinos do chip.
Sobram o 13 e o 14, que no desenho original iam para o cartão — e o cartão não
é usado.

Dois canais bastam para o caso típico: um sensor que dispara a foto (porta,
presença) e um relé ou sirene. Se você precisa de mais, use a CAM só para a
foto e outra placa para o resto; uma regra pode ler o canal de uma e acionar a
outra.

**Não há shields nem sensores de medição** na CAM.

## O que ela exige

### Fonte de 5 V e 2 A

Wi-Fi e câmera ao mesmo tempo puxam corrente em pico. Numa fonte fraca, ou
alimentada por uma porta USB de computador, a tensão cai no instante da foto e
a placa reinicia.

Esse reinício por queda de tensão conta como reinício anormal. Três seguidos
colocam a placa em [modo de
segurança](/hardware/quando-falta-energia/#modo-de-segurança) — então fonte
fraca não é só foto perdida.

### Memória extra (PSRAM)

A foto é montada na memória extra da placa antes de subir. Placas vendidas como
AI-Thinker vêm com **4 MB ou 2 MB**, e as duas servem: mesmo a maior
resolução cabe em menos de 1 MB.

Uma placa **sem** memória extra liga, conecta e aparece no painel — mas toda
captura falha por falta de memória.

### Cartão microSD fora

O slot não é usado, e um cartão encaixado disputa os pinos 13 e 14 — os dois
canais da placa. Tire antes de gravar e deixe fora.

## LED e botão

| Função | Onde |
|---|---|
| LED de status | O LED **vermelho** das costas, no pino 33 |
| Botão de configuração | **IO0** — o botão IO0 da base de gravação ESP32-CAM-MB |
| Flash | O LED branco da frente, no pino 4 — usado só na foto |

O pino do botão também é usado pela câmera durante a captura. Por isso a câmera
fica **desligada** fora da foto: liga, tira o quadro e desliga em cerca de um
segundo. Fora desse segundo o botão funciona como nas outras placas — segurar
3 segundos abre o [portal de Wi-Fi](/hardware/portal-wifi/).

Um toque no botão durante a captura não é lido.

## A foto não passa pelo canal de sempre

Comandos e leituras vão por uma conexão pequena e sempre aberta com o servidor.
Uma foto não cabe nela. A placa sobe a imagem por uma **segunda conexão
segura**, aberta só para isso, ao lado da de sempre.

Em sinal de Wi-Fi fraco isso tem custo: a foto demora mais para chegar. O que
acontece nesse caso está em [Fotos da câmera](/guia/fotos-da-camera/).

## Atualizar

Como as outras placas, a CAM é atualizada **por cabo**, regravando pelo
gravador. Não há atualização pela internet.

## Próximo passo

[Gravar e ativar a ESP32-CAM](/hardware/gravar-a-esp32-cam/) — ela não tem USB
própria, e isso muda o primeiro passo.
