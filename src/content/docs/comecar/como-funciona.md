---
title: Como funciona, em uma página
description: >-
  Por que a conexão fica aberta, por que um comando não se perde, e o que
  protege a sua placa e a sua conta.
sidebar:
  order: 2
---

Você não precisa disto para usar o produto. Precisa se vai instalar em cliente,
explicar para alguém por que o sistema é confiável, ou entender um comportamento
que parece estranho.

## A conexão fica aberta

A placa não pergunta ao servidor, de tempos em tempos, se há algo para fazer.
Ela mantém **uma conexão aberta** e os dois lados falam quando têm o que dizer.

A diferença é grande, e dá para medir:

| | Conexão aberta | Perguntando a cada 10 s |
|---|---|---|
| Clicar em "abrir portão" → o relé mexer | **86 ms** | até 10 segundos |
| Descobrir que o aparelho caiu | **1 segundo** | esperar o silêncio — na prática, 3 minutos |
| Configuração nova chegar | sozinha, na hora | só na próxima pergunta |

E há um custo que não aparece no relógio: perguntar a cada 10 segundos obriga a
placa a refazer uma negociação de segurança completa a cada ciclo, no chip mais
fraco da instalação.

### Como a queda é detectada em 1 segundo

Ao conectar, a placa deixa uma mensagem combinada com o servidor de mensagens:
*"se eu sumir, publique isto"*. Não é a placa que avisa que caiu — é o
intermediário, que percebe a conexão morrer.

Por isso cabo arrancado vira "offline" na tela em segundos, sem ninguém
perguntar nada a ninguém. E por isso o aparelho desligado na tomada aparece como
offline, e não como "sem resposta há um tempo".

## Um comando não se perde, e não executa duas vezes

Todo comando carrega três coisas:

| O quê | Para quê |
|---|---|
| Uma identidade única | A placa lembra o que já executou e **não repete** |
| Um número de sequência | Permite perceber que faltou alguma coisa no meio |
| Um prazo de validade | Depois dele, o comando não vale mais |

E o servidor só considera o comando entregue **quando a placa confirma**. Sem
confirmação, ele tenta de novo; se a placa continuar sem responder, ele para e
registra a falha em vez de fingir sucesso.

:::caution[O prazo de validade não é um detalhe]
Um comando de abrir portão que ficou duas horas parado na fila **não pode**
disparar quando o aparelho voltar. Não há ninguém lá. O prazo existe para isso —
é uma propriedade de segurança, não um refinamento de engenharia.
:::

## A configuração já está esperando

Quando você muda um canal na tela, o servidor não tenta alcançar a placa naquele
instante. Ele deixa a configuração nova guardada, marcada como "a mais recente".

Qualquer aparelho que se conectar dali em diante — agora, ou daqui a três dias
quando alguém religar a tomada — recebe a versão atual assim que entra.

É por isso que a tabela da página anterior diz **0 ms** para "configuração
chegar num aparelho novo": ela não precisa chegar, ela já está lá esperando.

## O que protege a sua conta e a sua placa

| Camada | Como |
|---|---|
| Placa → servidor | Conexão criptografada, com os certificados de origem embutidos na própria placa |
| Identidade da placa | Senha própria, aleatória, diferente em cada unidade, guardada só como hash |
| Isolamento entre aparelhos | Cada placa só consegue falar no canal dela — nem lê nem escreve no de outra |
| Sua sessão no painel | Credencial curta na memória do navegador, renovada por um cookie que o JavaScript não enxerga |
| Isolamento entre contas | Filtro por conta na aplicação **e** no banco de dados, em duas camadas independentes |

Duas raízes de certificado vão embarcadas na placa desde a primeira versão — a
que está em uso e a próxima. Isso é o que permite trocar o certificado do
servidor sem recolher aparelho nenhum do campo.

## Próximo passo

[Antes de começar](/comecar/antes-de-comecar/) — o que ter na mão antes de ligar
a primeira placa.
