import React from "react";

const CustomTooltip = ({ showTooltip, tooltipText, tooltipPosition, mode }) => {
  if (!showTooltip) return null;

  return (
    <div
      className={`custom-tooltip ${
        mode === "dyslexia"
          ? "bg-amber-100 text-amber-800 border border-amber-200"
          : mode === "adhd"
          ? "bg-blue-100 text-blue-800 border border-blue-200"
          : "bg-gray-100 text-gray-800 border border-gray-200"
      }`}
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
      }}
    >
      {tooltipText}
    </div>
  );
};

export default CustomTooltip;
