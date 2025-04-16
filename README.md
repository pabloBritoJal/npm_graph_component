# npm_graph_component

**Interactive 3D graph visualization in React using Three.js and react-force-graph-3d**

This reusable component lets you visualize hierarchical data and relationships between entities using 3D nodes and links. It is designed to be flexible and data-source agnostic, supporting GraphQL, REST, or static data.

---

[![npm version](https://img.shields.io/npm/v/npm_graph_component)](https://www.npmjs.com/package/npm_graph_component)

## ✨ Features

- Interactive 3D graph rendering with custom geometry per node type
- Modular CSS and SVG assets included
- Type-safe with full TypeScript support

---

## ⚙️ Installation

```bash
npm install npm_graph_component
```

> Make sure the following `peerDependencies` are also installed in your project:

```bash
npm install react react-dom three react-icons react-force-graph-3d
```

---

## 📦 Usage Example

```tsx
import {
  GraphVisualizer,
  GraphData,
  FilterInput,
  GraphNode,
  GraphLink
} from "npm_graph_component";

const GraphCard = () => {
  const [graphData, setGraphData] = useState<GraphData>();
  const { data: dealersData, loading } = useGetDealersGraphQuery();

  const getInitialGraphData = () => {
    if (!dealersData) return undefined;
    return {
      nodes: dealersData.dealersGraph.nodes.map((n) => ({
        id: n.id,
        name: n.name || "",
        type: n.type,
        color: n.color || "#ccc",
      })),
      links: dealersData.dealersGraph.links.map((l) => ({
        source: l.source,
        target: l.target,
      })),
    };
  };

  useEffect(() => {
    console.log(dealersData);
    if (dealersData) {
      const initData = getInitialGraphData();
      console.log(initData);
      setGraphData(initData);
    }
  }, [dealersData]);

  if (loading) return <DefaultSpinner />;

  return (
    <GraphVisualizer graphData={graphData}/>
  );
};
```

---

## 🔧 Props of `GraphVisualizer`

| Prop              | Type                                       | Required | Description                                                                  |
|-------------------|---------------------------------------------|----------|------------------------------------------------------------------------------|
| `graphData`       | `GraphData`                                | Yes      | Initial graph structure with nodes and links                                |


---

## 📐 Data Structures

```ts
interface GraphNode {
  id: string;
  name?: string;
  type: "Dealer" | "Heading" | "Segment" | "ExactId";
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface FilterInput {
  [key: string]: string | number;
}
```

---

## 🔀 Data source flexibility

The component supports:

- GraphQL queries (as shown in the example)
- REST APIs via fetch or Axios
- Static/mock data passed directly

## ⚖ Peer dependencies

This package **does not bundle** the following libraries. Make sure they are present in your project:

```json
"peerDependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "three": "^0.175.0",
  "react-icons": "^5.5.0",
  "react-force-graph-3d": "^1.46.0"
}
```

---

## 🪪 License

MIT — Pablo Brito

