import React from "react";
import { ApolloWrapper } from "../apollo/config/ApolloWrapper";
import { GraphContainer } from "./GraphContainer";

interface GraphComponentProps {
  dealerId: number;
  maxNodes: number;
}

export const GraphComponent = ({ dealerId, maxNodes }: GraphComponentProps) => {
  return (
    <ApolloWrapper>
      <GraphContainer dealerId={dealerId} maxNodes={maxNodes} />
    </ApolloWrapper>
  );
};
