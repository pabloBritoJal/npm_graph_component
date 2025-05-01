import { SpinnerIcon } from "../assets/SpinnerIcon";

const DefaultSpinner = () => {
  return (
    <div className="default-spinner-overlay">
      <SpinnerIcon className="default-spinner-icon" />
    </div>
  );
};

export default DefaultSpinner;
