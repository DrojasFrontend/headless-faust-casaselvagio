import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;

// También exportar como función nombrada para compatibilidad
export const getApolloClient = () => client;
