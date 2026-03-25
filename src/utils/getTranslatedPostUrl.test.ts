import { describe, it, expect, vi } from "vitest";
import type { CollectionEntry } from "astro:content";

vi.mock("@/content.config", () => ({
  BLOG_PATH: "src/data/blog",
}));

import { getTranslatedPostUrl } from "./getTranslatedPostUrl";

const BLOG_PATH = "src/data/blog";

function makePost(
  overrides: Partial<CollectionEntry<"blog">> & {
    lang: "en" | "es";
    filePath?: string;
    slug?: string;
  }
): CollectionEntry<"blog"> {
  const { lang, filePath, slug, ...rest } = overrides;
  return {
    id: `${lang}-post`,
    collection: "blog",
    filePath,
    data: {
      author: "Test",
      pubDatetime: new Date("2024-01-01"),
      title: "Test Post",
      tags: ["test"],
      description: "Test",
      draft: false,
      lang,
      ...(slug ? { slug } : {}),
    },
    ...rest,
  } as CollectionEntry<"blog">;
}

describe("getTranslatedPostUrl", () => {
  describe("when the translated sibling post exists", () => {
    it("returns the Spanish URL for an English post that has a Spanish sibling", () => {
      const currentPost = makePost({
        lang: "en",
        filePath: `${BLOG_PATH}/2022/my-post/en.md`,
      });
      const translatedPosts = [
        makePost({
          lang: "es",
          filePath: `${BLOG_PATH}/2022/my-post/es.md`,
        }),
      ];

      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/es/blog/2022/my-post");
    });

    it("returns the English URL for a Spanish post that has an English sibling", () => {
      const currentPost = makePost({
        lang: "es",
        filePath: `${BLOG_PATH}/2022/my-post/es.md`,
      });
      const translatedPosts = [
        makePost({
          lang: "en",
          filePath: `${BLOG_PATH}/2022/my-post/en.md`,
        }),
      ];

      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/blog/2022/my-post");
    });

    it("handles .mdx files correctly", () => {
      const currentPost = makePost({
        lang: "es",
        filePath: `${BLOG_PATH}/2023/cool-article/es.mdx`,
      });
      const translatedPosts = [
        makePost({
          lang: "en",
          filePath: `${BLOG_PATH}/2023/cool-article/en.mdx`,
        }),
      ];

      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/blog/2023/cool-article");
    });

    it("uses the custom slug of the sibling when present", () => {
      const currentPost = makePost({
        lang: "es",
        filePath: `${BLOG_PATH}/2022/como-pase-un-proceso/es.mdx`,
      });
      const translatedPosts = [
        makePost({
          lang: "en",
          filePath: `${BLOG_PATH}/2022/como-pase-un-proceso/en.mdx`,
          slug: "how-i-took-a-nodejs-process",
        }),
      ];

      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/blog/2022/how-i-took-a-nodejs-process");
    });

    it("does not match a post in a different folder that starts with the same prefix", () => {
      const currentPost = makePost({
        lang: "en",
        filePath: `${BLOG_PATH}/2022/my-post/en.md`,
      });
      // This post is in my-post-extended/, which starts with the same chars
      const translatedPosts = [
        makePost({
          lang: "es",
          filePath: `${BLOG_PATH}/2022/my-post-extended/es.md`,
        }),
      ];

      // No exact sibling → should fall back to the Spanish home
      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/es");
    });
  });

  describe("when no translated sibling exists", () => {
    it("falls back to /es home when English post has no Spanish translation", () => {
      const currentPost = makePost({
        lang: "en",
        filePath: `${BLOG_PATH}/2024/en-only-post/en.md`,
      });

      const result = getTranslatedPostUrl(currentPost, []);
      expect(result).toBe("/es");
    });

    it("falls back to / home when Spanish post has no English translation", () => {
      const currentPost = makePost({
        lang: "es",
        filePath: `${BLOG_PATH}/2024/es-only-post/es.md`,
      });

      const result = getTranslatedPostUrl(currentPost, []);
      expect(result).toBe("/");
    });

    it("falls back when the translated posts list has unrelated posts only", () => {
      const currentPost = makePost({
        lang: "en",
        filePath: `${BLOG_PATH}/2024/post-a/en.md`,
      });
      const translatedPosts = [
        makePost({ lang: "es", filePath: `${BLOG_PATH}/2024/post-b/es.md` }),
        makePost({ lang: "es", filePath: `${BLOG_PATH}/2023/post-a/es.md` }),
      ];

      const result = getTranslatedPostUrl(currentPost, translatedPosts);
      expect(result).toBe("/es");
    });
  });

  describe("when filePath is undefined (legacy posts)", () => {
    it("falls back to /es home for an English post", () => {
      const currentPost = makePost({ lang: "en", filePath: undefined });
      const result = getTranslatedPostUrl(currentPost, []);
      expect(result).toBe("/es");
    });

    it("falls back to / home for a Spanish post", () => {
      const currentPost = makePost({ lang: "es", filePath: undefined });
      const result = getTranslatedPostUrl(currentPost, []);
      expect(result).toBe("/");
    });
  });
});

