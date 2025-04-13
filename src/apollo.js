import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  uri: 'https://api.tarkov.dev/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
