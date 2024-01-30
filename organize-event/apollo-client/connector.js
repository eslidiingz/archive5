import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://gateway.multiverseexpert.io/graphql/cms',
    cache: new InMemoryCache(),
});

export default client;