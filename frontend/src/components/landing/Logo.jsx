import React from "react";

// Sarvabhoomi monogram — stylised "S" with a horizon line
const Logo = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="1" y="1" width="62" height="62" stroke="#c89b5f" strokeWidth="1" />
    <path
      d="M44 21c-3-3.6-7.5-5.4-12-5.4-5.4 0-10 2.6-10 7.1 0 4.6 4.5 6.4 11.6 7.8 7 1.4 12.4 3.4 12.4 9.6 0 5.7-5.4 9.3-12.4 9.3-5.6 0-10.2-2.1-13.6-6"
      stroke="#c89b5f"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="10"
      y1="51"
      x2="54"
      y2="51"
      stroke="#c89b5f"
      strokeWidth="0.8"
      strokeDasharray="2 2"
    />
  </svg>
);

export default Logo;
