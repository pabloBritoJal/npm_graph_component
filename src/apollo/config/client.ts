import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://140.82.18.35:3000/graphql",
  cache: new InMemoryCache(),
});
