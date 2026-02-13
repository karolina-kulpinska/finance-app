import React from "react";

const ErrorIcon = ({ size = 64, color = "#d9534f", ...props }) => {
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
        d="M22 22L42 42M42 22L22 42"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ErrorIcon;
