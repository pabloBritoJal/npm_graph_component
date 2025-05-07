import ForceGraph3D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-3d";
import {
  Color,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
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
import ControlsIndicator from "./ControlsIndicator";
import { getColorByAdjustment } from "../utils/getRangeColor";
import { ReloadIcon } from "../assets/ReloadIcon";
import { CenterFocusIcon } from "../assets/CenterIcon";
import { ContractionIcon } from "../assets/ContractIcon";
import { CollapseIcon } from "../assets/CollapseIcon";
import { adjustmentRanges } from "../utils/adjusmentsRange";
import { DealerRangeIndicator } from "./DealerRangeIndicator";
import { DealerLabel } from "./SectionsLabale";
import SegmentSelector from "./SegmentSelector";

interface ExpandableGraphProps {
  graphData: GetDealersGraphQuery;
  exactsData: GetAllExactsBySegmentQuery | undefined;
  getExacts: (segmentName: string) => Promise<void>;
  reset: boolean;
  resetData: () => Promise<void>;
  maxNodes: number;
  openModal: () => Promise<void>;
  closeModal: () => Promise<void>;
  isInModal: boolean;
}

interface CenterPoint {
  x: number;
  y: number;
  z: number;
}

const segments = [
  "Compact",
  "Sedan",
  "SUV",
  "Pickup",
  "Convertible",
  "Hatchback",
];

export const ExpandableGraph = ({
  graphData,
  exactsData,
  reset,
  resetData,
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
  const [activeRange, setActiveRange] = useState<string | null>(null);

  const [forceResetId, setForceResetId] = useState<number>(1);

  const [freezeLayout, setFreezeLayout] = useState(false);

  const [segmentsList, setSegmentsList] = useState<string[] | null>(null);

  const [selectedSegment, setSelectedSegment] = useState<string>("");

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

  const handleHover = useCallback((node: NodeObject<GraphNode> | null) => {
    setHoveredNode(node ?? null);
  }, []);

  const handleResetGraph = async () => {
    setFreezeLayout(false);
    await resetData();

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
      const segmentAmount = onlyInitGraphData.nodes.filter(
        (n) => n.type == "Segment"
      ).length;
      setCurrentGraphData(onlyInitGraphData);
    }

    setForceResetId((prev) => prev + 1);
  };

  const centerCameraToGraph = () => {
    if (!fgRef.current) return;
    const fg = fgRef.current;

    const distance = 200;

    fg.cameraPosition({ x: 0, y: 0, z: distance }, undefined, 2000);
  };

  const handleFilterByRange = (rangeKey: string) => {
    const selectedRange = adjustmentRanges.find((r) => r.id === rangeKey);
    if (!selectedRange || !initGraphData) return;

    if (activeRange === rangeKey) {
      const segmentAmount = initGraphData.nodes.filter(
        (n) => n.type == "Segment"
      ).length;
      setCurrentGraphData(initGraphData);
      setActiveRange(null);
      return;
    }

    const filteredSegments = initGraphData.nodes.filter(
      (n) =>
        n.type === "Segment" &&
        typeof n.adjustment === "number" &&
        n.adjustment > selectedRange.from &&
        n.adjustment <= selectedRange.to
    );

    const allowedSegmentIds = new Set(filteredSegments.map((n) => n.id));

    const filteredNodes = initGraphData.nodes.filter(
      (n) => n.type !== "Segment" || allowedSegmentIds.has(n.id)
    );

    const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));

    const filteredLinks = initGraphData.links.filter((l) =>
      visibleNodeIds.has(typeof l.target === "string" ? l.target : l.target.id)
    );

    setFreezeLayout(true);

    setCurrentGraphData({
      nodes: filteredNodes,
      links: filteredLinks,
    });

    setActiveRange(rangeKey);
  };

  useEffect(() => {
    if (graphData) {
      const initData = getInitialGraphData();
      setInitGraphData(initData);
      const list =
        initData?.nodes.reduce<string[]>((acc, current) => {
          if (current.type === "Segment") {
            acc.push(current.name);
          }
          return acc;
        }, []) ?? [];
      setSegmentsList(list);
      setCurrentGraphData(initData);
      setForceResetId((prev) => prev + 1);
    }
  }, [graphData, reset]);

  useEffect(() => {
    if (exactsData) return;
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 180 }, undefined, 0);
    }
  }, [initGraphData]);

  useEffect(() => {
    if (!selectedSegment || !fgRef.current || !currentGraphData) return;

    const targetNode = currentGraphData.nodes.find(
      (n) => n.type === "Segment" && n.name === selectedSegment
    );

    if (
      targetNode &&
      "x" in targetNode &&
      "y" in targetNode &&
      "z" in targetNode
    ) {
      fgRef.current.cameraPosition(
        {
          x: targetNode.x as number,
          y: targetNode.y as number,
          z: (targetNode.z as number) + 30,
        },
        {
          x: targetNode.x as number,
          y: targetNode.y as number,
          z: targetNode.z as number,
        },
        2000
      );
    }
  }, [selectedSegment]);

  return (
    <div ref={ref} className="npm-graph-container">
      <p className="current-settings-text">
        This graph reflects your current iOffer algorithms
      </p>
      <DealerRangeIndicator
        activeRange={activeRange}
        onSelectRange={handleFilterByRange}
      />
      <ControlsIndicator />
      <div onClick={handleResetGraph} className="graph-reset-button">
        <ReloadIcon />
      </div>
      <div className="graph-center-button">
        <CenterFocusIcon onClick={() => centerCameraToGraph()} />
        <SegmentSelector
          segments={segmentsList}
          setSelectedSegment={(value) => setSelectedSegment(value)}
        />
      </div>
      <div
        onClick={isInModal ? closeModal : openModal}
        className="graph-open-modal-button"
      >
        {isInModal ? <ContractionIcon /> : <CollapseIcon />}
      </div>
      <DealerLabel />
      <ForceGraph3D
        key={forceResetId}
        ref={fgRef}
        width={width}
        height={height}
        graphData={currentGraphData}
        enableNodeDrag={false}
        backgroundColor="#FFFFFF"
        onNodeHover={handleHover}
        cooldownTicks={freezeLayout ? 0 : 400}
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
          let color = new Color(node.color);

          switch (node.type) {
            case "Dealer":
              color = new Color("#0264bf");
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
              emissive: color,
              emissiveIntensity: 0.5,
              metalness: 0.3,
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
              node.type === "Dealer" ? 12 : node.type === "Heading" ? 6 : 4;
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
