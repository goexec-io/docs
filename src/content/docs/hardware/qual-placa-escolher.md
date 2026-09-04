---
title: Qual placa escolher
description: >-
  A diferença que decide a compra não é o número de canais — é o que acontece
  quando falta energia durante uma atualização.
sidebar:
  order: 2
---

A resposta curta:

| Se você… | Leve |
|---|---|
| está experimentando, na bancada, perto do computador | **WeMos D1 mini** |
| vai instalar em cliente e deixar lá | **ESP32-C3** (LOLIN C3 mini ou Super Mini) |
| precisa de mais de 8 canais na mesma placa | **DevKit ESP32-WROOM-32** |
| quer o shield de relés e a caixa prontos | **D1 mini** ou **C3 mini** (mesmo formato) |

A resposta longa é uma só, e vale a leitura.

## A diferença que decide a compra

O **ESP8266 não tem espaço para duas versões do programa ao mesmo tempo.**

Numa atualização, a versão nova é escrita **por cima** da que está rodando.
Enquanto isso acontece, existe uma janela em que nenhuma das duas está inteira.
Falta de energia nessa janela deixa a placa inutilizável, sem recuperação
automática — só regravando por USB, com a placa na mão.

O **ESP32-C3 tem duas áreas** e alterna entre elas. A versão nova é escrita na
área livre; se ela não se provar saudável ao subir, a placa volta sozinha para a
anterior. Falta de energia no meio não deixa sequela.

:::caution[Isso muda de importância conforme onde a placa vai ficar]
Na sua bancada, com o cabo USB ao lado, regravar é um minuto de trabalho.

Dentro de um quadro de energia, num cliente a quarenta minutos de carro, é uma
visita. Se a placa vai ficar longe de você, **leve C3**. A diferença de preço
entre as duas é menor que o combustível de uma ida.
:::

## Depois disso, é número de canais

| Placa | Canais | Formato |
|---|---|---|
| WeMos D1 mini | 5 | pequeno, encaixa no shield |
| WeMos LOLIN C3 mini | 7 | pequeno, encaixa no shield |
| ESP32-C3 Super Mini | 8 | pequeno, mas não é o mesmo formato do shield |
| DevKit ESP32-WROOM-32 | 10 | grande, não encaixa no shield |

Um canal é uma entrada **ou** uma saída. Um portão que abre e confirma que
abriu usa dois: um relé e um contato de confirmação.

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

## Se você precisa de mais de 10 canais

Não é o caso de trocar de placa: é o caso de usar **duas placas**. Elas aparecem
como dois aparelhos na sua conta, e uma regra pode ler o canal de uma e acionar
o canal da outra.

Subir o teto de 10 canais da WROOM exigiria recompilar o firmware, o que não é
algo que você faça pela tela.

## Próximo passo

[O botão](/hardware/o-botao/) — quatro tempos, quatro efeitos, e o que você
precisa saber antes de segurá-lo por doze segundos sem querer.
