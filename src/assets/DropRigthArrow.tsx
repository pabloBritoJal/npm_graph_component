import React from "react";

interface DropRigthArrowProps {
  className?: string;
}

const DropRigthArrow: React.FC<DropRigthArrowProps> = ({ className }) => (
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
    <path d="M192 128l128 128-128 128z"></path>
  </svg>
);

export default DropRigthArrow;
