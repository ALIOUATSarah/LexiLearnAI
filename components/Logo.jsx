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

  // Get the appropriate background color based on mode
  const getBgColor = () => {
    switch (mode) {
      case "dyslexia":
        return "bg-gradient-to-br from-amber-500 to-amber-600";
      case "adhd":
        return "bg-gradient-to-br from-blue-500 to-blue-600";
      case "executive":
        return "bg-gradient-to-br from-teal-500 to-teal-600";
      case "adaptive":
        return "bg-gradient-to-br from-indigo-500 to-violet-600";
      default:
        return "bg-gradient-to-br from-indigo-500 to-purple-600";
    }
  };

  // Get the accent color for the logo elements
  const getAccentColor = () => {
    switch (mode) {
      case "dyslexia":
        return "#FBBF24"; // amber
      case "adhd":
        return "#60A5FA"; // blue
      case "executive":
        return "#14B8A6"; // teal
      case "adaptive":
        return "#818CF8"; // indigo
      default:
        return "#A78BFA"; // purple
    }
  };

  // Get text color for the brand name
  const getTextColor = () => {
    switch (mode) {
      case "dyslexia":
        return "text-amber-800";
      case "adhd":
        return "text-blue-800";
      case "executive":
        return "text-teal-800";
      case "adaptive":
        return "text-indigo-800";
      default:
        return "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent";
    }
  };

  // Get accent text color for AI and subtitle
  const getAccentTextColor = () => {
    switch (mode) {
      case "dyslexia":
        return "text-amber-600";
      case "adhd":
        return "text-blue-600";
      case "executive":
        return "text-teal-600";
      case "adaptive":
        return "text-indigo-600";
      default:
        return "text-purple-600";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative ${
          sizeClasses[size]
        } rounded-lg overflow-hidden shadow-md ${getBgColor()} group hover:shadow-lg transition-all duration-300`}
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

            {/* Enhanced brain/spine in the middle with more anatomical detail */}
            <path
              d="M11 4.5C11 4.5 11.5 6 11.8 8.5C12 10 12 12 12 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />
            <path
              d="M13 4.5C13 4.5 12.5 6 12.2 8.5C12 10 12 12 12 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />

            {/* Brain stem transition to spine */}
            <path
              d="M12 12C12 12 11.7 15 11.8 17.5C11.9 19 12 20 12 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />

            {/* Brain outline shape - more anatomically accurate */}
            <path
              d="M8.5 5.5C8.5 5.5 10 4.5 12 4.5C14 4.5 15.5 5.5 15.5 5.5C15.5 5.5 16 6 16 7.5C16 9 15 10 15 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeDasharray={mode === "adhd" ? "1,1" : "0,0"}
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />
            <path
              d="M15.5 5.5C15.5 5.5 16 6 16 7.5C16 9 15 10 15 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeDasharray={mode === "adhd" ? "1,1" : "0,0"}
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />
            <path
              d="M8.5 5.5C8.5 5.5 8 6 8 7.5C8 9 9 10 9 10"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeDasharray={mode === "adhd" ? "1,1" : "0,0"}
              className={
                mode === "adhd" || mode === "executive" ? "animate-pulse" : ""
              }
            />

            {/* Letter L */}
            <path
              d="M5 8V14H7"
              stroke={getAccentColor()}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Enhanced neural connections with more branches and synapses */}
            <path
              d="M16 8C16.5 8.5 18 10 18 12C18 14 16.5 15.5 16 16"
              stroke={getAccentColor()}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Additional dendrites */}
            <path
              d="M16 8C16 8 17 7.5 17.5 8.5"
              stroke={getAccentColor()}
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M16 16C16 16 17 16.5 17.5 15.5"
              stroke={getAccentColor()}
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Secondary neural branches */}
            <path
              d="M17 10C17.5 10.5 18 11 18.2 11.5"
              stroke={getAccentColor()}
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M17 14C17.5 13.5 18 13 18.2 12.5"
              stroke={getAccentColor()}
              strokeWidth="0.75"
              strokeLinecap="round"
            />

            {/* Neuron cell bodies/synapses */}
            <circle
              cx="18"
              cy="8"
              r="1.2"
              fill={getAccentColor()}
              className={
                mode === "adhd" || mode === "executive"
                  ? "animate-ping-slow"
                  : ""
              }
            />
            <circle
              cx="18"
              cy="16"
              r="1.2"
              fill={getAccentColor()}
              className={
                mode === "adhd" || mode === "executive"
                  ? "animate-ping-slow"
                  : ""
              }
            />
            <circle
              cx="18.5"
              cy="11.5"
              r="0.7"
              fill={getAccentColor()}
              className={
                mode === "adhd" || mode === "executive"
                  ? "animate-ping-slow"
                  : ""
              }
            />
            <circle
              cx="18.5"
              cy="12.5"
              r="0.7"
              fill={getAccentColor()}
              className={
                mode === "adhd" || mode === "executive"
                  ? "animate-ping-slow"
                  : ""
              }
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
