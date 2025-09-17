import { gql } from '@apollo/client';
import { getApolloClient } from '../lib/apolloClient';

// Sitemap simple para posts - versión de prueba
export default function SitemapPostsSimple() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    const client = getApolloClient();
    
    console.log('🔍 Iniciando sitemap simple de posts...');
    
    // Query simple sin paginación para probar
    const { data, error } = await client.query({
      query: gql`
        query GetPostsSimple {
          posts(first: 100) {
            nodes {
              id
              uri
              modified
              slug
              status
              title
              date
            }
          }
        }
      `,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache'
    });

    if (error) {
      console.error('❌ Error en query GraphQL:', error);
    }

    if (!data || !data.posts || !data.posts.nodes) {
      console.error('❌ No se recibieron datos de posts');
      throw new Error('No data received');
    }

    const posts = data.posts.nodes;
    console.log(`✅ Posts obtenidos: ${posts.length}`);

    // Filtrar y procesar posts
    const validPosts = posts.filter(post => {
      return post.uri && 
             post.status === 'publish' &&
             !post.uri.includes('password') && 
             !post.uri.includes('private') &&
             !post.uri.includes('draft');
    });

    console.log(`✅ Posts válidos después del filtro: ${validPosts.length}`);

    // Crear entries del sitemap
    const sitemapEntries = validPosts.map(post => ({
      url: post.uri,
      lastmod: post.modified || post.date || new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    }));

    // Generar XML
    const sitemap = generateSiteMap(sitemapEntries, baseUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    
    res.write(sitemap);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('❌ Error completo en sitemap de posts:', error);
    
    // Sitemap de fallback
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/blog</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${baseUrl}/</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
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
