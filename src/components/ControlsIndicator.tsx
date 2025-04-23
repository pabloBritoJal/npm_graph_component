import { MdOutlineSwipe, MdPanToolAlt, MdZoomInMap } from "react-icons/md";
import "../styles/controls.css";

const ControlsIndicator = () => {
  return (
    <div className="npm-controls-container">
      <div className="npm-controls-group">
        <span className="text">Left mouse button</span>
        <MdOutlineSwipe className="npm-controls-icon" />
      </div>
      <div className="npm-controls-group">
        <span className="text">Right mouse button</span>
        <MdPanToolAlt className="npm-controls-icon" />
      </div>
      <div className="npm-controls-group">
        <span className="text">Mouse wheel</span>
        <MdZoomInMap className="npm-controls-icon" />
      </div>
    </div>
  );
};

export default ControlsIndicator;
