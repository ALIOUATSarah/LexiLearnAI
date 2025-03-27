"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Volume2,
  FileText,
  Download,
  FileDown,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Play,
  Maximize2,
  Info,
  Clock,
  Lightbulb,
  Layers,
  Mouse,
  Code,
  List,
  Target,
  LightbulbIcon,
  Check,
  ChevronDown,
  Files as FilesIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Logo from "@/app/components/Logo";

// Add this custom hook before the main component
function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [autoReadEnabled, setAutoReadEnabled] = useState(false);

  const speak = (text, rate = 1) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.log("Text-to-speech not supported in this browser");
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
  };

  const stop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

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

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
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
  const {
    speak,
    stop,
    speaking,
    setCurrentElement,
    currentElement,
    autoReadEnabled,
    setAutoReadEnabled,
  } = useTextToSpeech();
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
  const contentRef = useRef(null);
  const focusModeButtonRef = useRef(null);
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [downloadOptions, setDownloadOptions] = useState(false);

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

  // Updated getModeClasses function to use dynamic colors
  const getModeClasses = () => {
    if (mode === "dyslexia") {
      const bg = colorTheme.dyslexia.background;
      return `dyslexia-mode bg-${bg}-50 dyslexia-fonts`;
    } else if (mode === "adhd") {
      const bg = colorTheme.adhd.background;
      return `adhd-mode bg-${bg}-50 adhd-focus`;
    } else if (mode === "adaptive") {
      const bg = colorTheme.adaptive.background;
      return `adaptive-mode bg-${bg}-50 adaptive-sensory`;
    } else {
      return "normal-mode";
    }
  };

  // Define speakText function before the useEffect hook
  const speakText = (text) => {
    speak(text, mode === "dyslexia" ? 0.9 : 1);
  };

  // Add pattern detection function for adaptive mode
  const detectPatterns = (text) => {
    if (mode !== "adaptive") return text;

    try {
      // Create a temporary div to sanitize the input first
      const tempDiv = document.createElement("div");
      tempDiv.textContent = text; // This safely escapes any HTML in the text
      const sanitizedText = tempDiv.textContent;

      // More sophisticated pattern detection logic
      const complexPatterns = [
        /([a-z]{3,})ing\b/gi, // Words ending with 'ing'
        /\b([a-z]{3,})tion\b/gi, // Words ending with 'tion'
        /\b([a-z]{2,})([a-z]{2,})\2([a-z]*)\b/gi, // Words with repeated letter patterns
        /\b([a-z]{4,})\b/gi, // Longer words
        /\b(simultaneous|characteristic|phenomenon|consequently|extraordinary|nevertheless|approximately|immediately|particularly|representation|circumstances|substantially|effectiveness|comprehensive|significantly|approximately|coordination|inappropriate|unfortunately|underestimated)\b/gi, // Specifically difficult words
        /\b([a-z]{3,}ph[a-z]{2,})\b/gi, // Words with 'ph' combination
        /\b([a-z]*[aeiou]{3,}[a-z]*)\b/gi, // Words with 3+ consecutive vowels
        /\b([a-z]*th[aeiou][a-z]*)\b/gi, // Words with 'th' followed by a vowel
        /\b([bcdfghjklmnpqrstvwxyz]{3,}[aeiou])/gi, // Words starting with 3+ consonants
      ];

      // Create a map of difficult words and simpler alternatives
      const wordReplacements = {
        subsequently: "later",
        consequently: "so",
        nevertheless: "still",
        approximately: "about",
        immediately: "now",
        particularly: "especially",
        representation: "image",
        circumstances: "conditions",
        substantially: "greatly",
        effectiveness: "success",
        comprehensive: "complete",
        significantly: "greatly",
        coordination: "connection",
        inappropriate: "wrong",
        unfortunately: "sadly",
        underestimated: "missed",
        phenomenon: "event",
        sufficient: "enough",
        facilitate: "help",
        fundamental: "basic",
        demonstrate: "show",
        essentially: "basically",
        perspective: "view",
        preliminary: "early",
        comparable: "similar",
        eventually: "finally",
      };

      // Safer approach - work with string segments to avoid double processing
      let result = sanitizedText;
      let segments = [{ text: result, isHighlighted: false }];
      let newSegments = [];

      // First apply word replacements
      if (sensitivityProfile.wordReplacement) {
        for (const [difficult, simple] of Object.entries(wordReplacements)) {
          newSegments = [];
          const regex = new RegExp(`\\b${difficult}\\b`, "gi");

          for (const segment of segments) {
            if (segment.isHighlighted) {
              newSegments.push(segment); // Don't process already highlighted segments
              continue;
            }

            let lastIndex = 0;
            let match;
            let segmentText = segment.text;

            while ((match = regex.exec(segmentText)) !== null) {
              // Add text before the match
              if (match.index > lastIndex) {
                newSegments.push({
                  text: segmentText.substring(lastIndex, match.index),
                  isHighlighted: false,
                });
              }

              // Add the replaced word
              newSegments.push({
                text: `<span class="replaced-word" title="Original: ${difficult}">${simple}</span>`,
                isHighlighted: true,
              });

              lastIndex = regex.lastIndex;
            }

            // Add the remaining text
            if (lastIndex < segmentText.length) {
              newSegments.push({
                text: segmentText.substring(lastIndex),
                isHighlighted: false,
              });
            }
          }

          segments = newSegments;
        }
      }

      // Then apply pattern highlighting
      if (sensitivityProfile.textPatterns) {
        for (const pattern of complexPatterns) {
          newSegments = [];

          for (const segment of segments) {
            if (segment.isHighlighted) {
              newSegments.push(segment); // Don't process already highlighted segments
              continue;
            }

            let lastIndex = 0;
            let match;
            let segmentText = segment.text;
            pattern.lastIndex = 0; // Reset regex state

            while ((match = pattern.exec(segmentText)) !== null) {
              // Add text before the match
              if (match.index > lastIndex) {
                newSegments.push({
                  text: segmentText.substring(lastIndex, match.index),
                  isHighlighted: false,
                });
              }

              // Add the highlighted pattern
              newSegments.push({
                text: `<span class="pattern-detected">${match[0]}</span>`,
                isHighlighted: true,
              });

              lastIndex = pattern.lastIndex;
            }

            // Add the remaining text
            if (lastIndex < segmentText.length) {
              newSegments.push({
                text: segmentText.substring(lastIndex),
                isHighlighted: false,
              });
            }
          }

          segments = newSegments;
        }
      }

      // Combine all segments back into a single string
      result = segments.map((segment) => segment.text).join("");

      return result;
    } catch (err) {
      console.error("Error in pattern detection:", err);
      return text; // Return original text if there's an error
    }
  };

  // Add function to apply sensory break
  const applySensoryBreak = () => {
    // Simplified version that removes detected patterns temporarily
    const patterns = document.querySelectorAll(".pattern-detected");
    patterns.forEach((el) => {
      el.classList.remove("pattern-detected");
    });

    // Apply reduced contrast
    document
      .querySelector(".adaptive-sensory")
      ?.classList.add("reduced-contrast");

    // After 10 seconds, restore normal state
    setTimeout(() => {
      document
        .querySelector(".adaptive-sensory")
        ?.classList.remove("reduced-contrast");
    }, 10000);
  };

  // Update sensitivity profile
  const updateSensitivityProfile = (key, value) => {
    setSensitivityProfile((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Apply appropriate CSS variables or classes
    const root = document.documentElement;

    if (key === "wordSpacing") {
      if (value) {
        document
          .querySelector(".adaptive-sensory")
          ?.classList.add("custom-word-spacing");
        root.style.setProperty("--word-spacing", "0.2em");
      } else {
        document
          .querySelector(".adaptive-sensory")
          ?.classList.remove("custom-word-spacing");
      }
    }

    if (key === "fontWeight") {
      if (value) {
        document
          .querySelector(".adaptive-sensory")
          ?.classList.add("custom-weight");
        root.style.setProperty("--font-weight", "500");
      } else {
        document
          .querySelector(".adaptive-sensory")
          ?.classList.remove("custom-weight");
      }
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

  // Course data (would come from API in a real app)
  const courseData = {
    physics101: {
      title: "Physics 101: Mechanics and Motion",
      code: "PHY101",
      description:
        "A comprehensive introduction to classical mechanics, forces, motion, and energy - the foundation of physics.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Physics",
          content:
            "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines, with its main goal being to understand how the universe behaves. This lesson explores the scientific method, physical quantities, and measurement systems that form the foundation of all physics studies.",
          sections: [
            "The Scientific Method: Observation, hypothesis formation, experimentation, analysis, and theory development",
            "SI Units and Measurement: Length (meters), time (seconds), mass (kilograms), and derived units",
            "Dimensional Analysis: Ensuring mathematical consistency in physical equations and problem-solving",
            "History of Physics: From Aristotle and Galileo to Newton and Einstein - the evolution of our understanding of physical laws",
          ],
          materials: [
            {
              id: 1,
              title: "Lecture Slides - Introduction to Physics",
              type: "slides",
              url: "#",
              downloadUrl: "/downloads/physics101_intro_slides.pdf",
              completed: true,
            },
            {
              id: 2,
              title: "Physics Fundamentals - Reading Material",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/physics101_fundamentals.pdf",
              completed: true,
            },
            {
              id: 3,
              title: "Introduction Video: The Nature of Physics",
              type: "video",
              url: "#",
              previewImage: "/images/physics_intro_preview.jpg",
              duration: "18:35",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Newton's Laws of Motion",
          content:
            "Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws have been verified by countless experiments and observations over centuries and remain fundamental to our understanding of the physical world. This lesson provides a detailed explanation of each law, with real-world applications and mathematical formulations.",
          sections: [
            "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force. Examples: seat belts, tablecloth trick, space motion.",
            "Second Law (F = ma): The vector sum of the forces F on an object is equal to the mass m of that object multiplied by the acceleration a of the object. Applications: rocket propulsion, car acceleration, elevator motion.",
            "Third Law (Action-Reaction): For every action, there is an equal and opposite reaction. Illustrations: rocket propulsion, walking mechanics, recoil in firearms.",
            "Practical Applications: Engineering design principles, sports biomechanics, transportation systems, and everyday phenomena explained by Newton's laws.",
          ],
          materials: [
            {
              id: 4,
              title: "Newton's Laws - Interactive Presentation",
              type: "slides",
              url: "#",
              downloadUrl: "/downloads/newtons_laws_interactive.pptx",
              completed: false,
            },
            {
              id: 5,
              title: "Newton's Laws - Problem Set with Solutions",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/newton_laws_problems.pdf",
              completed: false,
            },
            {
              id: 6,
              title: "Video Demonstrations: Newton's Laws in Action",
              type: "video",
              url: "#",
              previewImage: "/images/newton_laws_demo.jpg",
              duration: "24:12",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Energy and Work",
          content:
            "Energy is one of the most fundamental concepts in physics, existing in many forms such as kinetic, potential, thermal, and electromagnetic. This lesson explores the relationship between energy and work, the conservation of energy principle, and how energy transformations drive virtually all natural and technological processes. Through mathematical derivations and practical examples, you'll understand how energy analysis provides powerful insights into physical systems.",
          sections: [
            "Work and Energy Defined: Mathematical relationship (W = F·d·cosθ), positive and negative work, joules as units",
            "Kinetic Energy: Energy of motion (KE = ½mv²), examples in transportation, sports, and ballistics",
            "Potential Energy: Gravitational potential energy (PE = mgh), elastic potential energy (PE = ½kx²), chemical and nuclear potential energy",
            "Conservation of Energy: The principle that energy cannot be created or destroyed, only transformed; applications in engineering design and natural systems",
            "Power: Rate of energy transfer or work done (P = W/t), measured in watts, applications in engines, electronics, and human performance",
          ],
          materials: [
            {
              id: 7,
              title: "Energy and Work - Comprehensive Lecture Notes",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/energy_work_notes.pdf",
              completed: false,
            },
            {
              id: 8,
              title:
                "Energy Calculations - Practice Problems with Step-by-Step Solutions",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/energy_practice_problems.pdf",
              completed: false,
            },
            {
              id: 9,
              title: "Energy Transformations - Interactive Simulation",
              type: "interactive",
              url: "/simulations/energy-transformations",
              completed: false,
            },
          ],
        },
      ],
      quizData: {
        title: "Physics 101 Midterm Assessment",
        timeLimit: 45, // minutes
        passingScore: 70,
        questions: [
          {
            id: 1,
            question:
              "Which of Newton's laws states that an object at rest will remain at rest unless acted upon by an external force?",
            options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
            correctAnswer: "First Law",
            explanation:
              "Newton's First Law, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
          },
          {
            id: 2,
            question:
              "If a 2 kg object experiences a net force of 10 N, what is its acceleration?",
            options: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²"],
            correctAnswer: "5 m/s²",
            explanation:
              "Using Newton's Second Law (F = ma), we can calculate: a = F/m = 10 N / 2 kg = 5 m/s²",
          },
        ],
      },
    },
    math201: {
      title: "Mathematics 201: Calculus & Differential Equations",
      code: "MAT201",
      description:
        "Advanced calculus techniques and their applications in solving differential equations for science and engineering problems.",
      lessons: [
        {
          id: 1,
          title: "Functions and Limits",
          content:
            "Functions and limits form the conceptual foundation of calculus. This lesson explores the precise mathematical definition of limits, techniques for evaluating them, and how they connect to the continuity of functions. Understanding these concepts is essential for developing the derivative and integral calculus that follows. We'll examine various function types and their limit behavior, including special cases and indeterminate forms.",
          sections: [
            "Function fundamentals: Domain, range, representations (algebraic, graphical, numerical, verbal), and key function families",
            "Limit concept: Informal and formal (ε-δ) definitions, one-sided limits, limits at infinity, and infinite limits",
            "Limit evaluation techniques: Direct substitution, factoring, rationalization, and L'Hôpital's rule",
            "Continuity: Definition, types of discontinuities, and the Intermediate Value Theorem with applications",
            "Asymptotic behavior: Vertical and horizontal asymptotes, end behavior of functions",
          ],
          materials: [
            {
              id: 10,
              title: "Functions and Limits - Comprehensive Lecture Slides",
              type: "slides",
              url: "#",
              downloadUrl: "/downloads/functions_limits_slides.pdf",
              completed: true,
            },
            {
              id: 11,
              title: "Limits Workbook with Solved Examples",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/limits_workbook.pdf",
              completed: true,
            },
            {
              id: 12,
              title: "Video Lecture: Mastering Limits and Continuity",
              type: "video",
              url: "#",
              previewImage: "/images/limits_lecture.jpg",
              duration: "32:45",
              completed: false,
            },
            {
              id: 13,
              title: "Interactive Limit Explorer Tool",
              type: "interactive",
              url: "/tools/limit-explorer",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Derivatives and Differentiation",
          content:
            "The derivative represents the rate of change of a function and is one of the two main concepts in calculus. This lesson covers the definition of the derivative, differentiation rules, and applications of derivatives in various fields. We'll develop both the conceptual understanding and computational skills needed to apply derivatives to real-world problems.",
          sections: [
            "Definition of the derivative: As a limit of the difference quotient, slope of the tangent line, and instantaneous rate of change",
            "Differentiation rules: Power rule, product rule, quotient rule, chain rule, and implicit differentiation",
            "Derivatives of transcendental functions: Trigonometric, exponential, logarithmic, and inverse functions",
            "Higher-order derivatives: Meaning and applications in physics (velocity, acceleration, jerk) and other fields",
            "Applications: Related rates, optimization problems, linear approximation, and L'Hôpital's rule",
          ],
          materials: [
            {
              id: 14,
              title: "Differentiation Techniques - Comprehensive Guide",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/differentiation_guide.pdf",
              completed: false,
            },
            {
              id: 15,
              title:
                "Derivatives Practice Problems with Step-by-Step Solutions",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/derivatives_practice.pdf",
              completed: false,
            },
            {
              id: 16,
              title: "Derivative Applications - Interactive Demonstrations",
              type: "interactive",
              url: "/tools/derivative-applications",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Integration and Differential Equations",
          content:
            "Integration is the second fundamental concept of calculus, representing accumulation and area under curves. This lesson connects integration to antiderivatives, develops integration techniques, and introduces ordinary differential equations. You'll learn how these powerful mathematical tools model and solve problems in physics, engineering, economics, and other fields.",
          sections: [
            "Definite and indefinite integrals: Definitions, properties, and the Fundamental Theorem of Calculus",
            "Integration techniques: Substitution, integration by parts, partial fractions, and trigonometric substitutions",
            "Applications of integration: Area, volume, arc length, surface area, and physical applications",
            "Ordinary differential equations: First-order separable equations, linear equations, and applications",
            "Systems modeling: Using differential equations to model population growth, heating/cooling, and mechanical systems",
          ],
          materials: [
            {
              id: 17,
              title: "Integration Techniques - Comprehensive Reference",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/integration_techniques.pdf",
              completed: false,
            },
            {
              id: 18,
              title: "Differential Equations - Worked Examples and Solutions",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/differential_equations_examples.pdf",
              completed: false,
            },
            {
              id: 19,
              title: "Interactive Differential Equation Solver",
              type: "interactive",
              url: "/tools/differential-equation-solver",
              completed: false,
            },
          ],
        },
      ],
      quizData: {
        title: "Calculus Midterm Assessment",
        timeLimit: 60, // minutes
        passingScore: 75,
        questions: [
          {
            id: 1,
            question: "Find the derivative of f(x) = x³sin(x)",
            options: [
              "3x²sin(x) + x³cos(x)",
              "3x²sin(x) - x³cos(x)",
              "3x²sin(x)",
              "x³cos(x)",
            ],
            correctAnswer: "3x²sin(x) + x³cos(x)",
            explanation:
              "Using the product rule: f'(x) = (x³)'sin(x) + x³(sin(x))' = 3x²sin(x) + x³cos(x)",
          },
          {
            id: 2,
            question: "Evaluate the limit: lim(x→0) (sin(3x)/x)",
            options: ["0", "1", "3", "∞"],
            correctAnswer: "3",
            explanation:
              "Using the limit property lim(x→0) sin(x)/x = 1, we have: lim(x→0) sin(3x)/x = lim(x→0) 3(sin(3x)/3x) = 3 × 1 = 3",
          },
        ],
      },
    },
    cs301: {
      title: "Computer Science 301: Data Structures & Algorithms",
      code: "CS301",
      description:
        "Advanced data structures, algorithm design techniques, and complexity analysis for efficient problem-solving.",
      lessons: [
        {
          id: 1,
          title: "Algorithm Analysis and Complexity",
          content:
            "Algorithm analysis involves evaluating the efficiency of algorithms in terms of time (how long it takes to run) and space (how much memory it requires). This lesson covers asymptotic notation (Big O, Omega, Theta), complexity classes, and techniques for analyzing iterative and recursive algorithms. Understanding algorithm complexity is essential for designing efficient solutions to computational problems.",
          sections: [
            "Asymptotic Analysis: Big O, Omega, and Theta notations for expressing algorithm efficiency",
            "Time Complexity: Analyzing operations count and execution time across different input sizes",
            "Space Complexity: Evaluating memory usage requirements and optimization techniques",
            "Complexity Classes: Constant, logarithmic, linear, polynomial, exponential, and factorial complexities",
            "Amortized Analysis: Evaluating performance over a sequence of operations rather than worst-case individual operations",
          ],
          materials: [
            {
              id: 20,
              title: "Algorithm Analysis - Comprehensive Guide",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/algorithm_analysis.pdf",
              completed: true,
            },
            {
              id: 21,
              title: "Complexity Analysis Video Lecture",
              type: "video",
              url: "#",
              previewImage: "/images/complexity_analysis.jpg",
              duration: "28:15",
              completed: true,
            },
            {
              id: 22,
              title: "Algorithm Analysis Practice Problems",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/algorithm_problems.pdf",
              completed: false,
            },
            {
              id: 23,
              title: "Algorithm Visualization Tool",
              type: "interactive",
              url: "/tools/algorithm-visualizer",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Advanced Data Structures",
          content:
            "Data structures are specialized formats for organizing, processing, retrieving, and storing data. This lesson covers advanced data structures beyond the basics, focusing on their implementation, operations, and appropriate use cases. You'll learn how to select and utilize the right data structure to optimize algorithm performance for specific problem domains.",
          sections: [
            "Self-balancing Trees: AVL trees, Red-Black trees, and B-trees for maintaining logarithmic operations",
            "Hash Tables: Advanced hashing techniques, collision resolution, and perfect hashing",
            "Heaps and Priority Queues: Binary heaps, Fibonacci heaps, and applications in graph algorithms",
            "Graph Representations: Adjacency matrices, adjacency lists, and specialized structures for efficient graph operations",
            "Advanced String Data Structures: Tries, suffix trees/arrays, and their applications in text processing",
          ],
          materials: [
            {
              id: 24,
              title: "Advanced Data Structures - Technical Reference",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/advanced_data_structures.pdf",
              completed: false,
            },
            {
              id: 25,
              title:
                "Data Structure Implementation Examples in Multiple Languages",
              type: "code",
              url: "#",
              downloadUrl: "/downloads/data_structures_implementations.zip",
              completed: false,
            },
            {
              id: 26,
              title: "Interactive Data Structure Visualizer",
              type: "interactive",
              url: "/tools/data-structure-visualizer",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Algorithm Design Paradigms",
          content:
            "Algorithm design paradigms are general approaches to solving algorithmic problems. This lesson explores common paradigms that provide frameworks for developing efficient algorithms across different problem domains. Understanding these paradigms helps in recognizing patterns in problems and applying proven solution strategies.",
          sections: [
            "Divide and Conquer: Breaking problems into subproblems, solving them independently, and combining results",
            "Dynamic Programming: Solving complex problems by breaking them down into simpler overlapping subproblems",
            "Greedy Algorithms: Making locally optimal choices at each stage with the hope of finding a global optimum",
            "Backtracking: Building solutions incrementally and abandoning solutions that fail to satisfy constraints",
            "Randomized Algorithms: Using random numbers to determine the next step in computation for improved average-case performance",
          ],
          materials: [
            {
              id: 27,
              title: "Algorithm Design Paradigms - Comprehensive Guide",
              type: "reading",
              url: "#",
              downloadUrl: "/downloads/algorithm_design_paradigms.pdf",
              completed: false,
            },
            {
              id: 28,
              title:
                "Case Studies: Algorithm Design in Real-world Applications",
              type: "video",
              url: "#",
              previewImage: "/images/algorithm_case_studies.jpg",
              duration: "42:30",
              completed: false,
            },
            {
              id: 29,
              title: "Algorithm Design Challenges with Solutions",
              type: "worksheet",
              url: "#",
              downloadUrl: "/downloads/algorithm_challenges.pdf",
              completed: false,
            },
          ],
        },
      ],
      quizData: {
        title: "Data Structures & Algorithms Assessment",
        timeLimit: 75, // minutes
        passingScore: 80,
        questions: [
          {
            id: 1,
            question:
              "What is the time complexity of binary search on a sorted array?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: "O(log n)",
            explanation:
              "Binary search repeatedly divides the search space in half, leading to a logarithmic time complexity of O(log n).",
          },
          {
            id: 2,
            question:
              "Which data structure provides O(1) average time complexity for insertion, deletion, and search operations?",
            options: [
              "Array",
              "Linked List",
              "Binary Search Tree",
              "Hash Table",
            ],
            correctAnswer: "Hash Table",
            explanation:
              "Hash tables provide constant-time O(1) average complexity for basic operations through direct addressing based on the hash of the key.",
          },
        ],
      },
    },
    // Add other courses as needed
  };

  useEffect(() => {
    // Simulating API call to get course data
    setTimeout(() => {
      if (courseData[courseId]) {
        setCourse(courseData[courseId]);
      } else {
        // Handle course not found
        router.push("/not-found");
      }
    }, 500);
  }, [courseId, router]);

  // Add toggleFocusMode function here, before it's referenced in the useEffect
  const toggleFocusMode = () => {
    // Toggle focus mode
    setIsFocusMode(!isFocusMode);

    if (!isFocusMode) {
      // Show brief tutorial tooltip when entering focus mode
      setTooltipText(
        mode === "dyslexia"
          ? "Focus Mode enabled. Press ESC to exit."
          : "Distractions reduced. Press ESC to exit."
      );
      setTooltipPosition({
        x: window.innerWidth / 2 - 100,
        y: 100,
      });
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);

      // Save the tip as shown to localStorage so it doesn't appear again
      if (localStorage) {
        localStorage.setItem("focusModeTipShown", "true");
      }
    }
  };

  // Add ESC key handler for exiting focus mode
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isFocusMode) {
        setIsFocusMode(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isFocusMode]);

  // Updated dependency array for this useEffect
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle keyboard shortcuts
      if (e.key === "d" && e.ctrlKey) {
        e.preventDefault();
        setMode("dyslexia");
      } else if (e.key === "a" && e.ctrlKey) {
        e.preventDefault();
        setMode("adhd");
      } else if (e.key === "n" && e.ctrlKey) {
        e.preventDefault();
        setMode("normal");
      } else if (e.key === "p" && e.ctrlKey) {
        e.preventDefault();
        setMode("adaptive");
      } else if (e.key === "f" && e.ctrlKey) {
        e.preventDefault();
        toggleFocusMode();
      }

      // Dyslexia-specific shortcuts
      if (mode === "dyslexia") {
        // Alt + S for text-to-speech (read selected content)
        if (e.altKey && e.key === "s") {
          const selectedText = window.getSelection().toString();
          if (selectedText) {
            speakText(selectedText);
          }
        }
        // Escape key stops speech
        else if (e.key === "Escape" && speaking) {
          stop();
        }
      }

      // ADHD-specific shortcuts
      if (mode === "adhd") {
        // Alt + F to toggle focus mode
        if (e.altKey && e.key === "f") {
          toggleFocusMode();
        }
        // Escape to exit focus mode
        else if (e.key === "Escape" && isFocusMode) {
          setIsFocusMode(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, setMode, speakText, stop, speaking, isFocusMode]);

  useEffect(() => {
    if (mode !== "dyslexia" || !contentRef.current || !autoReadEnabled) return;

    const handleMouseOver = (e) => {
      // Only process paragraph, heading, and list item elements
      const validElements = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI"];
      if (
        validElements.includes(e.target.tagName) &&
        e.target !== currentElement
      ) {
        setCurrentElement(e.target);

        // Add highlight to the element being hovered
        e.target.classList.add("dyslexia-highlight");

        // Show tooltip near cursor
        setTooltipText("Hover to read aloud (1s)");
        setTooltipPosition({
          x: e.clientX + 15,
          y: e.clientY + 10,
        });
        setShowTooltip(true);

        // Speak the text on longer hover (1000ms delay)
        const timer = setTimeout(() => {
          speakText(e.target.textContent);
          setTooltipText("Reading...");
        }, 1000);

        // Store the timer for cleanup
        e.target.dataset.speechTimer = timer;
      }
    };

    const handleMouseOut = (e) => {
      const validElements = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI"];
      if (validElements.includes(e.target.tagName)) {
        e.target.classList.remove("dyslexia-highlight");

        // Clear the timer if exists
        if (e.target.dataset.speechTimer) {
          clearTimeout(e.target.dataset.speechTimer);
          delete e.target.dataset.speechTimer;
        }

        setShowTooltip(false);
      }
    };

    const handleMouseMove = (e) => {
      if (showTooltip) {
        setTooltipPosition({
          x: e.clientX + 15,
          y: e.clientY + 10,
        });
      }
    };

    // Add the event listeners to the content area
    const contentElement = contentRef.current;
    contentElement.addEventListener("mouseover", handleMouseOver);
    contentElement.addEventListener("mouseout", handleMouseOut);
    contentElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      contentElement.removeEventListener("mouseover", handleMouseOver);
      contentElement.removeEventListener("mouseout", handleMouseOut);
      contentElement.removeEventListener("mousemove", handleMouseMove);

      // Find and clear any remaining timers
      document.querySelectorAll("[data-speech-timer]").forEach((el) => {
        clearTimeout(el.dataset.speechTimer);
        delete el.dataset.speechTimer;
        el.classList.remove("dyslexia-highlight");
      });

      setShowTooltip(false);
    };
  }, [
    mode,
    contentRef,
    speakText,
    currentElement,
    setCurrentElement,
    autoReadEnabled,
    showTooltip,
  ]);

  // Show initial tooltip for focus mode button
  useEffect(() => {
    if (
      focusModeButtonRef.current &&
      mode !== "normal" &&
      !localStorage.getItem("focusModeTipShown")
    ) {
      const timer = setTimeout(() => {
        const rect = focusModeButtonRef.current.getBoundingClientRect();
        setTooltipText(
          mode === "dyslexia"
            ? "Try Focus Mode for easier reading"
            : "Try Focus Mode to reduce distractions"
        );
        setTooltipPosition({
          x: rect.right - 20,
          y: rect.top - 60,
        });
        setShowTooltip(true);

        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem("focusModeTipShown", "true");
        }, 5000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mode, focusModeButtonRef]);

  // Add toggle function for auto-read
  const toggleAutoRead = () => {
    setAutoReadEnabled(!autoReadEnabled);
    // Show confirmation tooltip
    setTooltipText(
      !autoReadEnabled
        ? "Cursor reading enabled. Hover over text to read."
        : "Cursor reading disabled."
    );
    setTooltipPosition({
      x: window.innerWidth / 2 - 100,
      y: 100,
    });
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  // Add function to handle course download
  const handleDownloadCourse = (format) => {
    // Close download options menu
    setDownloadOptions(false);

    // Show download starting message
    setTooltipText(`Preparing ${format.toUpperCase()} download...`);
    setTooltipPosition({
      x: window.innerWidth / 2 - 100,
      y: 100,
    });
    setShowTooltip(true);

    // Simulate download progress
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Show download complete tooltip
          setTooltipText(`Course downloaded successfully!`);
          setTimeout(() => {
            setShowTooltip(false);
            setDownloadProgress(null);
          }, 2000);

          return prev;
        }
        return prev + 10;
      });
    }, 300);

    // In a real app, this would be an API call to generate and download the file
    // For now, we'll just simulate it
  };

  // Add ADHD-specific focus enhancements
  useEffect(() => {
    if (mode !== "adhd" || !contentRef.current) return;

    const handleElementFocus = (e) => {
      // Process interactive elements like buttons, links, and list items
      const focusableElements = [
        "BUTTON",
        "A",
        "LI",
        "INPUT",
        "TEXTAREA",
        "SELECT",
        ".focus-element",
      ];

      const targetElement =
        e.target.closest(".focus-element") ||
        (focusableElements.includes(e.target.tagName) ? e.target : null);

      if (targetElement) {
        // Add focus effect
        targetElement.classList.add("adhd-focus-highlight");

        // Dim other elements slightly for better focus (if not in focus mode already)
        if (!isFocusMode) {
          const siblings = Array.from(
            targetElement.parentElement.children
          ).filter((el) => el !== targetElement);

          siblings.forEach((sibling) => {
            sibling.classList.add("adhd-focus-dimmed");
          });
        }
      }
    };

    const handleElementBlur = (e) => {
      // Remove all focus and dim effects
      document.querySelectorAll(".adhd-focus-highlight").forEach((el) => {
        el.classList.remove("adhd-focus-highlight");
      });

      document.querySelectorAll(".adhd-focus-dimmed").forEach((el) => {
        el.classList.remove("adhd-focus-dimmed");
      });
    };

    // Add the event listeners to the content area
    const contentElement = contentRef.current;
    contentElement.addEventListener("mouseover", handleElementFocus);
    contentElement.addEventListener("mouseout", handleElementBlur);

    return () => {
      contentElement.removeEventListener("mouseover", handleElementFocus);
      contentElement.removeEventListener("mouseout", handleElementBlur);

      // Clean up any remaining classes
      document.querySelectorAll(".adhd-focus-highlight").forEach((el) => {
        el.classList.remove("adhd-focus-highlight");
      });

      document.querySelectorAll(".adhd-focus-dimmed").forEach((el) => {
        el.classList.remove("adhd-focus-dimmed");
      });
    };
  }, [mode, contentRef, isFocusMode]);

  // Style definitions for ADHD focus elements
  useEffect(() => {
    if (mode !== "adhd") return;

    // Add styles dynamically for ADHD focus
    const style = document.createElement("style");
    style.id = "adhd-focus-styles";
    style.innerHTML = `
      .adhd-focus-highlight {
        box-shadow: 0 0 0 2px #3b82f6, 0 0 10px rgba(59, 130, 246, 0.3);
        transform: scale(1.02);
        transition: all 0.2s ease;
        z-index: 1;
        position: relative;
      }
      
      .adhd-focus-dimmed {
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById("adhd-focus-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [mode]);

  if (!course) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-700 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading course content...</p>
      </div>
    );
  }

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const generateNotes = () => {
    setGeneratingNotes(true);
    // Simulate API call to generate notes
    setTimeout(() => {
      setGeneratingNotes(false);
      setNotesGenerated(true);
    }, 2000);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={20} />;
      case "ppt":
        return <FileText className="text-orange-500" size={20} />;
      case "doc":
        return <FileText className="text-blue-500" size={20} />;
      case "slides":
        return <FileText className="text-orange-500" size={20} />;
      case "reading":
        return <FileText className="text-red-500" size={20} />;
      case "video":
        return <FileText className="text-purple-500" size={20} />;
      case "worksheet":
        return <FileText className="text-blue-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  // Add color theme settings option in the drawer or settings panel
  const renderColorSettings = () => {
    if (mode === "normal") return null;

    const currentColors = colorTheme[mode];
    const colorOptions =
      mode === "dyslexia"
        ? ["amber", "yellow", "orange", "stone", "teal"]
        : ["blue", "indigo", "purple", "cyan", "emerald"];

    return (
      <div
        className={`mt-4 p-3 rounded-md border ${
          mode === "dyslexia"
            ? `border-${currentColors.background}-200 bg-${currentColors.background}-50`
            : `border-${currentColors.background}-200 bg-${currentColors.background}-50`
        }`}
      >
        <h4
          className={`text-sm font-medium mb-2 ${
            mode === "dyslexia"
              ? `text-${currentColors.background}-800`
              : `text-${currentColors.background}-800`
          }`}
        >
          Color Settings
        </h4>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => updateColorTheme(mode, color, currentColors.text)}
              className={`w-6 h-6 rounded-full bg-${color}-400 border ${
                currentColors.background === color ? "ring-2 ring-offset-2" : ""
              }`}
              aria-label={`${color} background color`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${getModeClasses()} ${
        isFocusMode ? "focus-mode" : ""
      }`}
    >
      <style jsx global>{`
        .dyslexia-font p,
        .dyslexia-font h1,
        .dyslexia-font h2,
        .dyslexia-font h3,
        .dyslexia-font span,
        .dyslexia-font li,
        .dyslexia-font button {
          font-family: "Arial", "Helvetica", sans-serif;
          letter-spacing: 0.05em;
          word-spacing: 0.15em;
          line-height: 1.6;
        }

        .dyslexia-highlight {
          background-color: rgba(
            254,
            215,
            170,
            0.3
          ); /* light amber background */
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
      `}</style>

      {/* Custom Tooltip */}
      {showTooltip && (
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
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 z-50 floating-action-buttons flex flex-col gap-2">
        {/* Download Course Button - Available in all modes */}
        <div className="relative">
          <button
            onClick={() => setDownloadOptions(!downloadOptions)}
            className={`action-button rounded-full p-2 sm:p-3 shadow-lg ${
              downloadOptions
                ? mode === "dyslexia"
                  ? "bg-amber-500 text-white"
                  : mode === "adhd"
                  ? "bg-blue-500 text-white"
                  : "bg-purple-500 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
            aria-label="Download course materials"
            title="Download course materials"
          >
            {downloadProgress !== null ? (
              <div className="relative w-6 h-6">
                <svg
                  className="download-progress-ring"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
          </button>

          {/* Download Options */}
          {downloadOptions && (
            <div
              className={`download-options absolute bottom-14 right-0 w-48 p-2 rounded-lg shadow-xl ${
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
                className={`w-full text-left px-3 py-2 text-sm rounded-md download-option ${
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
                className={`w-full text-left px-3 py-2 text-sm rounded-md download-option ${
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
                className={`w-full text-left px-3 py-2 text-sm rounded-md download-option ${
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
          ref={focusModeButtonRef}
          onClick={toggleFocusMode}
          className={`action-button rounded-full p-3 shadow-lg ${
            isFocusMode
              ? mode === "dyslexia"
                ? "bg-amber-500 text-white"
                : mode === "adhd"
                ? "bg-blue-500 text-white"
                : mode === "adaptive"
                ? "bg-indigo-500 text-white"
                : "bg-purple-500 text-white"
              : "bg-white text-gray-700 border border-gray-200"
          } ${!isFocusMode && mode !== "normal" ? "pulse-animation" : ""}`}
          aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
          title={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Adaptive Mode Controls (only shown when adaptive mode is active) */}
        {mode === "adaptive" && (
          <>
            <div className="adaptive-control">
              <h3 className="text-sm font-medium text-indigo-800 mb-2">
                Sensory Sensitivity Settings
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={sensitivityProfile.textPatterns}
                      onChange={(e) =>
                        updateSensitivityProfile(
                          "textPatterns",
                          e.target.checked
                        )
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Highlight difficult word patterns
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={sensitivityProfile.wordReplacement}
                      onChange={(e) =>
                        updateSensitivityProfile(
                          "wordReplacement",
                          e.target.checked
                        )
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Replace complex words with simpler ones
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={sensitivityProfile.contrast}
                      onChange={(e) =>
                        updateSensitivityProfile("contrast", e.target.checked)
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Reduce contrast
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={sensitivityProfile.wordSpacing}
                      onChange={(e) =>
                        updateSensitivityProfile(
                          "wordSpacing",
                          e.target.checked
                        )
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Increase word spacing
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={sensitivityProfile.fontWeight}
                      onChange={(e) =>
                        updateSensitivityProfile("fontWeight", e.target.checked)
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Increase font weight
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={applySensoryBreak}
              className="sensory-break-button"
            >
              <span className="sr-only">Take a sensory break</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 7V4H6v3" />
                <path d="M18 11H6" />
                <rect x="6" y="15" width="12" height="5" rx="1" />
              </svg>
            </button>
          </>
        )}

        {/* DYSLEXIA MODE SPECIFIC BUTTONS */}
        {mode === "dyslexia" && (
          <>
            {/* Text-to-speech toggle button - ONLY for dyslexia */}
            <div className="relative action-button-container">
              <button
                onClick={toggleAutoRead}
                className={`action-button rounded-full p-3 shadow-lg ${
                  autoReadEnabled
                    ? "bg-amber-500 text-white"
                    : "bg-white text-amber-700 border border-amber-300"
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
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </button>
              <div className="absolute -left-12 top-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                Dyslexia Mode
              </div>
            </div>

            {/* Font adjustments button - ONLY for dyslexia */}
            <button
              className="action-button rounded-full p-3 shadow-lg bg-white text-amber-700 border border-amber-300"
              aria-label="Adjust font settings"
              title="Adjust font settings"
              onClick={() => alert("Font adjustment would open here")}
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
            <div className="relative action-button-container">
              <button
                className="action-button rounded-full p-3 shadow-lg bg-white text-blue-700 border border-blue-300"
                aria-label="Set timer"
                title="Set timer"
                onClick={() => alert("Timer feature would open here")}
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
              <div className="absolute -left-12 top-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                ADHD Mode
              </div>
            </div>

            {/* Progress tracker - ONLY for ADHD */}
            <button
              className="action-button rounded-full p-3 shadow-lg bg-white text-blue-700 border border-blue-300"
              aria-label="Track progress"
              title="Track progress"
              onClick={() => alert("Progress tracker would open here")}
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

              {mode === "adaptive" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => renderColorSettings()}
                  className="h-8 text-xs sm:text-sm px-1 sm:px-2"
                >
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden xs:inline">Settings</span>
                </Button>
              )}

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

      {/* Add this accessibility information near the top of your component after the header */}
      <div
        className={`mx-auto max-w-screen-xl px-4 pt-2 ${
          mode === "normal" ? "hidden" : "block"
        }`}
      >
        {mode === "dyslexia" && (
          <div className="p-2 rounded-md text-sm bg-amber-50 text-amber-800 border border-amber-200">
            <span className="font-medium">
              Dyslexia Mode Keyboard Shortcuts:
            </span>
            <span className="mx-1">Alt+D (activate dyslexia mode),</span>
            <span className="mx-1">Alt+N (normal mode),</span>
            <span className="mx-1">Alt+S (read selected text),</span>
            <span className="mx-1">Escape (stop reading)</span>
          </div>
        )}

        {mode === "adhd" && (
          <div className="p-2 rounded-md text-sm bg-blue-50 text-blue-800 border border-blue-200">
            <span className="font-medium">ADHD Mode Keyboard Shortcuts:</span>
            <span className="mx-1">Alt+A (activate ADHD mode),</span>
            <span className="mx-1">Alt+N (normal mode),</span>
            <span className="mx-1">Alt+F (toggle focus mode),</span>
            <span className="mx-1">Escape (exit current view)</span>
          </div>
        )}
      </div>

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

          <div className="flex items-center gap-2">
            {mode === "dyslexia" && (
              <div className="bg-amber-100 text-amber-800 p-2 rounded-md flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">
                    Dyslexia Support Mode Active
                  </span>
                  <div className="text-xs text-amber-700 mt-0.5">
                    Text-to-speech and improved readability
                  </div>
                </div>
              </div>
            )}

            {mode === "adhd" && (
              <div className="bg-blue-100 text-blue-800 p-2 rounded-md flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <span className="font-medium">ADHD Support Mode Active</span>
                  <div className="text-xs text-blue-700 mt-0.5">
                    Focus aids and distraction reduction
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-6 border-b pb-1 overflow-x-auto scrollbar-hide">
          <button
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
              activeTab === "content"
                ? mode === "dyslexia"
                  ? "text-amber-900 border-b-2 border-amber-500 bg-amber-50"
                  : mode === "adhd"
                  ? "text-blue-900 border-b-2 border-blue-500 bg-blue-50"
                  : "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("content")}
          >
            <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              <BookOpen size={mode === "dyslexia" ? 22 : 18} />
              <span
                className={
                  mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"
                }
              >
                Course Content
              </span>
            </div>
          </button>
          <button
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
              activeTab === "materials"
                ? mode === "dyslexia"
                  ? "text-amber-900 border-b-2 border-amber-500 bg-amber-50"
                  : mode === "adhd"
                  ? "text-blue-900 border-b-2 border-blue-500 bg-blue-50"
                  : "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              <FileDown size={mode === "dyslexia" ? 22 : 18} />
              <span
                className={
                  mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"
                }
              >
                Course Materials
              </span>
            </div>
          </button>
          <button
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
              activeTab === "notes"
                ? mode === "dyslexia"
                  ? "text-amber-900 border-b-2 border-amber-500 bg-amber-50"
                  : mode === "adhd"
                  ? "text-blue-900 border-b-2 border-blue-500 bg-blue-50"
                  : "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              <FileText size={mode === "dyslexia" ? 22 : 18} />
              <span
                className={
                  mode === "dyslexia" ? "text-lg" : "text-sm sm:text-base"
                }
              >
                Study Notes
              </span>
            </div>
          </button>
        </div>

        {activeTab === "content" && (
          <div className="space-y-8">
            {/* Normal Mode Content */}
            {mode === "normal" && (
              <div className="space-y-8">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="overflow-hidden border-l-4 border-purple-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-purple-500 to-indigo-600">
                      <div className="bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                              {lesson.id}
                            </span>
                            {lesson.title}
                          </h2>
                          <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm font-medium">
                            Lesson {lesson.id}
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <p className="text-gray-700 leading-relaxed border-l-4 border-purple-200 pl-4 py-1 italic bg-purple-50 rounded-r-md">
                            {lesson.content.split(".")[0]}.
                          </p>
                        </div>

                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <BookOpen
                              size={18}
                              className="mr-2 text-purple-600"
                            />
                            Key Concepts
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {lesson.sections.map((section, index) => (
                              <div
                                key={index}
                                className="flex items-start p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow transition duration-200"
                              >
                                <div className="mr-3 bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {index + 1}
                                </div>
                                <div className="text-gray-700">{section}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4 flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 text-gray-600"
                            >
                              <FileText size={14} />
                              <span>{lesson.materials.length} Resources</span>
                            </Badge>
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 text-gray-600"
                            >
                              <Clock size={14} />
                              <span>
                                ~{Math.floor(Math.random() * 20) + 25} min
                              </span>
                            </Badge>
                          </div>

                          <Button
                            variant="ghost"
                            className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 flex items-center gap-1"
                            onClick={() => toggleSection(lesson.id)}
                          >
                            <span>View Materials</span>
                            <ChevronDown size={16} />
                          </Button>
                        </div>

                        {expandedSection === lesson.id && (
                          <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                              <FilesIcon
                                size={18}
                                className="mr-2 text-purple-600"
                              />
                              Lesson Materials
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {lesson.materials.map((material) => (
                                <div
                                  key={material.id}
                                  className="flex items-start p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow hover:border-purple-300 transition duration-200"
                                >
                                  <div className="mr-3 text-purple-600 flex-shrink-0">
                                    {getFileIcon(material.type)}
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">
                                      {material.title}
                                    </h4>
                                    <div className="flex items-center mt-1 gap-2">
                                      <Badge
                                        variant="secondary"
                                        className="bg-gray-100 text-gray-600 text-xs"
                                      >
                                        {material.type.charAt(0).toUpperCase() +
                                          material.type.slice(1)}
                                      </Badge>
                                      {material.duration && (
                                        <span className="text-xs text-gray-500">
                                          {material.duration}
                                        </span>
                                      )}
                                      {material.completed && (
                                        <Badge className="bg-green-100 text-green-700 text-xs">
                                          Completed
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {course.quizData && (
                  <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-white mx-auto mt-12">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">
                            {course.quizData.title}
                          </h3>
                          <p className="text-sm opacity-90 mt-1">
                            {course.quizData.questions.length} questions •{" "}
                            {course.quizData.timeLimit} minutes
                          </p>
                        </div>
                        <div className="flex flex-col items-end text-base">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>
                              Time Limit: {course.quizData.timeLimit} min
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Target size={16} className="mr-1" />
                            <span>
                              Passing Score: {course.quizData.passingScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 text-gray-700">
                          Sample Question:
                        </h4>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="mb-3">
                            {course.quizData.questions[0].question}
                          </p>

                          <div className="space-y-2">
                            {course.quizData.questions[0].options.map(
                              (option, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center p-2 rounded hover:bg-gray-100"
                                >
                                  <div className="w-5 h-5 rounded-full border border-gray-400 flex-shrink-0 mr-3"></div>
                                  <span>{option}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg mb-4 bg-purple-50 border border-purple-200">
                        <div className="flex items-center">
                          <Info size={20} className="mr-2 text-purple-700" />
                          <h4 className="font-medium text-purple-800">
                            Quiz Information
                          </h4>
                        </div>

                        <ul className="mt-2 space-y-1 text-purple-700">
                          <li className="flex items-start gap-2">
                            <Check size={16} className="mt-1 flex-shrink-0" />
                            <span>
                              Multiple choice and true/false questions
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="mt-1 flex-shrink-0" />
                            <span>
                              Covers material from all {course.lessons.length}{" "}
                              lessons
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check size={16} className="mt-1 flex-shrink-0" />
                            <span>
                              Detailed explanations provided after submission
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <LightbulbIcon
                            size={18}
                            className="mr-2 text-purple-700"
                          />
                          <span className="text-sm text-gray-600">
                            You can retake the quiz to improve your score
                          </span>
                        </div>

                        <Button
                          className="bg-[#6C48C5] hover:bg-[#5a39b0] text-white px-6 py-2 rounded-lg"
                          asChild
                        >
                          <Link href={`/quiz/${courseId}`}>Start Quiz</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dyslexia Mode Content */}
            {mode === "dyslexia" && (
              <div className="dyslexia-font space-y-8">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="overflow-hidden border-l-4 border-amber-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500">
                      <div className="bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-amber-800 flex items-center">
                            <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                              {lesson.id}
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: detectPatterns(lesson.title),
                              }}
                            ></span>
                          </h2>
                          <Badge className="bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
                            Lesson {lesson.id}
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <p
                            className="text-gray-700 leading-relaxed border-l-4 border-amber-200 pl-4 py-1 italic bg-amber-50 rounded-r-md"
                            dangerouslySetInnerHTML={{
                              __html: detectPatterns(
                                lesson.content.split(".")[0] + "."
                              ),
                            }}
                          ></p>
                        </div>

                        <h3 className="font-semibold text-amber-700 mb-2">
                          Key Topics
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {lesson.sections.map((section, i) => (
                            <li key={i} className="flex items-start">
                              <div className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <span
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: detectPatterns(section),
                                }}
                              ></span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex gap-3 mt-4">
                          <Button className="bg-amber-600 hover:bg-amber-700">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                          <Button
                            variant="outline"
                            className="border-amber-200 text-amber-700 hover:bg-amber-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADHD Mode Content */}
            {mode === "adhd" && (
              <div className="adhd-friendly space-y-8">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="overflow-hidden border-l-4 border-blue-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500">
                      <div className="bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-blue-800 flex items-center">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                              {lesson.id}
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: detectPatterns(lesson.title),
                              }}
                            ></span>
                          </h2>
                          <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                            Lesson {lesson.id}
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <p
                            className="text-gray-700 leading-relaxed border-l-4 border-blue-200 pl-4 py-1 italic bg-blue-50 rounded-r-md"
                            dangerouslySetInnerHTML={{
                              __html: detectPatterns(
                                lesson.content.split(".")[0] + "."
                              ),
                            }}
                          ></p>
                        </div>

                        <h3 className="font-semibold text-blue-700 mb-2">
                          Key Topics
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {lesson.sections.map((section, i) => (
                            <li key={i} className="flex items-start">
                              <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <span
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: detectPatterns(section),
                                }}
                              ></span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex gap-3 mt-4">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Adaptive Mode Content */}
            {mode === "adaptive" && (
              <div className="adaptive-sensory space-y-8">
                {course.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="overflow-hidden border-l-4 border-indigo-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500">
                      <div className="bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                              {lesson.id}
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: detectPatterns(lesson.title),
                              }}
                            ></span>
                          </h2>
                          <Badge className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium">
                            Lesson {lesson.id}
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <p
                            className="text-gray-700 leading-relaxed border-l-4 border-indigo-200 pl-4 py-1 italic bg-indigo-50 rounded-r-md"
                            dangerouslySetInnerHTML={{
                              __html: detectPatterns(
                                lesson.content.split(".")[0] + "."
                              ),
                            }}
                          ></p>
                        </div>

                        <h3 className="font-semibold text-indigo-700 mb-2">
                          Key Topics
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {lesson.sections.map((section, i) => (
                            <li key={i} className="flex items-start">
                              <div className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <span
                                className="text-gray-700"
                                dangerouslySetInnerHTML={{
                                  __html: detectPatterns(section),
                                }}
                              ></span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex gap-3 mt-4">
                          <Button className="bg-indigo-600 hover:bg-indigo-700">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                          <Button
                            variant="outline"
                            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-8">
            {/* Add a download all materials button at the top */}
            <div className={`flex justify-end mb-6`}>
              <Button
                onClick={() => handleDownloadCourse("zip")}
                className={`${
                  mode === "dyslexia"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : mode === "adhd"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : mode === "adaptive"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } flex items-center gap-2`}
              >
                <Download size={mode === "dyslexia" ? 20 : 16} />
                <span className={mode === "dyslexia" ? "text-lg" : ""}>
                  Download All Materials
                </span>
              </Button>
            </div>

            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="space-y-6">
                <h2
                  className={`text-xl font-bold ${
                    mode === "dyslexia"
                      ? "text-xl leading-relaxed font-sans tracking-wide"
                      : ""
                  }`}
                >
                  Lesson {lesson.id}: {lesson.title}
                </h2>

                {lesson.materials.map((material) => (
                  <div
                    key={material.id}
                    className={`border rounded-lg ${
                      mode === "dyslexia"
                        ? "bg-amber-50 border-amber-300"
                        : mode === "adhd"
                        ? "bg-blue-50 border-blue-300"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="p-4 border-b flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getFileIcon(material.type)}
                        <h3
                          className={`font-medium ${
                            mode === "dyslexia"
                              ? "text-lg font-sans tracking-wide"
                              : mode === "adhd"
                              ? "text-blue-700 font-bold"
                              : ""
                          }`}
                        >
                          {material.title}
                        </h3>
                      </div>

                      {material.completed && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-green-600 bg-green-50 border-green-200"
                        >
                          <CheckCircle size={12} className="mr-1" /> Completed
                        </Badge>
                      )}
                    </div>

                    <div
                      className={`p-5 ${
                        mode === "dyslexia"
                          ? "border-l-4 border-amber-400"
                          : mode === "adhd"
                          ? "border-l-4 border-blue-400"
                          : ""
                      }`}
                    >
                      {/* Different content based on material type */}
                      {material.type === "slides" && (
                        <div>
                          <div
                            className={`bg-gray-100 p-5 rounded-md ${
                              mode === "dyslexia"
                                ? "border-2 border-amber-300"
                                : mode === "adhd"
                                ? "border-2 border-blue-300"
                                : ""
                            }`}
                          >
                            <div
                              className={`text-center mb-4 ${
                                mode === "dyslexia"
                                  ? "text-xl font-sans tracking-wide"
                                  : mode === "adhd"
                                  ? "text-xl text-blue-800"
                                  : "text-lg"
                              }`}
                            >
                              {material.title.split(" - ")[1] ||
                                "Presentation Preview"}
                            </div>

                            <div
                              className={`space-y-4 ${
                                mode === "dyslexia"
                                  ? "text-lg font-sans tracking-wide"
                                  : ""
                              }`}
                            >
                              <ul
                                className={`space-y-2 ${
                                  mode === "adhd" ? "space-y-4" : ""
                                }`}
                              >
                                {/* Generate preview content based on the lesson title */}
                                {lesson.sections.map((section, idx) => (
                                  <li
                                    key={idx}
                                    className={`${
                                      mode === "dyslexia"
                                        ? "bg-amber-100 p-3 rounded-md"
                                        : mode === "adhd"
                                        ? "bg-white p-3 rounded-md border-l-4 border-blue-400 shadow-sm"
                                        : "bg-white p-2 rounded-md"
                                    }`}
                                  >
                                    {section.split(":")[0]}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex justify-between mt-4">
                            <Button
                              variant="outline"
                              className={`${
                                mode === "dyslexia"
                                  ? "text-amber-700 border-amber-300"
                                  : mode === "adhd"
                                  ? "text-blue-700 border-blue-300"
                                  : ""
                              }`}
                              onClick={() =>
                                speakText(`Presentation about ${lesson.title}`)
                              }
                            >
                              <ExternalLink size={16} className="mr-2" />
                              View Full Presentation
                            </Button>

                            {material.downloadUrl && (
                              <Button
                                variant="outline"
                                className={`${
                                  mode === "dyslexia"
                                    ? "text-amber-700 border-amber-300"
                                    : mode === "adhd"
                                    ? "text-blue-700 border-blue-300"
                                    : ""
                                }`}
                              >
                                <Download size={16} className="mr-2" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {material.type === "reading" && (
                        <div
                          className={`space-y-4 ${
                            mode === "dyslexia"
                              ? "text-lg font-sans tracking-wide leading-relaxed"
                              : mode === "adhd"
                              ? "leading-relaxed"
                              : ""
                          }`}
                        >
                          <p className="mb-4">
                            This reading material covers key concepts from the
                            lesson on {lesson.title}. It includes detailed
                            explanations, examples, and applications of the
                            theoretical concepts.
                          </p>

                          <div className="bg-white p-4 rounded-md border shadow-sm">
                            <div className="flex items-center justify-between mb-3 pb-2 border-b">
                              <h4
                                className={`font-medium ${
                                  mode === "dyslexia"
                                    ? "text-amber-800"
                                    : mode === "adhd"
                                    ? "text-blue-800"
                                    : "text-gray-700"
                                }`}
                              >
                                {material.title}
                              </h4>
                              <Badge variant="outline" className="bg-gray-50">
                                Document
                              </Badge>
                            </div>

                            <div className="text-sm text-gray-500 mb-2">
                              {lesson.sections.length} sections •{" "}
                              {Math.floor(Math.random() * 10) + 5} pages
                            </div>

                            <p className="text-sm mb-4 border-l-4 pl-3 border-gray-200">
                              {lesson.content.split(".")[0]}.
                            </p>

                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <Badge className="bg-green-50 text-green-700 border-green-200">
                                  New
                                </Badge>
                                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                                  Required
                                </Badge>
                              </div>

                              {material.downloadUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={`${
                                    mode === "dyslexia"
                                      ? "text-amber-700 border-amber-300"
                                      : mode === "adhd"
                                      ? "text-blue-700 border-blue-300"
                                      : ""
                                  }`}
                                >
                                  <Download size={14} className="mr-1" />
                                  Download PDF
                                </Button>
                              )}
                            </div>
                          </div>

                          {mode === "dyslexia" && (
                            <div className="flex items-center gap-2 mt-4 p-3 bg-amber-100 rounded-md">
                              <Volume2 size={20} />
                              <button
                                onClick={() =>
                                  speakText(
                                    `This reading material covers key concepts from the lesson on ${lesson.title}. It includes detailed explanations, examples, and applications of the theoretical concepts presented in class.`
                                  )
                                }
                                className="text-amber-800 font-medium"
                              >
                                Listen to this section
                              </button>
                              {speaking && (
                                <span className="text-sm italic text-amber-700">
                                  Speaking...
                                </span>
                              )}
                            </div>
                          )}

                          {mode === "adhd" && (
                            <div className="bg-white p-4 rounded-md border border-blue-200 mt-4">
                              <h4 className="font-medium text-blue-700 mb-2">
                                Focus Points:
                              </h4>
                              <ul className="space-y-2">
                                {lesson.sections
                                  .slice(0, 3)
                                  .map((section, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <div className="min-w-6 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mt-1">
                                        {idx + 1}
                                      </div>
                                      <span>{section.split(":")[0]}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {material.type === "video" && (
                        <div>
                          <div className="bg-black rounded-md overflow-hidden relative aspect-video mb-4">
                            {material.previewImage ? (
                              <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                  <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30"
                                      height="30"
                                      viewBox="0 0 24 24"
                                      fill="white"
                                      stroke="white"
                                      strokeWidth="2"
                                    >
                                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                    </svg>
                                  </button>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
                                  {material.duration || "20:15"}
                                </div>
                                <img
                                  src="/placeholder-video.jpg"
                                  alt={`Preview for ${material.title}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-full bg-gray-800">
                                <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="2"
                                  >
                                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="space-y-3">
                            <h3
                              className={`font-medium ${
                                mode === "dyslexia"
                                  ? "text-lg font-sans tracking-wide text-amber-800"
                                  : mode === "adhd"
                                  ? "text-blue-700"
                                  : "text-gray-800"
                              }`}
                            >
                              {material.title}
                            </h3>

                            <p
                              className={`${
                                mode === "dyslexia"
                                  ? "text-base tracking-wide"
                                  : "text-sm"
                              } text-gray-600`}
                            >
                              This video explains key concepts about{" "}
                              {lesson.title.toLowerCase()} with visual
                              demonstrations and examples.
                            </p>

                            <div className="flex justify-between items-center pt-2">
                              <div className="flex items-center gap-2">
                                <Play size={18} />
                                <span className="text-sm text-gray-500">
                                  Duration: {material.duration || "20:15"}
                                </span>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                className={`${
                                  mode === "dyslexia"
                                    ? "text-amber-700 border-amber-300"
                                    : mode === "adhd"
                                    ? "text-blue-700 border-blue-300"
                                    : ""
                                }`}
                              >
                                <Maximize2 size={14} className="mr-1" />
                                Full Screen
                              </Button>
                            </div>
                          </div>

                          {mode === "dyslexia" && (
                            <div className="mt-4 p-3 rounded-md bg-amber-50 border border-amber-200">
                              <div className="flex items-center gap-2 text-amber-800">
                                <Info size={18} />
                                <span className="font-medium">
                                  Captions Available
                                </span>
                              </div>
                              <p className="text-amber-700 text-sm mt-1">
                                This video includes captions for better
                                comprehension.
                              </p>
                            </div>
                          )}

                          {mode === "adhd" && (
                            <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
                              <div className="flex items-center gap-2 text-blue-800">
                                <Clock size={18} />
                                <span className="font-medium">
                                  Video Chapters
                                </span>
                              </div>
                              <div className="mt-2 space-y-2">
                                {lesson.sections
                                  .slice(0, 3)
                                  .map((section, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 text-sm text-blue-700"
                                    >
                                      <span className="text-xs bg-blue-100 w-12 text-center py-0.5 rounded">
                                        {`${Math.floor(idx * 7.3)}:${(
                                          (idx * 45) %
                                          60
                                        )
                                          .toString()
                                          .padStart(2, "0")}`}
                                      </span>
                                      <span>{section.split(":")[0]}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {material.type === "worksheet" && (
                        <div>
                          <div className="bg-white rounded-md border shadow-sm p-4">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b">
                              <h4
                                className={`font-medium ${
                                  mode === "dyslexia"
                                    ? "text-amber-800"
                                    : mode === "adhd"
                                    ? "text-blue-800"
                                    : "text-gray-700"
                                }`}
                              >
                                {material.title}
                              </h4>
                              <Badge variant="outline" className="bg-gray-50">
                                Worksheet
                              </Badge>
                            </div>

                            <div
                              className={`${
                                mode === "dyslexia"
                                  ? "text-base tracking-wide"
                                  : "text-sm"
                              } text-gray-600 mb-4`}
                            >
                              Practice problems and exercises to test your
                              understanding of {lesson.title.toLowerCase()}.
                            </div>

                            <div className="space-y-4 mb-4">
                              {[1, 2, 3].map((num) => (
                                <div
                                  key={num}
                                  className={`p-3 rounded-md ${
                                    mode === "dyslexia"
                                      ? "bg-amber-50 border border-amber-100"
                                      : mode === "adhd"
                                      ? "bg-blue-50 border border-blue-100"
                                      : "bg-gray-50"
                                  }`}
                                >
                                  <div
                                    className={`font-medium mb-1 ${
                                      mode === "dyslexia"
                                        ? "text-amber-800"
                                        : mode === "adhd"
                                        ? "text-blue-800"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    Problem {num}
                                  </div>
                                  <p className="text-gray-600">
                                    {lesson.sections[num - 1]
                                      ? `${
                                          lesson.sections[num - 1].split(":")[0]
                                        }?`
                                      : "Sample question related to this topic?"}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center">
                              <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                                Practice Material
                              </Badge>

                              {material.downloadUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={`${
                                    mode === "dyslexia"
                                      ? "text-amber-700 border-amber-300"
                                      : mode === "adhd"
                                      ? "text-blue-700 border-blue-300"
                                      : ""
                                  }`}
                                >
                                  <Download size={14} className="mr-1" />
                                  Download Worksheet
                                </Button>
                              )}
                            </div>
                          </div>

                          {mode === "adhd" && (
                            <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
                              <div className="flex items-center gap-2 text-blue-800">
                                <Lightbulb size={18} />
                                <span className="font-medium">Study Tips</span>
                              </div>
                              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                                <li className="flex items-start gap-2">
                                  <Check
                                    size={14}
                                    className="mt-1 flex-shrink-0"
                                  />
                                  <span>Work on one problem at a time</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check
                                    size={14}
                                    className="mt-1 flex-shrink-0"
                                  />
                                  <span>
                                    Take a 5-minute break after every 2 problems
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check
                                    size={14}
                                    className="mt-1 flex-shrink-0"
                                  />
                                  <span>
                                    Use the provided step-by-step solutions if
                                    you get stuck
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )}

                          {mode === "dyslexia" && (
                            <div className="mt-4 p-3 rounded-md bg-amber-50 border border-amber-200">
                              <div className="flex items-center gap-2 text-amber-800">
                                <Volume2 size={18} />
                                <button
                                  onClick={() =>
                                    speakText(
                                      `This worksheet contains practice problems about ${lesson.title}. Take your time to work through each problem carefully.`
                                    )
                                  }
                                  className="font-medium"
                                >
                                  Listen to instructions
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {material.type === "interactive" && (
                        <div>
                          {mode === "adhd" ? (
                            <div className="bg-gradient-to-r from-indigo-100 to-purple-50 rounded-lg border border-indigo-200 p-5">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-full bg-blue-100">
                                  <Layers size={24} className="text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-lg text-blue-800">
                                  {material.title}
                                </h3>
                              </div>

                              <p className="mb-4 text-blue-700">
                                This interactive tool allows you to experiment
                                with concepts from {lesson.title.toLowerCase()}{" "}
                                in a hands-on way.
                              </p>

                              <div className="bg-white/80 backdrop-blur-sm rounded-md border border-indigo-100 p-4 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-medium text-indigo-800">
                                    Interactive Preview
                                  </h4>
                                  <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                    Hands-on
                                  </Badge>
                                </div>

                                <div className="aspect-video rounded bg-indigo-50 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="animate-pulse mb-2">
                                      <Mouse
                                        size={32}
                                        className="text-indigo-400 mx-auto"
                                      />
                                    </div>
                                    <p className="text-indigo-600 font-medium">
                                      Click to launch interactive simulation
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-indigo-600">
                                  <Info size={16} />
                                  <span>Works on all devices</span>
                                </div>

                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                  <ExternalLink size={16} className="mr-2" />
                                  Launch Interactive
                                </Button>
                              </div>

                              <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
                                <div className="flex items-center gap-2 text-blue-800">
                                  <Clock size={18} />
                                  <span className="font-medium">
                                    Time Management
                                  </span>
                                </div>
                                <p className="text-blue-700 text-sm mt-1">
                                  This interactive session is designed to take
                                  approximately 15 minutes. A timer will help
                                  you track your progress.
                                </p>
                              </div>
                            </div>
                          ) : (
                            // Alternative view for dyslexia and normal modes
                            <div className="border rounded-lg p-5 bg-white">
                              <div className="flex items-center gap-3 mb-4">
                                <Layers size={24} className="text-gray-600" />
                                <h3 className="font-semibold text-lg text-gray-800">
                                  {material.title}
                                </h3>
                              </div>

                              <p className="mb-4 text-gray-600">
                                {mode === "dyslexia"
                                  ? "An interactive learning tool is available. Switch to standard view to access this resource."
                                  : "Interactive resource available for this topic."}
                              </p>

                              <div className="flex justify-between items-center">
                                <Badge
                                  variant="outline"
                                  className="text-gray-600"
                                >
                                  Interactive Resource
                                </Badge>

                                <Button
                                  variant="outline"
                                  className={
                                    mode === "dyslexia"
                                      ? "text-amber-700"
                                      : "text-gray-700"
                                  }
                                  onClick={() =>
                                    speakText && mode === "dyslexia"
                                      ? speakText(
                                          "This is an interactive resource that works best in standard view mode"
                                        )
                                      : null
                                  }
                                >
                                  <ExternalLink size={16} className="mr-2" />
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {material.type === "code" && (
                        <div>
                          <div className="bg-gray-950 rounded-lg overflow-hidden">
                            <div className="bg-gray-800 text-gray-300 text-sm px-4 py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Code size={16} />
                                <span>Code Sample</span>
                              </div>
                              <div className="flex gap-1">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                              </div>
                            </div>

                            <div className="p-4 text-gray-200 font-mono text-sm overflow-x-auto">
                              <div className="flex">
                                <div className="text-gray-500 pr-4 select-none">
                                  1
                                </div>
                                <div>
                                  <span className="text-purple-400">
                                    function
                                  </span>{" "}
                                  <span className="text-blue-400">example</span>
                                  () {`{`}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="text-gray-500 pr-4 select-none">
                                  2
                                </div>
                                <div>
                                  {" "}
                                  <span className="text-purple-400">
                                    const
                                  </span>{" "}
                                  data ={" "}
                                  <span className="text-blue-400">analyze</span>
                                  (
                                  <span className="text-green-400">
                                    "sample data"
                                  </span>
                                  );
                                </div>
                              </div>
                              <div className="flex">
                                <div className="text-gray-500 pr-4 select-none">
                                  3
                                </div>
                                <div>
                                  {" "}
                                  <span className="text-purple-400">
                                    return
                                  </span>{" "}
                                  data.
                                  <span className="text-blue-400">process</span>
                                  ();
                                </div>
                              </div>
                              <div className="flex">
                                <div className="text-gray-500 pr-4 select-none">
                                  4
                                </div>
                                <div>{`}`}</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  mode === "dyslexia"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : mode === "adhd"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-purple-50 text-purple-700 border-purple-200"
                                }
                              >
                                Code Example
                              </Badge>
                              <span className="text-sm text-gray-500">
                                From {material.title}
                              </span>
                            </div>

                            {material.downloadUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                className={`${
                                  mode === "dyslexia"
                                    ? "text-amber-700 border-amber-300"
                                    : mode === "adhd"
                                    ? "text-blue-700 border-blue-300"
                                    : ""
                                }`}
                              >
                                <Download size={14} className="mr-1" />
                                Download Code
                              </Button>
                            )}
                          </div>

                          {mode === "dyslexia" && (
                            <div className="mt-4 p-3 rounded-md bg-amber-50 border border-amber-200">
                              <p className="text-amber-800 text-sm leading-relaxed">
                                This code sample shows a basic implementation
                                related to {lesson.title.toLowerCase()}. The
                                download includes additional examples and
                                documentation.
                              </p>
                            </div>
                          )}

                          {mode === "adhd" && (
                            <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
                              <div className="flex items-center gap-2 text-blue-800 mb-2">
                                <List size={18} />
                                <span className="font-medium">
                                  Code Structure
                                </span>
                              </div>
                              <ul className="space-y-1 text-sm text-blue-700">
                                <li className="flex items-start gap-2">
                                  <span className="text-xs bg-blue-100 px-1.5 py-0.5 rounded">
                                    1
                                  </span>
                                  <span>Function declaration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-xs bg-blue-100 px-1.5 py-0.5 rounded">
                                    2
                                  </span>
                                  <span>Data processing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="text-xs bg-blue-100 px-1.5 py-0.5 rounded">
                                    3-4
                                  </span>
                                  <span>Return result and close function</span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {mode === "dyslexia" && (
              <div className="mt-6 p-5 bg-amber-50 border-2 border-amber-300 rounded-lg">
                <h3 className="text-xl font-medium mb-2 font-sans tracking-wide text-amber-800">
                  Dyslexia Mode Features:
                </h3>
                <ul className="space-y-2 text-base font-sans tracking-wide leading-relaxed text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>
                      Specialized fonts and spacing for improved reading
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>
                      Text-to-speech for any text with hover capability
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>
                      Simplified reading layouts with clear visual cues
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>Warm color palette to reduce visual stress</span>
                  </li>
                </ul>
              </div>
            )}

            {mode === "adhd" && (
              <div className="mt-6 p-5 bg-blue-50 border-2 border-blue-300 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-blue-800">
                  ADHD Mode Features:
                </h3>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Focus mode to eliminate distractions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Visual highlighting of interactive elements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Structured content with clear progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Timer tools to help manage attention spans</span>
                  </li>
                </ul>
              </div>
            )}

            {mode === "adaptive" && (
              <div className="mt-6 p-5 bg-indigo-50 border-2 border-indigo-300 rounded-lg">
                <h3 className="text-xl font-medium mb-2 text-indigo-800">
                  Adaptive Mode Features:
                </h3>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                      ✓
                    </div>
                    <span>Personalized sensory sensitivity detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                      ✓
                    </div>
                    <span>Adaptive content transformation for comfort</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                      ✓
                    </div>
                    <span>Complex word replacement to simplify reading</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
                      ✓
                    </div>
                    <span>Immediate sensory break option when needed</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2
                className={`text-xl font-bold ${
                  mode === "dyslexia" ? "font-sans tracking-wide" : ""
                }`}
              >
                Study Notes
              </h2>
              <Button
                onClick={generateNotes}
                disabled={generatingNotes}
                className={
                  mode === "dyslexia"
                    ? "bg-amber-600 hover:bg-amber-700"
                    : mode === "adhd"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }
              >
                {generatingNotes ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Generating...
                  </>
                ) : notesGenerated ? (
                  "Regenerate Notes"
                ) : (
                  "Generate Study Notes"
                )}
              </Button>
            </div>

            {notesGenerated ? (
              <div
                className={`border rounded-lg p-5 ${
                  mode === "dyslexia"
                    ? "bg-amber-50 border-amber-300"
                    : mode === "adhd"
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white"
                }`}
              >
                <h3
                  className={`text-lg font-medium mb-4 ${
                    mode === "dyslexia"
                      ? "font-sans tracking-wide text-amber-800"
                      : mode === "adhd"
                      ? "text-blue-800"
                      : ""
                  }`}
                >
                  {course.title} - Key Concepts
                </h3>

                <div className="space-y-4">
                  {course.lessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-2">
                      <h4
                        className={`font-medium ${
                          mode === "dyslexia"
                            ? "text-base tracking-wide text-amber-700"
                            : mode === "adhd"
                            ? "text-blue-700 border-l-4 border-blue-400 pl-3"
                            : ""
                        }`}
                      >
                        {lesson.title}
                      </h4>
                      <ul
                        className={`${
                          mode === "dyslexia"
                            ? "ml-6 space-y-2"
                            : mode === "adhd"
                            ? "space-y-3"
                            : "ml-5 space-y-1"
                        }`}
                      >
                        {lesson.sections.map((section, idx) => (
                          <li
                            key={idx}
                            className={`${
                              mode === "dyslexia"
                                ? "text-base tracking-wide leading-relaxed flex items-start gap-2"
                                : mode === "adhd"
                                ? "bg-white p-3 rounded-md border border-blue-100 shadow-sm"
                                : ""
                            }`}
                          >
                            {mode === "dyslexia" && (
                              <div className="min-w-5 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mt-1">
                                •
                              </div>
                            )}
                            {section}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center justify-center h-64 border rounded-lg ${
                  mode === "dyslexia"
                    ? "border-amber-300 bg-amber-50"
                    : mode === "adhd"
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <img
                  src="/assets/note-placeholder.svg"
                  alt="Notes"
                  className="w-24 h-24 opacity-70 mb-4"
                />
                <p
                  className={`text-lg ${
                    mode === "dyslexia"
                      ? "font-sans tracking-wide text-amber-800"
                      : mode === "adhd"
                      ? "text-blue-700"
                      : "text-gray-500"
                  }`}
                >
                  Generate study notes based on course content
                </p>
                <p
                  className={`text-sm mt-2 max-w-md text-center ${
                    mode === "dyslexia"
                      ? "font-sans tracking-wide text-amber-700"
                      : mode === "adhd"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  The system will create a concise summary of key concepts and
                  important points from all lessons
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
