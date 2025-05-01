import { HandIcon } from "../assets/HandIcon";
import { MoveIcon } from "../assets/MoveIcon";
import { ZoomIcon } from "../assets/ZoomIcon";

const ControlsIndicator = () => {
  return (
    <div className="npm-controls-container">
      <div className="npm-controls-group">
        <span className="controls-group-text">Left mouse button</span>
        <HandIcon className="npm-controls-icon" />
      </div>
      <div className="npm-controls-group">
        <span className="controls-group-text">Right mouse button</span>
        <MoveIcon className="npm-controls-icon" />
      </div>
      <div className="npm-controls-group">
        <span className="controls-group-text">Mouse wheel</span>
        <ZoomIcon className="npm-controls-icon" />
      </div>
    </div>
  );
};

export default ControlsIndicator;
