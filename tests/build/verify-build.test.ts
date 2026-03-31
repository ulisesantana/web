import { describe, it, expect, beforeAll } from 'vitest';
import { readdir, access } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');

describe('Build Output - Language separation', () => {
  beforeAll(async () => {
    // Verify dist directory exists
    try {
      await access(DIST_DIR);
    } catch {
      throw new Error('dist/ directory does not exist. Run: npm run build');
    }
  });

  describe('Spanish posts', () => {
    it('2021 posts are under /es/blog/2021/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2021');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('gitmoji');
      expect(esPosts).toContain('corepack');
      expect(esPosts).toContain('array-destructuring');
      expect(esPosts).toContain('como-construir-arrays-en-js');
    });

    it('2022 posts are under /es/blog/2022/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2022');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('por-que-no-usar-jest');
      expect(esPosts).toContain('deshabilita-tu-webcam');
    });

    it('2020 posts are under /es/blog/2020/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2020');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('como-convertir-array-like-objects-a-array');
    });
  });

  describe('English posts', () => {
    it('bilingual post exists in /blog/2022/ with English slug', async () => {
      const enPostsDir = join(DIST_DIR, 'blog/2022');
      const enPosts = await readdir(enPostsDir);

      expect(enPosts).toContain('how-i-took-a-nodejs-process-from-5-hours-to-5-minutes');
    });

    it('template posts no longer exist in /blog/', async () => {
      const enPostsDir = join(DIST_DIR, 'blog');
      const enPosts = await readdir(enPostsDir);

      expect(enPosts).not.toContain('adding-new-posts-in-astropaper-theme');
      expect(enPosts).not.toContain('astro-paper-2');
      expect(enPosts).not.toContain('how-to-configure-astropaper-theme');
    });

    it('Spanish posts are NOT under /blog/', async () => {
      const enPostsDir = join(DIST_DIR, 'blog');
      const enPosts = await readdir(enPostsDir);

      expect(enPosts).not.toContain('gitmoji');
      expect(enPosts).not.toContain('por-que-no-usar-jest');
      expect(enPosts).not.toContain('como-construir-arrays-en-js');
    });

    it('bilingual post exists in both languages', async () => {
      const enPath = join(DIST_DIR, 'blog/2022/how-i-took-a-nodejs-process-from-5-hours-to-5-minutes/index.html');
      const esPath = join(DIST_DIR, 'es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/index.html');

      await access(enPath);
      await access(esPath);
    });
  });

  describe('Page structure', () => {
    it('Spanish homepage exists', async () => {
      const esIndexPath = join(DIST_DIR, 'es/index.html');
      await access(esIndexPath); // Throws if file does not exist
    });

    it('Spanish blog listing page exists', async () => {
      const esBlogPath = join(DIST_DIR, 'es/blog/index.html');
      await access(esBlogPath);
    });

    it('Spanish tags page exists', async () => {
      const esTagsPath = join(DIST_DIR, 'es/tags/index.html');
      await access(esTagsPath);
    });

    it('Spanish search page exists', async () => {
      const esSearchPath = join(DIST_DIR, 'es/search/index.html');
      await access(esSearchPath);
    });

    it('Spanish sobre-mi page exists', async () => {
      const esAboutPath = join(DIST_DIR, 'es/sobre-mi/index.html');
      await access(esAboutPath);
    });
  });

  describe('Assets', () => {
    it('blog post images are co-located in src/data/blog/', async () => {
      const blogDir = join(process.cwd(), 'src/data/blog');
      const contents = await readdir(blogDir);

      expect(contents).toContain('2020');
      expect(contents).toContain('2021');
      expect(contents).toContain('2022');

      // Verify co-located images exist next to posts
      const postDir = join(blogDir, '2022/pamplona-software-crafters-2022');
      const postFiles = await readdir(postDir);
      expect(postFiles).toContain('es.mdx');
      expect(postFiles).toContain('cover.png');
    });
  });

  describe('Pagefind', () => {
    it('Pagefind generated an index', async () => {
      const pagefindDir = join(DIST_DIR, 'pagefind');
      await access(pagefindDir);

      const files = await readdir(pagefindDir);
      expect(files).toContain('pagefind.js');
      expect(files).toContain('pagefind-ui.js');
    });
  });
});
