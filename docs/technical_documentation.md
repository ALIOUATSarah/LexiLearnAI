# LexiLearn AI - Technical Documentation

## Architecture Overview

LexiLearn AI is built using a modern web development stack with Next.js as the core framework. The application follows a component-based architecture with client-side rendering for interactive elements and server-side rendering for initial page loads.

### System Architecture

```
┌───────────────────────────────────────────────┐
│                  Client Layer                 │
│ (React Components, UI Elements, Client Logic) │
└───────────────┬───────────────────────────────┘
                │
┌───────────────▼───────────────────────────────┐
│              Application Layer                │
│  (Next.js Routes, Page Components, Layouts)   │
└───────────────┬───────────────────────────────┘
                │
┌───────────────▼───────────────────────────────┐
│               Business Layer                  │
│    (Adaptive Learning Logic, User Models)     │
└───────────────┬───────────────────────────────┘
                │
┌───────────────▼───────────────────────────────┐
│                 Data Layer                    │
│      (APIs, Data Storage, Data Models)        │
└───────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Technologies

- **Next.js 14**: React framework for building the application
  - App router for dynamic routing (`[id]` patterns for course pages)
  - Client components with `"use client"` directive
  - Layout components for consistent UI across pages
- **React 18**: UI library for building component-based interfaces

  - Functional components with hooks
  - useState and useEffect for state management
  - useCallback for performance optimization
  - useRef for DOM references

- **Tailwind CSS**: Utility-first CSS framework for styling

  - Custom color schemes for different learning modes
  - Responsive design implementation
  - Dynamic class generation based on mode settings

- **Radix UI**: Accessible UI component primitives
  - Used for tabs, buttons, and other interactive elements
  - Enhanced with custom styling
  - Implemented with accessibility in mind

### Data Visualization

- **Recharts**: React charting library for data visualization
  - Bar, Line, and Pie charts for performance metrics
  - Custom theming to match application design
  - Interactive elements for data exploration

### State Management

- **React Hooks**: For managing component and application state
  - Complex state management in course page components
  - Custom hooks for reusable logic (e.g., useTextToSpeech)
  - Context usage for theme and user preferences

## Core Components

### Adaptive Learning Modes

LexiLearn AI implements multiple learning modes to address diverse learning needs:

1. **Normal Mode**

   - Standard presentation with default styling
   - Base experience for general users

2. **Dyslexia Mode**

   - Custom font settings (spacing, size, family)
   - Text-to-speech functionality
   - Amber color scheme for reduced visual stress
   - Font adjustment panel for personalization

3. **ADHD Mode**

   - Focus mode to reduce distractions
   - Timer tools for time management
   - Progress tracking for motivation
   - Blue color scheme for calming effect

4. **Adaptive Mode**
   - Pattern detection for complex words
   - Word replacement for simplification
   - Sensory sensitivity controls
   - Visual adjustments for contrast and spacing

### Text-to-Speech Implementation

The platform includes a comprehensive text-to-speech feature implemented through a custom hook:

```javascript
// From hooks/use-text-to-speech.js
export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [autoReadEnabled, setAutoReadEnabled] = useState(false);

  const speak = useCallback((text, rate = 1) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Other functions and event listeners...

  return {
    speak,
    stop,
    speaking,
    setCurrentElement,
    currentElement,
    autoReadEnabled,
    setAutoReadEnabled,
  };
}
```

Key features include:

- Keyboard shortcut (Alt+S) for reading selected text
- Automatic reading of focused elements
- Speed adjustment for different learning modes
- Play/pause controls

### Pattern Detection and Word Replacement

The adaptive mode includes sophisticated algorithms for identifying complex language patterns:

```javascript
// From lib/course-utils.js
export const detectPatterns = (text, mode, sensitivityProfile) => {
  if (mode !== "adaptive") return text;

  try {
    // Complex pattern detection logic
    const complexPatterns = [
      /([a-z]{3,})ing\b/gi, // Words ending with 'ing'
      /\b([a-z]{3,})tion\b/gi, // Words ending with 'tion'
      /\b([a-z]{2,})([a-z]{2,})\2([a-z]*)\b/gi, // Words with repeated letter patterns
      /\b([a-z]{4,})\b/gi, // Longer words
      // Additional patterns...
    ];

    // Word replacement dictionary
    const wordReplacements = {
      subsequently: "later",
      consequently: "so",
      nevertheless: "still",
      // Additional replacements...
    };

    // Processing logic...
  } catch (err) {
    console.error("Error in pattern detection:", err);
    return text;
  }
};
```

This system:

- Identifies potentially challenging words and patterns
- Highlights complex language constructs
- Replaces difficult words with simpler alternatives
- Provides tooltips showing the original word

### Component Architecture

The course page is decomposed into modular components:

1. **CourseHeader**

   - Navigation and mode switching controls
   - Course title and information
   - Accessibility controls

2. **CourseTabNavigation**

   - Tab interface for content, materials, and notes
   - Visual indicators for active tab
   - Mode-specific styling

3. **ContentTabView**

   - Course content presentation
   - Section expansion/collapse functionality
   - Adaptive text processing

4. **MaterialsTabView**

   - Course materials display
   - Download functionality
   - Progress indicators

5. **NotesTabView**

   - Note taking and management
   - Auto-generation of study notes
   - Saving and retrieving functionality

6. **FloatingActionButtons**

   - Quick access to key functions
   - Download options
   - Focus mode toggle
   - Mode-specific tools

7. **AdaptiveControls**
   - Sensitivity settings for adaptive mode
   - Toggle controls for different features
   - Sensory break functionality

## Accessibility Features

LexiLearn AI implements numerous accessibility features:

### Keyboard Navigation

- Focus management for interactive elements
- Keyboard shortcuts for common actions (Alt+S for text-to-speech)
- Escape key handling for exiting focus mode

### Screen Reader Support

- Proper ARIA attributes for interactive elements
- Text alternatives for visual elements
- Semantic HTML structure

### Visual Customization

- Font size adjustment
- Letter and word spacing controls
- Color theme customization
- Contrast adjustment

### Mode-Specific Accommodations

- **Dyslexia Mode**: Specialized fonts, text spacing, and text-to-speech
- **ADHD Mode**: Focus tools, timers, and progress tracking
- **Adaptive Mode**: Content simplification and pattern highlighting

## State Management

### Course Page State

The course page manages complex state combinations:

```javascript
// From app/course/[id]/page.jsx
const [mode, setMode] = useState("normal");
const [expandedSection, setExpandedSection] = useState(null);
const [activeTab, setActiveTab] = useState("content");
const [isFocusMode, setIsFocusMode] = useState(false);
const [colorTheme, setColorTheme] = useState({
  dyslexia: { background: "amber", text: "gray-800" },
  adhd: { background: "blue", text: "gray-800" },
  adaptive: { background: "indigo", text: "gray-800" },
});
const [sensitivityProfile, setSensitivityProfile] = useState({
  textPatterns: false,
  animation: false,
  contrast: false,
  wordSpacing: false,
  fontWeight: false,
  wordReplacement: false,
});
// Additional state variables...
```

### Dashboard State Management

Both teacher and parent dashboards maintain state for:

- Active tabs and views
- Student or class data
- Performance metrics
- Learning mode preferences
- UI interactions (confirmations, notifications)

## User Interface Implementation

### Dynamic Mode Classes

The application applies different styling based on the active learning mode:

```javascript
// From lib/course-utils.js
export const getModeClasses = (mode, colorTheme) => {
  if (mode === "dyslexia") {
    const bg = colorTheme?.dyslexia?.background || "amber";
    return `dyslexia-mode bg-${bg}-50 dyslexia-fonts`;
  } else if (mode === "adhd") {
    const bg = colorTheme?.adhd?.background || "blue";
    return `adhd-mode bg-${bg}-50 adhd-focus`;
  } else if (mode === "adaptive") {
    const bg = colorTheme?.adaptive?.background || "indigo";
    return `adaptive-mode bg-${bg}-50 adaptive-sensory`;
  } else {
    return "normal-mode";
  }
};
```

### Focus Mode

The focus mode creates a distraction-free environment:

- Dims surrounding UI elements
- Centers content
- Provides escape mechanisms
- Maintains essential controls

### Dashboard Interfaces

The application includes specialized dashboards for different user roles:

1. **Teacher Dashboard**

   - Class performance overview
   - Individual student tracking
   - Mode effectiveness analysis
   - Intervention controls
   - Executive scaffolding tools

2. **Parent Dashboard**
   - Student progress monitoring
   - Learning mode performance analysis
   - Course completion tracking
   - Attendance records
   - Recommendations

## Data Models

### Course Data Model

The course data structure includes comprehensive information:

```javascript
// Simplified from lib/course-data.js
const courseData = {
  "course-id": {
    id: "course-id",
    title: "Course Title",
    code: "COURSE101",
    description: "Course description...",
    instructor: "Instructor Name",
    sections: [
      {
        id: "section-1",
        title: "Section Title",
        content: "Section content with HTML formatting...",
        materials: [
          {
            id: "material-1",
            title: "Material Title",
            type: "pdf", // or "video", "document", etc.
            url: "path/to/material",
            size: "2.5 MB",
          },
          // Additional materials...
        ],
      },
      // Additional sections...
    ],
  },
  // Additional courses...
};
```

### Student Model

The application uses a comprehensive student model (inferred from implementation):

```typescript
interface Student {
  id: string;
  name: string;
  progress: number;
  attendance: number;
  recommendedMode: "Normal" | "Dyslexia" | "ADHD";
  performance: number;
  needsHelp: boolean;
}
```
