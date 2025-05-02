import { FlagIcon } from "../assets/FlagIcon";
import { adjustmentRanges } from "../utils/adjusmentsRange";

export const DealerRangeIndicator = ({
  activeRange,
  onSelectRange,
}: {
  activeRange: string | null;
  onSelectRange: (rangeKey: string) => void;
}) => (
  <div className="dealer-range-container">
    {adjustmentRanges.map((item, idx) => (
      <div
        key={idx}
        className={`dealer-range-group ${
          activeRange === item.id
            ? "active-range"
            : activeRange
            ? "inactive-range"
            : ""
        }`}
        onClick={() => onSelectRange(item.id)}
      >
        <FlagIcon className={item.id} />
        <div className="range-values">
          <span className="range-left">{item.from}%</span>
          <span className="range-separator">-</span>
          <span className="range-right">{item.to}%</span>
        </div>
      </div>
    ))}
  </div>
);