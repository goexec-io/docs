---
title: Limiar e histerese
description: >-
  Quem compara a temperatura é a placa, não o servidor. O que isso garante, e
  a única metade que depende da conexão.
sidebar:
  order: 8
---

Um sensor de temperatura não gera regra a cada leitura. Ele gera uma **travessia**:
o momento em que o valor cruzou o limite que você definiu.

E **quem compara é a própria placa.**

## O que a placa faz sozinha

Com o servidor fora do ar, ela continua **classificando**: compara o valor com o
limiar, aplica a histerese, mantém o estado do canal correto.

O que ela **não** faz sem o servidor é executar a ação — fechar o relé, mandar a
mensagem, chamar o endereço. Isso é sempre do servidor.

:::note[Não há motor de regras dentro da placa]
Vale ser preciso, porque a frase preguiçosa ("o limiar roda offline") engana. A
placa classifica; o servidor decide e age.
:::

### O acionamento não se perde numa queda

Se a travessia acontece com a placa desconectada, o aviso daquele instante é
perdido — mas a placa mantém uma **foto do estado atual**, com a idade de cada
nível.

Ao reconectar, o servidor recebe a foto, vê que o nível mudou, e a automação
dispara. **Atrasada, não perdida.**

É por isso que a [armadilha de janela de horário](/guia/filtro-intervalo-e-janela/)
importa: o filtro usa a data real da travessia, mas o horário e os dias usam o
instante da reconexão.

## Histerese

Sem histerese, um sensor parado exatamente no limite gera dezenas de travessias
por minuto. A histerese cria uma faixa morta: para desarmar, o valor precisa
voltar além do ponto de acionamento.

O ponto de desarme é onde quase todo mundo erra na primeira vez. Se o alarme
dispara e desarma sozinho em segundos, é aqui.

## "Entre X e Y" tem uma metade que depende do servidor

Um canal guarda **um** limiar — acima **ou** abaixo, nunca os dois. Então "entre
2 e 8 °C" é montado como duas condições no mesmo canal:

- uma **avaliada na placa**;
- outra **confirmada pelo servidor**. A tela marca essa com um selo âmbar.

:::caution[Com o servidor fora do ar, a segunda metade não é avaliada]
E a diferença com o caso anterior é o ponto: um limiar da placa sobrevive à queda
como classificação, e é recuperado pela foto. Essa metade não sobrevive — é uma
comparação que só o servidor faz.

Se você quer os dois lados avaliados pela placa, crie um **segundo canal de
medida** sobre o mesmo sensor. Não custa pino, é criado no editor de entradas e
saídas, e aí são dois limiares de verdade na placa.
:::

## Duas regras não podem compilar limiares diferentes no mesmo canal

A segunda é recusada, com os nomes das duas regras na mensagem.

Não é limitação técnica: escolher qual de dois alarmes discordantes vence é uma
decisão sobre a câmara fria de alguém, e um servidor que escolhesse escolheria em
silêncio.

## Próximo passo

[Ações](/guia/acoes/) — o que uma regra faz quando dispara.
