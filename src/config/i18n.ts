export const i18n = {
  en: {
    "featured": "Featured",
    "recentPosts": "Recent Posts",
    "allPosts": "All Posts",
    "previousPost": "Previous Post",
    "nextPost": "Next Post",
    "backToTop": "Back to Top",
    "tags": "Tags",
    "tag": "Tag:",
    "posts": "Posts",
    "allTagsUsed": "All the tags used in posts.",
    "allArticles": "All the articles I've posted.",
    "taggedWith": "All the articles with the tag",
  },
  es: {
    "featured": "Destacado",
    "recentPosts": "Entradas recientes",
    "allPosts": "Todas las entradas",
    "previousPost": "Entrada anterior",
    "nextPost": "Siguiente entrada",
    "backToTop": "Volver arriba",
    "tags": "Etiquetas",
    "tag": "Etiqueta:",
    "posts": "Entradas",
    "allTagsUsed": "Todas las etiquetas usadas en las entradas.",
    "allArticles": "Todos los artículos que he publicado.",
    "taggedWith": "Todos los artículos con la etiqueta",
  },
} as const;

export type Locale = keyof typeof i18n;
export type TranslationKey = keyof typeof i18n.en;

export function t(locale: Locale, key: TranslationKey): string {
  return i18n[locale][key];
}

