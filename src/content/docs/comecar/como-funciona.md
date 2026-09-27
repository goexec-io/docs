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
| Descobrir que o aparelho caiu | **de 1 a 30 segundos** | esperar o silêncio — na prática, 3 minutos |
| Configuração nova chegar | sozinha, na hora | só na próxima pergunta |

E há um custo que não aparece no relógio: perguntar a cada 10 segundos obriga a
placa a refazer uma negociação de segurança completa a cada ciclo, no chip mais
fraco da instalação.

### Como a queda é detectada

Ao conectar, a placa deixa uma mensagem combinada com o servidor de mensagens:
*"se eu sumir, publique isto"*. Não é a placa que avisa que caiu — é o
intermediário, que publica o aviso quando percebe a conexão morrer.

O quanto isso leva depende de **como** ela morreu:

| Como caiu | "Offline" na tela em |
|---|---|
| A placa fechou a conexão (reinício, troca de rede) | cerca de 1 segundo |
| Faltou energia, ou o Wi-Fi sumiu de repente | cerca de 30 segundos |
| O servidor de mensagens caiu junto | até cerca de 3,5 minutos |

A diferença entre as duas primeiras linhas é física. Uma placa que fecha a
conexão avisa na hora. Uma placa sem energia não avisa nada — o intermediário
só percebe pelo silêncio. A placa dá sinal de vida a cada 20 segundos, e depois
de uma vez e meia esse tempo sem notícia a conexão é dada como morta.

Em qualquer caso, o aparelho desligado na tomada aparece como offline, e não
como "sem resposta há um tempo" — sem ninguém perguntar nada a ninguém.

## Um comando não se perde, e não executa duas vezes

Todo comando carrega três coisas:

| O quê | Para quê |
|---|---|
| Uma identidade única | A placa lembra o que já executou e **não repete** |
| Um número de sequência | Permite perceber que faltou alguma coisa no meio |
| Um prazo de validade | Depois dele, o comando não vale mais |

E o servidor só considera o comando entregue **quando a placa confirma**. Sem
confirmação, ele reenvia enquanto o prazo vale — **30 segundos** para um comando
dado no painel, **20** para um de automação. Vencido o prazo, ele para e registra
o comando como vencido, em vez de fingir sucesso.

A memória do que já foi executado sobrevive a um reinício da placa: um comando
repetido depois de um reset não aciona de novo. Veja [Quando a placa reinicia ou
falta energia](/hardware/quando-falta-energia/).

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
| Seu login | [Verificação em duas etapas](/conta/verificacao-em-duas-etapas/) opcional, e um botão para [encerrar todas as outras sessões](/conta/sessoes-e-senha/) |
| Destinos de aviso | WhatsApp e Telegram só recebem depois que o destino prova, com um código, que quer receber |
| Integrações | [Chaves de API](/api/chaves-de-api/) mostradas uma vez só, guardadas só como hash, limitadas ao papel de quem emitiu e revogáveis na hora; chamadas de saída [assinadas](/integracoes/assinatura-do-webhook/) |
| Isolamento entre contas | Filtro por conta na aplicação **e** no banco de dados, em duas camadas independentes |

Duas raízes de certificado vão embarcadas na placa desde a primeira versão — a
que está em uso e a próxima. Isso é o que permite trocar o certificado do
servidor sem recolher aparelho nenhum do campo.

## Próximo passo

[Antes de começar](/comecar/antes-de-comecar/) — o que ter na mão antes de ligar
a primeira placa.
