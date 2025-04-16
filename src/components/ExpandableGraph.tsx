import ForceGraph3D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-3d";
import {
  Sprite,
  SpriteMaterial,
  CanvasTexture,
  Color,
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  SphereGeometry,
  ConeGeometry,
  CylinderGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  LinearFilter,
  BufferGeometry,
} from "three";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GraphData, GraphLink, GraphNode } from "../types/graph_types";
import { useContainerSize } from "../hooks/useContainerSize";
import "../styles/graph.css";

interface ExpandableGraphProps {
  graphData: GraphData;
}

export const ExpandableGraph = ({ graphData }: ExpandableGraphProps) => {
  const fgRef = useRef<
    | ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>>
    | undefined
  >(undefined);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hiddenNodeIds, setHiddenNodeIds] = useState<Set<string>>(new Set());
  const [freezeLayout, setFreezeLayout] = useState(false);
  const [dataGraph, setDataGraph] = useState(graphData);

  const { ref, width, height } = useContainerSize();

  const handleHover = useCallback((node: NodeObject<GraphNode> | null) => {
    setHoveredNode(node ?? null);
  }, []);

  const handleClick = useCallback((node: NodeObject<GraphNode>) => {
    setSelectedNode(node);
  }, []);

  const hideNodeAndDescendants = useCallback(
    (nodeId: string) => {
      if (hiddenNodeIds.has(nodeId)) return;

      const toHide = new Set<string>();
      const visit = (id: string) => {
        if (toHide.has(id)) return;
        toHide.add(id);
        dataGraph.links.forEach((link) => {
          const source =
            typeof link.source === "string" ? link.source : link.source.id;
          const target =
            typeof link.target === "string" ? link.target : link.target.id;
          if (source === id) visit(target);
        });
      };

      visit(nodeId);
      setFreezeLayout(true);
      setHiddenNodeIds(toHide);
      setSelectedNode(null);
    },
    [dataGraph.links, hiddenNodeIds]
  );

  const showHiddenNode = useCallback(() => {
    setHiddenNodeIds(new Set());
  }, []);

  const filteredGraphData = useMemo<GraphData>(() => {
    return {
      nodes: dataGraph.nodes.filter((n) => !hiddenNodeIds.has(n.id)),
      links: dataGraph.links.filter((l) => {
        const source = typeof l.source === "string" ? l.source : l.source.id;
        const target = typeof l.target === "string" ? l.target : l.target.id;
        return !hiddenNodeIds.has(source) && !hiddenNodeIds.has(target);
      }),
    };
  }, [hiddenNodeIds, dataGraph]);

  const createTextSprite = (text: string, color: Color) => {
    const canvas = document.createElement("canvas");
    const ratio = window.devicePixelRatio || 2;
    const width = 512,
      height = 256;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#D9D9D8";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = color.getStyle();
      wrapText(ctx, text, width / 2, height / 2, width - 20, 48);
    }

    const texture = new CanvasTexture(canvas);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;

    const sprite = new Sprite(
      new SpriteMaterial({ map: texture, transparent: true })
    );
    sprite.scale.set(10, 5, 1);
    return sprite;
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (const word of words) {
      const testLine = `${line}${word} `;
      if (ctx.measureText(testLine).width > maxWidth && line !== "") {
        lines.push(line);
        line = `${word} `;
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const offsetY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((l, i) =>
      ctx.fillText(l.trim(), x, offsetY + i * lineHeight)
    );
  };

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 200 }, undefined, 0);
    }
  }, [filteredGraphData]);

  useEffect(() => {
    setDataGraph(graphData);
  }, [graphData]);

  return (
    <div ref={ref} className="npm-graph-container">
      {selectedNode && (
        <button
          onClick={() => hideNodeAndDescendants(selectedNode.id)}
          className="npm-graph-button
"
        >
          <FaEye size={25} />
        </button>
      )}
      {hiddenNodeIds.size > 0 && (
        <button
          onClick={showHiddenNode}
          className="npm-graph-button
"
        >
          <FaEyeSlash size={25} />
        </button>
      )}

      <ForceGraph3D
        ref={fgRef}
        width={width}
        height={height}
        graphData={filteredGraphData}
        backgroundColor="#FFFFFF"
        onNodeClick={handleClick}
        onNodeHover={handleHover}
        onBackgroundClick={() => setSelectedNode(null)}
        cooldownTicks={freezeLayout ? 0 : 400}
        showNavInfo={false}
        linkDirectionalArrowLength={3}
        linkDirectionalArrowRelPos={1.1}
        linkCurvature={0.25}
        nodeLabel={() => ""}
        linkColor={() => "#182931"}
        linkDirectionalArrowColor={() => "#182931"}
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
          const isSelected = selectedNode && node.id !== selectedNode.id;
          const color = new Color(isSelected ? "#182931" : node.color);
          let geometry: BufferGeometry;

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

          if (["Dealer", "Heading", "Segment"].includes(node.type)) {
            const edges = new EdgesGeometry(geometry);
            const lines = new LineSegments(
              edges,
              new LineBasicMaterial({
                color: "#182931",
                transparent: true,
                opacity: 0.2,
              })
            );
            mesh.add(lines);
          }

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
