---
title: Membros e papéis
description: >-
  O que cada papel pode fazer numa organização — Visualizador, Operador,
  Administrador e Dono.
sidebar:
  order: 4
---

Cada pessoa numa organização tem um papel, e os papéis são **cumulativos**:
cada um pode tudo o que o anterior pode, e mais um pouco. A lista fica em
**Configurações → Membros**.

| Papel | Pode |
|---|---|
| **Visualizador** | Só ler. Vê os aparelhos, as automações, os eventos e os avisos. Não aciona nada |
| **Operador** | Aciona saídas, edita automações, canais de aviso e limites, renomeia aparelhos |
| **Administrador** | Tudo acima, e mais: adiciona e remove aparelhos, convida e remove pessoas, muda papéis, emite e revoga [chaves de API](/api/chaves-de-api/) |
| **Dono** | Tudo acima, e mais: apagar a organização ou passá-la para outra pessoa (por enquanto, sem tela no painel — fale com o suporte) |

## Convidar

**Convidar** pede o e-mail e o papel. A pessoa recebe um link para entrar na
organização; se ela já tem conta no GoExec.io, aceitar só acrescenta a
organização, sem mudar a senha dela.

Convites pendentes ocupam lugar: o número de lugares vem do plano, e a tela
mostra quantos estão em uso.

## Remover

**Remover** tira o acesso da pessoa **na hora**, e as sessões abertas dela
nessa organização são encerradas.

As chaves de API que essa pessoa emitiu **são revogadas junto**. Se uma
integração importante usava uma chave dela, emita outra — com o seu nome —
antes de remover.

## Mudar o papel

Rebaixar alguém também encolhe as chaves de API dessa pessoa, na próxima
chamada: uma chave nunca pode mais do que o papel atual de quem a emitiu.
