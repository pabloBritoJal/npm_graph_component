import React from "react";
import "../styles/legend.css";

type LegendProps = {
  label: string;
  color: string;
  active: boolean;
  onToggle: () => void;
};

export const Legend = ({ label, color, active, onToggle }: LegendProps) => {
  return (
    <div className="npm-legend-wrapper">
      <span className="npm-legend-label">{label}</span>
      <button
        onClick={onToggle}
        className={`npm-legend-toggle ${active ? "active" : "inactive"}`}
        style={{ "--legend-color": color } as React.CSSProperties}
      >
        <div className={`npm-legend-circle ${active ? "on" : "off"}`} />
      </button>
    </div>
  );
};
