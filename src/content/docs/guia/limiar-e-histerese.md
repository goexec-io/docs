---
title: Limiar e histerese
description: >-
  Quem compara a temperatura é a placa, não o servidor. O que isso garante, a
  única metade que depende da conexão, e como ler o ponto de desarme.
sidebar:
  order: 10
---

Um sensor de temperatura não gera regra a cada leitura. Ele gera uma **travessia**:
o momento em que o valor cruzou o limite que você definiu.

E **quem compara é a própria placa.**

## Os campos

Escolha um canal de medida como gatilho e a tela abre o bloco **Limite de
medida**:

| Campo | O que é |
|---|---|
| **Comparação** | **Acima de** ou **Abaixo de**. O próprio limite já conta |
| **Limite** | O número, na unidade do sensor |
| **Histerese** | Quanto a leitura precisa voltar para o alarme desarmar |
| **Sem leitura por (s)** | Depois desse tempo sem resposta, a placa considera o sensor mudo |
| **Se o sensor parar de responder** | **É alarme** ou **Fica quieto** — obrigatório, sem resposta padrão |
| **Verificar na placa** | A placa passa a checar este limite sozinha |
| **Quando** | **Ao entrar em alarme**, **Ao sair do alarme** ou **Nos dois sentidos** |

"Se o sensor parar de responder" não tem resposta padrão porque as duas estão
certas em lugares diferentes. Numa câmara fria, fio partido não é "temperatura
ok": **É alarme**. Numa medida de conforto, ficar sem leitura não é emergência:
**Fica quieto**.

## O que a placa faz sozinha

Com o servidor fora do ar, ela continua **classificando**: compara o valor com o
limiar, aplica a histerese, mantém o estado do canal correto.

O que ela **não** faz sem o servidor é executar a ação — fechar o relé, mandar a
mensagem, chamar o endereço. Isso é sempre do servidor.

:::note[Não há motor de regras dentro da placa]
Vale ser preciso, porque a frase preguiçosa ("o limiar roda offline") engana. A
placa classifica; o servidor decide e age. A própria tela diz isso ao lado do
número: *"Verificado na placa — a placa continua conferindo o limite mesmo se o
servidor cair, mas a ação (sirene, aviso) só acontece quando o servidor volta."*
:::

Depois de salvar, a regra mostra *"Aguardando a placa confirmar este limite"*
até a placa aceitar. Se uma placa ficar sem a configuração, salvar a regra de
novo reenvia o limite para ela.

### O acionamento não se perde numa queda

Se a travessia acontece com a placa desconectada, o aviso daquele instante é
perdido — mas a placa mantém uma **foto do estado atual**, com a idade de cada
nível.

Ao reconectar, o servidor recebe a foto, vê que o nível mudou, e a automação
dispara. **Atrasada, não perdida.**

É por isso que a [armadilha de faixa de horário](/guia/filtro-intervalo-e-janela/)
importa: o filtro usa a data real da travessia, mas o horário e os dias usam o
instante da reconexão.

## Histerese e o ponto de desarme

Sem histerese, um sensor parado exatamente no limite gera dezenas de travessias
por minuto. A histerese cria uma faixa morta: para desarmar, o valor precisa
voltar além do ponto de acionamento.

O ponto de desarme é onde quase todo mundo erra na primeira vez — e a tela
passou a imprimi-lo onde a histerese é digitada: *"Com esta histerese, o alarme
desarma em 26 °C."* Num limite "acima de 28" com histerese 2, o alarme entra em
28 e sai em 26.

As opções do campo **Quando** trazem os mesmos números:

| Opção | Exemplo com limite 28 e histerese 2 |
|---|---|
| **Ao entrar em alarme** | 28 ou acima |
| **Ao sair do alarme** | 26 ou abaixo |
| **Nos dois sentidos** | entra em 28 ou acima, sai em 26 ou abaixo |

:::tip[Para agir quando a leitura volta ao normal, não crie um segundo limite]
"Desligar o compressor quando a câmara voltar a 26" é a **mesma** comparação,
com **Ao sair do alarme** em Quando. Um segundo limite "abaixo de 26" no mesmo
canal é recusado — a placa guarda um só, e o desarme em 26 ela já avisa.
:::

## "Entre X e Y" tem uma metade que depende do servidor

Um canal guarda **um** limiar — acima **ou** abaixo, nunca os dois. Então "entre
2 e 8 °C" é montado como duas condições no mesmo canal:

- uma **avaliada na placa**;
- outra **confirmada pelo servidor**. A tela marca essa com um selo âmbar:
  *"Confirmado pelo servidor — este limite não vale com o servidor fora do ar."*

:::caution[Com o servidor fora do ar, a segunda metade não é avaliada]
E a diferença com o caso anterior é o ponto: um limiar da placa sobrevive à queda
como classificação, e é recuperado pela foto. Essa metade não sobrevive — é uma
comparação que só o servidor faz.

Se você quer os dois lados avaliados pela placa, crie um **segundo canal de
medida** sobre o mesmo sensor. Não custa pino, é criado no editor de entradas e
saídas, e aí são dois limiares de verdade na placa.
:::

### A condição que nunca vale

Existe uma combinação que a tela avisa, porque parece certa e nunca dispara: um
"somente se" no **mesmo** canal do gatilho, pedindo um número mais difícil que o
limite da placa.

A placa avisa **uma** travessia, no limite que ela guarda — digamos 28. Uma
condição "somente se acima de 30" no mesmo canal é lida nesse instante, com a
leitura ainda em 28, e nunca é satisfeita. A saída é a mesma de antes: um
segundo canal de medida.

## Um limite por canal, e de quem ele é

A placa guarda **um** limite por canal. Duas regras que pedem **exatamente o
mesmo** limite — número, histerese, janela de silêncio e resposta para o sensor
mudo — convivem de graça: nada é reenviado para a placa.

Por isso, ao abrir uma segunda regra sobre um sensor que já tem dono, o limite
aparece **só para leitura**, com o nome da regra dona e o botão **Abrir
«nome da regra»**. A orientação é deixar o número exatamente como veio.

**Editar assim mesmo** existe para quem quer *mudar* o limite do sensor. Um
número diferente do gravado é recusado ao salvar, com o nome das duas regras na
mensagem.

Não é limitação técnica: escolher qual de dois alarmes discordantes vence é uma
decisão sobre a câmara fria de alguém, e um servidor que escolhesse escolheria em
silêncio.

### Limite digitado no editor de entradas e saídas

Um canal pode já ter um limite digitado na tela de entradas e saídas. Ao abrir
uma regra sobre ele, a tela oferece **Descrever o limite aqui**: o número, a
histerese e a resposta para o sensor mudo vêm exatamente como estão gravados, e
nada é reenviado. Se você mudar o número, o salvar pergunta antes — **Assumir o
limite e salvar** —, e a regra passa a ser a dona.

## Desativar a regra não tira o limite da placa

Parece errado e está certo. Desligar a regra para a **ação**; a placa continua
conferindo o limite, e religar a regra custa zero.

Para mudar quem manda no limite, há dois gestos explícitos: remover a comparação
da regra, ou usar **Desvincular** no canal, na tela de entradas e saídas. Depois
de desvincular, o limite volta a ser o que está escrito naquela tela, e a regra
passa a ter o servidor conferindo o número — com o servidor fora do ar, ninguém
confere.

## Próximo passo

[Ações](/guia/acoes/) — o que uma regra faz quando dispara.
