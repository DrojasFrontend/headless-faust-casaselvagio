import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, // Cambia esto a la URL de tu endpoint de GraphQL
  cache: new InMemoryCache(),
});

export default client;
