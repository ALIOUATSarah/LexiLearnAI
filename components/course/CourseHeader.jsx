import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Maximize2, Volume2 } from "lucide-react";
import Logo from "@/components/Logo";

const CourseHeader = ({
  mode,
  setMode,
  course,
  toggleFocusMode,
  isFocusMode,
  toggleAutoRead,
  autoReadEnabled,
  focusModeButtonRef,
}) => {
  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full sm:w-auto mb-3 sm:mb-0">
          <div className="flex items-center">
            <Link
              href="/lessons"
              className="text-gray-500 hover:text-gray-700 mr-2"
              aria-label="Back to lessons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <Logo mode={mode} size="sm" />
          </div>

          {/* Mobile mode dropdown */}
          <div className="sm:hidden">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="p-1.5 border rounded-md text-xs"
            >
              <option value="normal">Standard Mode</option>
              <option value="dyslexia">Dyslexia Mode</option>
              <option value="adhd">ADHD Mode</option>
              <option value="adaptive">Adaptive Mode</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          {/* Desktop-only mode switcher */}
          <div className="hidden sm:flex items-center mr-2">
            <span className="text-sm text-gray-500 mr-2">Mode:</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={mode === "normal" ? "default" : "outline"}
                onClick={() => setMode("normal")}
                className="h-8 text-xs"
              >
                Standard
              </Button>
              <Button
                size="sm"
                variant={mode === "dyslexia" ? "default" : "outline"}
                onClick={() => setMode("dyslexia")}
                className="h-8 text-xs"
              >
                Dyslexia
              </Button>
              <Button
                size="sm"
                variant={mode === "adhd" ? "default" : "outline"}
                onClick={() => setMode("adhd")}
                className="h-8 text-xs"
              >
                ADHD
              </Button>
              <Button
                size="sm"
                variant={mode === "adaptive" ? "default" : "outline"}
                onClick={() => setMode("adaptive")}
                className="h-8 text-xs"
              >
                Adaptive
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFocusMode}
              ref={focusModeButtonRef}
              className="h-8 text-xs sm:text-sm px-1 sm:px-2"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
              <span>Focus</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoRead}
              className={`h-8 text-xs sm:text-sm px-1 sm:px-2 ${
                autoReadEnabled ? "bg-blue-50 border-blue-300" : ""
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden xs:inline">Auto-Read</span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 text-xs sm:text-sm px-1 sm:px-2"
            >
              <Link href="/student-dashboard">
                <span>Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
