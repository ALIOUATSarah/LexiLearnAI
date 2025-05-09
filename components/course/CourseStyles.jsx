import React from "react";

const CourseStyles = () => {
  return (
    <style jsx global>{`
      :root {
        --dyslexia-font-size: 100%;
        --dyslexia-letter-spacing: 0.05em;
        --dyslexia-line-height: 1.6;
        --dyslexia-font-family: "Arial", "Helvetica", sans-serif;
      }

      .dyslexia-font p,
      .dyslexia-font h1,
      .dyslexia-font h2,
      .dyslexia-font h3,
      .dyslexia-font span,
      .dyslexia-font li,
      .dyslexia-font button {
        font-family: var(--dyslexia-font-family);
        letter-spacing: var(--dyslexia-letter-spacing);
        word-spacing: 0.15em;
        line-height: var(--dyslexia-line-height);
        font-size: var(--dyslexia-font-size);
      }

      .dyslexia-highlight {
        background-color: rgba(254, 215, 170, 0.3); /* light amber background */
        border-radius: 4px;
        transition: background-color 0.2s ease;
        position: relative;
      }

      .adhd-friendly:focus-within {
        background-color: #f0f9ff;
      }

      .adhd-friendly .focus-element:hover,
      .adhd-friendly .focus-element:focus-within {
        transform: scale(1.01);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        transition: all 0.2s ease-in-out;
      }

      /* Adaptive Mode Styles */
      .adaptive-sensory .adaptive-control {
        position: fixed;
        right: 20px;
        top: 100px;
        background: white;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 50;
        border: 2px solid #4f46e5;
      }

      .adaptive-sensory .adaptive-slider {
        width: 100%;
        margin: 8px 0;
      }

      .adaptive-sensory .sensory-break-button {
        position: fixed;
        right: 20px;
        bottom: 100px;
        background: #4f46e5;
        color: white;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 50;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      /* Responsive adjustments for adaptive controls on mobile */
      @media (max-width: 640px) {
        .adaptive-sensory .adaptive-control {
          position: fixed;
          right: 10px;
          top: 70px;
          padding: 8px;
          max-width: 200px;
          font-size: 0.9rem;
        }

        .adaptive-sensory .sensory-break-button {
          right: 10px;
          bottom: 70px;
          width: 50px;
          height: 50px;
        }

        .focus-mode .main-content {
          max-width: 100%;
          margin: 0 10px;
          padding: 1rem;
        }
      }

      .adaptive-sensory .sensory-break-button:hover {
        transform: scale(1.1);
        background: #4338ca;
      }

      .adaptive-sensory .pattern-detected {
        position: relative;
        background-color: rgba(79, 70, 229, 0.1);
        border-radius: 4px;
        padding: 0 2px;
        border-bottom: 2px dotted #4f46e5;
        display: inline-block;
      }

      .adaptive-sensory .replaced-word {
        background-color: rgba(79, 70, 229, 0.08);
        border-radius: 4px;
        padding: 0 2px;
        border-bottom: 1px solid #4f46e5;
        color: #4f46e5;
        font-weight: 500;
        cursor: help;
        display: inline-block;
      }

      .adaptive-sensory.reduced-contrast {
        filter: contrast(0.9);
      }

      .adaptive-sensory.custom-word-spacing p,
      .adaptive-sensory.custom-word-spacing li {
        word-spacing: var(--word-spacing, 0.2em);
      }

      .adaptive-sensory.custom-weight p,
      .adaptive-sensory.custom-weight li {
        font-weight: var(--font-weight, 400);
      }

      /* Focus Mode Styles */
      .focus-mode .main-content {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.85);
        transition: all 0.5s ease;
      }

      .focus-mode.dyslexia-mode .main-content {
        background: #fffbeb; /* amber-50 */
      }

      .focus-mode.adhd-mode .main-content {
        background: #eff6ff; /* blue-50 */
      }

      .focus-mode.adaptive-mode .main-content {
        background: #eef2ff; /* indigo-50 */
      }

      .focus-mode header,
      .focus-mode footer,
      .focus-mode .sidebar,
      .focus-mode .distractions,
      .focus-mode nav {
        opacity: 0.2;
        filter: blur(1px);
        pointer-events: none;
        transition: all 0.3s ease;
      }

      .focus-mode header:hover,
      .focus-mode .sidebar:hover {
        opacity: 1;
        filter: blur(0);
        pointer-events: all;
      }

      /* Tooltip Styles */
      .custom-tooltip {
        position: fixed;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 14px;
        pointer-events: none;
        z-index: 9999;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        animation: fadeIn 0.2s ease;
      }

      /* Floating action buttons */
      .floating-action-buttons .action-button {
        transition: all 0.2s ease;
        opacity: 0.85;
      }

      .floating-action-buttons .action-button:hover {
        transform: scale(1.1);
        opacity: 1;
      }

      .floating-action-buttons .action-button.active {
        transform: scale(1.1);
        opacity: 1;
      }

      /* Responsive adjustments for floating buttons on mobile */
      @media (max-width: 640px) {
        .floating-action-buttons {
          bottom: 2px;
          right: 2px;
          flex-direction: column-reverse;
          gap: 8px;
        }

        .floating-action-buttons .action-button {
          transform: scale(0.9);
        }

        .floating-action-buttons .action-button.active {
          transform: scale(1);
        }

        .custom-tooltip {
          font-size: 12px;
          padding: 4px 8px;
          max-width: 80vw;
          white-space: normal;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }

      .pulse-animation {
        animation: pulse 1.5s infinite;
      }

      /* Download button styles */
      .download-progress-ring {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: all 0.2s ease;
      }

      .download-progress-circle {
        transition: stroke-dashoffset 0.3s ease;
      }

      .download-options {
        transform-origin: top right;
        animation: scaleIn 0.2s ease;
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .download-option {
        transition: all 0.2s ease;
      }

      .download-option:hover {
        transform: translateX(3px);
      }

      /* Timer toast animation */
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .animate-slideIn {
        animation: slideIn 0.3s ease forwards;
      }

      /* Global styles for the course page */
      .main-content {
        min-height: calc(100vh - 200px);
      }

      /* Focus mode styles */
      .focus-mode .main-content {
        max-width: 800px;
        margin: 0 auto;
      }

      .focus-mode .header-navigation,
      .focus-mode .tab-navigation {
        opacity: 0.2;
        transition: opacity 0.3s ease;
      }

      .focus-mode .header-navigation:hover,
      .focus-mode .tab-navigation:hover {
        opacity: 1;
      }

      /* Patterns detection styles */
      .pattern-detected {
        position: relative;
        background-color: rgba(255, 255, 150, 0.3);
        border-radius: 2px;
        padding: 0 2px;
        cursor: help;
      }

      /* Dyslexia mode styles */
      .dyslexia-mode .dyslexia-font {
        font-size: var(--dyslexia-font-size, 100%);
        letter-spacing: var(--dyslexia-letter-spacing, 0.05em);
        line-height: var(--dyslexia-line-height, 1.6);
      }

      /* ADHD mode styles */
      .adhd-progress-item {
        transition: background-color 0.3s ease;
      }

      .adhd-progress-item.completed {
        background-color: rgba(59, 130, 246, 0.1);
      }

      /* Download button progress ring */
      .download-progress-circle {
        transition: stroke-dashoffset 0.3s ease;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }

      /* Adaptive sensory modification styles */
      .adaptive-sensory.custom-word-spacing {
        word-spacing: var(--word-spacing, 0.2em);
      }

      .adaptive-sensory.custom-weight {
        font-weight: var(--font-weight, 500);
      }

      .adaptive-sensory.reduced-contrast {
        filter: contrast(90%);
      }

      /* Animation styles */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.3s ease forwards;
      }

      .pulse-animation {
        animation: pulse 2s infinite;
      }

      /* Transition styles */
      .action-button {
        transition: all 0.2s ease;
      }

      .tab-button {
        transition: all 0.3s ease;
      }

      /* Hide scrollbar utility */
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }

      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
      }

      /* Responsive improvements */
      @media (max-width: 640px) {
        .floating-action-buttons {
          bottom: 1rem;
          right: 1rem;
        }

        .adaptive-controls {
          right: 1rem;
          max-width: calc(100% - 2rem);
        }
      }
    `}</style>
  );
};

export default CourseStyles;
