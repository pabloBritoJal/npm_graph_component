import { GraphData, GraphNode } from "../types/graph_types";
import { getPointAlongLine } from "./getPointAlongLine";

const SCALE_NODES_SHORT_DISTANCE = 10;
const SCALE_NODES_DISTANCE = 20;
const SCALE_NODES_MEDIUM_DISTANCE = 50;
const SCALE_NODES_LARGE_DISTANCE = 100;

export const calculateCenter = (
  nodesLength: number,
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

  let distanceFactor = SCALE_NODES_DISTANCE;

  if (nodesLength >= 0 && nodesLength < 1200) {
    distanceFactor = SCALE_NODES_SHORT_DISTANCE;
  } else if (nodesLength >= 1200 && nodesLength <= 2500) {
    distanceFactor = SCALE_NODES_DISTANCE;
  } else if (nodesLength >= 2500 && nodesLength <= 5000) {
    distanceFactor = SCALE_NODES_MEDIUM_DISTANCE;
  } else if (nodesLength > 5000) {
    distanceFactor = SCALE_NODES_LARGE_DISTANCE;
  }

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
    distanceFactor
  );

  return {
    centerX: p3.x,
    centerY: p3.y,
    centerZ: p3.z,
  };
};
