import React from "react";
import { BookOpen, FileDown, FileText } from "lucide-react";

const CourseTabNavigation = ({ activeTab, setActiveTab, mode }) => {
  // Helper function to get mode-specific colors
  const getModeColors = () => {
    switch (mode) {
      case "dyslexia":
        return {
          active: "text-amber-900 border-b-2 border-amber-500 bg-amber-50",
          hover: "hover:text-amber-800 hover:bg-amber-50/50",
        };
      case "adhd":
        return {
          active: "text-blue-900 border-b-2 border-blue-500 bg-blue-50",
          hover: "hover:text-blue-800 hover:bg-blue-50/50",
        };
      case "adaptive":
        return {
          active: "text-indigo-900 border-b-2 border-indigo-500 bg-indigo-50",
          hover: "hover:text-indigo-800 hover:bg-indigo-50/50",
        };
      default:
        return {
          active: "text-blue-600 border-b-2 border-blue-600",
          hover: "hover:text-blue-500 hover:bg-gray-50",
        };
    }
  };

  const colors = getModeColors();

  return (
    <nav className="tab-navigation flex mb-6 border-b pb-1 overflow-x-auto hide-scrollbar">
      <button
        className={`tab-button px-3 sm:px-4 py-2 sm:py-3 font-medium rounded-t-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-${
          mode === "dyslexia" ? "amber" : mode === "adhd" ? "blue" : "indigo"
        }-500 ${
          activeTab === "content"
            ? colors.active
            : `text-gray-600 ${colors.hover}`
        }`}
        onClick={() => setActiveTab("content")}
        aria-selected={activeTab === "content"}
        role="tab"
        aria-controls="content-panel"
      >
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <BookOpen
            size={mode === "dyslexia" ? 22 : 18}
            className={activeTab === "content" ? "animate-fade-in" : ""}
          />
          <span
            className={mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"}
          >
            Course Content
          </span>
        </div>
      </button>
      <button
        className={`tab-button px-3 sm:px-4 py-2 sm:py-3 font-medium rounded-t-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-${
          mode === "dyslexia" ? "amber" : mode === "adhd" ? "blue" : "indigo"
        }-500 ${
          activeTab === "materials"
            ? colors.active
            : `text-gray-600 ${colors.hover}`
        }`}
        onClick={() => setActiveTab("materials")}
        aria-selected={activeTab === "materials"}
        role="tab"
        aria-controls="materials-panel"
      >
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <FileDown
            size={mode === "dyslexia" ? 22 : 18}
            className={activeTab === "materials" ? "animate-fade-in" : ""}
          />
          <span
            className={mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"}
          >
            Course Materials
          </span>
        </div>
      </button>
      <button
        className={`tab-button px-3 sm:px-4 py-2 sm:py-3 font-medium rounded-t-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-${
          mode === "dyslexia" ? "amber" : mode === "adhd" ? "blue" : "indigo"
        }-500 ${
          activeTab === "notes"
            ? colors.active
            : `text-gray-600 ${colors.hover}`
        }`}
        onClick={() => setActiveTab("notes")}
        aria-selected={activeTab === "notes"}
        role="tab"
        aria-controls="notes-panel"
      >
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <FileText
            size={mode === "dyslexia" ? 22 : 18}
            className={activeTab === "notes" ? "animate-fade-in" : ""}
          />
          <span
            className={mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"}
          >
            Study Notes
          </span>
        </div>
      </button>
    </nav>
  );
};

export default CourseTabNavigation;
