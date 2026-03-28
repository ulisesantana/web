import { describe, it, expect } from 'vitest';
import { t } from './i18n';

describe('i18n', () => {
  describe('función t()', () => {
    it('retorna traducción en inglés', () => {
      expect(t('en', 'featured')).toBe('Featured');
      expect(t('en', 'recentPosts')).toBe('Recent Posts');
      expect(t('en', 'allPosts')).toBe('All Posts');
    });

    it('retorna traducción en español', () => {
      expect(t('es', 'featured')).toBe('Destacado');
      expect(t('es', 'recentPosts')).toBe('Entradas recientes');
      expect(t('es', 'allPosts')).toBe('Todas las entradas');
    });

    it('traduce correctamente navegación', () => {
      expect(t('en', 'previousPost')).toBe('Previous Post');
      expect(t('en', 'nextPost')).toBe('Next Post');

      expect(t('es', 'previousPost')).toBe('Entrada anterior');
      expect(t('es', 'nextPost')).toBe('Siguiente entrada');
    });

    it('traduce correctamente tags', () => {
      expect(t('en', 'tags')).toBe('Tags');
      expect(t('en', 'tag')).toBe('Tag:');

      expect(t('es', 'tags')).toBe('Etiquetas');
      expect(t('es', 'tag')).toBe('Etiqueta:');
    });

    it('traduce back to top', () => {
      expect(t('en', 'backToTop')).toBe('Back to Top');
      expect(t('es', 'backToTop')).toBe('Volver arriba');
    });
  });

  describe('cobertura de traducciones', () => {
    it('inglés y español tienen las mismas keys', async () => {
      const { i18n } = await import('./i18n');
      const enKeys = Object.keys(i18n.en);
      const esKeys = Object.keys(i18n.es);

      expect(enKeys.sort()).toEqual(esKeys.sort());
    });

    it('no hay traducciones vacías', async () => {
      const { i18n } = await import('./i18n');

      Object.values(i18n.en).forEach(value => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });

      Object.values(i18n.es).forEach(value => {
        expect(value).toBeTruthy();
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });
});

