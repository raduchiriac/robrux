import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'node-fetch';

const client = new ApolloClient({
  link: new HttpLink({
    fetch,
    uri: '/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
