import spinner from "../assets/spinner.svg";
import "../styles/spinner.css";

const DefaultSpinner = () => {
  return (
    <div className="default-spinner-overlay">
      <img className="default-spinner-image" src={spinner} alt="loading..." />
    </div>
  );
};

export default DefaultSpinner;
