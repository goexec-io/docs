---
title: Fotos da câmera
description: >-
  Pedir uma foto à ESP32-CAM, pela tela ou por uma automação, anexá-la aos
  avisos, e os limites de tamanho, ritmo e armazenamento.
sidebar:
  order: 14
---

:::caution[Em validação]
A ESP32-CAM e as fotos já estão no produto, mas ainda passam pela validação
final em bancada. Nomes de campos e limites desta página podem mudar.
:::

Uma [ESP32-CAM](/hardware/esp32-cam/) tira fotos quando alguém pede — pela tela
do aparelho ou por uma automação — e a foto pode seguir junto com um aviso: "a
porta abriu", com a foto de quem abriu.

## Pela tela do aparelho

A página de uma ESP32-CAM tem a seção **Câmera**:

| Controle | Opções |
|---|---|
| **Resolução** | QVGA 320×240 · VGA 640×480 · **SVGA 800×600 (padrão)** · XGA 1024×768 · HD 1280×720 · SXGA 1280×1024 · UXGA 1600×1200 |
| **Qualidade** | Máxima (10) · **Alta (12, padrão)** · Média (20) · Leve (30) |
| **Acender o flash** | Ajuda à noite. De dia, costuma ofuscar a imagem |

**Capturar agora** pede a foto. Enquanto ela vem, a tela mostra *"Capturando…
a foto chega em alguns segundos."* Com a câmera desconectada, o botão some: o
pedido só poderia vencer.

Na qualidade, **quanto menor o número, melhor a imagem e maior o arquivo**.

Abaixo ficam a **Última foto** e as **Fotos anteriores**. Ao abrir uma, você vê
o tamanho e a origem: *Pedida no painel*, *Tirada por uma automação* ou *Pedida
pela API*.

**Apagar foto** tira a foto do armazenamento e não tem volta. Mensagens que já
saíram com ela não mudam. Apagar exige permissão para editar aparelhos.

## Por uma automação

A ação **Capturar foto** tem os mesmos ajustes: **Câmera**, **Resolução**,
**Qualidade JPEG** (de 10 a 63) e **Acender o flash**.

Sozinha, ela só tira a foto. Para a foto ir junto com um aviso, marque **Anexar
a foto** nas ações que vêm **depois** dela — **Enviar notificação** ou **Chamar
URL**. Marcar sem nenhuma captura antes é recusado ao salvar.

```text
Quando a entrada Porta for acionada, então
  1. Capturar foto (Câmera da entrada)
  2. Enviar notificação para WhatsApp da portaria, com a foto
  3. Acionar saída Sirene por 30 s
```

A automação **não espera** a foto para seguir: a sirene do passo 3 não atrasa.
Quem espera é a notificação do passo 2, que segura o envio até a foto chegar —
até cerca de **2 minutos**.

## O que cada destino recebe

| Destino | O que chega |
|---|---|
| WhatsApp | A imagem, com a mensagem como legenda |
| Telegram | A imagem, com a mensagem como legenda. Um texto com mais de 1024 caracteres vai numa mensagem própria, logo depois da foto |
| E-mail | A imagem em anexo |
| Webhook (canal HTTP) | Um objeto `capture` com um link assinado para a foto, que expira em 24 horas — nunca a imagem em si |
| App no celular | Só o texto |

Numa **Chamar URL**, o corpo pode usar `{{capture.url}}`, `{{capture.id}}` e
`{{capture.state}}`. Veja [Variáveis da mensagem](/guia/variaveis-da-mensagem/).

## Quando a foto não vem

**O aviso sai assim mesmo.** Nenhum alerta é engolido por causa da foto: a
mensagem chega com a linha

```text
📷 Foto indisponível: <motivo>.
```

Os motivos mais comuns, e o que fazer:

| Motivo | O que fazer |
|---|---|
| A câmera está offline | Veja se ela aparece online |
| A câmera não conseguiu enviar a foto | Wi-Fi fraco. Aproxime o roteador ou use uma resolução menor |
| A câmera ficou sem memória | Use uma resolução menor |
| A foto passou do tamanho máximo | Use uma resolução menor, ou a qualidade Leve |
| O sensor da câmera não iniciou | Confira o cabo flat da câmera |
| Limite de fotos atingido | Veja os limites abaixo |
| O armazenamento de fotos do plano está cheio | Apague fotos antigas, ou espere as mais velhas expirarem |

Numa **Chamar URL**, a linha não é acrescentada — o corpo é um documento seu,
muitas vezes JSON, e uma frase no fim o quebraria. Use `{{capture.state}}` para
saber se a foto chegou.

### Câmera ocupada

Se a automação dispara de novo enquanto a foto anterior ainda está a caminho —
a porta abriu duas vezes em poucos segundos —, a segunda execução **anexa a
mesma foto** em vez de pedir outra. É a mesma cena, segundos antes.

### Wi-Fi fraco

Com sinal fraco, uma foto leva de 8 a 13 segundos para chegar. A câmera tenta
enviar mais de uma vez antes de desistir, e só desiste se a transferência
parar de andar — não por um relógio fixo.

## Limites

| Limite | Valor |
|---|---|
| Fotos a caminho, por câmera | Uma de cada vez |
| Intervalo mínimo, por câmera | 3 segundos |
| Fotos por hora, na organização | 120, somando todas as câmeras |
| Tamanho máximo de uma foto | 1 MiB |
| Tempo que cada foto fica guardada | Depende do plano — 30 dias no padrão |
| Armazenamento de fotos | Depende do plano — 1024 MB no padrão |

A seção **Câmera** mostra quanto você usa: *"Armazenamento de fotos: X de Y ·
cada foto fica guardada por N dias"*. Com o armazenamento cheio, capturas novas
são recusadas até fotos antigas expirarem ou serem apagadas.

O tempo de guarda é carimbado em cada foto quando ela chega. Uma mudança de
plano vale para as fotos **novas**; nenhuma foto guardada é apagada por ela.

:::note[Fotos ainda não saem pela API pública]
A [API pública](/api/visao-geral/) não pede nem lista fotos, e o aplicativo do
celular ainda não tem galeria. As fotos ficam na seção Câmera do painel e nos
avisos que as levam.
:::

## Próximo passo

[Eventos ao vivo](/guia/eventos-ao-vivo/) — o que o painel e o aplicativo
mostram sem você recarregar.
