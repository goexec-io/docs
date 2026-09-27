---
title: Qual placa escolher
description: >-
  A resposta curta, e o que pesa de verdade: onde a placa vai ficar, quantos
  canais você precisa e se precisa de câmera.
sidebar:
  order: 2
---

A resposta curta:

| Se você… | Leve |
|---|---|
| está experimentando, na bancada, perto do computador | **WeMos D1 mini** |
| vai instalar em cliente e deixar lá | **ESP32-C3** (LOLIN C3 mini ou Super Mini) |
| precisa de mais de 9 canais na mesma placa | **DevKit ESP32-WROOM-32** |
| quer o shield de relés e a caixa prontos | **D1 mini** ou **C3 mini** (mesmo formato) |
| precisa de foto no aviso | **ESP32-CAM (AI-Thinker)** |

## Hoje, toda atualização é por cabo

Nenhuma placa se atualiza pela internet ainda. Atualizar a firmware, em
qualquer modelo, é levar a placa ao computador e
[regravar](/hardware/regravar-sem-perder-a-ativacao/) — o que não apaga a
ativação nem o Wi-Fi.

Isso já pesa na escolha: uma placa dentro de um quadro de energia, num cliente
a quarenta minutos de carro, é uma visita cada vez que precisar de firmware
nova.

## O que muda entre ESP8266 e ESP32-C3

A diferença que vai decidir a compra no futuro é de memória.

O **ESP8266** (D1 mini) **não tem espaço para duas versões do programa ao mesmo
tempo**. Quando a atualização pela internet existir, nele a versão nova terá de
ser escrita **por cima** da que está rodando — e uma falta de energia nesse
instante deixa a placa inutilizável até alguém regravá-la por USB.

O **ESP32-C3** já tem **duas áreas** reservadas para o programa. É o que permite
escrever a versão nova ao lado da que roda e voltar para a anterior se algo der
errado. Essa volta automática ainda **não está implementada** — mas o espaço
está lá, e na D1 mini nunca estará.

:::caution[Se a placa vai ficar longe de você, leve C3]
Na sua bancada, com o cabo USB ao lado, regravar é um minuto de trabalho.

Para uma placa que vai ficar num cliente, a C3 é a que tem futuro. A diferença
de preço entre as duas é menor que o combustível de uma ida.
:::

## Depois disso, é número de canais

| Placa | Canais | Formato |
|---|---|---|
| WeMos D1 mini | 5 | pequeno, encaixa no shield |
| WeMos LOLIN C3 mini | 8 | pequeno, encaixa no shield |
| ESP32-C3 Super Mini | 9 | pequeno, mas não é o mesmo formato do shield |
| DevKit ESP32-WROOM-32 | 10 | grande, não encaixa no shield |
| ESP32-CAM (AI-Thinker) | 2 | pequena, sem shield |

Um canal é uma entrada **ou** uma saída. Um portão que abre e confirma que
abriu usa dois: um relé e um contato de confirmação.

Nas duas C3, um dos canais é para a leitura de um sensor num shield, e não
ocupa pino — veja [Pinos e canais são dois
números](/hardware/placas-e-pinos/#pinos-e-canais-são-dois-números).

## Entre as duas C3

São o mesmo chip. A Super Mini tem um canal a mais porque o LED embutido dela
está num pino diferente. A LOLIN C3 mini tem a vantagem de **encaixar no mesmo
shield e na mesma caixa** da D1 mini.

Se você já tem shield de relés, leve a **C3 mini**. Se está começando do zero e
quer o canal extra, a **Super Mini** serve.

:::danger[Não misture as imagens]
A imagem de uma C3 não funciona corretamente na outra, e falha em silêncio: o
LED de status não acende e um pino bom é recusado. O gravador pergunta o modelo
justamente por isso — veja [Placas compatíveis e
pinos](/hardware/placas-e-pinos/).
:::

## Se você precisa de câmera

A **ESP32-CAM** tira foto quando uma regra manda, e a foto vai junto do aviso.
Em troca, tem só **dois canais** e exige fonte de 5 V / 2 A. O caso típico é um
sensor que dispara a foto e, no máximo, um relé.

Se você precisa da foto **e** de muitos canais, use duas placas: a CAM para a
foto e outra para o resto. Veja [ESP32-CAM, a placa com
câmera](/hardware/esp32-cam/).

## Se você precisa de mais de 10 canais

Não é o caso de trocar de placa: é o caso de usar **duas placas**. Elas aparecem
como dois aparelhos na sua conta, e uma regra pode ler o canal de uma e acionar
o canal da outra.

Subir o teto de 10 canais da WROOM exigiria recompilar o firmware, o que não é
algo que você faça pela tela.

## Próximo passo

[ESP32-CAM, a placa com câmera](/hardware/esp32-cam/) — se a foto é o que você
precisa. Senão, [O portal de Wi-Fi](/hardware/portal-wifi/).
