import { getSitemapProps } from '@faustwp/core';

// Sitemap de WordPress usando Faust.js
export default function SitemapWordpress() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: 'https://www.casaselvaggio.com',
    sitemapPathsToIgnore: [
      '/wp-sitemap-users-*',
      '/author-sitemap.xml',
      '/wp-sitemap-taxonomies-*',
      '/category-sitemap.xml',
      '/tag-sitemap.xml',
      '*/feed/',
      '*/rdf/',
      '*/rss/',
      '*/rss2/',
      '*/atom/',
      '/wp-admin/*',
      '/wp-content/*',
      '/wp-includes/*',
      '/preview*',
      '/password*'
    ],
    // Incluir páginas personalizadas de Next.js
    additionalPaths: async () => {
      const staticPaths = [
        {
          loc: '/',
          changefreq: 'daily',
          priority: 1.0,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/blog',
          changefreq: 'daily',
          priority: 0.9,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/contacto',
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/experiencias',
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/planes',
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/eco-villas',
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/restaurante',
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/galeria',
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/ubicacion',
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/preguntas-frecuentes',
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/diario-selvaggio',
          changefreq: 'daily',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        },
        {
          loc: '/lanzamiento',
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        }
      ];
      
      return staticPaths;
    },
    // Configuración adicional para asegurar que se incluyan todos los posts
    includeAllPosts: true,
    maxPostsPerSitemap: 1000, // Aumentar el límite de posts por sitemap
    // Configurar transformaciones de URLs
    transform: async (config, path) => {
      // Configuración por defecto para todas las URLs
      const defaultConfig = {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };

      // Personalizar configuración según el tipo de contenido
      if (path === '/') {
        return {
          ...defaultConfig,
          changefreq: 'daily',
          priority: 1.0,
        };
      }

      if (path.includes('/blog') || path.includes('/diario-selvaggio')) {
        return {
          ...defaultConfig,
          changefreq: 'daily',
          priority: 0.8,
        };
      }

      if (path.includes('/experiencia/') || path.includes('/plan/')) {
        return {
          ...defaultConfig,
          changefreq: 'weekly',
          priority: 0.8,
        };
      }

      if (path.includes('/categoria/') || path.includes('/category/')) {
        return {
          ...defaultConfig,
          changefreq: 'weekly',
          priority: 0.6,
        };
      }

      return defaultConfig;
    }
  });
}
