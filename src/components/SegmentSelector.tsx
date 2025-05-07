import React, { useState } from "react";
import DropdownSelector from "./DropdownSelector";
import DropLeftArrow from "../assets/DropLeftArrow";
import DropRigthArrow from "../assets/DropRigthArrow";

interface SegmentSelectorProps {
  segments: string[] | null;
  setSelectedSegment: (segment: string) => void;
}

const SegmentSelector: React.FC<SegmentSelectorProps> = ({
  segments,
  setSelectedSegment,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [showSelectorSegment, setShowSelectorSegment] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    setSelectedSegment(value);
  };

  if (!segments) return null;

  return (
    <div className="selector-segment-section">
      <div
        onClick={() => {
          setShowSelectorSegment((prev) => !prev);
        }}
      >
        {showSelectorSegment ? <DropLeftArrow /> : <DropRigthArrow />}
      </div>
      {showSelectorSegment && (
        <DropdownSelector
          optionName="Focus on:"
          optionsList={segments}
          onSelect={handleSelect}
          selectedOption={selected}
        />
      )}
    </div>
  );
};

export default SegmentSelector;
