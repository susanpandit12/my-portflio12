import React from "react";
export function Arrow({ className = "" }) {
  return (
    <svg
      className={`arrow-icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 19 19 5M5 5h14v14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Asterisk() {
  return (
    <svg
      className="asterisk"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}
