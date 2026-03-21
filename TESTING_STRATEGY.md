# Estrategia de Testing para el Blog en Astro

## Tipos de Tests Recomendados

### 1. **Tests Unitarios** (Vitest)
Para funciones puras y utilidades de negocio.

**Qué testear:**
- ✅ `src/utils/getPath.ts` - Generación de URLs por idioma
- ✅ `src/utils/getSortedPosts.ts` - Ordenación de posts
- ✅ `src/utils/getPostsByLang.ts` - Filtrado por idioma
- ✅ `src/utils/slugify.ts` - Generación de slugs
- ✅ `src/utils/getUniqueTags.ts` - Obtención de tags únicos
- ✅ `src/utils/postFilter.ts` - Filtro de posts
- ✅ `src/config/i18n.ts` - Función de traducción

**Por qué Vitest:**
- Compatible con Vite (Astro usa Vite)
- Rápido, con HMR
- Sintaxis compatible con Jest
- TypeScript out-of-the-box

### 2. **Tests de Integración** (Vitest + Testing Library)
Para componentes Astro.

**Qué testear:**
- ✅ Componentes renderizen correctamente
- ✅ Props se pasen correctamente
- ✅ Lógica condicional funcione (lang, draft, featured)
- ✅ Generación de rutas en getStaticPaths

**Componentes prioritarios:**
- `Card.astro` - Renderiza post correctamente según idioma
- `AuthorInfo.astro` - Muestra info según idioma
- `Pagination.astro` - Navegación correcta

### 3. **Tests E2E** (Playwright)
Para flujos de usuario completos.

**Escenarios críticos:**
- ✅ Navegación entre posts en mismo idioma
- ✅ Cambio de idioma funciona
- ✅ Búsqueda encuentra posts
- ✅ Tags filtran correctamente
- ✅ Links no están rotos
- ✅ Assets se cargan
- ✅ RSS feeds válidos
- ✅ Sitemap correcto

### 4. **Tests de Build** (Scripts personalizados)
Para verificar que el build genera lo esperado.

**Qué verificar:**
- ✅ Build completa sin errores
- ✅ Posts en español solo en `/es/blog/`
- ✅ Posts en inglés solo en `/blog/`
- ✅ Número correcto de páginas generadas
- ✅ Assets copiados correctamente
- ✅ Pagefind indexa ambos idiomas

### 5. **Tests de Accesibilidad** (axe-core + Playwright)
Para garantizar accesibilidad.

**Qué verificar:**
- ✅ No errores de contraste
- ✅ Headings jerárquicos
- ✅ Alt text en imágenes
- ✅ ARIA labels correctos
- ✅ Navegación por teclado

### 6. **Visual Regression Tests** (Opcional - Playwright)
Para detectar cambios visuales no intencionados.

## Implementación Recomendada

### Setup Mínimo (Prioridad Alta)
```bash
# 1. Tests unitarios con Vitest
npm install -D vitest @vitest/ui

# 2. Tests E2E con Playwright
npm install -D @playwright/test
npx playwright install
```

### Setup Completo (Ideal)
```bash
# Testing utilities
npm install -D vitest @vitest/ui
npm install -D @playwright/test
npm install -D @axe-core/playwright
npm install -D @testing-library/dom
```

## Estructura de Archivos Propuesta

```
src/
├── utils/
│   ├── getPath.ts
│   ├── getPath.test.ts          ← Tests unitarios
│   ├── getSortedPosts.ts
│   └── getSortedPosts.test.ts
│
tests/
├── unit/                         ← Tests unitarios adicionales
│   └── i18n.test.ts
│
├── integration/                  ← Tests de componentes
│   ├── Card.test.ts
│   └── Pagination.test.ts
│
├── e2e/                          ← Tests E2E
│   ├── navigation.spec.ts
│   ├── i18n.spec.ts
│   ├── search.spec.ts
│   └── accessibility.spec.ts
│
└── build/                        ← Tests de build
    └── verify-build.test.ts
```

## Configuración

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/unit/**/*.test.ts'],
  },
});
```

### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Scripts de Package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:build": "npm run build && node tests/build/verify-build.js",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

## ROI de cada tipo de test

### Tests Unitarios (⭐⭐⭐⭐⭐)
- **Esfuerzo:** Bajo (2-3 horas iniciales)
- **Valor:** Alto (detectan bugs rápido)
- **Mantenimiento:** Muy bajo
- **Recomendación:** Implementar YA

### Tests E2E (⭐⭐⭐⭐)
- **Esfuerzo:** Medio (4-6 horas iniciales)
- **Valor:** Alto (detectan problemas de usuario)
- **Mantenimiento:** Medio
- **Recomendación:** Implementar después de unitarios

### Tests de Build (⭐⭐⭐⭐⭐)
- **Esfuerzo:** Muy bajo (1 hora)
- **Valor:** Muy alto (evita deploys rotos)
- **Mantenimiento:** Muy bajo
- **Recomendación:** Implementar YA

### Tests de Accesibilidad (⭐⭐⭐)
- **Esfuerzo:** Bajo (agregar a E2E existentes)
- **Valor:** Alto (mejora UX)
- **Mantenimiento:** Bajo
- **Recomendación:** Nice to have

### Visual Regression (⭐⭐)
- **Esfuerzo:** Medio-Alto
- **Valor:** Bajo-Medio (para blogs)
- **Mantenimiento:** Alto
- **Recomendación:** Opcional

## Plan de Implementación Sugerido

### Fase 1 (Día 1 - 3 horas)
1. ✅ Setup Vitest
2. ✅ Tests unitarios para `getPath`, `getSortedPosts`, `getPostsByLang`
3. ✅ Test de build verificando separación de idiomas

### Fase 2 (Día 2 - 4 horas)
1. ✅ Setup Playwright
2. ✅ Test E2E navegación básica
3. ✅ Test E2E cambio de idioma
4. ✅ Test E2E búsqueda

### Fase 3 (Opcional - 2 horas)
1. ✅ Tests de accesibilidad con axe
2. ✅ Test links rotos
3. ✅ CI/CD con GitHub Actions

## Ejemplo de Test Crítico

El test más importante para tu blog bilingüe sería verificar que los posts se separan correctamente:

```typescript
// tests/build/verify-build.test.ts
import { describe, test, expect } from 'vitest';
import { readdir } from 'fs/promises';
import { join } from 'path';

describe('Build Output', () => {
  test('posts en español solo en /es/blog/', async () => {
    const esPostsDir = join(process.cwd(), 'dist/es/blog/2021');
    const esPosts = await readdir(esPostsDir);
    
    expect(esPosts.length).toBeGreaterThan(0);
    expect(esPosts).toContain('gitmoji');
    expect(esPosts).toContain('corepack');
  });

  test('posts en inglés solo en /blog/', async () => {
    const enPostsDir = join(process.cwd(), 'dist/blog');
    const enPosts = await readdir(enPostsDir);
    
    expect(enPosts).toContain('adding-new-posts-in-astropaper-theme');
    expect(enPosts).not.toContain('gitmoji');
  });
});
```

## Conclusión

**Recomendación inmediata:** Empezar con Tests Unitarios (Vitest) + Test de Build.
- **Tiempo:** 3-4 horas
- **Cobertura:** 70% de bugs críticos
- **Mantenimiento:** Mínimo

¿Quieres que implemente el setup básico?

