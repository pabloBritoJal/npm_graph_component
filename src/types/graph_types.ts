import { NodeObject } from "react-force-graph-3d";

export interface GraphNode {
  id: string;
  name: string;
  type: string;
  color: string;
  adjustment?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  x?: number;
  y?: number;
  z?: number;
}

export type GraphLink = {
  source: string | NodeObject<GraphNode>;
  target: string | NodeObject<GraphNode>;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};
