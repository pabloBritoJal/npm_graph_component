import { NodeObject } from "react-force-graph-3d";

export interface GraphNode {
  id: string;
  name: string;
  type: string;
  color: string;
}

export type GraphLink = {
  source: string | NodeObject<GraphNode>;
  target: string | NodeObject<GraphNode>;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};
