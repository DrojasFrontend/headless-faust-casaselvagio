import { gql } from '@apollo/client';
import { getApolloClient } from '../lib/apolloClient';

// Sitemap específico SOLO para posts - garantiza que se incluyan TODOS los posts
export default function SitemapPosts() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    const client = getApolloClient();
    
    // Función recursiva para obtener ABSOLUTAMENTE TODOS los posts
    const getAllPostsRecursive = async () => {
      let allPosts = [];
      let hasNextPage = true;
      let endCursor = null;
      let page = 1;
      const maxPages = 100; // Prevención de bucle infinito

      console.log('Iniciando obtención de posts para sitemap...');

      while (hasNextPage && page <= maxPages) {
        console.log(`Obteniendo página ${page} de posts...`);
        
        try {
          const { data } = await client.query({
            query: gql`
              query GetAllPostsForSitemap($first: Int!, $after: String) {
                posts(first: $first, after: $after, where: { status: PUBLISH }) {
                  pageInfo {
                    hasNextPage
                    endCursor
                    hasPreviousPage
                    startCursor
                  }
                  nodes {
                    id
                    uri
                    modified
                    slug
                    status
                    title
                    date
                    categories {
                      nodes {
                        name
                        slug
                      }
                    }
                    tags {
                      nodes {
                        name
                        slug
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              first: 100, // Obtener de 100 en 100
              after: endCursor
            },
            errorPolicy: 'ignore',
            fetchPolicy: 'no-cache' // Asegurar datos frescos
          });

          if (data?.posts?.nodes && data.posts.nodes.length > 0) {
            console.log(`Página ${page}: ${data.posts.nodes.length} posts encontrados`);
            allPosts = [...allPosts, ...data.posts.nodes];
          } else {
            console.log(`Página ${page}: No se encontraron más posts`);
            break;
          }

          hasNextPage = data?.posts?.pageInfo?.hasNextPage || false;
          const newEndCursor = data?.posts?.pageInfo?.endCursor;
          
          // Si no hay nuevo cursor pero hasNextPage es true, salir del bucle
          if (hasNextPage && (!newEndCursor || newEndCursor === endCursor)) {
            console.log('Cursor no cambió, finalizando...');
            break;
          }
          
          endCursor = newEndCursor;
          page++;

          // Pequeña pausa para no sobrecargar el servidor
          await new Promise(resolve => setTimeout(resolve, 100));

        } catch (queryError) {
          console.error(`Error en página ${page}:`, queryError);
          break;
        }
      }

      console.log(`Total de posts obtenidos: ${allPosts.length}`);
      return allPosts;
    };

    // Obtener todos los posts
    const allPosts = await getAllPostsRecursive();
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
