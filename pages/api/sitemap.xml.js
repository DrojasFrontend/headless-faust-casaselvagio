// /pages/api/sitemap.xml.js
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';

// Consulta actualizada para obtener posts, páginas y categorías
const GET_PAGINATED_DATA = gql`
  query GetPaginatedData($afterPosts: String, $afterPages: String) {
    posts(first: 100, after: $afterPosts) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        date
      }
    }
    pages(first: 100, after: $afterPages) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        date
      }
    }
    categories {
      nodes {
        slug
      }
    }
  }
`;

export default async function handler(req, res) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  let allPosts = [];
  let allPages = [];
  let hasNextPagePosts = true;
  let hasNextPagePages = true;
  let afterPosts = null;
  let afterPages = null;

  try {
    // Paginación para obtener todos los posts
    while (hasNextPagePosts) {
      const { data } = await client.query({
        query: GET_PAGINATED_DATA,
        variables: { afterPosts, afterPages: null },  // Solo posts en esta consulta
      });

      const posts = data?.posts?.nodes || [];
      allPosts = [...allPosts, ...posts];

      hasNextPagePosts = data?.posts?.pageInfo?.hasNextPage;
      afterPosts = data?.posts?.pageInfo?.endCursor;
    }

    // Paginación para obtener todas las páginas
    while (hasNextPagePages) {
      const { data } = await client.query({
        query: GET_PAGINATED_DATA,
        variables: { afterPosts: null, afterPages },  // Solo páginas en esta consulta
      });

      const pages = data?.pages?.nodes || [];
      allPages = [...allPages, ...pages];

      hasNextPagePages = data?.pages?.pageInfo?.hasNextPage;
      afterPages = data?.pages?.pageInfo?.endCursor;
    }

    // Obtener todas las categorías (sin paginación)
    const { data: categoryData } = await client.query({
      query: GET_PAGINATED_DATA,
      variables: { afterPosts: null, afterPages: null },  // No necesitamos paginación aquí
    });

    const categories = categoryData?.categories?.nodes || [];

    // Construimos el sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPosts
        .map((post) => {
          return `
            <url>
              <loc>${baseUrl}/posts/${post.slug}</loc>
              <lastmod>${new Date(post.date).toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
          `;
        })
        .join('')}
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}/pages/${page.slug}</loc>
              <lastmod>${new Date(page.date).toISOString()}</lastmod>
              <priority>0.80</priority>
            </url>
          `;
        })
        .join('')}
      ${categories
        .map((category) => {
          return `
            <url>
              <loc>${baseUrl}/category/${category.slug}</loc>
              <priority>0.64</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ message: 'Error generating sitemap', error: error.message });
  }
}
