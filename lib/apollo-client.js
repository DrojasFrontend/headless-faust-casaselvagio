import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://backend-casaselvaggio.local/graphql', // Cambia esto a la URL de tu endpoint de GraphQL
  cache: new InMemoryCache(),
});

export default client;
