# Migración de Blog de 11ty a Astro - Documento de Tareas

## Progreso de Implementación

### ✅ Completado

1. **Sistema i18n base implementado**
   - ✅ Añadido campo `lang: z.enum(["en", "es"]).default("en")` al schema en `src/content.config.ts`
   - ✅ Creada utilidad `getPostsByLang()` en `src/utils/getPostsByLang.ts`
   - ✅ Actualizado `src/utils/getPath.ts` para generar rutas `/blog/` o `/es/blog/` según idioma
   - ✅ Actualizado `Card.astro` para usar `getPath` con parámetro `lang`

2. **Páginas duplicadas para español creadas**
   - ✅ `/src/pages/es/index.astro` - Página principal en español
   - ✅ `/src/pages/es/blog/[...page].astro` - Listado de blog en español
   - ✅ `/src/pages/es/blog/[...slug]/index.astro` - Detalle de post en español
   - ✅ `/src/pages/es/tags/index.astro` - Listado de tags en español
   - ✅ `/src/pages/es/tags/[tag]/[...page].astro` - Posts por tag en español
   - ✅ `/src/pages/es/about.md` - Página sobre mí en español

3. **Actualización de frontmatter**
   - ✅ Añadido `lang: "es"` a todos los posts de 2020 (1 post)
   - ✅ Añadido `lang: "es"` a todos los posts de 2021 (10 posts)
   - ✅ Añadido `lang: "es"` a todos los posts de 2022 (3 posts)
   - ✅ Añadido `lang: "es"` a todos los borradores en `drafts/` (16 posts)

4. **Migración de assets**
   - ✅ Copiados assets de `/blog/2020/`, `/blog/2021/`, `/blog/2022/`, `/blog/2023/` a `public/assets/es/blog/`
   - ✅ Las rutas `cover:` en frontmatter ya apuntan a `/assets/es/blog/...`

5. **Filtrado por idioma implementado**
   - ✅ `src/pages/index.astro` filtra posts en inglés
   - ✅ `src/pages/es/index.astro` filtra posts en español
   - ✅ `src/pages/blog/[...page].astro` filtra posts en inglés
   - ✅ `src/pages/tags/index.astro` filtra tags de posts en inglés
   - ✅ `src/pages/tags/[tag]/[...page].astro` filtra por idioma inglés

6. **Limpieza de dependencias**
   - ✅ Eliminada dependencia obsoleta `@astrojs/image` incompatible con Astro 5
   - ✅ Ejecutado `npm install` y `npm run sync`

### 🔧 Pendiente de Resolver

1. **Errores de tipos de TypeScript** ✅
   - ✅ Tipos regenerados correctamente - el problema era del IDE
   - ✅ Build exitoso sin errores de tipos
   - ✅ Corregido error en `GoToTopButton.astro` (eliminado `client:load`)

2. **Navegación prev/next posts**
   - ⚠️ Actualmente no filtra por idioma (muestra todos los posts)
   - ⚠️ Textos aún en inglés para posts españoles

3. **i18n de UI**
   - ✅ Creado archivo `src/config/i18n.ts` con traducciones
   - ⚠️ Falta aplicar traducciones en componentes

### 📝 Tareas Restantes

#### 1. Verificar y corregir tipos ✅
- [x] Reiniciar TypeScript server del IDE
- [x] Verificar que los errores de tipos desaparezcan
- [x] Build exitoso completado

#### 2. Mejorar navegación prev/next posts
- [ ] Modificar `PostDetails.astro` para filtrar posts prev/next por mismo idioma que el post actual
- [ ] Añadir textos traducidos ("Entrada anterior" / "Siguiente entrada" para español)

#### 3. Internacionalización de UI
- [x] Crear archivo `src/config/i18n.ts` con traducciones
- [ ] Actualizar componentes para usar traducciones según idioma de la página

#### 4. SEO multiidioma
- [ ] Añadir tags `<link rel="alternate" hreflang="en|es">` en `Layout.astro`
- [ ] Vincular versiones en diferentes idiomas del mismo contenido

#### 5. RSS Feed por idioma
- [ ] Revisar `src/pages/rss.xml.ts`
- [ ] Crear `/src/pages/es/rss.xml.ts` para feed en español
- [ ] Filtrar posts por idioma en cada feed

#### 6. Sitemap con idiomas ✅
- [x] Verificado que `astro.config.ts` genera sitemap correcto con rutas `/es/`

#### 7. Búsqueda (Pagefind) ✅
- [x] Creada `/src/pages/es/search.astro` con traducciones
- [x] Pagefind indexa correctamente posts en ambos idiomas

#### 8. Limpieza final
- [ ] Eliminar carpeta `/blog/` completa tras verificar que todo funciona
- [ ] Actualizar `README.md` con documentación del sistema bilingüe

#### 9. Testing ✅
- [x] Ejecutado `npm run build` - compila sin errores
- [x] Verificadas rutas generadas correctamente en `/dist/`
  - `/blog/` para posts en inglés
  - `/es/blog/` para posts en español
- [ ] Probar navegación entre posts
- [ ] Verificar que el cambio de idioma funciona correctamente
- [ ] Comprobar que los assets se cargan correctamente

#### 10. Deployment
- [ ] Actualizar configuración de deployment si es necesario
- [x] Verificado que Pagefind se ejecuta en build
- [ ] Probar en preview (`npm run preview`)

## Notas Técnicas

### Estructura de URLs
- **Inglés**: `/blog/[slug]`, `/tags/[tag]`, `/about`
- **Español**: `/es/blog/[slug]`, `/es/tags/[tag]`, `/es/about`

### Convención de idioma
- Posts sin campo `lang` o con `lang: "en"` → Inglés
- Posts con `lang: "es"` → Español

### Assets
- Assets en español: `public/assets/es/blog/[año]/[post-slug]/[imagen]`
- Referencia en frontmatter: `cover: /assets/es/blog/2022/por-que-no-usar-jest/cover.png`

### Posts actuales
- **Inglés**: Examples, releases, docs de AstroPaper (sin `lang` o `lang: "en"`)
- **Español**: 2020 (1), 2021 (10), 2022 (3), drafts (16) - todos con `lang: "es"`

## Próximos Pasos Inmediatos

1. ✅ ~~Reiniciar TypeScript server del IDE~~ - Build exitoso
2. ✅ ~~Verificar que el build funciona~~ - `npm run build` completado sin errores
3. ⚠️ **Implementar i18n de UI** - Aplicar traducciones en componentes
4. ⚠️ **Mejorar navegación prev/next** - Filtrar por idioma y traducir textos
5. 🔜 Crear RSS feeds por idioma
6. 🔜 Probar navegación completa en ambos idiomas
7. 🔜 Eliminar carpeta `/blog/` obsoleta

## Resumen del Estado Actual

### ✅ Funcionalidades Completadas
- Sistema i18n base con campo `lang` en schema
- Páginas duplicadas para español (/es/*)
- Posts con frontmatter actualizado (lang: "es")
- Assets migrados a public/assets/es/blog/
- Filtrado por idioma en listados y tags
- Build exitoso generando rutas correctas
- Archivo de traducciones i18n.ts creado
- Página de búsqueda en español

### ⚠️ Funcionalidades Parciales
- Navegación prev/next (falta filtrar por idioma)
- Textos UI (falta aplicar traducciones)

### ❌ Funcionalidades Pendientes
- RSS feeds por idioma
- SEO con hreflang
- Testing completo de navegación
- Documentación en README
- Limpieza de carpeta /blog/

