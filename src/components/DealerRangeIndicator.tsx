import { FaFlag } from "react-icons/fa/index.js";

const DealerRangeIndicator = () => {
  return (
    <div className="dealer-range-container">
      <div className="dealer-range-group">
        <FaFlag className="dealer-color-red" />
        <span>110% &lt; x ≤ 120%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-color-orange" />
        <span>105% &lt; x ≤ 110%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-color-green" />
        <span>95% &lt; x ≤ 105%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-color-blue" />
        <span>90% &lt; x ≤ 95%</span>
      </div>
      <div className="dealer-range-group">
        <FaFlag className="dealer-color-purple" />
        <span>80% &lt; x ≤ 90%</span>
      </div>
    </div>
  );
};

export default DealerRangeIndicator;
