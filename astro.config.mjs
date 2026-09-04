// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

/**
 * docs.goexec.io
 *
 * O idioma e pt-BR e so pt-BR. `locales` tem uma entrada so, `root`, e isso e
 * de proposito: declarar `en` e `es` aqui hoje faria o Starlight publicar TODA
 * pagina sob /en/ e /es/ com o conteudo em portugues (o fallback automatico
 * dele), e o buscador indexaria isso como pagina em ingles com texto em
 * portugues. Pior que nao ter. Quando houver traducao de verdade, acrescente a
 * chave aqui e crie src/content/docs/en/.
 *
 * A landing ja concorda com isso: em landing/en/index.html o link para ca sai
 * com hreflang="pt-BR".
 */
export default defineConfig({
  site: 'https://docs.goexec.io',
  integrations: [
    starlight({
      title: 'GoExec.io',
      description:
        'Documentacao do GoExec.io: montar, gravar e automatizar aparelhos que leem entradas e acionam saidas, sem programar.',
      /*
       * Duas logos, e nao uma. O Starlight serve a logo como <img>, entao o
       * `currentColor` de dentro do SVG NAO herda a cor da pagina -- ele
       * resolve contra o `color` declarado no proprio arquivo. Com um arquivo
       * so, a palavra "GoExec" ficava branca tambem no tema claro, sobre fundo
       * branco.
       *
       * As duas variantes sao geradas do mesmo tracado, mudando so duas cores.
       */
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        alt: 'GoExec.io',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Português', lang: 'pt-BR' },
      },
      editLink: {
        baseUrl: 'https://github.com/goexec-io/docs/edit/main/',
      },
      lastUpdated: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/goexec-io/docs' },
      ],
      customCss: ['./src/styles/tokens.css'],
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.goexec.io/og-cover.png' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0f0c18' } },
        // As mesmas tres familias da landing: Sora nos titulos, IBM Plex Sans no
        // texto, IBM Plex Mono no codigo.
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
          },
        },
      ],
      /*
       * A barra lateral lista apenas secoes que ja tem pagina. Secao vazia da a
       * impressao de site abandonado, que e pior que secao ausente -- ela entra
       * quando a primeira pagina dela existir.
       */
      sidebar: [
        {
          label: 'Começar aqui',
          items: [
            { label: 'O que é o GoExec.io', slug: 'comecar/o-que-e' },
            { label: 'Como funciona, em uma página', slug: 'comecar/como-funciona' },
            { label: 'Antes de começar', slug: 'comecar/antes-de-comecar' },
          ],
        },
        {
          label: 'Guia do usuário',
          items: [{ autogenerate: { directory: 'guia' } }],
        },
        {
          label: 'Hardware',
          items: [{ autogenerate: { directory: 'hardware' } }],
        },
        {
          label: 'Integrações',
          items: [{ autogenerate: { directory: 'integracoes' } }],
        },
        {
          label: 'Solução de problemas',
          items: [{ autogenerate: { directory: 'problemas' } }],
        },
        {
          label: 'Contribuir',
          items: [{ autogenerate: { directory: 'contribuir' } }],
        },
      ],
      plugins: [
        /*
         * Link interno morto quebra o build. E o defeito numero um de
         * documentacao e o unico que da para pegar sozinho.
         */
        starlightLinksValidator({
          errorOnRelativeLinks: false,
          errorOnLocalLinks: false,
        }),
      ],
    }),
  ],
});
