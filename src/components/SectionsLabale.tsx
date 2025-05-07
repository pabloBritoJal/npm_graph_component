import { useId } from "react";

export const DealerLabel = () => {
  const dealerId = useId();
  const headingId = useId();

  return (
    <div className="dealer-label-container">
      <div className="dealer-label">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <defs>
            <radialGradient id={dealerId} cx="20%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#0264bf" />
              <stop offset="100%" stopColor="#0264bf" />
            </radialGradient>
          </defs>
          <circle cx="10" cy="10" r="8" fill={`url(#${dealerId})`} />
        </svg>
        <span className="dealer-label-text">Dealer</span>
      </div>

      <div className="dealer-label">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <defs>
            <radialGradient id={headingId} cx="20%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#6FB5E4" />
              <stop offset="100%" stopColor="#6FB5E4" />
            </radialGradient>
          </defs>
          <circle cx="10" cy="10" r="8" fill={`url(#${headingId})`} />
        </svg>
        <span className="dealer-label-text">Headings</span>
      </div>
    </div>
  );
};
