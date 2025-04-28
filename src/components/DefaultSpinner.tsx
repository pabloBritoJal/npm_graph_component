import { FaSpinner } from "react-icons/fa/index.js";

const DefaultSpinner = () => {
  return (
    <div className="default-spinner-overlay">
      <FaSpinner className="default-spinner-icon" />
    </div>
  );
};

export default DefaultSpinner;
