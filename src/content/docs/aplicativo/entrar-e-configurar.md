---
title: Entrar e configurar o aplicativo
description: >-
  Login, verificação em duas etapas, criar conta, recuperar a senha, idioma,
  tema, e como tirar a sua conta de um celular que ficou para trás.
sidebar:
  order: 2
  label: Entrar e configurar
---

## Entrar

A tela **Entrar** pede o **E-mail** e a **Senha** — os mesmos do painel web.
Não existe conta separada para o aplicativo.

Se a sua conta tem a [verificação em duas
etapas](/conta/verificacao-em-duas-etapas/) ligada, o aplicativo pede em
seguida o **Código** de 6 dígitos do seu aplicativo autenticador. Toque em
**Verificar e entrar**. Para voltar e entrar com outro e-mail, **Usar outra
conta**.

:::note
O aplicativo **pede** o código, mas não liga nem desliga a verificação em duas
etapas. Isso é feito no painel web.
:::

Depois de entrar, você não precisa entrar de novo toda vez: a sessão fica
guardada no cofre do próprio celular (o Keychain do iPhone, o Keystore do
Android) e sobrevive a fechar o aplicativo.

## Criar uma conta

Ainda não tem conta? **Criar uma conta**, na tela de entrada, pede **Nome
completo**, **Nome da organização**, **E-mail** e **Senha** — mínimo de 12
caracteres. Isso cria a sua organização e você como o primeiro usuário.

Em seguida chega um e-mail com o link de confirmação, que vale por 24 horas.

## Esqueci a senha

**Recuperar senha**, na tela de entrada, manda um link para o seu e-mail. A
resposta é a mesma exista ou não conta com aquele endereço — é de propósito,
para ninguém usar essa tela para descobrir quem tem conta. Se o e-mail não
chegar em alguns minutos, confira o spam.

## Configurações

Em **Mais → Configurações**:

| Seção | O que tem |
|---|---|
| **Idioma** | Português (Brasil) ou English (US). Começa no idioma do celular |
| **Tema** | Escuro, Claro ou Sistema (segue o celular). Começa no escuro |
| **Conta** | Seus dados, o fuso horário da organização, **Alterar senha** e **Chaves de API** |
| **Sobre esta versão** | A versão instalada — útil para mandar junto quando você reportar algo no beta |

### Nome e senha

Em **Conta**, **Seus dados** muda o seu nome. O e-mail não muda por aqui.

**Alterar senha** pede a **Senha atual**, a **Senha nova** e a repetição dela.
Trocar a senha encerra as suas outras sessões — o celular em que você está
continua dentro.

### Chaves de API

Quem administra a organização vê as [chaves de API](/api/chaves-de-api/) em
**Conta → Chaves de API**: dono, validade e último uso de cada uma. Pelo
aplicativo dá para **revogar** uma chave — útil quando você desconfia de um
vazamento e está longe do computador. Emitir uma chave nova é no painel web.

## Perdi o celular, ou esqueci a conta aberta

Em **Conta → Sessões**, **Encerrar todas as outras sessões** tira a sua conta
de todo navegador e todo celular, menos o aparelho em que você está. O botão
existe também no painel web — então dá para fazer a partir do computador se
foi o celular que sumiu.

Mais sobre isso em [Sessões e senha](/conta/sessoes-e-senha/).

## Sair

**Mais → Sair** pergunta antes de sair. Ao sair, aquele celular deixa de
receber os avisos do canal App no celular.
