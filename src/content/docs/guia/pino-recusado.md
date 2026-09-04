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

Não é hipótese: no ESP8266 é o pino 15, e na DevKit WROOM é o pino 12.

## Os motivos, em ordem de frequência

**O pino não existe na sua placa.** A lista muda entre os quatro modelos. Confira
em [Placas compatíveis e pinos](/hardware/placas-e-pinos/).

**O pino é reservado.** Cada placa guarda dois para si: o LED de status e o botão
de configuração.

**O pino impede o boot.** O caso descrito acima.

**O pino é só de entrada.** Na DevKit WROOM, os pinos 34 a 39 leem mas não
acionam. Configurá-los como saída é recusado.

**O pino já está em uso.** Outro canal o ocupou.

## A conferência acontece duas vezes

O servidor recusa antes de salvar. E a **placa confere de novo**, do lado dela,
ao receber a configuração — reportando o que recusou.

São duas camadas de propósito: uma delas pode estar com a lista desatualizada,
por exemplo uma placa com firmware antiga recebendo um modelo de placa que ela
não conhece.

Se um canal sumiu depois de salvar, é isso: o servidor aceitou e a placa não.
A tela do aparelho mostra o que foi recusado.

## Próximo passo

[Como uma regra dispara](/guia/como-uma-regra-dispara/).
