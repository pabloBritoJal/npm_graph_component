import { ExpandableGraph } from "../components/ExpandableGraph";
import { GraphData } from "../types/graph_types";
import ControlsIndicator from "../components/ControlsIndicator";
import "../styles/graph.css";
import DealerRangeIndicator from "./DealerRangeIndicator";

interface GraphVisualizerProps {
  graphData: GraphData | undefined;
}

export const GraphVisualizer = ({ graphData }: GraphVisualizerProps) => {
  return (
    <div className="npm-graph-dashboard-container">
      <h2 className="label">This graph reflects your current settings</h2>
      {graphData && <ExpandableGraph graphData={graphData} />}
      <DealerRangeIndicator />
      <ControlsIndicator />
    </div>
  );
};
