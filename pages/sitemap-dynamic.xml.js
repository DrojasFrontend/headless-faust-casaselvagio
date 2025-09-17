import { gql } from '@apollo/client';
import { getApolloClient } from '../lib/apolloClient';

export default function SitemapDynamic() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    const client = getApolloClient();
    
    // Función para obtener TODOS los posts usando paginación
    const getAllPosts = async () => {
      let allPosts = [];
      let hasNextPage = true;
      let endCursor = null;

      while (hasNextPage) {
        const { data } = await client.query({
          query: gql`
            query GetAllPosts($first: Int!, $after: String) {
              posts(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  uri
                  modified
                  slug
                  status
                  title
                  categories {
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
            first: 100,
            after: endCursor
          },
          errorPolicy: 'ignore',
        });

        if (data?.posts?.nodes) {
          allPosts = [...allPosts, ...data.posts.nodes];
        }

        hasNextPage = data?.posts?.pageInfo?.hasNextPage || false;
        endCursor = data?.posts?.pageInfo?.endCursor || null;

        // Prevenir bucle infinito
        if (!endCursor && hasNextPage) {
          break;
        }
      }

      return allPosts;
    };

    // Función para obtener TODAS las páginas usando paginación
    const getAllPages = async () => {
      let allPages = [];
      let hasNextPage = true;
      let endCursor = null;

      while (hasNextPage) {
        const { data } = await client.query({
          query: gql`
            query GetAllPages($first: Int!, $after: String) {
              pages(first: $first, after: $after) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  uri
                  modified
                  slug
                  status
                  title
                }
              }
            }
          `,
          variables: {
            first: 100,
            after: endCursor
          },
          errorPolicy: 'ignore',
        });

        if (data?.pages?.nodes) {
          allPages = [...allPages, ...data.pages.nodes];
        }

        hasNextPage = data?.pages?.pageInfo?.hasNextPage || false;
        endCursor = data?.pages?.pageInfo?.endCursor || null;

        // Prevenir bucle infinito
        if (!endCursor && hasNextPage) {
          break;
        }
      }

      return allPages;
    };

    // Obtener categorías
    const getCategoriesData = async () => {
      const { data } = await client.query({
        query: gql`
          query GetCategories {
            categories(first: 100) {
              nodes {
                uri
                slug
                name
                count
              }
            }
          }
        `,
        errorPolicy: 'ignore',
      });
      return data?.categories?.nodes || [];
    };

    // Ejecutar todas las queries
    const [allPosts, allPages, categories] = await Promise.all([
      getAllPosts(),
      getAllPages(),
      getCategoriesData()
    ]);

    console.log(`Sitemap: Se encontraron ${allPosts.length} posts y ${allPages.length} páginas`);

    const allContent = [];

    // Agregar TODOS los posts
    allPosts.forEach(post => {
      if (post.uri && 
          post.status === 'publish' &&
          !post.uri.includes('password') && 
          !post.uri.includes('private') &&
          !post.uri.includes('draft')) {
        
        // Determinar prioridad basada en categorías
        let priority = '0.7';
        const categoryNames = post.categories?.nodes?.map(cat => cat.slug.toLowerCase()) || [];
        
        if (categoryNames.includes('experiencias')) {
          priority = '0.8';
        } else if (categoryNames.includes('planes')) {
          priority = '0.8';
        } else if (categoryNames.includes('blog')) {
          priority = '0.6';
        }

        allContent.push({
          url: post.uri,
          lastmod: post.modified || new Date().toISOString(),
          changefreq: 'weekly',
          priority: priority
        });
      }
    });

    // Agregar TODAS las páginas
    allPages.forEach(page => {
      if (page.uri && 
          page.status === 'publish' &&
          !page.uri.includes('password') && 
          !page.uri.includes('private') &&
          !page.uri.includes('draft')) {
        allContent.push({
          url: page.uri,
          lastmod: page.modified || new Date().toISOString(),
          changefreq: 'monthly',
          priority: '0.8'
        });
      }
    });

    // Agregar categorías con contenido
    categories.forEach(category => {
      if (category.uri && category.count > 0) {
        allContent.push({
          url: category.uri,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.6'
        });
      }
    });

    // Generar sitemap XML
    const sitemap = generateSiteMap(allContent, baseUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');
    
    res.write(sitemap);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    
    // Sitemap básico en caso de error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

function generateSiteMap(pages, baseUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map(({ url, changefreq, priority, lastmod }) => {
         // Asegurar que la URL esté bien formateada
         const cleanUrl = url.startsWith('/') ? url : `/${url}`;
         
         return `
       <url>
           <loc>${`${baseUrl}${cleanUrl}`}</loc>
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
