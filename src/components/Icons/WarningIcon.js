import React from "react";

const WarningIcon = ({ size = 64, color = "#f0ad4e", ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="32" r="28" fill={color} />
      <path
        d="M32 20V34"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="42" r="2" fill="white" />
    </svg>
  );
};

export default WarningIcon;
