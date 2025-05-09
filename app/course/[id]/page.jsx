"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";

// Import our custom hooks
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

// Import course utilities
import { courseData } from "@/lib/course-data";
import { getModeClasses, getFileIcon } from "@/lib/course-utils";

// Import custom components
import CourseHeader from "@/components/course/CourseHeader";
import CourseTabNavigation from "@/components/course/CourseTabNavigation";
import ContentTabView from "@/components/course/ContentTabView";
import MaterialsTabView from "@/components/course/MaterialsTabView";
import NotesTabView from "@/components/course/NotesTabView";
import FloatingActionButtons from "@/components/course/FloatingActionButtons";
import AdaptiveControls from "@/components/course/AdaptiveControls";
import CustomTooltip from "@/components/course/CustomTooltip";
import CourseStyles from "@/components/course/CourseStyles";
import FontAdjustmentPanel from "@/components/course/FontAdjustmentPanel";
import TimerTool from "@/components/course/TimerTool";
import ProgressTracker from "@/components/course/ProgressTracker";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;

  // State variables
  const [mode, setMode] = useState("normal");
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);
  const [course, setCourse] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState({
    dyslexia: {
      background: "amber",
      text: "gray-800",
    },
    adhd: {
      background: "blue",
      text: "gray-800",
    },
    adaptive: {
      background: "indigo",
      text: "gray-800",
    },
  });
  const [sensitivityProfile, setSensitivityProfile] = useState({
    textPatterns: false,
    animation: false,
    contrast: false,
    wordSpacing: false,
    fontWeight: false,
    wordReplacement: false,
  });
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [downloadOptions, setDownloadOptions] = useState(false);
  const [showFontAdjustment, setShowFontAdjustment] = useState(false);
  const [showTimerTool, setShowTimerTool] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [fontSettings, setFontSettings] = useState({
    fontSize: 100,
    letterSpacing: 0.05,
    lineHeight: 1.6,
    fontFamily: "Arial",
  });

  // Refs
  const contentRef = useRef(null);
  const focusModeButtonRef = useRef(null);

  // Custom hooks
  const {
    speak,
    stop,
    speaking,
    setCurrentElement,
    currentElement,
    autoReadEnabled,
    setAutoReadEnabled,
  } = useTextToSpeech();

  // Function to speak text (memoized with useCallback)
  const speakText = useCallback(
    (text) => {
      if (!autoReadEnabled) return;
      speak(text, mode === "dyslexia" ? 0.9 : 1);
    },
    [speak, autoReadEnabled, mode]
  );

  // Function to update color themes
  const updateColorTheme = (modeType, bgColor, textColor) => {
    setColorTheme((prev) => ({
      ...prev,
      [modeType]: {
        background: bgColor,
        text: textColor,
      },
    }));
  };

  // Function to update sensitivity profile
  const updateSensitivityProfile = (key, value) => {
    setSensitivityProfile((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Apply special class handlers for certain settings
    if (key === "wordSpacing" && value) {
      document.documentElement.style.setProperty("--word-spacing", "0.2em");
      document
        .querySelector(".adaptive-sensory")
        ?.classList.add("custom-word-spacing");
    } else if (key === "wordSpacing" && !value) {
      document
        .querySelector(".adaptive-sensory")
        ?.classList.remove("custom-word-spacing");
    }

    if (key === "fontWeight" && value) {
      document.documentElement.style.setProperty("--font-weight", "500");
      document
        .querySelector(".adaptive-sensory")
        ?.classList.add("custom-weight");
    } else if (key === "fontWeight" && !value) {
      document
        .querySelector(".adaptive-sensory")
        ?.classList.remove("custom-weight");
    }

    if (key === "contrast" && value) {
      document
        .querySelector(".adaptive-sensory")
        ?.classList.add("reduced-contrast");
    } else if (key === "contrast" && !value) {
      document
        .querySelector(".adaptive-sensory")
        ?.classList.remove("reduced-contrast");
    }
  };

  // Toggle focus mode
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  // Toggle auto-read
  const toggleAutoRead = () => {
    setAutoReadEnabled(!autoReadEnabled);
    if (!autoReadEnabled) {
      // Starting auto-read
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        if (paragraphs.length > 0) {
          const firstParagraph = paragraphs[0];
          setCurrentElement(firstParagraph);
          speakText(firstParagraph.textContent);
        }
      }
    } else {
      // Stopping auto-read
      stop();
      setCurrentElement(null);
    }
  };

  // Handle downloading course materials
  const handleDownloadCourse = (format) => {
    setDownloadOptions(false);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadProgress(null), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Handle downloading a single material
  const handleDownloadMaterial = (material) => {
    setDownloadProgress({
      id: material.id,
      progress: 0,
    });

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadProgress(null), 500);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 300);
  };

  // Toggle font adjustment panel
  const toggleFontAdjustment = () => {
    setShowFontAdjustment(!showFontAdjustment);
  };

  // Toggle timer tool
  const toggleTimer = () => {
    setShowTimerTool(!showTimerTool);
  };

  // Toggle progress tracker
  const toggleProgressTracker = () => {
    setShowProgressTracker(!showProgressTracker);
  };

  // Apply font settings
  const applyFontSettings = (settings) => {
    setFontSettings(settings);

    // Apply font settings to the document
    const root = document.documentElement;
    root.style.setProperty("--dyslexia-font-size", `${settings.fontSize}%`);
    root.style.setProperty(
      "--dyslexia-letter-spacing",
      `${settings.letterSpacing}em`
    );
    root.style.setProperty("--dyslexia-line-height", settings.lineHeight);

    // Apply font family
    document.querySelectorAll(".dyslexia-font").forEach((el) => {
      el.style.fontFamily = settings.fontFamily;
    });
  };

  // Set up event listeners
  useEffect(() => {
    // Handle escape key press for focus mode
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isFocusMode) {
        setIsFocusMode(false);
      }
    };

    // Handle mouse over events for tooltips
    const handleMouseOver = (e) => {
      if (mode === "adaptive" && sensitivityProfile.wordReplacement) {
        const target = e.target;
        if (
          target.classList?.contains("replaced-word") ||
          target.classList?.contains("pattern-detected")
        ) {
          const title = target.getAttribute("title");
          if (title) {
            setTooltipText(title);
            const rect = target.getBoundingClientRect();
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.top - 30,
            });
            setShowTooltip(true);
          }
        }
      }
    };

    // Handle mouse out events for tooltips
    const handleMouseOut = (e) => {
      if (
        e.target.classList?.contains("replaced-word") ||
        e.target.classList?.contains("pattern-detected")
      ) {
        setShowTooltip(false);
      }
    };

    // Auto-read functionality for dyslexia mode
    const handleElementFocus = (e) => {
      if (!autoReadEnabled || mode !== "dyslexia") return;

      const focusableElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li"];
      const target = e.target;

      if (
        target.tagName &&
        focusableElements.includes(target.tagName.toLowerCase())
      ) {
        setCurrentElement(target);
        speakText(target.textContent);
      }
    };

    // Add event listeners
    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("focusin", handleElementFocus);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("focusin", handleElementFocus);

      // Clean up speech synthesis when component unmounts
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [
    isFocusMode,
    mode,
    autoReadEnabled,
    sensitivityProfile,
    speakText,
    setCurrentElement,
  ]);

  // Alt+S keyboard shortcut handling
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "s" && autoReadEnabled) {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          console.log("Speaking text:", selectedText);
          speakText(selectedText);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [autoReadEnabled, speakText]);

  // Initialize course data
  useEffect(() => {
    if (courseId && courseData[courseId]) {
      setCourse(courseData[courseId]);
    } else {
      router.push("/lessons");
    }
  }, [courseId, router]);

  // Render loading state if course data is not yet available
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`${getModeClasses(mode, colorTheme)} ${
        isFocusMode ? "focus-mode" : ""
      }`}
    >
      {/* Global styles for the course page */}
      <CourseStyles />

      {/* Header */}
      <CourseHeader
        mode={mode}
        setMode={setMode}
        course={course}
        toggleFocusMode={toggleFocusMode}
        isFocusMode={isFocusMode}
        toggleAutoRead={toggleAutoRead}
        autoReadEnabled={autoReadEnabled}
        focusModeButtonRef={focusModeButtonRef}
      />

      {/* Main content */}
      <main
        className="container mx-auto px-4 py-8 main-content"
        ref={contentRef}
      >
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-bold ${
                mode === "dyslexia" ? "font-sans tracking-wide" : ""
              }`}
            >
              {course?.title}
            </h1>
            <p
              className={`text-gray-500 ${
                mode === "dyslexia"
                  ? "text-lg leading-relaxed tracking-wide mt-2"
                  : "mt-1"
              }`}
            >
              Course Code: {course?.code}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <CourseTabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mode={mode}
        />

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "content" && (
            <ContentTabView
              course={course}
              mode={mode}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
              sensitivityProfile={sensitivityProfile}
              getFileIcon={(type) => getFileIcon(type, Icons)}
            />
          )}

          {activeTab === "materials" && (
            <MaterialsTabView
              course={course}
              mode={mode}
              downloadProgress={downloadProgress}
              handleDownloadMaterial={handleDownloadMaterial}
            />
          )}

          {activeTab === "notes" && (
            <NotesTabView
              mode={mode}
              courseCode={course.code}
              course={course}
            />
          )}
        </div>
      </main>

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        mode={mode}
        isFocusMode={isFocusMode}
        toggleFocusMode={toggleFocusMode}
        autoReadEnabled={autoReadEnabled}
        toggleAutoRead={toggleAutoRead}
        downloadProgress={downloadProgress}
        downloadOptions={downloadOptions}
        setDownloadOptions={setDownloadOptions}
        handleDownloadCourse={handleDownloadCourse}
        toggleFontAdjustment={toggleFontAdjustment}
        toggleTimer={toggleTimer}
        toggleProgressTracker={toggleProgressTracker}
      />

      {/* Adaptive Mode Controls */}
      <AdaptiveControls
        mode={mode}
        sensitivityProfile={sensitivityProfile}
        updateSensitivityProfile={updateSensitivityProfile}
      />

      {/* Custom Tooltip */}
      <CustomTooltip
        showTooltip={showTooltip}
        tooltipText={tooltipText}
        tooltipPosition={tooltipPosition}
        mode={mode}
      />

      {/* Font Adjustment Panel - for Dyslexia Mode */}
      <FontAdjustmentPanel
        isOpen={showFontAdjustment}
        onClose={toggleFontAdjustment}
        applyFontSettings={applyFontSettings}
      />

      {/* Timer Tool - for ADHD Mode */}
      <TimerTool isOpen={showTimerTool} onClose={toggleTimer} />

      {/* Progress Tracker - for ADHD Mode */}
      <ProgressTracker
        isOpen={showProgressTracker}
        onClose={toggleProgressTracker}
        course={course}
      />
    </div>
  );
}
