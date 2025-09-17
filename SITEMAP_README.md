# Configuración de Sitemaps para Casa Selvaggio

## Descripción General

Este proyecto utiliza múltiples sitemaps para optimizar el SEO y facilitar la indexación por parte de los motores de búsqueda. Se han implementado varios tipos de sitemaps que trabajan en conjunto:

## Estructura de Sitemaps

### 1. Sitemap Principal (`/sitemap.xml`)
- **Archivo**: `pages/sitemap.xml.js`
- **Función**: Índice maestro que referencia todos los otros sitemaps
- **Incluye**: Referencias a todos los sitemaps específicos
- **Actualización**: Automática con cada build/deployment
- **Beneficio**: URL única y estándar para SEO

### 2. Sitemap de WordPress (`/sitemap-wordpress.xml`)
- **Archivo**: `pages/sitemap-wordpress.xml.js`
- **Función**: Utiliza Faust.js para generar automáticamente el sitemap de contenido de WordPress
- **Incluye**: 
  - Posts de WordPress
  - Páginas de WordPress
  - Páginas personalizadas de Next.js
- **Actualización**: Automática con cada build/deployment

### 3. Sitemap de Páginas Estáticas (`/sitemap-pages.xml`)
- **Archivo**: `pages/sitemap-pages.xml.js`
- **Función**: Contiene todas las páginas estáticas del sitio
- **Incluye**:
  - Página principal (/)
  - Blog (/blog)
  - Contacto (/contacto)
  - Experiencias (/experiencias)
  - Planes (/planes)
  - Eco Villas (/eco-villas)
  - Restaurante (/restaurante)
  - Galería (/galeria)
  - Ubicación (/ubicacion)
  - Preguntas Frecuentes (/preguntas-frecuentes)
  - Diario Selvaggio (/diario-selvaggio)
  - Lanzamiento (/lanzamiento)

### 4. Sitemap de Posts (`/sitemap-posts.xml`)
- **Archivo**: `pages/sitemap-posts.xml.js`
- **Función**: Sitemap dedicado exclusivamente a TODOS los posts de WordPress
- **Características especiales**:
  - Paginación recursiva para obtener absolutamente todos los posts
  - Filtrado inteligente por estado (solo publicados)
  - Prioridades dinámicas basadas en categorías y tags
  - Frecuencia de actualización basada en la edad del post
  - Logging detallado para debugging
- **Incluye**: Todos los posts publicados sin límite

### 5. Sitemap Dinámico (`/sitemap-dynamic.xml`)
- **Archivo**: `pages/sitemap-dynamic.xml.js`
- **Función**: Obtiene contenido dinámico adicional de WordPress mediante GraphQL
- **Incluye**:
  - Posts categorizados (complementario al sitemap de posts)
  - Páginas dinámicas
  - Categorías con contenido
- **Manejo de errores**: Incluye sitemap de respaldo en caso de fallo

## Configuración de Robots.txt

El archivo `public/robots.txt` ha sido actualizado para:
- Incluir referencias a todos los sitemaps
- Bloquear rutas administrativas y de prueba
- Permitir acceso a recursos importantes (imágenes, CSS, JS)
- Implementar crawl-delay para ser respetuoso con el servidor

## Configuración de Next.js

En `next.config.js` se han añadido headers específicos para:
- Establecer el Content-Type correcto para XML
- Implementar cache control para optimizar el rendimiento
- Diferentes tiempos de cache según el tipo de sitemap

## URLs de Acceso

Una vez desplegado, los sitemaps estarán disponibles en:
- `https://www.casaselvaggio.com/sitemap.xml` (📍 **PRINCIPAL - Índice maestro**)
- `https://www.casaselvaggio.com/sitemap-wordpress.xml` (WordPress via Faust.js)
- `https://www.casaselvaggio.com/sitemap-pages.xml` (Páginas estáticas)
- `https://www.casaselvaggio.com/sitemap-posts.xml` (TODOS los posts)
- `https://www.casaselvaggio.com/sitemap-dynamic.xml` (Contenido dinámico adicional)

## Prioridades y Frecuencias

### Prioridades (0.0 - 1.0):
- **1.0**: Página principal
- **0.9**: Blog
- **0.8**: Páginas principales (Experiencias, Planes, Eco Villas, Contacto)
- **0.7**: Páginas secundarias (Restaurante, Galería, Posts)
- **0.6**: Páginas informativas (Ubicación, FAQ, Lanzamiento)

### Frecuencias de actualización:
- **daily**: Página principal, Blog, Diario Selvaggio
- **weekly**: Experiencias, Planes, Eco Villas, Restaurante, Galería, Posts
- **monthly**: Contacto, Ubicación, FAQ, Páginas informativas

## Mantenimiento

### Para añadir nuevas páginas estáticas:
1. Editar `pages/sitemap-pages.xml.js`
2. Añadir la nueva entrada en el array `staticPages`
3. Definir prioridad y frecuencia apropiadas

### Para modificar el contenido dinámico:
1. Editar `pages/sitemap-dynamic.xml.js`
2. Modificar la query GraphQL según sea necesario
3. Ajustar la lógica de procesamiento de datos

### Para cambiar configuraciones generales:
1. Editar `pages/sitemap.xml.js` para cambiar configuraciones de Faust
2. Modificar `public/robots.txt` para cambios en indexación
3. Actualizar `next.config.js` para cambios en headers o cache

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Verificar sitemaps localmente
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/sitemap_index.xml
curl http://localhost:3000/sitemap-pages.xml
curl http://localhost:3000/sitemap-posts.xml
curl http://localhost:3000/sitemap-dynamic.xml

# Verificar que se incluyan todos los posts
curl http://localhost:3000/sitemap-posts.xml | grep -o '<url>' | wc -l
```

## Consideraciones SEO

- Los sitemaps se actualizan automáticamente con cada deployment
- Se implementa cache inteligente para optimizar rendimiento
- Se excluyen páginas privadas y administrativas
- Se incluyen metadatos completos (lastmod, changefreq, priority)
- Compatible con Google Search Console y otros motores de búsqueda

## Monitoreo

Se recomienda:
1. Verificar regularmente en Google Search Console
2. Monitorear errores 404 en sitemaps
3. Revisar la indexación de nuevas páginas
4. Actualizar prioridades según analytics de tráfico
