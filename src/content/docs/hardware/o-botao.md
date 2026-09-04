---
title: O botão
description: >-
  Quatro tempos, quatro efeitos. O que cada um apaga, o que nenhum deles apaga,
  e por que um toque rápido não faz nada.
sidebar:
  order: 3
---

A placa tem um botão só, e ele faz quatro coisas diferentes conforme o tempo que
você segura.

| Tempo segurando | O que acontece |
|---|---|
| **menos de 2 s** | Nada |
| **2 a 6 s** | Abre o portal de configuração de Wi-Fi. Não apaga nada |
| **6 a 12 s** | Apaga **só o Wi-Fi**. A placa continua sua e continua configurada |
| **12 s ou mais** | Reset de fábrica: apaga Wi-Fi, credencial e configuração |

Onde ele fica, por placa, está em [Placas compatíveis e
pinos](/hardware/placas-e-pinos/). Na DevKit WROOM é o botão **BOOT**, que já
vem soldado.

## Por que menos de 2 segundos não faz nada

Porque a placa costuma ficar num quadro, atrás de um painel, ou dentro de uma
caixa que alguém vai fechar com a mão perto do botão. Um toque acidental não
pode derrubar a instalação.

Se você apertou e não aconteceu nada, você não segurou tempo suficiente.

## O que o reset de fábrica **não** apaga

**A identidade da placa.** Ela é derivada do hardware e não muda — nem com reset
de fábrica, nem trocando de conta, nem regravando o firmware.

Isso é o que permite reconhecer a mesma placa depois de um reset completo, e é o
que faz o reset de fábrica ser seguro: você perde a configuração, não a placa.

:::caution[12 segundos é mais tempo do que parece]
Conte. A diferença entre "apaguei o Wi-Fi" (6 a 12 s) e "apaguei tudo" (12 s ou
mais) são seis segundos, e não há confirmação nem aviso na hora.

Se a sua intenção era só trocar de rede, solte aos **8 segundos** — bem no meio
da faixa, longe das duas bordas.
:::

## Qual usar em cada situação

| Você quer | Segure por |
|---|---|
| Trocar a placa de rede Wi-Fi | 2 a 6 s (abre o portal, nada é apagado) |
| A senha do Wi-Fi mudou | Nada — a placa abre o portal sozinha |
| Ver o código de registro da placa | 2 a 6 s (o código aparece na tela do portal) |
| Descobrir o endereço MAC para liberar no roteador | 2 a 6 s (aparece na tela do portal) |
| A placa está confusa e você quer recomeçar o Wi-Fi | 6 a 12 s |
| Passar a placa para outra pessoa | 12 s ou mais |
| Vender ou devolver a placa | 12 s ou mais |

Repare que a maior parte dos casos é o portal — o tempo curto. O reset de
fábrica serve para **desfazer o vínculo**, não para consertar problema.

:::note[A placa nunca configurada não precisa de botão]
Numa placa que ainda não tem Wi-Fi salvo, o portal sobe sozinho ao ligar, e não
expira. Não há por que fechá-lo: sem ele, não haveria como alcançar a placa.
:::

## Próximo passo

[O portal de Wi-Fi](/hardware/portal-wifi/) — o que fazer depois que ele abriu.
