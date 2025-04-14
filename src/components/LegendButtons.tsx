import React from "react";
import { Legend } from "./Legend";
import "../styles/legend.css";
import { LegendVisibility, Levels } from "../types/labelVisibility";

const LegendButtons = ({
  legendVisibility,
  onToggle,
}: {
  legendVisibility: LegendVisibility;
  onToggle: (level: Levels) => void;
}) => {
  return (
    <div className="npm-legend-buttons-container">
      <Legend
        label="Dealership"
        color="#ffb703"
        active={legendVisibility.Dealership}
        onToggle={() => onToggle("Dealership")}
      />
      <Legend
        label="Heading"
        color="#a9def9"
        active={legendVisibility.Heading}
        onToggle={() => onToggle("Heading")}
      />
      <Legend
        label="Segment"
        color="#8338ec"
        active={legendVisibility.Segment}
        onToggle={() => onToggle("Segment")}
      />
    </div>
  );
};

export default LegendButtons;
