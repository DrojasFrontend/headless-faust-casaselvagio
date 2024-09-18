// /pages/api/sitemap.xml.js
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';

const GET_PAGINATED_POSTS = gql`
  query GetPaginatedPosts($after: String) {
    posts(first: 100, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        date
      }
    }
  }
`;

export default async function handler(req, res) {
  const baseUrl = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.VERCEL_URL}` // Vercel establece esta variable en producción
  : 'http://localhost:3000'; // Para tu entorno de desarrollo local


  let allPosts = [];
  let hasNextPage = true;
  let after = null;

  try {
    while (hasNextPage) {
      const { data } = await client.query({
        query: GET_PAGINATED_POSTS,
        variables: { after },
      });

      const posts = data?.posts?.nodes || [];
      allPosts = [...allPosts, ...posts];

      hasNextPage = data?.posts?.pageInfo?.hasNextPage;
      after = data?.posts?.pageInfo?.endCursor;
    }

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
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
}
