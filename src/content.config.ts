import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),

  /*
   * Os rotulos da propria interface do Starlight ("Nesta pagina", "Buscar",
   * "Editar esta pagina"). Ele ja traz pt-BR pronto, entao esta colecao fica
   * vazia -- ela existe para o dia em que uma dessas palavras precisar ser
   * outra, e para o build parar de avisar que a colecao nao existe.
   */
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
