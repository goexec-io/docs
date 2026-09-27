---
title: Por que o painel recusou esse pino
description: >-
  A recusa acontece antes de gravar, e evita transformar a placa em tijolo.
sidebar:
  order: 4
---

Cada modelo de placa tem sua lista de pinos livres e reservados. Ao escolher um
pino que a sua placa não aceita, a tela recusa e diz o motivo.

**A recusa acontece antes de gravar qualquer coisa.** Isso importa mais do que
parece.

## O que a recusa evita

Alguns pinos precisam estar num nível específico no momento em que a placa liga.
Um relé ligado num deles impede o chip de dar boot — e a placa vira tijolo até
alguém desconectar o relé fisicamente.

Não é hipótese: no ESP8266 é o pino 15, e na DevKit WROOM e na ESP32-CAM é o
pino 12.

## Os motivos, em ordem de frequência

**O pino não existe na sua placa.** A lista muda entre os cinco modelos.
Confira em [Placas compatíveis e pinos](/hardware/placas-e-pinos/).

**O pino é reservado.** Cada placa guarda dois para si: o LED de status e o botão
de configuração. A ESP32-CAM guarda quase todos — câmera, memória extra, flash
e os pinos de partida 2, 12 e 15 —, e só aceita o 13 e o 14.

**O pino impede o boot.** O caso descrito acima.

**O pino é só de entrada.** Na DevKit WROOM, os pinos 34 a 39 leem mas não
acionam. Configurá-los como saída é recusado.

**O pino já está em uso.** Outro canal o ocupou.

**A placa foi registrada como outro modelo.** Uma C3 Super Mini registrada como
LOLIN C3 mini recebe a lista da C3 mini, e o pino 7 — bom na Super Mini — é
recusado. Veja [o caso do pino
7](/hardware/placas-e-pinos/#por-que-o-painel-recusou-esse-pino).

**A configuração não cabe na placa.** A D1 mini recebe configurações de até
2048 bytes. Uma configuração maior é recusada ao salvar, em vez de ser enviada
para uma placa que a descartaria em silêncio.

## A conferência acontece duas vezes

O servidor recusa antes de salvar. E a **placa confere de novo**, do lado dela,
ao receber a configuração — reportando o que recusou.

São duas camadas de propósito: uma delas pode estar com a lista desatualizada,
por exemplo uma placa com firmware antiga recebendo um modelo de placa que ela
não conhece.

Se um canal sumiu depois de salvar, é isso: o servidor aceitou e a placa não.
A tela do aparelho mostra o que foi recusado.

Uma placa em [modo de
segurança](/hardware/quando-falta-energia/#modo-de-segurança) não aplica
configuração nova nenhuma até você confirmar — nesse caso a recusa não tem a
ver com o pino.

## Próximo passo

[Como uma regra dispara](/guia/como-uma-regra-dispara/).
