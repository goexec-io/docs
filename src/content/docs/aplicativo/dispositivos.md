---
title: Dispositivos no celular
description: >-
  Ver se a placa está no ar, ligar e desligar uma saída com um toque, ler o
  gráfico de uma medição e cadastrar uma placa nova apontando a câmera para a
  etiqueta.
sidebar:
  order: 3
  label: Dispositivos
---

A aba **Dispositivos** é a primeira do aplicativo, e é onde ele abre.

## A lista

Cada placa aparece como um cartão com:

- o nome e a etiqueta de estado — **Conectado**, **Desconectado**, **Nunca
  conectou** ou **Informativo** (a placa acabou de ser cadastrada e ainda está
  se apresentando);
- até três entradas, com o valor atual;
- **as saídas, prontas para tocar** — não precisa abrir a placa para ligar o
  portão;
- com a placa no ar, o sinal do Wi-Fi e há quanto tempo ela está ligada.

A busca, no alto, acha por **nome, código ou ID**. Arraste a lista para baixo
para atualizar.

## Ligar e desligar uma saída

Um toque no interruptor manda o comando. Enquanto a placa não confirma, o
interruptor ganha um anel pulsando e o texto **Enviando…**. Quando ela
confirma, aparece "Portão ligado." (ou desligado).

O aplicativo mostra o que a **placa** diz, não o que você pediu:

- se a placa não confirmar em **8 segundos**, o interruptor volta para onde
  estava e aparece **Sem confirmação … em 8 s. Estado revertido.**;
- se a placa recusar, aparece **O dispositivo recusou o comando**;
- se o estado de uma saída é desconhecido, ela mostra **?** e
  **Desconhecido** — nunca "desligada" por suposição.

Com a placa desconectada, os interruptores dão lugar a uma frase explicando que
os botões voltam quando ela voltar. O aplicativo **não guarda comando para
depois**: um portão não abre sozinho horas mais tarde porque alguém tocou nele
sem sinal.

:::note
No aplicativo, a saída é **liga e desliga**. Um pulso (ligar por um tempo e
desligar sozinho) vem de uma [automação](/aplicativo/automacoes/) com a saída
**Temporizada**.
:::

Se o seu papel na organização é só de visualização, os interruptores não
aparecem: **Seu perfil não permite acionar saídas.** Veja [Membros e
papéis](/conta/membros-e-papeis/).

Se o comando não chegou, o caminho de diagnóstico é o mesmo do painel: [O
comando não chegou no aparelho](/problemas/comando-nao-chegou/).

## Dentro de uma placa

Tocar no cartão abre a placa, com:

- **Saídas** — os mesmos interruptores;
- **Entradas** — **Acionada** ou **Em repouso**, ou o número com a unidade. Uma
  leitura antiga avisa: **Sem responder — última leitura …**;
- **Telemetria** — sinal do Wi-Fi, memória livre, versão do firmware, endereço
  IP, MAC, quantas vezes a placa ligou, a versão da configuração e o motivo do
  último reinício. É o que o suporte vai pedir se algo estiver estranho;
- o nome da placa, que você pode trocar e **Salvar nome**.

Se a placa não está rodando a configuração que o servidor tem para ela, aparece
um cartão avisando, com **Restaurar configuração**.

## O gráfico de uma medição

Tocar numa entrada de medição — temperatura, umidade, qualquer número — abre o
gráfico dela, com a última leitura em destaque e há quanto tempo ela chegou.

| Controle | Opções |
|---|---|
| **Janela** | 1h · 6h · 24h · 7d |
| **Agregação** | Média · Mínimo · Máximo · Bruto |

Uma janela maior do que o histórico que o seu plano guarda aparece apagada, e
o aplicativo diz quantos dias o plano guarda.

## Cadastrar uma placa pela etiqueta

1. Na aba **Dispositivos**, toque em **+** (**Adicionar dispositivo**).
2. **Escanear a etiqueta**: aponte a câmera para o QR da etiqueta da placa.
3. Dê um nome, se quiser, e toque em **Vincular à minha conta**.

O aplicativo abre a placa em seguida.

Não quer liberar a câmera, ou a etiqueta está gasta? Digite o **Código de
vínculo** — ele está impresso na etiqueta, junto do QR. Dá no mesmo.

Se a placa ainda não se conectou ao servidor nenhuma vez, ou se a sua conta
chegou ao limite de aparelhos, o aplicativo diz qual dos dois foi.

:::tip
A câmera é usada só para ler a etiqueta. É isso que o celular pergunta na hora
de dar a permissão.
:::

## Tirar uma placa da conta

Dentro da placa, **Remover da conta** devolve a placa ao estoque. As
automações que usavam essa placa são **desligadas, não apagadas** — se a placa
voltar, elas estão lá.

## Aparelhos transferidos

Em **Mais → Transferidos** ficam as placas que você passou para outra conta.
Cada uma mostra o **Código para reivindicar de novo**, caso ela volte, e
**Esquecer configuração guardada**, para apagar a configuração que ficou
guardada com você.
