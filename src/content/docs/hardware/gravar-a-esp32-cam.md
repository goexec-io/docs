---
title: Gravar e ativar a ESP32-CAM
description: >-
  A CAM não tem USB própria. Como ligá-la ao computador, o que escolher no
  gravador, e a armadilha do monitor que fica em branco.
sidebar:
  order: 4
---

:::caution[Em validação]
A gravação da ESP32-CAM ainda não foi validada de ponta a ponta com o gravador
publicado. Se a opção **ESP32-CAM (AI-Thinker)** não oferecer uma firmware
disponível para baixar, a imagem da CAM ainda não foi publicada — não é
defeito do seu computador.
:::

## Como ligar ao computador

A ESP32-CAM não tem conector USB. Há dois caminhos:

| Caminho | Como |
|---|---|
| **Base ESP32-CAM-MB** (recomendado) | A placa encaixa em cima da base, e a base tem o USB. É ela que coloca a placa em modo de gravação sozinha |
| **Adaptador USB-serial** | Ligue TX, RX, GND e 5 V, e mantenha o **IO0 no GND** durante o reset para entrar em modo de gravação |

A base ESP32-CAM-MB usa o conversor **CH340**. No Windows, sem o driver dele, a
porta não aparece — veja [O gravador não acha a
porta](/problemas/gravador-nao-acha-a-porta/).

Antes de começar:

- **cartão microSD fora**;
- **fonte de 5 V / 2 A** quando a placa for para o lugar dela. Na bancada, o USB
  da base basta para gravar.

## No gravador

1. Conecte a base no USB e escolha a **Porta serial**.
2. Em **Modelo**, escolha **ESP32-CAM (AI-Thinker)**.
3. Clique em **Identificar a placa**.
4. Cole o **Código de ativação** que você gerou no painel.
5. **Gravar firmware**.

:::note[Por que o gravador pergunta o modelo]
Pelo USB, a ESP32-CAM e a DevKit ESP32-WROOM são o mesmo chip com a mesma
memória: nada que o gravador lê distingue as duas. Por isso, em qualquer placa
ESP32, o gravador pede que você diga qual é — do mesmo jeito que já pedia entre
as duas C3.

Escolher errado grava a imagem da outra placa: na CAM, a câmera não funciona.
Escolha de novo e regrave.
:::

Se a placa não entrar em modo de gravação, segure **IO0** e aperte **RST** na
base. Se aparecer `Wrong boot mode`, segure **IO0** e solte só quando a barra de
progresso andar.

## "A placa não respondeu à chave de ativação"

Sintoma: a gravação termina, o gravador mostra o identificador da placa, e logo
depois diz que a placa não respondeu à chave de ativação.

A causa é a base ESP32-CAM-MB. Ela liga dois sinais da porta serial ao reset da
placa de um jeito diferente das outras placas: quando um programa abre a porta
do jeito padrão, a base **segura a placa em reset** enquanto a porta estiver
aberta. A placa não roda, então não responde.

Os gravadores publicados a partir de **26/09/2026** abrem a porta do jeito
certo. Se o seu é anterior:

1. Baixe o gravador novo.
2. Clique em **Ativar placa**, com o **mesmo** código de ativação.

Não precisa regravar, e repetir a ativação com o mesmo código não gasta o
código.

## O monitor fica em branco

É a mesma causa. Num monitor serial de outro programa, com a CAM na base MB, a
tela fica vazia e o botão **RST** não faz nada — a placa está presa em reset.

No monitor que você usar, **desligue DTR e RTS**. O **Abrir monitor** do
próprio gravador já faz isso.

## Depois de gravar

A placa reinicia já ativada e abre o [portal de Wi-Fi](/hardware/portal-wifi/)
sozinha. A senha do portal aparece no gravador, em **Acesso a placa → Senha da
rede**.

Com a placa na rede e no painel, a seção **Câmera** do aparelho tem o botão
**Capturar agora** — é o teste mais curto de que tudo funciona.

## Regravar depois

Regravar uma CAM que já está ativada não apaga a ativação nem o Wi-Fi. Veja
[Regravar sem perder a ativação](/hardware/regravar-sem-perder-a-ativacao/).
