import { FlagIcon } from "../assets/FlagIcon";

const DealerRangeIndicator = () => {
  return (
    <div className="dealer-range-container">
      <div className="dealer-range-group">
        <FlagIcon className="range-1" />
        <span>110% &lt; x ≤ 120%</span>
      </div>
      <div className="dealer-range-group">
        <FlagIcon className="range-2" />
        <span>105% &lt; x ≤ 110%</span>
      </div>
      <div className="dealer-range-group">
        <FlagIcon className="range-3" />
        <span>95% &lt; x ≤ 105%</span>
      </div>
      <div className="dealer-range-group">
        <FlagIcon className="range-4" />
        <span>90% &lt; x ≤ 95%</span>
      </div>
      <div className="dealer-range-group">
        <FlagIcon className="range-5" />
        <span>80% &lt; x ≤ 90%</span>
      </div>
    </div>
  );
};

export default DealerRangeIndicator;
