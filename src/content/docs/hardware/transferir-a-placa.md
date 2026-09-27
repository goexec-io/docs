---
title: Passar a placa para outra conta
description: >-
  Doar, vender ou devolver uma placa sem apagar nada nela. O "Transferir" do
  portal, a trava do dono e o caminho pelo painel.
sidebar:
  order: 8
---

Uma placa pertence a uma conta. Para ela ir para outra — doada, vendida,
devolvida — não é preciso reset nem regravação. Há dois caminhos, e a diferença
é **quem pede**.

| Quem pede | Onde | Precisa estar com a placa? |
|---|---|---|
| Quem está com a placa na mão | **Transferir**, no portal de Wi-Fi da placa | Sim |
| O dono atual | **Remover da conta**, no painel | Não |

## Pelo portal: "Transferir"

É o caminho de quem recebeu uma placa e não tem acesso à conta de quem a deu.

1. Segure o botão da placa por **3 segundos** para abrir o [portal de
   Wi-Fi](/hardware/portal-wifi/), e conecte na rede `GoExec-XXXX`.
2. No portal, na seção **Transferir para outra conta**, toque em
   **Transferir**.
3. Confira a tela e toque em **Confirmar e reiniciar**.

A placa reinicia, entra na rede e só então pede ao servidor para ser liberada.
**Nada é descartado antes da resposta.**

- **Se o servidor aceitar**, a placa recebe um código de registro novo e abre o
  portal sozinha, já com esse código na tela. Reconecte na mesma rede
  `GoExec-XXXX`, copie o código e use-o no painel da conta nova. O código
  antigo deixa de valer.
- **Se o servidor recusar**, a placa volta a funcionar exatamente como estava.
  Um toque por engano não custa nada.

O Wi-Fi e os canais continuam na placa durante a troca. A seção **Transferir**
só aparece numa placa que já pertence a alguma conta.

:::note[Rede que bloqueia a hora certa]
A transferência exige que a placa saiba a hora exata. Em redes que bloqueiam a
sincronização de horário — algumas de hotel, de visitante ou corporativas — ela
fica esperando e não conclui. Faça a transferência numa rede comum.
:::

## A trava do dono

Nas **Configurações** do aparelho, no painel, o dono tem a opção **Travar
transferência**. Ligada, o servidor recusa qualquer transferência pedida pela
placa — nada que se faça com ela na mão destrava.

É a proteção contra uma placa furtada ou retirada da instalação sem aviso.
Desligada, quem estiver com a placa pode transferi-la.

## Pelo painel: "Remover da conta"

Quem é dono não precisa ir até a placa. Nas **Configurações** do aparelho,
**Remover da conta** devolve a placa ao estoque e mostra o **Código de
reivindicação** — é com ele que qualquer conta a adota de novo.

A placa continua ligada e conectada: não é preciso mexer nela. O código também
fica na lista **Aparelhos transferidos** até alguém usá-lo.

## O que acontece com a configuração do dono anterior

Nos dois caminhos, **nada é apagado**:

- os canais do dono anterior ficam guardados na conta dele;
- as automações que usavam a placa são **desligadas**, não apagadas;
- quem recebe a placa começa com ela vazia, sem os nomes e regras de ninguém.

Se a placa voltar para a conta de antes, o painel oferece **Restaurar
configuração**.

:::caution["Apagar definitivamente" é outra coisa]
O painel tem também **Apagar definitivamente**, que apaga o aparelho, os canais
e as automações dele, sem volta — e a placa não consegue voltar sem um reset de
fábrica. Para passar a placa adiante, use sempre um dos caminhos acima.
:::
