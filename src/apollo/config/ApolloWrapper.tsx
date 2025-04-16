// src/apollo/ApolloWrapper.tsx
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { ReactNode } from "react";

interface ApolloWrapperProps {
  children: ReactNode;
}

export const ApolloWrapper = ({ children }: ApolloWrapperProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
