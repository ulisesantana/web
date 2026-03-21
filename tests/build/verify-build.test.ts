import { describe, it, expect, beforeAll } from 'vitest';
import { readdir, access } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = join(process.cwd(), 'dist');

describe('Build Output - Separación de idiomas', () => {
  beforeAll(async () => {
    // Verificar que dist existe
    try {
      await access(DIST_DIR);
    } catch {
      throw new Error('Directorio dist/ no existe. Ejecuta: npm run build');
    }
  });

  describe('Posts en español', () => {
    it('posts de 2021 están en /es/blog/2021/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2021');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('gitmoji');
      expect(esPosts).toContain('corepack');
      expect(esPosts).toContain('array-destructuring');
      expect(esPosts).toContain('como-construir-arrays-en-js');
    });

    it('posts de 2022 están en /es/blog/2022/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2022');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('por-que-no-usar-jest');
      expect(esPosts).toContain('deshabilita-tu-webcam');
    });

    it('posts de 2020 están en /es/blog/2020/', async () => {
      const esPostsDir = join(DIST_DIR, 'es/blog/2020');
      const esPosts = await readdir(esPostsDir);

      expect(esPosts.length).toBeGreaterThan(0);
      expect(esPosts).toContain('como-convertir-array-like-objects-a-array');
    });
  });

  describe('Posts en inglés', () => {
    it('posts en inglés están en /blog/', async () => {
      const enPostsDir = join(DIST_DIR, 'blog');
      const enPosts = await readdir(enPostsDir);

      expect(enPosts).toContain('adding-new-posts-in-astropaper-theme');
      expect(enPosts).toContain('astro-paper-2');
      expect(enPosts).toContain('how-to-configure-astropaper-theme');
    });

    it('posts en español NO están en /blog/', async () => {
      const enPostsDir = join(DIST_DIR, 'blog');
      const enPosts = await readdir(enPostsDir);

      expect(enPosts).not.toContain('gitmoji');
      expect(enPosts).not.toContain('por-que-no-usar-jest');
      expect(enPosts).not.toContain('como-construir-arrays-en-js');
    });
  });

  describe('Estructura de páginas', () => {
    it('existe página principal en español', async () => {
      const esIndexPath = join(DIST_DIR, 'es/index.html');
      await access(esIndexPath); // Lanza error si no existe
    });

    it('existe página de blog en español', async () => {
      const esBlogPath = join(DIST_DIR, 'es/blog/index.html');
      await access(esBlogPath);
    });

    it('existe página de tags en español', async () => {
      const esTagsPath = join(DIST_DIR, 'es/tags/index.html');
      await access(esTagsPath);
    });

    it('existe página de búsqueda en español', async () => {
      const esSearchPath = join(DIST_DIR, 'es/search/index.html');
      await access(esSearchPath);
    });

    it('existe página about en español', async () => {
      const esAboutPath = join(DIST_DIR, 'es/about/index.html');
      await access(esAboutPath);
    });
  });

  describe('Assets', () => {
    it('assets de posts españoles están en public/assets/es/blog/', async () => {
      const assetsDir = join(process.cwd(), 'public/assets/es/blog');
      const years = await readdir(assetsDir);

      expect(years).toContain('2020');
      expect(years).toContain('2021');
      expect(years).toContain('2022');
      expect(years).toContain('2023');
    });
  });

  describe('Pagefind', () => {
    it('Pagefind generó índice', async () => {
      const pagefindDir = join(DIST_DIR, 'pagefind');
      await access(pagefindDir);

      const files = await readdir(pagefindDir);
      expect(files).toContain('pagefind.js');
      expect(files).toContain('pagefind-ui.js');
    });
  });
});

