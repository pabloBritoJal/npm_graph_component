import { useState } from "react";
import { ExpandableGraph } from "../components/ExpandableGraph";
import { GraphData } from "../types/graph_types";
import { LegendVisibility, Levels } from "../types/labelVisibility";
import ControlsIndicator from "../components/ControlsIndicator";
import { FilterInput } from "../types/filterInputType";
import "../styles/graph.css";
import LegendButtons from "./LegendButtons";
import DealerRangeIndicator from "./DealerRangeIndicator";

interface GraphVisualizerProps {
  graphData: GraphData | undefined;
}

export const GraphVisualizer = ({ graphData }: GraphVisualizerProps) => {
  const [legendVisibility, setLegendVisibility] = useState<LegendVisibility>({
    Dealership: true,
    Heading: true,
    Segment: true,
  });

  const handleSegments = (level: Levels) => {
    setLegendVisibility((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  return (
    <div className="npm-graph-dashboard-container">
      <LegendButtons
        onToggle={handleSegments}
        legendVisibility={legendVisibility}
      />
      {graphData && (
        <ExpandableGraph
          graphData={graphData}
          legendVisibility={legendVisibility}
        />
      )}
      <DealerRangeIndicator />
      <ControlsIndicator />
    </div>
  );
};
