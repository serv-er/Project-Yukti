import React from "react";
import "./PeregrineSpinner.css";

const PeregrineSpinner = () => {
  return (
    <div className="spinner-container">
      {/* SVG Outline */}
      <svg
        className="peregrine-outline"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <path
          d="M100,10 C130,20 160,50 170,90 C160,130 130,170 100,180 C70,170 40,130 30,90 C40,50 70,20 100,10 Z"
          fill="none"
          stroke="#0077ff"
          strokeWidth="2"
          strokeDasharray="600"
          strokeDashoffset="600"
        />
      </svg>

      {/* Text Animation */}
      <div className="peregrine-text">Peregrine</div>
    </div>
  );
};

export default PeregrineSpinner;