import React from "react";

interface DropLeftArrowProps {
  className?: string;
}

const DropLeftArrow: React.FC<DropLeftArrowProps> = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M320 128L192 256l128 128z"></path>
  </svg>
);

export default DropLeftArrow;
