import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://iofferdata.com/graph_api/graphql",
  cache: new InMemoryCache(),
});
