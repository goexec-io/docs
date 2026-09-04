---
title: "Permission denied no Linux"
description: >-
  A porta aparece, o gravador reclama de permissão. A causa não tem nada a ver
  com o que a mensagem sugere.
sidebar:
  order: 3
---

Sintoma: no Linux, a placa aparece em `/dev/ttyUSB0` (ou `/dev/ttyACM0`), mas o
gravador responde:

```text
Permission denied: '/dev/ttyUSB0'
```

## A causa

**No Linux a armadilha é permissão, não driver.** Os drivers dos conversores USB
já vêm no núcleo do sistema há anos — não há nada para instalar.

O que falta é você pertencer ao grupo dono da porta serial. Ela pertence ao
grupo `dialout`, e o seu usuário provavelmente não está nele.

A mensagem não ajuda em nada a descobrir isso, e é por isso que esta página
existe.

## A correção

```bash
sudo usermod -aG dialout $USER
```

:::caution[Faça logout e login depois]
A mudança de grupo só vale para sessões novas. Reabrir o terminal **não**
basta — o grupo é lido quando você entra na sessão gráfica.

Se quiser conferir sem deslogar:

```bash
newgrp dialout    # abre uma sub-sessão já com o grupo
```

Mas para valer sempre, o logout é necessário.
:::

Depois de voltar, confirme:

```bash
groups | grep dialout
```

## Em algumas distribuições o grupo tem outro nome

| Distribuição | Grupo |
|---|---|
| Debian, Ubuntu, Linux Mint | `dialout` |
| Arch, Manjaro | `uucp` |
| Fedora | `dialout` |
| openSUSE | `dialout` |

Para descobrir com certeza na sua, pergunte ao sistema:

```bash
ls -l /dev/ttyUSB0
# crw-rw---- 1 root dialout 188, 0 ... /dev/ttyUSB0
#                    ^^^^^^^ é este nome que importa
```

## Por que não usar `sudo`

Funciona, e é por isso que muita gente para por aí:

```bash
sudo python -m flasher gravar --porta /dev/ttyUSB0 ...
```

Mas rodar como administrador um programa que baixa um arquivo da internet e
escreve num dispositivo é dar mais poder do que a tarefa precisa. E se o
programa foi instalado no seu usuário, o `sudo` pode nem achá-lo — você troca um
erro de permissão por um "comando não encontrado".

Entrar no grupo é uma linha, uma vez, e resolve para sempre.

## Se a porta nem aparece

Aí não é permissão. Veja [O gravador não acha a
porta](/problemas/gravador-nao-acha-a-porta/) — no Linux as causas prováveis são
cabo sem fios de dados ou porta ocupada por outro programa.

Para confirmar que o sistema enxergou a placa:

```bash
dmesg | tail -20     # logo depois de conectar o cabo
```

Se a placa foi reconhecida, aparecem linhas mencionando o conversor USB e o nome
do dispositivo criado.
