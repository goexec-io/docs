---
title: O portal de Wi-Fi
description: >-
  Como conectar a placa à rede, quando o portal abre sozinho, e as duas
  informações que só aparecem nessa tela.
sidebar:
  order: 6
---

Quando a placa não está na rede, ela vira um ponto de acesso Wi-Fi e serve uma
página de configuração. É o portal.

## Conectar a placa à rede

1. Na lista de redes do celular, a placa aparece como **`GoExec-XXXX`**.
2. Conecte usando a **senha da etiqueta**. Numa placa que você mesmo gravou, a
   senha aparece no gravador, em **Acesso a placa → Senha da rede**.
3. A página abre sozinha. Se não abrir, acesse **`http://192.168.4.1`** no
   navegador.
4. Escolha a sua rede e digite a senha. Rede oculta: use o campo de digitação em
   vez da lista.
5. **Salvar.** A placa reinicia e entra na rede.

:::note[O ponto de acesso some, e isso é normal]
Depois de salvar, `GoExec-XXXX` desaparece da lista e o seu celular volta para a
rede de antes. É o comportamento esperado — a placa desligou o ponto de acesso
para poder entrar na rede que você acabou de configurar.
:::

## Quando o portal abre

| Situação | O que acontece |
|---|---|
| Placa nova, sem Wi-Fi salvo | Abre sozinho **e não expira** |
| Você quer trocar de roteador | Segure o botão por **3 segundos** (na ESP32-CAM, o IO0) |
| A senha do Wi-Fi mudou | Abre sozinho depois de **3 recusas seguidas** do roteador |
| Uma [transferência](/hardware/transferir-a-placa/) foi aceita | Abre sozinho no próximo boot, já com o código novo na tela |

**Sinal fraco não abre o portal.** Só senha recusada. A distinção importa: sem
ela, o roteador de um condomínio reiniciando faria dezenas de placas virarem
pontos de acesso ao mesmo tempo.

E são três recusas **seguidas, desde a última vez que a rede aceitou a placa** —
não o total desde que ela ligou. Uma conexão bem-sucedida zera a contagem.

## As duas informações que só existem nessa tela

### O endereço MAC

Ele aparece no topo do portal, e é o que você precisa quando o roteador do
cliente filtra por lista de aparelhos autorizados.

:::caution[Por que ele não está em outro lugar]
A lista de clientes do roteador só mostra quem **já conectou** — que é
exatamente o estado que o filtro está impedindo. A tela do portal é a única
alcançável antes de a placa entrar na rede.

É o MAC da interface que entra na rede, não o do ponto de acesso. Os dois são
diferentes, e o que a liberação precisa é este.
:::

### O código de registro

Logo abaixo do formulário de Wi-Fi, o portal mostra o código de registro da
placa, num campo selecionável e com um botão **Copiar**.

É a resposta para dois casos comuns: a etiqueta que descolou, e a unidade que
foi gravada na bancada e nunca teve etiqueta.

## Transferir para outra conta

Numa placa que já pertence a uma conta, o portal tem também a seção
**Transferir para outra conta**. É o caminho para passar a placa adiante sem
apagar nada — o passo a passo está em [Passar a placa para outra
conta](/hardware/transferir-a-placa/).

## Quanto tempo o portal fica aberto

| Como abriu | Fecha quando |
|---|---|
| Placa nunca configurada | **Nunca** |
| Botão, senha recusada ou transferência | **10 minutos** sem ninguém mexer, ou **30 minutos** em qualquer caso |

Celular conectado ou página sendo carregada contam como "mexendo".

Ao fechar, a placa **reinicia** — não só desliga o ponto de acesso. É isso que a
devolve à rede salva: enquanto o portal está no ar, a parte que conecta ao Wi-Fi
está desligada, e uma placa instalada longe do botão que ficasse presa no portal
só voltaria se alguém a tirasse da tomada.

Se a senha continuar errada, o ciclo se repete: tenta a rede, três recusas,
portal por 10 minutos, reinicia, tenta de novo.

## Se não funcionar

- **A rede não aparece na lista do portal** → é rede de 5 GHz, que a placa não
  enxerga, ou é rede oculta. Use o campo de digitação.
- **A senha está certa e ela não entra** → veja se você escolheu a faixa de
  2,4 GHz; se as duas faixas do roteador têm o mesmo nome, não há como saber
  qual você marcou.
- **Entra e sai** → filtro de MAC. Libere o endereço que está no topo desta
  tela.
- **`GoExec-XXXX` não aparece em lugar nenhum** → a placa pode não estar
  ativada. Placa gravada sem código de ativação não sobe ponto de acesso, e isso
  é deliberado. Não precisa regravar: no gravador, use **Ativar placa** — veja
  [Regravar sem perder a ativação](/hardware/regravar-sem-perder-a-ativacao/).

## Próximo passo

Com a placa na rede, ela aparece no painel em segundos. Se algo deu errado antes
disso, [Solução de problemas](/problemas/gravador-nao-acha-a-porta/).
