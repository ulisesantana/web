import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

export const getPostsByLang = (
  posts: CollectionEntry<"blog">[],
  lang: "en" | "es" = "en"
) => {
  return posts
    .filter(postFilter)
    .filter(({ data }) => data.lang === lang);
};

export default getPostsByLang;

