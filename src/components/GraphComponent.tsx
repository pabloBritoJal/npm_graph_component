import { ApolloWrapper } from "../apollo/config/ApolloWrapper";
import { GraphContainer } from "./GraphContainer";
import "../styles/index.css";

export interface GraphComponentProps {
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
