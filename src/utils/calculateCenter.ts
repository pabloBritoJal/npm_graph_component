import { GraphData, GraphNode } from "../types/graph_types";
import { getPointAlongLine } from "./getPointAlongLine";

export const calculateCenter = (
  factor: number,
  segmentName: string | undefined,
  initGraphData: GraphData | undefined,
  initNodes: GraphNode[] | undefined
): {
  centerX: number;
  centerY: number;
  centerZ: number;
} => {
  if (!initGraphData || !segmentName || !initNodes)
    return {
      centerX: 0,
      centerY: 0,
      centerZ: 0,
    };

  const incomingLink = initGraphData.links.find(
    (link) => String(link.target) === segmentName
  );
  const sourceNodeName = incomingLink?.source ?? "";
  const sourceNode = initNodes.find((n) => n.name === sourceNodeName);
  const incomingNode = initNodes.find((n) => n.name === segmentName);

  const p3 = getPointAlongLine(
    {
      x: sourceNode?.fx ?? 0,
      y: sourceNode?.fy ?? 0,
      z: sourceNode?.fz ?? 0,
    },
    {
      x: incomingNode?.fx ?? 0,
      y: incomingNode?.fy ?? 0,
      z: incomingNode?.fz ?? 0,
    },
    factor
  );

  return {
    centerX: p3.x,
    centerY: p3.y,
    centerZ: p3.z,
  };
};
