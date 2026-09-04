---
title: Chamada externa (webhook de entrada)
description: >-
  Disparar uma automação a partir de outro sistema, e por que o endereço é uma
  credencial.
sidebar:
  order: 1
---

Qualquer sistema que saiba fazer uma requisição HTTP pode disparar uma
automação sua. Escolha **chamada externa** como gatilho, e a automação ganha um
endereço próprio.

**Copie o endereço da tela da automação.** Ele aparece completo lá, com um botão
para copiar — não o monte à mão. A chamada é um `POST`:

```bash
curl -X POST "<o endereço que a tela mostrou>"
```

A resposta é **202**, e ela significa *recebido e enfileirado* — não *"o portão
abriu"*. A rota não avalia nada; ela entrega para o mesmo motor que os sensores
usam.

## O endereço é a credencial

:::danger[Trate a URL como uma senha]
Na configuração padrão, **quem tem o endereço dispara a automação.** Não há
cabeçalho, cookie ou sessão: o caminho identifica a regra sozinho.
:::

Por isso o caminho é **gerado**, não escolhido: 24 símbolos de um alfabeto de 56,
o que dá cerca de 139 bits. Se você mandar um caminho próprio, o servidor recusa
qualquer coisa com menos de 16 caracteres.

O alfabeto não tem `0`, `O`, `1`, `l` nem `I` — de propósito, porque esse
endereço acaba sendo lido em voz alta ao telefone.

### Onde ele não aparece

O caminho **não vai para log nenhum**. O que identifica a chamada nos registros é
o id da automação, nunca o endereço.

## Toda falha responde 404

Caminho desconhecido, regra desativada, conta suspensa, verbo errado — tudo
responde o mesmo **404**.

É deliberado. Distinguir transformaria a rota num oráculo capaz de confirmar
quais endereços de estranhos existem.

Consequência prática ao depurar: um 404 **não** quer dizer que você errou a URL.
Confira também se a automação está ativa.

## Limite de taxa

O limite conta **só chamadas aceitas**, por automação.

Contar as recusadas daria a quem descobrisse a URL um jeito barato de silenciar a
regra — bastaria estourar o limite para o painel de alarme levar recusa bem na
hora em que tem uma invasão para reportar.

## Repetição de entrega

O cabeçalho `Idempotency-Key` é respeitado. A maioria dos sistemas que envia
webhook repete a entrega quando o tempo esgota, e a chave faz a repetição colidir
em vez de disparar duas vezes.

Se o seu sistema não manda esse cabeçalho, vale mandar.

## O corpo da chamada

O corpo viaja junto com o evento, limitado a 16 KB.

:::note[Hoje nada o lê]
Não existe condição sobre o conteúdo do corpo, e ele é deliberadamente mantido
fora dos textos de mensagem — dar o corpo cru ao template deixaria quem chama
escolher o que sai numa notificação sua.

Ele é guardado porque não guardá-lo seria irrecuperável, e porque é pré-requisito
de qualquer condição sobre corpo que venha a existir.
:::

## Combinar com um sensor

Uma mesma regra aceita a chamada externa **e** uma entrada como fontes: *"quando
meu sistema chamar, ou quando a porta abrir"* é **uma** automação.

Veja ["Ou também quando"](/guia/ou-tambem-quando/). O que continua exigindo duas
automações é ter **dois endereços** de chamada externa.
