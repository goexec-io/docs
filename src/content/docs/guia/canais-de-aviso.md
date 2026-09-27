---
title: Canais de aviso
description: >-
  Para onde os alertas vão — e-mail, WhatsApp, Telegram, HTTP e o aplicativo — e
  por que WhatsApp e Telegram pedem um código antes de funcionar.
sidebar:
  order: 12
---

Um **canal** é um destino de aviso: um e-mail, um número de WhatsApp, um grupo do
Telegram. Você cria os canais uma vez, em **Canais**, e depois as automações
escolhem para qual deles mandar, na ação **Enviar notificação**.

## Os tipos

| Tipo | O que é | Quando fica pronto para uso |
|---|---|---|
| E-mail | Um endereço de e-mail | Depois de um **Enviar teste** entregue |
| WhatsApp | Um número ou um grupo | Depois que a pessoa do destino envia o código |
| Telegram | Um contato ou um grupo | Depois que a pessoa do destino envia o código |
| HTTP | Um endereço que recebe um JSON | Depois de um **Enviar teste** entregue |
| App no celular | O [aplicativo](/aplicativo/o-aplicativo/) do GoExec.io num telefone | Criado **pelo próprio aplicativo** |

A etiqueta no cartão do canal diz em que pé ele está: **Verificado**, **Sem
teste**, **Aguardando confirmação** ou **Inativo**. Na ação da automação, um
canal que ainda não está pronto aparece com **(não verificado)**.

Slack e Discord não são tipos de canal: eles entram pela ação [Chamar URL
(webhook)](/integracoes/acao-http/#slack-e-discord).

## WhatsApp e Telegram: o código

:::caution[Em validação]
A confirmação por código de WhatsApp e Telegram é recente e ainda está sendo
validada em uso real. Se algo não bater com esta página, [abra uma
issue](https://github.com/goexec-io/docs/issues).
:::

O WhatsApp sai de um número do GoExec.io, e o Telegram, de um bot do GoExec.io.
Você não cadastra token nem conta própria. Em troca, o destino precisa **provar
que quer receber**: a pessoa envia um código para o GoExec.io, e só então o canal
passa a valer.

É isso que impede um alerta seu de cair no número errado por um dígito trocado —
e impede que alguém use o produto para mandar mensagem a quem não pediu. Como a
própria tela diz: "é você quem envia. O nosso número nunca inicia a conversa."

### Passo a passo

1. Em **Canais**, **Novo canal**. Escolha o **Tipo** e, em **Para quem**:
   - WhatsApp: **Número** ou **Grupo**;
   - Telegram: **Contato** ou **Grupo**.
2. **Criar canal**. Ele nasce **Aguardando confirmação**, e a janela
   **Confirmar** abre com um **Código de confirmação** no formato `GOEXEC-…`.
3. Envie o código, do jeito que a janela mostra:
   - **Número de WhatsApp**: no celular do número, toque em **Abrir no
     WhatsApp** e envie a mensagem que já vem preenchida.
   - **Contato do Telegram**: toque em **Abrir no Telegram** e em **Iniciar** —
     o código vai junto.
   - **Grupo**, nos dois: adicione o número (ou o bot) do GoExec.io ao grupo e
     envie o código lá. Qualquer participante pode enviar.
4. A janela mostra "Esperando o código chegar…" e fecha sozinha quando ele chega.
   O canal passa a **Verificado**.

A confirmação também pode ser feita pelo aplicativo.

**O código vale 30 minutos.** Venceu, toque em **Gerar novo código**.

### O número é opcional

No WhatsApp, o campo do número pode ficar em branco: o código que a pessoa envia
já diz de que número veio. Se você preencher, **só aquele número** consegue
confirmar — útil quando você quer ter certeza de quem vai receber.

### Canais criados antes da confirmação por código

Canais de WhatsApp e de Telegram do jeito antigo, com token próprio, deixaram de
existir quando a confirmação por código entrou. Se você tinha algum, crie de novo
e confirme — e confira as automações que avisavam por ele.

### O ritmo do WhatsApp

O WhatsApp não sai em rajada. Antes de cada mensagem o número do GoExec.io mostra
"digitando" por alguns segundos, e há um intervalo entre uma mensagem e outra.
Um alerta pode levar alguns segundos a mais para chegar por isso — é de propósito,
para o número não ser tratado como robô e bloqueado.

Se um mesmo destino passa de **30 mensagens numa hora**, as seguintes esperam e
saem depois, em vez de sair todas de uma vez.

## E-mail e HTTP: o teste

E-mail e HTTP ficam prontos depois do primeiro **Enviar teste** que for
entregue. O teste também é o jeito mais rápido de conferir um canal que parou de
funcionar.

Para não virar um jeito de mandar mensagem em massa, o teste tem limite: **5 a
cada 5 minutos por canal** e **30 por hora por organização**.

No canal **HTTP**, a **Autenticação** oferece **Sem autenticação**, **Bearer
token**, **Usuário e senha** e **Cabeçalho personalizado**. O canal HTTP manda um
JSON num formato fixo do GoExec.io; se o destino exige um formato próprio, use a
ação [Chamar URL (webhook)](/integracoes/acao-http/), que envia o corpo que você
escrever.

## Com foto

Quando a automação tira uma foto com uma ESP32-CAM e a ação de notificação marca
**Anexar a foto**, cada tipo recebe de um jeito:

| Tipo | O que chega |
|---|---|
| WhatsApp | A imagem, com a mensagem como legenda |
| Telegram | A imagem com legenda. Legenda com mais de 1024 caracteres vai inteira numa mensagem logo depois da foto |
| E-mail | A foto como anexo |
| HTTP | O JSON ganha os dados da foto e um link para ela, válido por 24 h — nunca a imagem em si |
| App no celular | Só o texto |

Se a foto não chegar a tempo, o aviso sai mesmo assim, com "📷 Foto indisponível"
e o motivo. Veja [Fotos da câmera](/guia/fotos-da-camera/).

## Quando um aviso não sai

Se o envio desiste de um alerta, ele aparece em **Canais**, na seção **Alertas
que não saíram**, com a opção de reprocessar. Veja [O aviso não
chegou](/problemas/aviso-nao-chegou/).
