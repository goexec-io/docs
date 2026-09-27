---
title: O botão
description: >-
  Segurar 3 segundos abre o portal de Wi-Fi, e é só isso que ele faz. Por que
  o botão não apaga nada, e onde ficam o reset e a troca de dono.
sidebar:
  order: 7
---

A placa tem um botão de configuração, e ele faz **uma coisa só**:

| Você faz | O que acontece |
|---|---|
| Segura por **3 segundos** | Abre o [portal de Wi-Fi](/hardware/portal-wifi/). Não apaga nada |
| Um toque curto | Nada muda na placa |

Onde ele fica, por placa, está em [Placas compatíveis e
pinos](/hardware/placas-e-pinos/). Na DevKit WROOM é o botão **BOOT**, que já
vem soldado; na ESP32-CAM é o **IO0** da base de gravação.

## Por que o botão não apaga nada

Porque a placa costuma ficar num quadro, atrás de um painel, ou dentro de uma
caixa que alguém vai fechar com a mão perto do botão. Um botão que apaga a
configuração conforme o tempo segurado é um botão que um dia apaga sem querer.

Então o botão só abre o portal. O que antes pedia um reset — trocar de rede,
passar a placa para outra pessoa — tem hoje um caminho próprio, que pergunta
antes de fazer.

## Qual caminho usar em cada situação

| Você quer | Como |
|---|---|
| Trocar a placa de rede Wi-Fi | Segure 3 s e configure a rede nova no portal |
| A senha do Wi-Fi mudou | Nada — a placa abre o portal sozinha |
| Ver o código de registro da placa | Segure 3 s; o código aparece no portal |
| Descobrir o endereço MAC para liberar no roteador | Segure 3 s; aparece no portal |
| Passar a placa para outra pessoa | Segure 3 s e use **Transferir**, no portal — veja [Passar a placa para outra conta](/hardware/transferir-a-placa/) |
| Tirar a placa da sua conta | **Remover da conta**, no painel — não precisa mexer na placa |

Nenhum desses caminhos apaga a placa. Se algo for recusado, ela continua como
estava.

## A identidade da placa

Cada placa tem um identificador, que aparece no painel e no gravador. Ele é
**sorteado pela própria placa** na primeira vez que ela liga com a firmware do
GoExec.io, e fica guardado nela — não vem do hardware.

Por isso ele sobrevive a tudo o que é do dia a dia: trocar de rede, transferir,
remover da conta, [regravar a
firmware](/hardware/regravar-sem-perder-a-ativacao/). Só apagar a memória da
placa por inteiro faz ela sortear outro — e aí, para o servidor, é outra placa.

Placas ativadas antes dessa mudança continuam com o identificador que já tinham.

:::caution[D1 mini: não ligue a placa segurando o botão]
Na D1 mini, o botão de configuração e o pino que escolhe o modo de gravação são
o mesmo. Ligar a placa com o botão apertado faz ela entrar em modo de gravação
em vez de rodar a firmware: o LED não pisca o padrão de sempre e o portal não
abre. Solte o botão e desligue e religue.
:::

:::note[A placa nunca configurada não precisa de botão]
Numa placa que ainda não tem Wi-Fi salvo, o portal sobe sozinho ao ligar, e não
expira. Não há por que fechá-lo: sem ele, não haveria como alcançar a placa.
:::

## Próximo passo

[Passar a placa para outra conta](/hardware/transferir-a-placa/) — o
"Transferir" do portal, e a trava que o dono pode ligar.
