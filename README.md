# Documentação do GoExec.io

O conteúdo de **[docs.goexec.io](https://docs.goexec.io)**, aberto para quem
quiser corrigir, completar ou traduzir.

O GoExec.io é uma plataforma de automação e monitoramento: uma placa lê entradas
(sensores, botões, contatos secos) e aciona saídas (relés, sirenes), conversando
com um servidor que decide o que fazer e avisa quem precisa saber — sem escrever
código.

> **O produto é proprietário; esta documentação não.** O backend, o painel, o
> aplicativo e o firmware do GoExec.io são software fechado e vivem em outro
> repositório. O que está aberto aqui é o texto: as páginas em CC BY 4.0
> ([LICENSE](LICENSE)) e o código do site em MIT ([LICENSE-CODE](LICENSE-CODE)).

## Rodar aqui

Precisa de **Node 22.12 ou mais novo** (o `.nvmrc` já aponta a versão).

```bash
nvm use            # le o .nvmrc
npm ci
npm run dev        # http://localhost:4321
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Roda o gate de vazamento e monta o site em `dist/` |
| `npm run preview` | Serve o `dist/` — é onde a busca funciona, ela só existe no build |
| `npm run check:vazamento` | Só o gate, sem construir |
| `npm run check:markdown` | Lint do Markdown |

## Contribuir

Achou erro, faltou explicação, a instrução não bateu com a tela? Abra uma
[issue](https://github.com/goexec-io/docs/issues) ou mande um Pull Request — o
[CONTRIBUTING.md](CONTRIBUTING.md) tem o guia de estilo e as duas regras que
importam.

Toda página tem um link **"Editar esta página"** no rodapé, que abre o arquivo
certo já no editor do GitHub. Para uma correção pequena, esse é o caminho mais
curto: não precisa clonar nada.

Cada Pull Request ganha um endereço de preview do Cloudflare Pages, então dá para
ler a página pronta antes de aprovar.

## Como o site é feito

[Astro](https://astro.build) + [Starlight](https://starlight.astro.build).
As páginas são Markdown em `src/content/docs/`, a estrutura do menu está em
`astro.config.mjs`, e a paleta em `src/styles/tokens.css`.

A busca é o [Pagefind](https://pagefind.app), que roda no navegador de quem lê —
não há serviço de busca, chave de API nem rastreamento de consulta.
