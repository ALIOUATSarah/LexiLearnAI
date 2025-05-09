import React from "react";
import { Download, Maximize2, Volume2 } from "lucide-react";

const FloatingActionButtons = ({
  mode,
  isFocusMode,
  toggleFocusMode,
  autoReadEnabled,
  toggleAutoRead,
  downloadProgress,
  downloadOptions,
  setDownloadOptions,
  handleDownloadCourse,
  toggleFontAdjustment,
  toggleTimer,
  toggleProgressTracker,
}) => {
  // Helper function to get mode-specific colors
  const getModeColor = () => {
    switch (mode) {
      case "dyslexia":
        return "amber";
      case "adhd":
        return "blue";
      case "adaptive":
        return "indigo";
      default:
        return "purple";
    }
  };

  // Close download options when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (downloadOptions && !e.target.closest(".floating-action-buttons")) {
        setDownloadOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [downloadOptions, setDownloadOptions]);

  return (
    <div className="fixed bottom-4 right-4 z-50 floating-action-buttons flex flex-col gap-2">
      {/* Download Course Button - Available in all modes */}
      <div className="relative">
        <button
          onClick={() => setDownloadOptions(!downloadOptions)}
          className={`action-button rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-105 ${
            downloadOptions
              ? mode === "dyslexia"
                ? "bg-amber-500 text-white"
                : mode === "adhd"
                ? "bg-blue-500 text-white"
                : "bg-purple-500 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
          }`}
          aria-label="Download course materials"
          title="Download course materials"
        >
          {downloadProgress !== null ? (
            <div className="relative w-6 h-6">
              <svg
                className="download-progress-ring animate-pulse"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle
                  className="download-progress-circle"
                  stroke={
                    mode === "dyslexia"
                      ? "#f59e0b" // amber-500
                      : mode === "adhd"
                      ? "#3b82f6" // blue-500
                      : "#8b5cf6" // purple-500
                  }
                  strokeWidth="3"
                  fill="transparent"
                  r="10"
                  cx="12"
                  cy="12"
                  style={{
                    strokeDasharray: "62.83",
                    strokeDashoffset: `${
                      62.83 - (downloadProgress / 100) * 62.83
                    }`,
                  }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                {downloadProgress}%
              </span>
            </div>
          ) : (
            <Download className="w-5 h-5" />
          )}
        </button>

        {/* Download Options */}
        {downloadOptions && (
          <div
            className={`download-options absolute bottom-14 right-0 w-48 p-2 rounded-lg shadow-xl transition-all duration-200 animate-fade-in ${
              mode === "dyslexia"
                ? "bg-amber-50 border border-amber-200"
                : mode === "adhd"
                ? "bg-blue-50 border border-blue-200"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-sm font-medium mb-2 px-2 pb-1 border-b">
              Download as:
            </div>
            <button
              onClick={() => handleDownloadCourse("pdf")}
              className={`w-full text-left px-3 py-2 text-sm rounded-md download-option transition-colors ${
                mode === "dyslexia"
                  ? "hover:bg-amber-100 text-amber-800"
                  : mode === "adhd"
                  ? "hover:bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              PDF Document
            </button>
            <button
              onClick={() => handleDownloadCourse("zip")}
              className={`w-full text-left px-3 py-2 text-sm rounded-md download-option transition-colors ${
                mode === "dyslexia"
                  ? "hover:bg-amber-100 text-amber-800"
                  : mode === "adhd"
                  ? "hover:bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              ZIP Archive
            </button>
            <button
              onClick={() => handleDownloadCourse("print")}
              className={`w-full text-left px-3 py-2 text-sm rounded-md download-option transition-colors ${
                mode === "dyslexia"
                  ? "hover:bg-amber-100 text-amber-800"
                  : mode === "adhd"
                  ? "hover:bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              Print Version
            </button>
          </div>
        )}
      </div>

      {/* Focus Mode Button - Available in all modes, but with different styling */}
      <button
        onClick={toggleFocusMode}
        className={`action-button rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 ${
          isFocusMode
            ? mode === "dyslexia"
              ? "bg-amber-500 text-white"
              : mode === "adhd"
              ? "bg-blue-500 text-white"
              : mode === "adaptive"
              ? "bg-indigo-500 text-white"
              : "bg-purple-500 text-white"
            : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
        } ${!isFocusMode && mode !== "normal" ? "pulse-animation" : ""}`}
        aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
        title={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
      >
        <Maximize2 className="w-5 h-5" />
      </button>

      {/* DYSLEXIA MODE SPECIFIC BUTTONS */}
      {mode === "dyslexia" && (
        <>
          {/* Text-to-speech toggle button - ONLY for dyslexia */}
          <div className="relative action-button-container">
            <button
              onClick={toggleAutoRead}
              className={`action-button rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 ${
                autoReadEnabled
                  ? "bg-amber-500 text-white"
                  : "bg-white text-amber-700 border border-amber-300 hover:border-amber-400"
              }`}
              aria-label={
                autoReadEnabled
                  ? "Disable text-to-speech"
                  : "Enable text-to-speech"
              }
              title={
                autoReadEnabled
                  ? "Disable text-to-speech"
                  : "Enable text-to-speech"
              }
            >
              <Volume2 className="w-5 h-5" />
            </button>
            {autoReadEnabled && (
              <div className="absolute -left-36 sm:-left-48 top-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-md animate-fade-in">
                Alt+S after selecting text
              </div>
            )}
          </div>

          {/* Font adjustments button - ONLY for dyslexia */}
          <button
            className="action-button rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 bg-white text-amber-700 border border-amber-300 hover:border-amber-400"
            aria-label="Adjust font settings"
            title="Adjust font settings"
            onClick={toggleFontAdjustment}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
          </button>
        </>
      )}

      {/* ADHD MODE SPECIFIC BUTTONS */}
      {mode === "adhd" && (
        <>
          {/* Timer tool - ONLY for ADHD */}
          <button
            className="action-button rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 bg-white text-blue-700 border border-blue-300 hover:border-blue-400"
            aria-label="Set timer"
            title="Set timer"
            onClick={toggleTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </button>

          {/* Progress tracker - ONLY for ADHD */}
          <button
            className="action-button rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 bg-white text-blue-700 border border-blue-300 hover:border-blue-400"
            aria-label="Track progress"
            title="Track progress"
            onClick={toggleProgressTracker}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default FloatingActionButtons;
