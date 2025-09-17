// Sitemap adicional para páginas estáticas y dinámicas de Next.js
export default function SitemapPages() {}

export async function getServerSideProps({ res }) {
  // Lista de todas las páginas estáticas del sitio
  const staticPages = [
    {
      url: '/',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/blog',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/contacto',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/experiencias',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/planes',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/eco-villas',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/restaurante',
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/galeria',
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/ubicacion',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/preguntas-frecuentes',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/diario-selvaggio',
      changefreq: 'daily',
      priority: '0.7',
      lastmod: new Date().toISOString(),
    },
    {
      url: '/lanzamiento',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: new Date().toISOString(),
    }
  ];

  const baseUrl = 'https://www.casaselvaggio.com';

  // Generar el XML del sitemap
  const sitemap = generateSiteMap(staticPages, baseUrl);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  
  // Escribir el sitemap al response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function generateSiteMap(pages, baseUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ url, changefreq, priority, lastmod }) => {
         return `
       <url>
           <loc>${`${baseUrl}${url}`}</loc>
           <lastmod>${lastmod}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}
