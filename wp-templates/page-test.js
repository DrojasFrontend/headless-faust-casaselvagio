import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import client from '../lib/apolloClient';

const GET_POSTS = gql`
  query GetPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          excerpt
          date
        }
      }
    }
  }
`;

const POSTS_PER_PAGE = 10; // Número de posts por página

export default function Home() {
  // Estado para controlar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [cursor, setCursor] = useState(null); // Cambiamos endCursor por cursor, que será un string

  // Ejecutamos la consulta de Apollo para obtener los posts
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: POSTS_PER_PAGE, after: cursor },
    client: client,
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { posts } = data;
  const totalPosts = 100; // Suponemos que tenemos 100 posts en total
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE); // Total de páginas

  // Función para manejar el clic en los números de página
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newCursor = pageNumber === 1 ? null : posts.pageInfo.endCursor; // Usamos el cursor de la API
    setCursor(newCursor); // Aquí usamos el cursor proporcionado por la API (un string)
    fetchMore({
      variables: { after: newCursor },
    });
  };

  // Función para avanzar a la siguiente página
  const handleNextPage = () => {
    if (currentPage < totalPages && posts.pageInfo.hasNextPage) {
      const newPage = currentPage + 1;
      handlePageClick(newPage);
    }
  };

  // Función para retroceder a la página anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      handlePageClick(newPage);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <p>{new Date(node.date).toLocaleDateString()}</p>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* Botón de "Anterior" */}
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: '#83c5be',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Anterior
          </button>
        )}

        {/* Paginación con números de página */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor: currentPage === pageNumber ? '#006d77' : '#83c5be',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Botón de "Siguiente" */}
        {currentPage < totalPages && posts.pageInfo.hasNextPage && (
          <button
            onClick={handleNextPage}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: '#83c5be',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
