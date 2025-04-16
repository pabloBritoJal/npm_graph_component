import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://45.63.50.167:3535/graphql",
  cache: new InMemoryCache(),
});
