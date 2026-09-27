---
title: Verificação em duas etapas
description: >-
  Pedir, além da senha, um código de um aplicativo autenticador — como ligar,
  como desligar e o que fazer se perder o celular.
sidebar:
  order: 1
---

Com a verificação em duas etapas ligada, entrar pede a senha **e** um código de
6 dígitos gerado por um aplicativo autenticador no seu celular (Google
Authenticator, Microsoft Authenticator, 1Password, Aegis e similares). Quem
descobrir a sua senha não entra só com ela.

É opcional, por conta, e se liga **no painel web**.

## Ligar

1. Em **Configurações → Conta**, na seção **Verificação em duas etapas**, toque
   em **Ativar**.
2. Digite a senha atual em **Senha para confirmar**.
3. O painel mostra a **Chave para o aplicativo autenticador**. Digite essa
   chave no aplicativo, ou use **Abrir no aplicativo autenticador** se você
   está no celular que tem o aplicativo.
4. Digite o **Código mostrado pelo aplicativo** e toque em **Confirmar e
   ativar**.

:::note[Não há QR code nem códigos de recuperação]
A chave é digitada ou aberta pelo link — não há QR code na tela. E não há
códigos de recuperação para guardar: se você perder o autenticador, quem
destrava a conta é o suporte (veja abaixo). Se o seu aplicativo permite backup
ou sincronização entre aparelhos, ligue.
:::

## Entrar com o código

Depois da senha, a tela pede **Digite o código de 6 dígitos do seu aplicativo
autenticador.** Digite o código e toque em **Verificar e entrar**.

- Você tem **5 minutos** depois da senha para digitar o código. Passou disso,
  comece de novo pela senha.
- São **5 tentativas de código a cada 15 minutos**.
- Um código aceito não vale uma segunda vez — espere o próximo.
- O código muda a cada 30 segundos. Se ele é sempre recusado, confira se o
  relógio do celular está no automático.

O aplicativo do GoExec.io também pede o código ao entrar. Ligar e desligar,
porém, é só no painel web.

## Desligar

Na mesma seção, **Desativar** pede a senha atual e um código do aplicativo.
Pedir os dois é de propósito: quem pegou o seu computador com a sessão aberta
não consegue desligar a proteção.

## Perdi o celular

Sem o autenticador você não passa da segunda etapa, e não há como desligá-la
por conta própria. Escreva para
[support@goexec.io](mailto:support@goexec.io) a partir do e-mail da conta.

Enquanto isso, se o celular perdido tinha o aplicativo do GoExec.io aberto,
entre por outro aparelho assim que puder e use
[Encerrar todas as outras sessões](/conta/sessoes-e-senha/).
