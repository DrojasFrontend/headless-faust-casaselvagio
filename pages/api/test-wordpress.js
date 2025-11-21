import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';

// API para probar la conexión con WordPress
export default async function handler(req, res) {
  try {
    console.log('🧪 Probando conexión con WordPress...');
    console.log('NEXT_PUBLIC_WORDPRESS_URL:', process.env.NEXT_PUBLIC_WORDPRESS_URL);

    // Consulta simple para obtener posts
    const { data, error, errors } = await client.query({
      query: gql`
        query TestPosts {
          posts(first: 5, where: { status: PUBLISH }) {
            nodes {
              id
              title
              uri
              date
            }
          }
        }
      `
    });

    if (error || errors) {
      console.error('❌ Error en query:', error || errors);
      return res.status(500).json({ 
        error: 'Error al consultar WordPress',
        details: error || errors,
        wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL
      });
    }

    if (!data?.posts?.nodes) {
      return res.status(500).json({ 
        error: 'No se recibieron datos de WordPress',
        data: data,
        wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL
      });
    }

    console.log(`✅ Conectado! Se encontraron ${data.posts.nodes.length} posts`);

    return res.status(200).json({
      success: true,
      wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
      postsCount: data.posts.nodes.length,
      posts: data.posts.nodes.map(post => ({
        title: post.title,
        uri: post.uri,
        date: post.date
      }))
    });

  } catch (error) {
    console.error('❌❌❌ Error general:', error);
    return res.status(500).json({ 
      error: 'Error al probar conexión',
      message: error.message,
      stack: error.stack,
      wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL
    });
  }
}

