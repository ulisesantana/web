import type { CollectionEntry } from "astro:content";
import { getPath } from "./getPath";

/**
 * Given a blog post and a pre-fetched list of posts in the OTHER language,
 * returns the URL of the translated version of the post.
 *
 * Posts are co-located in year/slug/ folders:
 *   src/data/blog/2022/my-post/es.md  ←→  src/data/blog/2022/my-post/en.mdx
 *
 * Two posts are considered translations of each other when they share the
 * same parent directory (same `year/slug/` folder) but have different `lang`.
 *
 * If no translation is found, returns the home URL of the target language
 * (`/es` for Spanish, `/` for English).
 *
 * @param post           - The current post being viewed.
 * @param translatedPosts - Posts already filtered to the target language
 *                          (excluding drafts).
 */
export function getTranslatedPostUrl(
  post: CollectionEntry<"blog">,
  translatedPosts: CollectionEntry<"blog">[]
): string {
  const lang = post.data.lang ?? "en";
  const targetLang = lang === "en" ? "es" : "en";
  const targetLangHome = targetLang === "es" ? "/es" : "/";

  const postDirectory = post.filePath?.split("/").slice(0, -1).join("/");
  if (!postDirectory) return targetLangHome;

  const siblingPost = translatedPosts.find(p =>
    p.filePath?.startsWith(postDirectory + "/")
  );

  if (!siblingPost) return targetLangHome;

  return getPath(
    siblingPost.id,
    siblingPost.filePath,
    true,
    targetLang,
    siblingPost.data.slug
  );
}

