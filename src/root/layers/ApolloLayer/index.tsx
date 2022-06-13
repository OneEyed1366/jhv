import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
/**
 * Слой, необходимый для корректной работы GraphQL
 * */
export default function ApolloLayer({ children }: IProps): JSX.Element {
  const client = new ApolloClient({
    uri: "/api",
    cache: new InMemoryCache(),
    credentials: "include",
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_APOLLO_TOKEN}`,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
