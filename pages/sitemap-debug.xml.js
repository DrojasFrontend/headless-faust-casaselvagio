import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

// Sitemap de debugging para ver qué está pasando
export default function SitemapDebug() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.casaselvaggio.com';
  
  try {
    console.log('🔍 DEBUGGING SITEMAP');
    console.log('🔗 WordPress URL:', process.env.NEXT_PUBLIC_WORDPRESS_URL);
    console.log('🔗 GraphQL URL:', `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`);
    
    // Test de conectividad básica
    const testQuery = gql`
      query TestConnection {
        generalSettings {
          title
          url
        }
        posts(first: 5) {
          nodes {
            id
            title
            uri
            slug
            status
          }
        }
      }
    `;

    const { data, error, loading } = await client.query({
      query: testQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache'
    });

    console.log('📊 Loading:', loading);
    console.log('❌ Error:', error);
    console.log('📝 Data received:', !!data);
    
    if (data) {
      console.log('🏷️ Site title:', data.generalSettings?.title);
      console.log('🔗 Site URL:', data.generalSettings?.url);
      console.log('📄 Posts count:', data.posts?.nodes?.length || 0);
      
      if (data.posts?.nodes) {
        data.posts.nodes.forEach((post, index) => {
          console.log(`📄 Post ${index + 1}:`, {
            title: post.title,
            uri: post.uri,
            slug: post.slug,
            status: post.status
          });
        });
      }
    }

    // Generar XML con información de debug
    const debugInfo = {
      timestamp: new Date().toISOString(),
      hasError: !!error,
      errorMessage: error?.message || 'No error',
      hasData: !!data,
      postsCount: data?.posts?.nodes?.length || 0,
      siteTitle: data?.generalSettings?.title || 'Unknown',
      posts: data?.posts?.nodes || []
    };

    const debugXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- DEBUG INFO -->
  <!-- Timestamp: ${debugInfo.timestamp} -->
  <!-- Has Error: ${debugInfo.hasError} -->
  <!-- Error Message: ${debugInfo.errorMessage} -->
  <!-- Has Data: ${debugInfo.hasData} -->
  <!-- Posts Count: ${debugInfo.postsCount} -->
  <!-- Site Title: ${debugInfo.siteTitle} -->
  
  <!-- STATIC PAGES -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${debugInfo.timestamp}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${debugInfo.timestamp}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- POSTS FROM WORDPRESS -->
  ${debugInfo.posts.map(post => {
    if (post.uri && post.status === 'publish') {
      return `
  <url>
    <loc>${baseUrl}${post.uri}</loc>
    <lastmod>${debugInfo.timestamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    return '';
  }).join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(debugXML);
    res.end();

    return { props: {} };

  } catch (error) {
    console.error('💥 CRITICAL ERROR:', error);
    
    const errorXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- CRITICAL ERROR: ${error.message} -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(errorXML);
    res.end();

    return { props: {} };
  }
}
