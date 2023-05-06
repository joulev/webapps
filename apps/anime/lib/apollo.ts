import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function getClient(token?: string) {
  const httpLink = createHttpLink({ uri: "https://graphql.anilist.co" });
  const authLink = setContext((_, { headers }) =>
    token ? { headers: { ...headers, authorization: `Bearer ${token}` } } : { headers },
  );
  return new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });
}
