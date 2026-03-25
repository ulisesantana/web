import { describe, it, expect, vi } from "vitest";

vi.mock("@/content.config", () => ({
  BLOG_PATH: "src/data/blog",
}));

import { getPath } from "./getPath";

const BLOG_PATH = "src/data/blog";

describe("getPath", () => {
  describe("co-located posts (year/slug/lang.md)", () => {
    it("generates Spanish path from co-located file", () => {
      const result = getPath(
        "2022/gitmoji/es",
        `${BLOG_PATH}/2022/gitmoji/es.md`,
        true,
        "es"
      );
      expect(result).toBe("/es/blog/2022/gitmoji");
    });

    it("generates English path from co-located file", () => {
      const result = getPath(
        "adding-new-post/en",
        `${BLOG_PATH}/adding-new-post/en.md`,
        true,
        "en"
      );
      expect(result).toBe("/blog/adding-new-post");
    });

    it("generates path without /blog prefix when includeBase is false", () => {
      const result = getPath(
        "2021/corepack/es",
        `${BLOG_PATH}/2021/corepack/es.md`,
        false,
        "es"
      );
      expect(result).toBe("/2021/corepack");
    });

    it("generates English path without /blog prefix", () => {
      const result = getPath(
        "adding-new-post/en",
        `${BLOG_PATH}/adding-new-post/en.md`,
        false,
        "en"
      );
      expect(result).toBe("/adding-new-post");
    });

    it("handles mdx files the same as md", () => {
      const result = getPath(
        "2022/pamplona-software-crafters-2022/es",
        `${BLOG_PATH}/2022/pamplona-software-crafters-2022/es.mdx`,
        true,
        "es"
      );
      expect(result).toBe("/es/blog/2022/pamplona-software-crafters-2022");
    });
  });

  describe("excludes underscore-prefixed directories", () => {
    it("strips _releases prefix from path", () => {
      const result = getPath(
        "_releases/astro-paper-4/en",
        `${BLOG_PATH}/_releases/astro-paper-4/en.md`,
        true,
        "en"
      );
      expect(result).toBe("/blog/astro-paper-4");
    });
  });

  describe("fallback when filePath is undefined", () => {
    it("derives slug from id, stripping language segment", () => {
      const result = getPath("my-post/en", undefined, true, "en");
      expect(result).toBe("/blog/my-post");
    });

    it("handles Spanish fallback path", () => {
      const result = getPath("mi-post/es", undefined, true, "es");
      expect(result).toBe("/es/blog/mi-post");
    });
  });

  describe("defaults", () => {
    it("defaults to English and includeBase", () => {
      const result = getPath(
        "how-to-configure/en",
        `${BLOG_PATH}/how-to-configure/en.md`
      );
      expect(result).toBe("/blog/how-to-configure");
    });
  });

  describe("custom slug override", () => {
    it("replaces folder name with custom slug for EN post", () => {
      const result = getPath(
        "2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/en",
        `${BLOG_PATH}/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/en.mdx`,
        true,
        "en",
        "how-i-took-a-nodejs-process-from-5-hours-to-5-minutes"
      );
      expect(result).toBe("/blog/2022/how-i-took-a-nodejs-process-from-5-hours-to-5-minutes");
    });

    it("does not affect the ES version of the same post (no slug)", () => {
      const result = getPath(
        "2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/es",
        `${BLOG_PATH}/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/es.mdx`,
        true,
        "es",
        undefined
      );
      expect(result).toBe("/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos");
    });

    it("slug overrides folder name in fallback path too", () => {
      const result = getPath("my-post/en", undefined, true, "en", "my-custom-slug");
      expect(result).toBe("/blog/my-custom-slug");
    });
  });
});

