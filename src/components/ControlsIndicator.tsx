import { MdOutlineSwipe, MdPanToolAlt, MdZoomInMap } from "react-icons/md";
import "../styles/controls.css";

const ControlsIndicator = () => {
  return (
    <div className="npm-controls-container">
      <div className="npm-controls-group">
        <MdOutlineSwipe className="npm-controls-icon-yellow" />
        <span className="text">Rotate: Left mouse button</span>
      </div>
      <div className="npm-controls-group">
        <MdPanToolAlt className="npm-controls-icon-green" />
        <span className="text">Pan: Right mouse button</span>
      </div>
      <div className="npm-controls-group">
        <MdZoomInMap className="npm-controls-icon-blue" />
        <span className="text">Zoom: Mouse wheel</span>
      </div>
    </div>
  );
};

export default ControlsIndicator;
