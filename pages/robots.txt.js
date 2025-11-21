// Ruta alternativa para servir robots.txt
export default function Robots() {}

export async function getServerSideProps({ res }) {
  const robotsContent = `User-agent: *
Allow: /

# Páginas que no queremos indexar
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-content/uploads/
Disallow: /wp-includes/
Disallow: /preview/
Disallow: /password/
Disallow: /test/
Disallow: /private/
Disallow: /api/
Disallow: /*?*
Disallow: /*#*

# Archivos que no queremos indexar
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$

# Permitir acceso a recursos importantes
Allow: /wp-content/uploads/*.jpg
Allow: /wp-content/uploads/*.jpeg
Allow: /wp-content/uploads/*.png
Allow: /wp-content/uploads/*.gif
Allow: /wp-content/uploads/*.webp
Allow: /wp-content/uploads/*.svg
Allow: /wp-content/themes/*/css/
Allow: /wp-content/themes/*/js/

# Sitemap principal (índice de todos los sitemaps)
Sitemap: https://www.casaselvaggio.com/sitemap.xml

# Crawl-delay para ser respetuoso con el servidor
Crawl-delay: 1`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  
  res.write(robotsContent);
  res.end();

  return {
    props: {},
  };
}

