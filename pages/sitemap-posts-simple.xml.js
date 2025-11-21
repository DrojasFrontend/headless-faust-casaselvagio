import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

// Versión SIMPLE del sitemap de posts - más confiable
export default function SitemapPostsSimple() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    console.log('🚀 Iniciando sitemap simple de posts...');
    console.log('📡 WordPress URL:', process.env.NEXT_PUBLIC_WORDPRESS_URL);
    
    // Query simple - solo obtener los primeros 500 posts
    const { data } = await client.query({
      query: gql`
        query GetSimplePosts {
          posts(first: 500, where: { status: PUBLISH }) {
            nodes {
              uri
              modified
              date
              title
            }
          }
        }
      `
    });

    console.log('✅ Datos recibidos:', data);

    if (!data?.posts?.nodes) {
      throw new Error('No se recibieron posts de WordPress');
    }

    const posts = data.posts.nodes.filter(post => 
      post.uri && 
      !post.uri.includes('password') && 
      !post.uri.includes('private')
    );

    console.log(`📝 Se encontraron ${posts.length} posts para el sitemap`);

    const postsForSitemap = posts.map(post => ({
      url: post.uri,
      lastmod: post.modified || post.date || new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    }));

    // Generar sitemap XML
    const sitemap = generateSiteMap(postsForSitemap, baseUrl);

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    
    res.write(sitemap);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('❌ Error generando sitemap simple:', error);
    
    // Fallback básico
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/blog</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
      </urlset>`;

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.write(fallbackSitemap);
    res.end();

    return { props: {} };
  }
}

function generateSiteMap(posts, baseUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map(({ url, changefreq, priority, lastmod }) => {
         const cleanUrl = url.startsWith('/') ? url : `/${url}`;
         const fullUrl = `${baseUrl}${cleanUrl}`;
         
         return `
       <url>
           <loc>${fullUrl}</loc>
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
