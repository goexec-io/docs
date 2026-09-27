---
title: Chaves de API
description: >-
  Emitir, rotacionar e revogar uma chave, e o que desliga uma chave sem ninguém
  pedir.
sidebar:
  order: 2
---

A chave de API é a credencial de máquina do GoExec.io. Ela fica em
**Configurações → Chaves de API**, e só **Dono** e **Administrador** veem essa
tela. Cada pessoa emite chaves para si mesma.

:::note[A chave age em seu nome]
Ela herda no máximo o **seu** papel, vale para **uma** organização e deixa de
funcionar se você sair dela. Se o seu papel for rebaixado, a chave encolhe
junto, na próxima chamada.
:::

## Emitir

1. Em **Chaves de API**, toque em **Emitir chave**.
2. **Nome**: como você vai reconhecer a chave depois — "integração do portão",
   "Zabbix da portaria". Ele é único na organização.
3. **Escopos**: marque só o que aquele sistema precisa. Um escopo acima do seu
   papel aparece desabilitado, com "Seu papel não permite conceder este
   escopo". A lista completa está em
   [Autenticação e escopos](/api/autenticacao-e-escopos/).
4. **Expiração**: 30 dias, 90 dias, 1 ano ou Nunca. "Nunca" vem com um aviso:
   a chave vale até alguém revogá-la.
5. **Emitir**.

A tela seguinte, **Chave emitida**, mostra a chave com o botão **Copiar
chave** e um exemplo de `curl` em "Teste assim:".

:::caution[Copie agora]
Esta é a **única vez** que a chave aparece. O servidor guarda só um resumo dela
e não consegue mostrá-la de novo. Perdeu? Emita outra e revogue esta.
:::

A chave tem a forma `an_pat_<prefixo>_<segredo>`. O **prefixo** é público e
aparece na lista: é por ele que você descobre qual chave fez uma chamada sem
precisar ter a chave.

Cada organização pode ter até **20 chaves ativas**. Chaves revogadas não
contam.

## A lista

| Coluna | O que mostra |
|---|---|
| Nome | O nome que você deu |
| Prefixo | O pedaço público da chave |
| Escopos | O que ela pode fazer |
| Dono | Quem emitiu — é o papel dessa pessoa que limita a chave |
| Expira em | A data, ou "Nunca" |
| Último uso | A última chamada aceita, ou "Nunca usada" |
| Req. 30d | Chamadas nos últimos 30 dias |
| Estado | Ativa · Expirada · Revogada |

Duas marcas aparecem na própria linha: **"Expira em menos de 14 dias"** e
**"Sem uso há mais de 90 dias"** — a segunda é a candidata natural a revogar.

Revogadas somem da lista; **Mostrar revogadas** traz de volta.

O cartão **Uso nos últimos 30 dias** mostra uma barra por dia, no fuso da
organização. A faixa vermelha é a parte que foi recusada por
[limite](/api/limites-erros-e-versoes/).

## Rotacionar

**Rotacionar** cria uma chave nova com os mesmos escopos e revoga a atual **no
mesmo instante**. Não há período em que as duas funcionem: quem usa a chave
antiga precisa receber a nova logo em seguida.

A nova nasce com outro nome — o antigo continua preso à linha revogada, que a
lista ainda guarda.

## Revogar

**Revogar** corta o acesso na próxima chamada, sem cache. Não tem volta: para
repor, emita outra.

Se a chave vazou e você está longe do painel, ela pode se desligar sozinha:

```bash
curl -s -X POST -H "Authorization: Bearer an_pat_XXXXXXXXXXXX_..." \
  https://api.goexec.io/api/v1/me/revoke
```

A resposta é **204**. Essa rota não exige escopo nenhum e não é barrada pelos
limites da chave ou da organização — justamente porque quem está gastando esses
limites pode ser quem roubou a chave. Ela desliga só aquela chave; as outras
integrações continuam.

## O que desliga uma chave sozinha

| Acontecimento | A chave |
|---|---|
| Quem emitiu é removido da organização | Revogada |
| A organização é suspensa ou tem a exclusão pedida | Revogada |
| A data de expiração passa | Expirada |
| A organização suspensa é reaberta | **Continua revogada** — emita novas |

## O que **não** desliga uma chave

- Trocar a senha.
- Redefinir a senha por "Esqueci a senha".
- **Encerrar todas as outras sessões.**

Sessão e chave são credenciais separadas: derrubar integrações porque alguém
trocou de senha seria uma surpresa ruim num plantão. Se você precisa cortar
todo o acesso de uma pessoa, revogue as chaves dela aqui também.

## No aplicativo

No aplicativo, **Configurações → Chaves de API** lista as chaves e permite
**Revogar**. Emitir não: escolher escopos e prazo é formulário do painel web.
