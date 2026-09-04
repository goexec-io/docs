---
title: Tempo máximo ligado
description: >-
  O teto de segurança da saída. Ele mora na placa, vale com a rede fora, e
  ganha de qualquer automação.
sidebar:
  order: 3
---

É o campo mais fácil de ignorar e o que mais evita prejuízo.

**Tempo máximo ligado** é um teto: a saída nunca fica acionada além dele. Se um
comando de desligar se perder, ou o servidor cair com uma sirene tocando, **a
própria placa desliga** ao atingir o teto.

Ela não consulta ninguém para isso. É proteção do atuador contra uma falha do
outro lado, então tem de valer com a rede fora.

## Ele ganha da automação

Uma ação temporizada de 5 segundos, num canal com teto de 2 segundos, **roda 2
segundos**.

Isso está certo — o teto é do canal, e o canal é quem conhece o hardware ligado
nele. O formulário avisa antes de salvar quando você pede mais que o teto.

:::tip[Se um acionamento durou menos do que você pediu]
É o primeiro lugar para olhar. Abra o canal e confira o teto.
:::

## Que valor usar

Pense em **quanto tempo esse equipamento aguenta ligado sem supervisão**, não em
quanto tempo você pretende usá-lo.

| Equipamento | Ordem de grandeza |
|---|---|
| Fechadura elétrica / trava de portão | 1 a 3 segundos |
| Sirene | 1 a 5 minutos |
| Bomba d'água | o tempo de encher, com folga |
| Iluminação | pode ficar sem teto |
| Aquecedor, motor, resistência | **sempre com teto** |

Zero significa sem teto. Use zero conscientemente: numa saída que aciona algo
capaz de queimar, sem teto quer dizer que uma falha de rede pode deixar aquilo
ligado indefinidamente.

## O estado de repouso

Anda junto. Quando o tempo expira, a saída volta para o **estado de repouso** que
você definiu no canal — não para um estado qualquer.

Numa fechadura, repouso é destravada ou travada conforme o seu projeto. Vale
pensar no que deve acontecer numa queda de energia seguida de religamento: é
esse estado que a placa vai assumir.

## Próximo passo

[Por que o painel recusou esse pino](/guia/pino-recusado/).
