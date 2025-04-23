import ForceGraph3D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-3d";
import {
  Color,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  BufferGeometry,
} from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraphData, GraphLink, GraphNode } from "../types/graph_types";
import { useContainerSize } from "../hooks/useContainerSize";
import "../styles/graph.css";
import {
  GetAllExactsBySegmentQuery,
  GetDealersGraphQuery,
} from "../apollo/generated/graphql";
import { createTextSprite } from "../utils/createToolTip";
import { getPointAlongLine } from "../utils/getPointAlongLine";
import { MdCenterFocusStrong } from "react-icons/md";
import { IoReloadCircleSharp } from "react-icons/io5";

interface ExpandableGraphProps {
  graphData: GetDealersGraphQuery;
  exactsData: GetAllExactsBySegmentQuery | undefined;
  getExacts: (segmentName: string) => Promise<void>;
  reset: boolean;
  resetData: () => Promise<void>;
  maxNodes: number;
}

export const ExpandableGraph = ({
  graphData,
  exactsData,
  getExacts,
  reset,
  resetData,
  maxNodes,
}: ExpandableGraphProps) => {
  const fgRef = useRef<
    | ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>>
    | undefined
  >(undefined);

  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [initGraphData, setInitGraphData] = useState<GraphData>();
  const [currentGraphData, setCurrentGraphData] = useState<GraphData>();
  const [initNodes, setInitNodes] = useState<GraphNode[]>();

  const [showGraph, setShowGraph] = useState(true);

  const segmentSelected = useRef<string>();
  const amountNodes = useRef<number>(0);
  const SCALE_NODES_DISTANCE = 20;
  const SCALE_NODES_MEDIUM_DISTANCE = 30;
  const SCALE_NODES_LARGE_DISTANCE = 50;

  const { ref, width, height } = useContainerSize();

  const getInitialGraphData = () => {
    if (!graphData) return undefined;
    return {
      nodes: graphData.dealersGraph.nodes.map((n) => ({
        id: n.id,
        name: n.name || "",
        type: n.type,
        color: n.color || "#ccc",
      })),
      links: graphData.dealersGraph.links.map((l) => ({
        source: l.source,
        target: l.target,
      })),
    };
  };

  const handleAddExacts = async () => {
    if (exactsData === undefined || !initNodes) return;
    if (!initGraphData) return;
    const exactNodes: GraphNode[] = exactsData.allExactsBySegmentId.nodes
      .filter((n) => n.type !== "Segment")
      .reduce<GraphNode[]>((acc, n) => {
        if (acc.length >= maxNodes) return acc;
        acc.push({
          id: String(n.id),
          name: n.id,
          type: n.type,
          color: n.color || "#ccc",
        });

        return acc;
      }, []);

    const validTargetNames = new Set(exactNodes.map((n) => n.name));

    const exactLinks: GraphLink[] = exactsData.allExactsBySegmentId.links
      .filter((l) => validTargetNames.has(String(l.target)))
      .map((l) => ({
        source: l.source,
        target: l.target,
      }));

    const initNodesWithCoors = initNodes ?? [];

    const mergedData: GraphData = {
      nodes: [...initNodesWithCoors, ...exactNodes],
      links: [...initGraphData.links, ...exactLinks],
    };

    setCurrentGraphData(mergedData);
  };

  const handleHover = useCallback((node: NodeObject<GraphNode> | null) => {
    setHoveredNode(node ?? null);
  }, []);

  const handleClick = async (node: NodeObject<GraphNode>) => {
    if (node.type == "Segment") {
      segmentSelected.current = node.name;
      await getExacts(node.name);
    } else {
      setSelectedNode(node);
    }
  };

  const centerCameraToGraph = () => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    let centerX = 0;
    let centerY = 0;
    let centerZ = 180;

    if (segmentSelected && initNodes) {
      const selectedNode = initNodes.find(
        (n) => n.name === segmentSelected.current
      );
      centerX = selectedNode?.fx ?? 0;
      centerY = selectedNode?.fy ?? 0;
      centerZ = 0;
    } else {
      const bbox = fg.getGraphBbox();
      if (!bbox) return;

      centerX = (bbox.x[0] + bbox.x[1]) / 2;
      centerY = (bbox.y[0] + bbox.y[1]) / 2;
      centerZ = (bbox.z[0] + bbox.z[1]) / 2;
    }

    fg.cameraPosition(
      { x: centerX, y: centerY, z: centerZ + 200 },
      { x: centerX, y: centerY, z: centerZ },
      3000
    );
  };

  useEffect(() => {
    if (graphData) {
      const initData = getInitialGraphData();
      setInitGraphData(initData);
      setCurrentGraphData(initData);
    }
  }, [graphData, reset]);

  useEffect(() => {
    if (exactsData) return;
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 180 }, undefined, 0);
    }
  }, [initGraphData]);

  const calculateCenter = (
    factor: number
  ): {
    centerX: number;
    centerY: number;
    centerZ: number;
  } => {
    const segmentName = segmentSelected.current;
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

  useEffect(() => {
    if (!exactsData) return;
    handleAddExacts();
  }, [exactsData]);

  useEffect(() => {
    if (!exactsData || !fgRef.current) return;
    const nodesLength = currentGraphData?.nodes?.length ?? -1;

    let distanceFactor = SCALE_NODES_DISTANCE;

    if (nodesLength >= 0 && nodesLength < 1500) {
      distanceFactor = SCALE_NODES_DISTANCE;
    } else if (nodesLength >= 1500 && nodesLength <= 3500) {
      distanceFactor = SCALE_NODES_MEDIUM_DISTANCE;
    } else if (nodesLength > 5000) {
      distanceFactor = SCALE_NODES_LARGE_DISTANCE;
    }

    const { centerX, centerY, centerZ } = calculateCenter(distanceFactor);

    const fg = fgRef.current;
    fg.d3Force("center")
      ?.x(centerX * 3)
      .y(centerY * 3)
      .z(centerZ * 3);
    fg.d3ReheatSimulation();
    centerCameraToGraph();
  }, [currentGraphData]);

  useEffect(() => {
    amountNodes.current = currentGraphData?.nodes.length ?? 0;
  }, [currentGraphData]);

  return (
    <div ref={ref} className="npm-graph-container">
      <div
        onClick={async () => {
          setShowGraph(false);
          await new Promise((resolve) => setTimeout(resolve, 0));
          await resetData();
          setShowGraph(true);
        }}
        className="reset-button"
      >
        <IoReloadCircleSharp />
      </div>
      <div
        onClick={centerCameraToGraph}
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100px",
          bottom: 10,
          left: "calc(50% - 50px)",
          color: "#182931",
          fontSize: "30px",
          zIndex: 1000,
          cursor: "pointer",
        }}
      >
        <MdCenterFocusStrong />
      </div>
      {showGraph && (
        <ForceGraph3D
          ref={fgRef}
          width={width}
          height={height}
          graphData={currentGraphData}
          enableNodeDrag={false}
          backgroundColor="#FFFFFF"
          onNodeClick={handleClick}
          onNodeHover={handleHover}
          onBackgroundClick={() => setSelectedNode(null)}
          cooldownTicks={400}
          showNavInfo={false}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={0.9}
          linkCurvature={0.25}
          linkDirectionalArrowColor={() => "#182931"}
          linkColor={() => "#182931"}
          nodeLabel={() => ""}
          nodeVal={(node) =>
            node.type === "Dealer"
              ? 8
              : node.type === "Heading"
              ? 5
              : node.type === "Segment"
              ? 3
              : node.type === "ExactId"
              ? 1
              : 2
          }
          nodeColor={() => "#ffffff"}
          nodeThreeObject={(node) => {
            if (
              !exactsData &&
              node.x !== undefined &&
              node.y !== undefined &&
              node.z !== undefined
            ) {
              const initNode: GraphNode = {
                id: node.id,
                name: node.name,
                type: node.type,
                color: node.color,
                fx: node.x,
                fy: node.y,
                fz: node.z,
              };

              setInitNodes((prev = []) => {
                if (prev.find((n) => n.name === initNode.name)) return prev;
                return [...prev, initNode];
              });
            }

            let geometry: BufferGeometry;
            if (node.type === "Exact") {
              const colorBall = node.color;
              geometry = new SphereGeometry(3, 12, 12);
              const mesh = new Mesh(
                geometry,
                new MeshStandardMaterial({
                  color: colorBall,
                })
              );
              return mesh;
            }
            const isSelected = selectedNode && node.id !== selectedNode.id;
            const color = new Color(isSelected ? "#182931" : node.color);

            switch (node.type) {
              case "Dealer":
                geometry = new ConeGeometry(3, 6, 12);
                break;
              case "Heading":
                geometry = new BoxGeometry(4, 4, 4);
                break;
              case "Segment":
                geometry = new SphereGeometry(3, 12, 12);
                break;
              default:
                geometry = new SphereGeometry(3, 12, 12);
            }

            const mesh = new Mesh(
              geometry,
              new MeshStandardMaterial({
                color,
                metalness: 0.5,
                roughness: 0.2,
                emissive: color,
                emissiveIntensity: 0.4,
              })
            );
            mesh.castShadow = mesh.receiveShadow = true;

            // if (["Dealer", "Heading", "Segment"].includes(node.type)) {
            //   const edges = new EdgesGeometry(geometry);
            //   const lines = new LineSegments(
            //     edges,
            //     new LineBasicMaterial({
            //       color: "#182931",
            //       transparent: true,
            //       opacity: 0.2,
            //     })
            //   );
            //   mesh.add(lines);
            // }

            const shouldShowLabel =
              node.type === "Dealer" ||
              node.type === "Heading" ||
              node.type === "Segment";

            if (shouldShowLabel && node.name) {
              const sprite = createTextSprite(node.name, new Color("#182931"));
              sprite.position.y = 7;
              mesh.add(sprite);
            }

            return mesh;
          }}
        />
      )}

      {hoveredNode && (
        <div
          className="npm-graph-tooltip"
          style={{
            top: "10px",
            right: "10px",
            zIndex: 1000,
            minWidth: "180px",
          }}
        >
          <div>
            <strong>{hoveredNode.name}</strong>
          </div>
          <div className="gray">Category: {hoveredNode.type}</div>
        </div>
      )}
    </div>
  );
};
