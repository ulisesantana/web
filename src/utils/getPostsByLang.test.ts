import { describe, it, expect, vi } from "vitest";
import { getPostsByLang } from "./getPostsByLang";
import type { CollectionEntry } from "astro:content";

// Mock postFilter to just check draft status (simplified)
vi.mock("./postFilter", () => ({
  default: ({ data }: { data: { draft?: boolean } }) => !data.draft,
  postFilter: ({ data }: { data: { draft?: boolean } }) => !data.draft,
}));

function createPost(
  overrides: Partial<CollectionEntry<"blog">["data"]> & { lang: "en" | "es" }
): CollectionEntry<"blog"> {
  return {
    id: `test-${overrides.lang}-${Math.random()}`,
    collection: "blog",
    data: {
      author: "Test Author",
      pubDatetime: new Date("2024-01-01"),
      title: "Test Post",
      tags: ["test"],
      description: "A test post",
      draft: false,
      ...overrides,
    },
  } as CollectionEntry<"blog">;
}

describe("getPostsByLang", () => {
  const posts = [
    createPost({ lang: "es", title: "Post en español" }),
    createPost({ lang: "en", title: "Post in English" }),
    createPost({ lang: "es", title: "Otro post en español" }),
    createPost({ lang: "en", title: "Another English post" }),
    createPost({ lang: "es", title: "Borrador", draft: true }),
  ];

  it("filters posts by Spanish language", () => {
    const result = getPostsByLang(posts, "es");
    expect(result).toHaveLength(2);
    expect(result.every(p => p.data.lang === "es")).toBe(true);
  });

  it("filters posts by English language", () => {
    const result = getPostsByLang(posts, "en");
    expect(result).toHaveLength(2);
    expect(result.every(p => p.data.lang === "en")).toBe(true);
  });

  it("excludes draft posts", () => {
    const result = getPostsByLang(posts, "es");
    expect(result.every(p => !p.data.draft)).toBe(true);
  });

  it("defaults to English when no language is specified", () => {
    const result = getPostsByLang(posts);
    expect(result).toHaveLength(2);
    expect(result.every(p => p.data.lang === "en")).toBe(true);
  });

  it("returns empty array when no posts match the language", () => {
    const enOnly = [createPost({ lang: "en", title: "English only" })];
    const result = getPostsByLang(enOnly, "es");
    expect(result).toHaveLength(0);
  });
});

