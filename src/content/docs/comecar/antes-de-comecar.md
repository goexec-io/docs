---
title: Antes de começar
description: >-
  O que ter na mão antes de ligar a primeira placa — e as três coisas que mais
  atrasam quem está começando.
sidebar:
  order: 3
---

Cinco minutos aqui economizam uma tarde depois.

## O que você precisa ter

**Uma placa compatível.** São cinco modelos, e a escolha muda o que você pode
fazer depois — veja [Qual placa escolher](/hardware/qual-placa-escolher/).

**Um cabo USB que transmita dados.** Este é o item que mais atrasa gente, e é o
mais fácil de errar: muitos cabos de carregador têm só os fios de energia. A
placa acende, parece viva, e simplesmente não aparece na lista de portas. Se
puder, use o cabo que veio com um celular, não o de uma fonte de parede.

**Wi-Fi de 2,4 GHz.** As placas não falam 5 GHz. Se o seu roteador publica as
duas faixas com o **mesmo nome de rede**, o celular vai preferir a de 5 GHz e
você vai ver a rede na lista mas a placa não. Roteador moderno costuma ter uma
opção para separar as faixas em dois nomes; se não tiver, dá para desligar a de
5 GHz por um minuto durante a configuração.

**Uma conta no GoExec.io.** É onde você pega o código de ativação da placa.

**Um computador com Windows, ou com Linux.** O gravador tem janela no Windows e
linha de comando no Linux.

### Se a sua placa é a ESP32-CAM

A placa com câmera pede três coisas a mais:

:::caution[Em validação]
O suporte à ESP32-CAM é recente e ainda está sendo validado em placa real.
:::

- **Um jeito de ligá-la ao USB.** Ela não tem porta USB própria. Use a base
  **ESP32-CAM-MB**, que encaixa por baixo, ou um adaptador USB-serial com o pino
  IO0 ligado ao GND durante a gravação.
- **Uma fonte de 5 V e 2 A.** Wi-Fi e câmera juntos puxam mais corrente do que
  uma porta USB fraca entrega, e a placa reinicia no meio da foto.
- **O cartão microSD fora** da placa na hora de gravar.

Os detalhes estão em [ESP32-CAM](/hardware/esp32-cam/).

## As três armadilhas mais comuns

:::caution[O cabo só de energia]
Sintoma: o gravador diz que não achou nenhuma porta. A placa está acesa.

Para quem está começando, "nenhuma porta" e "cabo sem fios de dados" são
indistinguíveis. Troque o cabo antes de procurar qualquer outra coisa —
[esta página](/problemas/gravador-nao-acha-a-porta/) tem o resto do roteiro.
:::

:::caution[A rede de 5 GHz]
Sintoma: você digita a senha certa e a placa continua sem entrar.

Confira que a rede que você escolheu é a de 2,4 GHz. Se as duas faixas têm o
mesmo nome, você não tem como saber qual escolheu.
:::

:::caution[O filtro de MAC do roteador]
Sintoma: a placa provisiona perfeitamente na sua bancada e nunca aparece na
rede do cliente.

Roteador de empresa costuma ter lista de aparelhos autorizados. O endereço que
você precisa liberar aparece na tela do portal de configuração da placa — e
**só ali**, porque a lista de clientes do roteador só mostra quem já conectou,
que é exatamente o estado bloqueado. Veja [O portal de
Wi-Fi](/hardware/portal-wifi/).
:::

## Se você vai instalar em cliente

Além do acima:

- **Confira o Wi-Fi antes de ir.** Nome da rede, senha, e se há filtro de MAC.
- **Leve a placa já gravada e ativada.** Gravar no local depende de achar um
  computador com o driver certo.
- **Anote o código de registro.** Ele vem na etiqueta, mas etiqueta descola. Ele
  também aparece na tela do portal de configuração, com um botão para copiar.
- **Ligue a placa antes de entregar.** Uma placa que nunca se conectou não pode
  ser reivindicada por ninguém — o registro dela acontece no primeiro contato
  com o servidor.
- **Rede corporativa ou de hotel não impede a ativação.** Redes que bloqueiam a
  sincronização de hora costumavam deixar uma placa nova presa; hoje o servidor
  resolve a primeira ativação sem depender do relógio. A **transferência** de
  uma placa para outra conta ainda precisa da hora certa, e espera numa rede
  dessas.

## Próximo passo

Com tudo em mãos: [Qual placa escolher](/hardware/qual-placa-escolher/), ou
direto para [Placas compatíveis e pinos](/hardware/placas-e-pinos/) se você já
sabe qual tem.
