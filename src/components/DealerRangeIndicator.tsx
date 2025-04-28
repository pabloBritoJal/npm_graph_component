import { FaFlag } from "react-icons/fa/index.js";

const DealerRangeIndicator = () => {
  return (
    <div className="dealer-range-container">
      <div className="dealer-range-group">
        <FaFlag className="dealer-icon-red" />
        <span>80–89.5% or 110.5–120%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-icon-yellow" />
        <span>90–94.5% or 105.5–110%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-icon-green" />
        <span>95–105%</span>
      </div>
    </div>
  );
};

export default DealerRangeIndicator;
