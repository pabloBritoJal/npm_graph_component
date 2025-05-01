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
  BufferGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  DodecahedronGeometry,
  IcosahedronGeometry,
  MeshBasicMaterial,
} from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { GraphData, GraphLink, GraphNode } from "../types/graph_types";
import { useContainerSize } from "../hooks/useContainerSize";
import {
  GetAllExactsBySegmentQuery,
  GetDealersGraphQuery,
} from "../apollo/generated/graphql";
import { createTextSprite } from "../utils/createToolTip";
import { calculateCenter } from "../utils/calculateCenter";
import DefaultSpinner from "./DefaultSpinner";
import DealerRangeIndicator from "./DealerRangeIndicator";
import ControlsIndicator from "./ControlsIndicator";
import { getColorByAdjustment } from "../utils/getRangeColor";
import { ReloadIcon } from "../assets/ReloadIcon";
import { CenterFocusIcon } from "../assets/CenterIcon";
import { ContractionIcon } from "../assets/ContractIcon";
import { CollapseIcon } from "../assets/CollapseIcon";

interface ExpandableGraphProps {
  graphData: GetDealersGraphQuery;
  exactsData: GetAllExactsBySegmentQuery | undefined;
  getExacts: (segmentName: string) => Promise<void>;
  reset: boolean;
  resetData: () => Promise<void>;
  maxNodes: number;
  isLoading: boolean;
  openModal: () => Promise<void>;
  closeModal: () => Promise<void>;
  isInModal: boolean;
}

export const ExpandableGraph = ({
  graphData,
  exactsData,
  getExacts,
  reset,
  resetData,
  maxNodes,
  isLoading,
  openModal,
  closeModal,
  isInModal,
}: ExpandableGraphProps) => {
  const fgRef = useRef<
    | ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>>
    | undefined
  >(undefined);

  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [initGraphData, setInitGraphData] = useState<GraphData>();
  const [currentGraphData, setCurrentGraphData] = useState<GraphData>();
  const initNodes = useRef<GraphNode[]>([]);

  const [forceResetId, setForceResetId] = useState<number>(1);

  const segmentSelected = useRef<string>();
  const hideNodes = useRef<boolean>(false);

  const { ref, width, height } = useContainerSize();

  const getInitialGraphData = () => {
    if (!graphData) return undefined;
    return {
      nodes: graphData.dealersGraph.nodes.map((n) => ({
        id: n.id,
        name: n.name || "",
        type: n.type,
        color: n.color || "#ccc",
        adjustment: Number(n.adjustment),
      })),
      links: graphData.dealersGraph.links.map((l) => ({
        source: l.source,
        target: l.target,
      })),
    };
  };

  const handleAddExacts = async () => {
    if (!exactsData || initNodes.current.length === 0 || !initGraphData) return;

    const exactNodes = exactsData.allExactsBySegmentId.nodes
      .filter((n) => n.type !== "Segment")
      .slice(0, maxNodes)
      .map((n) => ({
        id: n.id,
        name: n.id,
        type: n.type,
        color: n.color || "#ccc",
      }));
    const validTargetNames = new Set(exactNodes.map((n) => n.name));
    const exactLinks = exactsData.allExactsBySegmentId.links
      .filter((l) => validTargetNames.has(String(l.target)))
      .map((l) => ({
        source: l.source,
        target: l.target,
      }));

    const initNodesWithFixedPos = initGraphData.nodes.map((n) => {
      const matchingInit = initNodes.current.find(
        (init) => init.name === n.name
      );
      if (matchingInit) {
        return {
          ...n,
          x: matchingInit.fx,
          y: matchingInit.fy,
          z: matchingInit.fz,
          fx: matchingInit.fx,
          fy: matchingInit.fy,
          fz: matchingInit.fz,
        };
      }
      return n;
    });

    const mergedNodes = [...initNodesWithFixedPos, ...exactNodes];

    const validNodeIds = new Set(mergedNodes.map((n) => n.id));
    const mergedLinks = [...initGraphData.links, ...exactLinks].filter((l) => {
      const sourceId = typeof l.source === "string" ? l.source : l.source.id;
      const targetId = typeof l.target === "string" ? l.target : l.target.id;
      return validNodeIds.has(sourceId) && validNodeIds.has(targetId);
    });

    setCurrentGraphData({ nodes: mergedNodes, links: mergedLinks });
  };

  const handleHover = useCallback((node: NodeObject<GraphNode> | null) => {
    setHoveredNode(node ?? null);
  }, []);

  const handleClick = async (node: NodeObject<GraphNode>) => {
    if (node.type == "Segment") {
      if (node.name === segmentSelected.current) {
        handleHideNodes();
      } else {
        segmentSelected.current = node.name;
        await getExacts(node.name);
      }
    }
  };

  const handleHideNodes = () => {
    if (initNodes.current.length === 0 || !initGraphData) return;

    const initNodesWithPositions = initNodes.current.map((n) => ({
      ...n,
      x: n.fx,
      y: n.fy,
      z: n.fz,
    }));
    const restoredData = {
      nodes: initNodesWithPositions.map((n) => ({
        ...n,
        x: n.fx,
        y: n.fy,
        z: n.fz,
      })),
      links: [...initGraphData.links],
    };

    hideNodes.current = true;
    setCurrentGraphData(restoredData);
  };

  const handleResetGraph = async () => {
    await resetData();
    initNodes.current = [];

    if (initGraphData) {
      const onlyInitNodes = initGraphData.nodes.map((n) => ({
        ...n,
        x: n.fx,
        y: n.fy,
        z: n.fz,
      }));

      const onlyInitGraphData: GraphData = {
        nodes: onlyInitNodes,
        links: [...initGraphData.links],
      };
      setCurrentGraphData(onlyInitGraphData);
    }

    setForceResetId((prev) => prev + 1);
  };

  const centerCameraToGraph = () => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    let centerX = 0;
    let centerY = 0;
    let centerZ = 180;

    if (segmentSelected && initNodes.current.length != 0) {
      const selectedNode = initNodes.current.find(
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
      setForceResetId((prev) => prev + 1);
    }
  }, [graphData, reset]);

  useEffect(() => {
    if (!exactsData) return;
    handleAddExacts();
  }, [exactsData]);

  useEffect(() => {
    if (exactsData) return;
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 180 }, undefined, 0);
    }
  }, [initGraphData]);

  useEffect(() => {
    if (!exactsData || !fgRef.current) return;
    if (hideNodes.current) {
      hideNodes.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const nodesLength = currentGraphData?.nodes?.length ?? -1;
      const { centerX, centerY, centerZ } = calculateCenter(
        nodesLength,
        segmentSelected.current,
        initGraphData,
        initNodes.current
      );

      const fg = fgRef.current;
      if (fg) {
        fg.d3Force("center")
          ?.x(centerX * 3)
          .y(centerY * 3)
          .z(centerZ * 3);
        // fg.d3ReheatSimulation();
        //centerCameraToGraph();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentGraphData]);

  return (
    <div ref={ref} className="npm-graph-container">
      {isLoading && <DefaultSpinner />}
      <h2 className="current-settings-text">
        This graph reflects your current settings
      </h2>
      <DealerRangeIndicator />
      <ControlsIndicator />
      <div onClick={handleResetGraph} className="graph-reset-button">
        <ReloadIcon />
      </div>
      <div onClick={centerCameraToGraph} className="graph-center-button">
        <CenterFocusIcon />
      </div>
      <div
        onClick={isInModal ? closeModal : openModal}
        className="graph-open-modal-button"
      >
        {isInModal ? <ContractionIcon /> : <CollapseIcon />}
      </div>
      <ForceGraph3D
        key={forceResetId}
        ref={fgRef}
        width={width}
        height={height}
        graphData={currentGraphData}
        enableNodeDrag={false}
        backgroundColor="#FFFFFF"
        // onNodeClick={handleClick}
        onNodeHover={handleHover}
        cooldownTicks={400}
        showNavInfo={false}
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={0.9}
        linkCurvature={0.25}
        linkDirectionalArrowColor={() => "#d3d3d3"}
        linkMaterial={() => new MeshBasicMaterial({ color: "#d3d3d3" })}
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

            if (!initNodes.current.find((n) => n.name === initNode.name)) {
              initNodes.current = [...initNodes.current, initNode];
            }
          }

          let color = new Color(node.color);

          switch (node.type) {
            case "Dealer":
              color = new Color("#9998F7");
              break;
            case "Heading":
              color = new Color("#6FB5E4");
              break;
            case "Segment":
              color = getColorByAdjustment(node.adjustment ?? 0);
              break;
          }

          const geom = new SphereGeometry(
            node.type === "Dealer" ? 8 : node.type === "Heading" ? 4 : 2
          );
          const mesh = new Mesh(
            geom,
            new MeshStandardMaterial({
              color: color,
              emissive: color, // le da un brillo del mismo color
              emissiveIntensity: 0.5, // controla cuán fuerte brilla
              metalness: 0.3, // mejora reflejos
              roughness: 0.2,
            })
          );

          const shouldShowLabel =
            node.type === "Dealer" ||
            node.type === "Heading" ||
            node.type === "Segment";

          if (shouldShowLabel && node.name) {
            const sprite = createTextSprite(
              node.name,
              new Color("#747272"),
              node.type === "Dealer" ? "80px" : "40px"
            );
            sprite.position.y =
              node.type === "Dealer" ? 12 : node.type === "Dealer" ? 8 : 5;
            mesh.add(sprite);
          }

          return mesh;
        }}
      />
      {hoveredNode && (
        <div
          className="npm-graph-tooltip"
          style={{
            top: "10px",
            left: "calc(50% - 90px)",
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
