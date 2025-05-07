import React from "react";

interface DownArrowIconProps {
  className?: string;
}

export const DownArrowIcon: React.FC<DownArrowIconProps> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 7L10 12L15 7" stroke="#333" strokeWidth="2" />
  </svg>
);
