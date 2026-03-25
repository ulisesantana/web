import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => data.lang === "es");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: "Full Stack Developer con JavaScript como lengua materna y la web como patria. Basado en las Islas Canarias 🏝️.",
    site: `${SITE.website}es/`,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: getPath(id, filePath, true, "es", data.slug),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}

