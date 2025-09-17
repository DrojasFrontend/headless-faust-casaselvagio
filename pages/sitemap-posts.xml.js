import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

// Sitemap específico SOLO para posts - garantiza que se incluyan TODOS los posts
export default function SitemapPosts() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    console.log('🚀 Iniciando sitemap de posts...');
    
    // Función para obtener TODOS los posts usando paginación
    const getAllPosts = async () => {
      let allPosts = [];
      let hasNextPage = true;
      let endCursor = null;
      let page = 1;

      console.log('🔄 Iniciando obtención paginada de posts...');

      while (hasNextPage && page <= 20) { // Máximo 20 páginas = 2000 posts
        console.log(`📄 Obteniendo página ${page}...`);
        
        const { data, error } = await client.query({
          query: gql`
            query GetPostsForSitemap($first: Int!, $after: String) {
              posts(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                edges {
                  node {
                    id
                    title
                    uri
                    slug
                    date
                    modified
                    status
                    categories {
                      nodes {
                        name
                        slug
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            first: 100, // 100 posts por página
            after: endCursor
          },
          errorPolicy: 'all',
          fetchPolicy: 'no-cache'
        });

        if (error) {
          console.error(`❌ Error en página ${page}:`, error);
          break;
        }

        if (!data?.posts?.edges) {
          console.log(`⚠️ No hay más posts en página ${page}`);
          break;
        }

        const postsInPage = data.posts.edges.map(edge => edge.node);
        allPosts = [...allPosts, ...postsInPage];
        
        console.log(`✅ Página ${page}: ${postsInPage.length} posts obtenidos (Total: ${allPosts.length})`);

        hasNextPage = data.posts.pageInfo?.hasNextPage || false;
        endCursor = data.posts.pageInfo?.endCursor;

        if (!hasNextPage || !endCursor) {
          console.log('🏁 Fin de la paginación alcanzado');
          break;
        }

        page++;
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      return allPosts;
    };

    // Obtener TODOS los posts
    const allPosts = await getAllPosts();
    console.log(`🎯 TOTAL de posts obtenidos: ${allPosts.length}`);
    const postsForSitemap = [];

    // Procesar cada post
    allPosts.forEach(post => {
      if (post.uri && 
          post.status === 'publish' &&
          !post.uri.includes('password') && 
          !post.uri.includes('private') &&
          !post.uri.includes('draft') &&
          !post.uri.includes('trash')) {
        
        // Determinar prioridad y frecuencia basada en categorías
        let priority = '0.7';
        let changefreq = 'weekly';
        
        const categoryNames = post.categories?.nodes?.map(cat => cat.slug.toLowerCase()) || [];
        const tagNames = post.tags?.nodes?.map(tag => tag.slug.toLowerCase()) || [];
        
        // Prioridad alta para experiencias y planes
        if (categoryNames.includes('experiencias') || tagNames.includes('experiencias')) {
          priority = '0.9';
          changefreq = 'weekly';
        } else if (categoryNames.includes('planes') || tagNames.includes('planes')) {
          priority = '0.9';
          changefreq = 'weekly';
        } else if (categoryNames.includes('blog') || categoryNames.includes('noticias')) {
          priority = '0.8';
          changefreq = 'daily';
        } else if (categoryNames.includes('diario-selvaggio')) {
          priority = '0.8';
          changefreq = 'daily';
        }

        // Ajustar frecuencia según la fecha del post
        const postDate = new Date(post.date);
        const now = new Date();
        const daysDiff = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 365) {
          changefreq = 'yearly';
        } else if (daysDiff > 90) {
          changefreq = 'monthly';
        }

        postsForSitemap.push({
          url: post.uri,
          lastmod: post.modified || post.date || new Date().toISOString(),
          changefreq: changefreq,
          priority: priority,
          title: post.title // Para debugging
        });
      }
    });

    console.log(`Posts incluidos en sitemap: ${postsForSitemap.length}`);

    // Ordenar por prioridad y fecha
    postsForSitemap.sort((a, b) => {
      if (parseFloat(b.priority) !== parseFloat(a.priority)) {
        return parseFloat(b.priority) - parseFloat(a.priority);
      }
      return new Date(b.lastmod) - new Date(a.lastmod);
    });

    // Generar sitemap XML
    const sitemap = generateSiteMap(postsForSitemap, baseUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    
    res.write(sitemap);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('Error generando sitemap de posts:', error);
    
    // Sitemap básico de fallback
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/blog</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
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
         // Limpiar y validar la URL
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
