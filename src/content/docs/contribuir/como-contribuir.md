---
title: Como contribuir
description: >-
  Esta documentação é aberta. Como corrigir uma frase, propor uma página e o que
  acontece com o seu Pull Request.
sidebar:
  order: 1
---

Esta documentação vive em
[`goexec-io/docs`](https://github.com/goexec-io/docs) e aceita contribuição de
qualquer pessoa. Correção de erro de digitação vale tanto quanto página nova —
quem lê não distingue.

## Corrigir uma frase

Toda página tem **"Editar esta página"** no rodapé. O link abre o arquivo já no
editor do GitHub; ao salvar, o próprio GitHub cria a cópia, a branch e o Pull
Request.

Para uma correção pequena, é esse o caminho. Não precisa instalar nada.

## Propor uma página, ou mudar várias

```bash
git clone https://github.com/goexec-io/docs.git
cd docs
nvm use          # Node 22.12 ou mais novo
npm ci
npm run dev      # http://localhost:4321
```

Antes de abrir o Pull Request:

```bash
npm run build
```

Se isso passa, a verificação automática passa.

## O que o `build` verifica

Duas coisas, e as duas quebram o build de propósito:

**Link interno morto.** É o defeito número um de documentação, e o único que dá
para pegar sozinho. Se você renomeou um arquivo e esqueceu de atualizar quem
apontava para ele, o build reclama.

**Conteúdo interno vazado.** O GoExec.io é um produto comercial e o código dele
é fechado. Boa parte deste texto nasceu de documentos internos, e o que sobrou
de lá não pode aparecer: nome de arquivo do código, variável de ambiente
interna, endereço de servidor, comando de operação.

Se você bateu nessa verificação, o conserto é reescrever a frase do ponto de
vista de quem **usa** o produto:

| Em vez de | Escreva |
|---|---|
| "o `<serviço>` publica em `<tópico>/v1/…`" | "o servidor manda a configuração para a placa" |
| "ajuste a variável de tempo limite" | "o aviso desiste depois de alguns segundos" |
| "veja o arquivo do motor de regras" | (nada — quem lê não tem esse arquivo) |

A mensagem de erro diz exatamente o que ela achou e por que aquilo é bloqueado.

## O que acontece com o seu Pull Request

1. A verificação automática roda em alguns minutos.
2. O Cloudflare publica um **endereço de preview** com a sua versão do site. O
   link aparece no próprio Pull Request — dá para ler a página pronta, nos dois
   temas, antes de qualquer discussão.
3. Alguém revisa. Se pedirem mudança, é sobre o texto, não sobre você.

## O que é especialmente bem-vindo

- **"Fiz isto e não funcionou."** Relato de coisa que a página prometeu e a
  realidade negou é o material mais valioso que existe aqui.
- **A causa que você descobriu sozinho.** Se você passou duas horas num
  problema e achou a resposta, você já escreveu 80% da página que falta.
- **O passo que a página pulou.** Quem escreveu já sabia demais para perceber.

## O que fica fora

- **Problema com a sua conta, com a sua placa ou com uma cobrança.** Isto aqui é
  só a documentação — escreva para [support@goexec.io](mailto:support@goexec.io).
- **Falha de segurança.** Não abra issue pública. Escreva para o suporte com o
  assunto "segurança".
- **Pedido de funcionalidade no produto.** Esta documentação descreve o que
  existe; ela não é o canal para pedir o que não existe.

## Licença

Ao mandar um Pull Request você concorda em licenciar o texto sob **CC BY 4.0** e
o código sob **MIT**, os mesmos termos do resto do repositório.

O produto GoExec.io continua sendo software proprietário. O que é aberto aqui é
a documentação.
