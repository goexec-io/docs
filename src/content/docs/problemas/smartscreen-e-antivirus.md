---
title: O Windows bloqueou o gravador
description: >-
  "Aplicativo não reconhecido" e alarme falso de antivírus — por que acontecem e
  o que fazer.
sidebar:
  order: 2
---

## "O Windows protegeu o seu computador"

Ao abrir o gravador pela primeira vez, o Windows mostra uma tela azul dizendo
que o aplicativo não é reconhecido.

**O que fazer:** clique em **Mais informações** e depois em **Executar assim
mesmo**.

### Por que aparece

O SmartScreen desconfia de todo programa que não tem assinatura digital de um
certificado que ele conheça — não porque encontrou algo errado, mas porque não
encontrou nada. Programa novo e pouco baixado cai nessa categoria por definição.

:::note[A cura real não está do seu lado]
A única forma de fazer esse aviso sumir é o programa ser assinado com um
certificado de assinatura de código, e ganhar reputação com o número de
downloads. Isso é trabalho de quem publica, não de quem instala.
:::

## O antivírus apagou o arquivo

Alguns antivírus removem o gravador assim que ele é baixado, ou logo depois de
abrir.

**O que fazer:** adicione a pasta do gravador à lista de exceções do seu
antivírus e baixe de novo.

### Por que acontece

O gravador é um programa Python empacotado em um único executável. Essa forma de
empacotar tem histórico de alarme falso: alguns antivírus reconhecem o padrão do
empacotador, não o conteúdo, e vários programas maliciosos já usaram o mesmo
empacotador.

Não é uma detecção sobre o que o programa faz. É uma detecção sobre como ele foi
montado.

## Como conferir que você baixou o arquivo certo

Vale o cuidado, já que você vai desligar uma proteção para rodá-lo:

- Baixe **só** da página oficial de releases. Não de link em fórum, grupo de
  mensagens ou site agregador.
- Confira o endereço no navegador antes de baixar.
- Se houver uma soma de verificação publicada ao lado do arquivo, confira. No
  Windows:

  ```powershell
  Get-FileHash .\gravador.exe -Algorithm SHA256
  ```

  O valor tem de bater, caractere por caractere, com o publicado.

## No Linux não existe esse problema

Nem SmartScreen, nem empacotador, nem antivírus. A dificuldade lá é outra —
permissão de acesso à porta serial. Veja [`Permission
denied`](/problemas/permission-denied-no-linux/).
