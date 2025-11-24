// Sitemap principal - Índice de todos los sitemaps
export default function Sitemap() {}

export async function getServerSideProps({ res, req }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  const currentDate = new Date().toISOString();

  // Log para diagnóstico
  console.log('🔍 Sitemap principal solicitado por:', req.headers['user-agent']);
  console.log('📅 Fecha:', currentDate);

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-posts.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-wordpress.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-dynamic.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Headers mejorados para compatibilidad con Google
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
  
  res.write(sitemapIndex);
  res.end();

  return {
    props: {},
  };
}