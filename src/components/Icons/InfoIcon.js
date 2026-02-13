import React from "react";

const InfoIcon = ({ size = 64, color = "#007bff", ...props }) => {
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
      <circle cx="32" cy="22" r="2" fill="white" />
      <path
        d="M32 30V44"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default InfoIcon;
