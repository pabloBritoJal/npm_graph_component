# npm_graph_component

**Interactive 3D graph visualization with built-in GraphQL support in React**

This reusable component renders a 3D force-directed graph to visualize hierarchical data and relationships between entities. It comes with integrated Apollo Client and preconfigured GraphQL queries, making it ready to use out of the box — no setup required from the consuming app.

---

[![npm version](https://img.shields.io/npm/v/npm_graph_component)](https://www.npmjs.com/package/npm_graph_component)

## ✨ Features

- 🔭 3D force-directed graph using `react-force-graph-3d`
- 🧠 Built-in data fetching via GraphQL + Apollo Client
- 🧩 Customizable node types, colors, and structure
- ⚛️ Written in TypeScript with full type safety
- 📦 Ready to drop into any React 18+ app

---

## ⚙️ Installation

```bash
npm install npm_graph_component

You also need to install the following peerDependencies in your project (if not already present):

npm install react react-dom react-icons



⸻

🚀 Quick Start

import { GraphDashboard } from "npm_graph_component";

const GraphCard = () => {
  return <GraphDashboard />;
};

export default GraphCard;



⸻

🧪 What’s Included
	•	GraphDashboard: Main component that fetches and renders the 3D graph.
	•	Apollo Client is preconfigured with default API endpoint (http://45.63.50.167:3535/graphql)
	•	Uses the query dealersGraph from the backend to get initial graph data.
	•	Handles loading and error states internally.

⸻

📐 Graph Data Model

The internal graph is built with the following types:

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



⸻

🔀 Data Source

Currently uses GraphQL to fetch data from:

query GetDealersGraph {
  dealersGraph {
    id
    name
    type
    color
    links {
      source
      target
    }
  }
}

The GraphQL endpoint is hardcoded for now but may be made configurable in future versions.

⸻

⚖️ Peer Dependencies

This package expects the following libraries to be present in your app:

"peerDependencies": {
  "react": ">=18.0.0 <19.0.0",
  "react-dom": ">=18.0.0 <19.0.0",
  "react-icons": "^5.5.0"
}

react-force-graph-3d, @apollo/client, and graphql are bundled internally, so no need to install them.

⸻

🪪 License

MIT — Pablo Brito

---
