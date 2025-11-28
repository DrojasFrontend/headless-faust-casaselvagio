// Sitemap simple - Solo páginas estáticas (optimizado para Google)
export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  const currentDate = new Date().toISOString();
  
  // Páginas estáticas
  const allUrls = [
    { url: '/', priority: 1.0, changefreq: 'daily', lastmod: currentDate },
    { url: '/blog', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { url: '/contacto', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/experiencias', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { url: '/planes', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { url: '/eco-villas', priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
    { url: '/restaurante', priority: 0.8, changefreq: 'weekly', lastmod: currentDate },
    { url: '/galeria', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/ubicacion', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/preguntas-frecuentes', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/diario-selvaggio', priority: 0.8, changefreq: 'weekly', lastmod: currentDate },
    { url: '/lanzamiento', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
  ];

  // Generar XML compatible con Google
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Headers optimizados para Google Search Console
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
  res.setHeader('X-Robots-Tag', 'noindex, follow');
  
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}