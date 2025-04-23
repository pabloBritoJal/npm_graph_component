# npm_graph_component

**Interactive 3D graph visualization in React**

## This reusable component renders a 3D force-directed graph to visualize hierarchical data and relationships between entities.

## ✨ Features

- 🔭 3D force-directed graph using `react-force-graph-3d`
- 🧠 Built-in data fetching
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

import { GraphComponent } from "npm_graph_component";

const GraphCard = () => {
  return <GraphComponent dealerId={40337} maxNodes={1000} />;
};

export default GraphCard;



⸻

🧪 What’s Included
	•	GraphComponent: Main component that fetches and renders the 3D graph.
	•	Handles loading and error states internally.

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
```
