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
    uri: "http://152.228.215.94:81/api",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
