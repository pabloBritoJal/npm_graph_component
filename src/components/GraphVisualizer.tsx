import { useState } from "react";
import { ExpandableGraph } from "../components/ExpandableGraph";
import { GraphData } from "../types/graph_types";
import { LegendVisibility, Levels } from "../types/labelVisibility";
import ControlsIndicator from "../components/ControlsIndicator";
import FilterPanel from "../components/FilterPanel";
import { FilterInput } from "../types/filterInputType";
import "../styles/graph.css";
import LegendButtons from "./LegendButtons";

interface GraphVisualizerProps {
  graphData: GraphData | undefined;
  handleAddExacts: (filterInput: FilterInput) => Promise<void>;
}

export const GraphVisualizer = ({
  graphData,
  handleAddExacts,
}: GraphVisualizerProps) => {
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
      <FilterPanel setFilters={handleAddExacts} />
      <ControlsIndicator />
    </div>
  );
};
