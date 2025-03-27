import React from "react";

export default function Logo({ mode = "normal", size = "md" }) {
  // Size variants
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  // SVG size variants
  const svgSizes = {
    sm: "20",
    md: "24",
    lg: "28",
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative ${
          sizeClasses[size]
        } rounded-lg overflow-hidden shadow-md ${
          mode === "dyslexia"
            ? "bg-gradient-to-br from-amber-500 to-amber-600"
            : mode === "adhd"
            ? "bg-gradient-to-br from-blue-500 to-blue-600"
            : "bg-gradient-to-br from-indigo-500 to-purple-600"
        } group hover:shadow-lg transition-all duration-300`}
        role="img"
        aria-label="LexiLearn AI Logo"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={svgSizes[size]}
            height={svgSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white transform group-hover:scale-110 transition-transform duration-300"
            aria-hidden="true"
          >
            {/* Open book base */}
            <path
              d="M2 6C2 4.89543 2.89543 4 4 4H8C9.10457 4 10 4.89543 10 6V18C10 19.1046 9.10457 20 8 20H4C2.89543 20 2 19.1046 2 18V6Z"
              fill="white"
              fillOpacity="0.9"
            />
            <path
              d="M14 6C14 4.89543 14.8954 4 16 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H16C14.8954 20 14 19.1046 14 18V6Z"
              fill="white"
              fillOpacity="0.9"
            />

            {/* Brain in the middle */}
            <path
              d="M11 4C11 4 12 6 12 12C12 18 13 20 13 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className={mode === "adhd" ? "animate-pulse" : ""}
            />

            {/* Letter L */}
            <path
              d="M5 8V14H7"
              stroke={
                mode === "dyslexia"
                  ? "#FBBF24"
                  : mode === "adhd"
                  ? "#60A5FA"
                  : "#A78BFA"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Neural connections/accessibility */}
            <path
              d="M16 8C16.5 8.5 18 10 18 12C18 14 16.5 15.5 16 16"
              stroke={
                mode === "dyslexia"
                  ? "#FBBF24"
                  : mode === "adhd"
                  ? "#60A5FA"
                  : "#A78BFA"
              }
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="18"
              cy="8"
              r="1.5"
              fill={
                mode === "dyslexia"
                  ? "#FBBF24"
                  : mode === "adhd"
                  ? "#60A5FA"
                  : "#A78BFA"
              }
              className={mode === "adhd" ? "animate-ping-slow" : ""}
            />
            <circle
              cx="18"
              cy="16"
              r="1.5"
              fill={
                mode === "dyslexia"
                  ? "#FBBF24"
                  : mode === "adhd"
                  ? "#60A5FA"
                  : "#A78BFA"
              }
              className={mode === "adhd" ? "animate-ping-slow" : ""}
            />
          </svg>
        </div>

        {/* Enhanced effects for different modes */}
        {mode === "adhd" && (
          <div className="absolute inset-0 bg-blue-400 opacity-20 animate-pulse"></div>
        )}
        {mode === "dyslexia" && (
          <div className="absolute inset-0 bg-amber-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        )}
        {mode === "normal" && (
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        )}
      </div>

      <div>
        <h1
          className={`${
            size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
          } font-bold flex items-center`}
        >
          <span
            className={`${mode === "dyslexia" ? "tracking-wide" : ""} ${
              mode === "dyslexia"
                ? "text-amber-800"
                : mode === "adhd"
                ? "text-blue-800"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            LexiLearn
          </span>
          <span
            className={`ml-1 ${
              size === "sm"
                ? "text-xs"
                : size === "md"
                ? "text-sm"
                : "text-base"
            } font-semibold ${
              mode === "dyslexia"
                ? "text-amber-600"
                : mode === "adhd"
                ? "text-blue-600"
                : "text-purple-600"
            }`}
          >
            AI
          </span>
        </h1>
        {(mode === "dyslexia" || mode === "adhd") && (
          <div
            className={`text-xs font-medium ${
              mode === "dyslexia" ? "text-amber-600" : "text-blue-600"
            }`}
          >
            Accessible Education
          </div>
        )}
      </div>
    </div>
  );
}
