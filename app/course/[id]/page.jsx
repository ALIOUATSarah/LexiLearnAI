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
    } else {
      return "normal-mode";
    }
  };

  // Define speakText function before the useEffect hook
  const speakText = (text) => {
    speak(text, mode === "dyslexia" ? 0.9 : 1);
  };

  // Course data (would come from API in a real app)
  const courseData = {
    physics101: {
      title: "Physics 101",
      code: "PHY101",
      description: "Introduction to basic physics concepts and mechanics.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Physics",
          content:
            "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines, with its main goal being to understand how the universe behaves.",
          sections: [
            "Physics is the study of matter, energy, and the interactions between them.",
            "It helps us understand the fundamental laws that govern the universe.",
            "Modern physics includes quantum mechanics and relativity theory.",
          ],
          materials: [
            {
              id: 1,
              title: "Lecture Slides - Introduction to Physics",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 2,
              title: "Physics Fundamentals - Reading Material",
              type: "pdf",
              url: "#",
              completed: true,
            },
            {
              id: 3,
              title: "Introduction Video",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Newton's Laws of Motion",
          content:
            "Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.",
          sections: [
            "First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
            "Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
            "Third Law: For every action, there is an equal and opposite reaction.",
          ],
          materials: [
            {
              id: 4,
              title: "Newton's Laws - Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 5,
              title: "Newton's Laws - Worksheet",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Energy and Work",
          content:
            "In physics, energy is the quantitative property that must be transferred to an object in order to perform work on, or to heat, the object. Work is the measure of energy transfer that occurs when an object is moved over a distance by an external force.",
          sections: [
            "Energy exists in many forms, including kinetic, potential, thermal, and electromagnetic.",
            "The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.",
            "Work is done when a force causes an object to move in the direction of the force.",
          ],
          materials: [
            {
              id: 6,
              title: "Energy and Work - Lecture Notes",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 7,
              title: "Energy Calculations - Practice Problems",
              type: "pdf",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
    },
    math201: {
      title: "Mathematics",
      code: "MAT201",
      description:
        "Advanced algebra and calculus fundamentals for science and engineering applications.",
      lessons: [
        {
          id: 1,
          title: "Functions and Limits",
          content:
            "Functions are mathematical entities that assign outputs to given inputs. Limits describe the behavior of a function as its input approaches a particular value. These concepts form the foundation of calculus and are essential for understanding rates of change and accumulation.",
          sections: [
            "Functions map inputs to outputs and can be represented algebraically, graphically, or numerically.",
            "Limits describe the value a function approaches as the input approaches a specific value.",
            "Continuity of functions depends on the existence and properties of limits.",
          ],
          materials: [
            {
              id: 8,
              title: "Functions and Limits - Lecture Slides",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 9,
              title: "Limits Workbook",
              type: "pdf",
              url: "#",
              completed: true,
            },
            {
              id: 10,
              title: "Function Visualization Tool",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Derivatives and Applications",
          content:
            "Derivatives measure the rate at which a function changes at a particular point. They are fundamental to calculus and have numerous applications in physics, engineering, economics, and other fields. The derivative of a function represents its instantaneous rate of change.",
          sections: [
            "The derivative is defined as the limit of the difference quotient as the interval approaches zero.",
            "Differentiation rules include the power rule, product rule, quotient rule, and chain rule.",
            "Applications of derivatives include finding rates of change, optimization, and approximation.",
          ],
          materials: [
            {
              id: 11,
              title: "Derivatives - Comprehensive Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 12,
              title: "Differentiation Techniques - Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 13,
              title: "Derivative Applications - Practice Problems",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Integration and Applications",
          content:
            "Integration is the reverse process of differentiation and is used to find the accumulation of quantities. It has applications in calculating areas, volumes, and solving differential equations. The definite integral represents the net accumulation of a quantity over an interval.",
          sections: [
            "The indefinite integral is the antiderivative of a function and represents a family of functions.",
            "The definite integral calculates the net accumulation of a quantity over an interval.",
            "Integration techniques include substitution, integration by parts, and partial fractions.",
          ],
          materials: [
            {
              id: 14,
              title: "Integration Fundamentals - Lecture Notes",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 15,
              title: "Integration Techniques - Interactive Tutorial",
              type: "video",
              url: "#",
              completed: false,
            },
            {
              id: 16,
              title: "Applications of Integration - Worksheet",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 4,
          title: "Differential Equations",
          content:
            "Differential equations are equations that relate a function with its derivatives. They are used to model many phenomena in science and engineering, including motion, population growth, and electrical circuits. Solutions to differential equations describe how systems change over time.",
          sections: [
            "First-order differential equations involve the first derivative of the unknown function.",
            "Second-order differential equations involve the second derivative and are common in physics.",
            "Applications include modeling population growth, mechanical systems, and electrical circuits.",
          ],
          materials: [
            {
              id: 17,
              title: "Differential Equations - Introduction",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 18,
              title: "Solving First-Order Equations - Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 19,
              title: "Differential Equations in Science - Case Studies",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
    },
    bio150: {
      title: "Biology",
      code: "BIO150",
      description:
        "Study of living organisms and biological systems, from cellular structures to ecosystems.",
      lessons: [
        {
          id: 1,
          title: "Cell Structure and Function",
          content:
            "Cells are the fundamental units of life, capable of replicating, metabolizing nutrients, and responding to their environment. All living organisms are composed of cells, which contain genetic material and are bounded by a membrane that regulates the passage of materials between the cell and its surroundings.",
          sections: [
            "Prokaryotic cells lack a nucleus and membrane-bound organelles, while eukaryotic cells have both.",
            "Cell membranes consist of a phospholipid bilayer with embedded proteins that control transport.",
            "Cellular organelles perform specialized functions necessary for cell survival and function.",
          ],
          materials: [
            {
              id: 20,
              title: "Cell Biology - Comprehensive Slides",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 21,
              title: "Cell Structure Diagrams",
              type: "pdf",
              url: "#",
              completed: true,
            },
            {
              id: 22,
              title: "Cellular Processes - Video Lecture",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Genetics and Inheritance",
          content:
            "Genetics is the study of genes, heredity, and genetic variation in living organisms. It explores how traits are passed from parents to offspring and how genetic information is expressed. Understanding genetics is crucial for fields like medicine, agriculture, and evolutionary biology.",
          sections: [
            "DNA is the genetic material that carries instructions for development, functioning, and reproduction.",
            "Genes are segments of DNA that code for specific proteins or RNA molecules.",
            "Inheritance patterns follow Mendelian principles, including dominance, segregation, and independent assortment.",
          ],
          materials: [
            {
              id: 23,
              title: "Genetics Fundamentals - Lecture Notes",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 24,
              title: "Inheritance Patterns - Interactive Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 25,
              title: "Genetic Disorders - Case Studies",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Evolution and Biodiversity",
          content:
            "Evolution is the process by which populations of organisms change over successive generations, giving rise to biodiversity. It explains both the unity and diversity of life and provides a framework for understanding  It explains both the unity and diversity of life and provides a framework for understanding the history and relationships of all living things.",
          sections: [
            "Natural selection is the mechanism by which evolution occurs, favoring traits that enhance survival and reproduction.",
            "Speciation is the process by which new species arise, often due to geographic isolation and divergent selection pressures.",
            "Biodiversity encompasses the variety of life at all levels, from genes to ecosystems.",
          ],
          materials: [
            {
              id: 26,
              title: "Evolution - Comprehensive Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 27,
              title: "Biodiversity Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 28,
              title: "Evolution Evidence - Video Documentary",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
    },
    chem110: {
      title: "Chemistry",
      code: "CHEM110",
      description:
        "Introduction to chemical principles, reactions, and the molecular basis of matter.",
      lessons: [
        {
          id: 1,
          title: "Atomic Structure and Periodic Table",
          content:
            "Atoms are the basic units of matter, consisting of a nucleus containing protons and neutrons, surrounded by electrons. The periodic table organizes elements based on their atomic structure and chemical properties, revealing patterns that help predict how elements will behave.",
          sections: [
            "Atoms consist of protons, neutrons, and electrons, with the number of protons defining the element.",
            "The periodic table arranges elements by increasing atomic number and groups elements with similar properties.",
            "Electron configurations determine chemical behavior and follow patterns related to the periodic table.",
          ],
          materials: [
            {
              id: 29,
              title: "Atomic Structure - Lecture Slides",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 30,
              title: "Periodic Table Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 31,
              title: "Electron Configuration Practice",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Chemical Bonding and Molecular Structure",
          content:
            "Chemical bonding involves the attraction between atoms that allows them to form chemical compounds. The type of bond formed depends on the properties of the participating atoms and affects the physical and chemical properties of the resulting molecules or compounds.",
          sections: [
            "Ionic bonding involves the transfer of electrons between atoms, typically between metals and nonmetals.",
            "Covalent bonding involves the sharing of electrons between atoms, typically between nonmetals.",
            "Molecular geometry is determined by electron pair repulsion and affects molecular properties.",
          ],
          materials: [
            {
              id: 32,
              title: "Chemical Bonding - Comprehensive Notes",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 33,
              title: "Molecular Structure Visualization",
              type: "video",
              url: "#",
              completed: false,
            },
            {
              id: 34,
              title: "Bonding Worksheet",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Chemical Reactions and Stoichiometry",
          content:
            "Chemical reactions involve the transformation of substances into new substances with different properties. Stoichiometry is the calculation of quantities in chemical reactions, based on balanced chemical equations and the relationships between reactants and products.",
          sections: [
            "Chemical equations represent reactions and must be balanced to reflect the conservation of mass.",
            "Stoichiometry allows the calculation of quantities of reactants and products in a chemical reaction.",
            "Reaction types include synthesis, decomposition, single replacement, double replacement, and combustion.",
          ],
          materials: [
            {
              id: 35,
              title: "Chemical Reactions - Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 36,
              title: "Stoichiometry Problem Set",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 37,
              title: "Reaction Types - Interactive Tutorial",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
    },
    hist101: {
      title: "History",
      code: "HIST101",
      description:
        "World history from ancient civilizations to modern times, exploring key events and developments.",
      lessons: [
        {
          id: 1,
          title: "Ancient Civilizations",
          content:
            "Ancient civilizations emerged independently in various regions of the world, developing complex societies with distinct cultural, political, and technological achievements. These early civilizations laid the foundations for many aspects of modern society, including agriculture, writing, law, and urban planning.",
          sections: [
            "Mesopotamia, often called the 'cradle of civilization,' developed the first writing system and complex urban centers.",
            "Ancient Egypt built a sophisticated civilization around the Nile River, with remarkable achievements in architecture, art, and religion.",
            "Other major ancient civilizations include the Indus Valley, Ancient China, and Mesoamerican cultures.",
          ],
          materials: [
            {
              id: 38,
              title: "Ancient Civilizations - Overview Slides",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 39,
              title: "Ancient Artifacts and Monuments",
              type: "pdf",
              url: "#",
              completed: true,
            },
            {
              id: 40,
              title: "Daily Life in Ancient Civilizations - Documentary",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Medieval Period and Renaissance",
          content:
            "The Medieval Period, often called the Middle Ages, spans roughly from the 5th to the 15th century. It was followed by the Renaissance, a period of cultural, artistic, political, and economic 'rebirth' that bridged the gap between the Middle Ages and modern history.",
          sections: [
            "The Medieval Period saw the rise of feudalism, the spread of Christianity, and significant developments in art, architecture, and education.",
            "The Renaissance began in Italy and spread throughout Europe, characterized by a renewed interest in classical learning and values.",
            "Key Renaissance figures include Leonardo da Vinci, Michelangelo, and Galileo Galilei, who made groundbreaking contributions to art and science.",
          ],
          materials: [
            {
              id: 41,
              title: "Medieval Europe - Comprehensive Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 42,
              title: "Renaissance Art and Culture - Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 43,
              title: "Medieval and Renaissance Timeline",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Modern Era and Globalization",
          content:
            "The Modern Era encompasses the period from the late 18th century to the present, characterized by industrialization, political revolutions, technological advancements, and increasing global interconnectedness. Globalization has accelerated in recent decades, transforming economies, societies, and cultures worldwide.",
          sections: [
            "The Industrial Revolution transformed production methods, economic systems, and social structures.",
            "Political revolutions, including the American and French Revolutions, established new forms of government and concepts of rights.",
            "The 20th and 21st centuries have seen unprecedented technological change, global conflicts, and increasing economic integration.",
          ],
          materials: [
            {
              id: 44,
              title: "Modern History - Key Events",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 45,
              title: "Globalization - Impact and Challenges",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 46,
              title: "20th Century Documentary Series",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
    },
    eng202: {
      title: "English Literature",
      code: "ENG202",
      description:
        "Analysis of classic and contemporary literary works, exploring themes, styles, and historical contexts.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Literary Analysis",
          content:
            "Literary analysis involves examining the components of a literary work to understand its meaning, structure, and significance. It requires close reading and critical thinking to interpret texts and appreciate their artistic and cultural value. Literary analysis considers elements such as plot, character, setting, theme, and style.",
          sections: [
            "Close reading involves careful examination of a text's language, structure, and literary devices.",
            "Literary elements include plot, character, setting, theme, point of view, and style.",
            "Critical approaches to literature include historical, psychological, feminist, and reader-response criticism.",
          ],
          materials: [
            {
              id: 47,
              title: "Literary Analysis - Fundamentals",
              type: "ppt",
              url: "#",
              completed: true,
            },
            {
              id: 48,
              title: "Critical Reading Strategies",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 49,
              title: "Literary Elements - Interactive Guide",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Poetry and Poetic Forms",
          content:
            "Poetry is a form of literature that uses aesthetic and rhythmic qualities of language to evoke meanings beyond literal interpretation. Poetic forms vary widely across cultures and time periods, each with distinctive structures, patterns, and traditions. The study of poetry involves analyzing elements such as meter, rhyme, imagery, and figurative language.",
          sections: [
            "Poetic elements include meter, rhyme, stanza, line, and various sound devices like alliteration and assonance.",
            "Traditional forms include sonnets, haiku, ballads, and epic poetry, each with specific structural characteristics.",
            "Modern and contemporary poetry often experiments with or breaks from traditional forms and conventions.",
          ],
          materials: [
            {
              id: 50,
              title: "Poetry Analysis - Comprehensive Guide",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 51,
              title: "Poetic Forms and Traditions",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 52,
              title: "Poetry Reading and Analysis - Audio Lectures",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Prose Fiction: Short Stories and Novels",
          content:
            "Prose fiction encompasses narrative works such as short stories and novels, which tell stories through characters, plot, and setting. These forms allow for in-depth exploration of human experiences, social issues, and philosophical questions. The study of prose fiction involves analyzing narrative techniques, character development, themes, and cultural contexts.",
          sections: [
            "Short stories are concise narratives focused on a single event, character, or theme, often with a surprising twist or revelation.",
            "Novels are longer works that develop complex plots, multiple characters, and themes over an extended narrative.",
            "Narrative elements include plot structure, characterization, setting, point of view, and narrative voice.",
          ],
          materials: [
            {
              id: 53,
              title: "Fiction Analysis - Key Concepts",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 54,
              title: "Short Story Collection - Annotated",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 55,
              title: "Novel Analysis Worksheet",
              type: "doc",
              url: "#",
              completed: false,
            },
          ],
        },
        {
          id: 4,
          title: "Drama and Theatrical Traditions",
          content:
            "Drama is a form of literature written for performance, presenting stories through dialogue and action. Theatrical traditions vary across cultures and historical periods, from ancient Greek tragedy to contemporary experimental theater. The study of drama involves analyzing both the literary text and its potential for performance.",
          sections: [
            "Dramatic elements include dialogue, stage directions, acts, scenes, and dramatic irony.",
            "Major dramatic forms include tragedy, comedy, tragicomedy, and various modern and experimental forms.",
            "The relationship between text and performance is central to understanding drama as both literature and theatrical art.",
          ],
          materials: [
            {
              id: 56,
              title: "Drama - Historical Development",
              type: "pdf",
              url: "#",
              completed: false,
            },
            {
              id: 57,
              title: "Dramatic Analysis - Presentation",
              type: "ppt",
              url: "#",
              completed: false,
            },
            {
              id: 58,
              title: "Classic Plays - Performance Videos",
              type: "video",
              url: "#",
              completed: false,
            },
          ],
        },
      ],
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + D for Dyslexia Mode
      if (e.altKey && e.key === "d") {
        setMode("dyslexia");
      }
      // Alt + A for ADHD Mode
      else if (e.altKey && e.key === "a") {
        setMode("adhd");
      }
      // Alt + N for Normal Mode
      else if (e.altKey && e.key === "n") {
        setMode("normal");
      }
      // Alt + S for text-to-speech (read selected content)
      else if (e.altKey && e.key === "s") {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          speakText(selectedText);
        }
      }
      // Escape key stops speech
      else if (e.key === "Escape") {
        stop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, setMode, speakText, stop]);

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

  // Add toggle function for Focus Mode
  const toggleFocusMode = () => {
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
      case "video":
        return <FileText className="text-purple-500" size={20} />;
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
        {/* Download Course Button */}
        <div className="relative">
          <button
            onClick={() => setDownloadOptions(!downloadOptions)}
            className={`action-button rounded-full p-3 shadow-lg ${
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
                        ? "#F59E0B"
                        : mode === "adhd"
                        ? "#3B82F6"
                        : "#8B5CF6"
                    }
                    strokeWidth="3"
                    fill="transparent"
                    r="8"
                    cx="12"
                    cy="12"
                    strokeDasharray="50.27"
                    strokeDashoffset={50.27 * (1 - downloadProgress / 100)}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {downloadProgress}%
                </span>
              </div>
            ) : (
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
          </button>

          {/* Download Options Panel */}
          {downloadOptions && (
            <div
              className={`download-options absolute bottom-full right-0 mb-2 w-56 p-2 rounded-lg shadow-lg ${
                mode === "dyslexia"
                  ? "bg-amber-50 border border-amber-200"
                  : mode === "adhd"
                  ? "bg-blue-50 border border-blue-200"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h4
                className={`text-sm font-medium mb-2 px-2 ${
                  mode === "dyslexia"
                    ? "text-amber-800"
                    : mode === "adhd"
                    ? "text-blue-800"
                    : "text-gray-700"
                }`}
              >
                Download Options
              </h4>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleDownloadCourse("pdf")}
                  className={`download-option flex items-center gap-2 rounded-md p-2 text-sm transition ${
                    mode === "dyslexia"
                      ? "hover:bg-amber-100 text-amber-700"
                      : mode === "adhd"
                      ? "hover:bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Course as PDF</span>
                  {mode === "dyslexia" && (
                    <span className="ml-auto text-xs text-amber-600 bg-amber-100 px-1.5 rounded">
                      Optimized
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadCourse("audio")}
                  className={`download-option flex items-center gap-2 rounded-md p-2 text-sm transition ${
                    mode === "dyslexia"
                      ? "hover:bg-amber-100 text-amber-700"
                      : mode === "adhd"
                      ? "hover:bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <span>Audio Lessons</span>
                  {mode === "dyslexia" && (
                    <span className="ml-auto text-xs text-amber-600 bg-amber-100 px-1.5 rounded">
                      Recommended
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleDownloadCourse("zip")}
                  className={`download-option flex items-center gap-2 rounded-md p-2 text-sm transition ${
                    mode === "dyslexia"
                      ? "hover:bg-amber-100 text-amber-700"
                      : mode === "adhd"
                      ? "hover:bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span>All Materials (ZIP)</span>
                  {mode === "adhd" && (
                    <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-1.5 rounded">
                      Complete
                    </span>
                  )}
                </button>

                <hr
                  className={`my-1 ${
                    mode === "dyslexia"
                      ? "border-amber-200"
                      : mode === "adhd"
                      ? "border-blue-200"
                      : "border-gray-200"
                  }`}
                />

                <button
                  onClick={() => setDownloadOptions(false)}
                  className={`download-option flex items-center justify-center gap-2 rounded-md p-2 text-sm ${
                    mode === "dyslexia"
                      ? "hover:bg-amber-100 text-amber-700"
                      : mode === "adhd"
                      ? "hover:bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Text-to-speech toggle (only in dyslexia mode) */}
        {mode === "dyslexia" && (
          <button
            onClick={toggleAutoRead}
            className={`action-button rounded-full p-3 shadow-lg ${
              autoReadEnabled
                ? "bg-amber-500 text-white active"
                : "bg-white text-amber-700 border border-amber-300"
            }`}
            aria-label={
              autoReadEnabled
                ? "Disable cursor text-to-speech"
                : "Enable cursor text-to-speech"
            }
            title={
              autoReadEnabled
                ? "Disable cursor text-to-speech"
                : "Enable cursor text-to-speech"
            }
          >
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
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        )}

        {/* ADHD Timer button (only in ADHD mode) */}
        {mode === "adhd" && (
          <button
            onClick={() => {
              /* Add timer function */
            }}
            className="action-button rounded-full p-3 shadow-lg bg-white text-blue-700 border border-blue-300"
            aria-label="Set focus timer"
            title="Set focus timer"
          >
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
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </button>
        )}

        {/* Focus Mode Button */}
        <button
          ref={focusModeButtonRef}
          onClick={toggleFocusMode}
          className={`action-button rounded-full p-3 shadow-lg transition-all ${
            isFocusMode
              ? "bg-white text-gray-800"
              : mode === "dyslexia"
              ? "bg-amber-500 text-white"
              : mode === "adhd"
              ? "bg-blue-500 text-white pulse-animation"
              : "bg-gray-800 text-white"
          }`}
          aria-label={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        >
          {isFocusMode ? (
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
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
              <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path>
              <path d="M3.69 8.56A9 9 0 0 0 3 12"></path>
              <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
              <path d="M8.56 20.31A9 9 0 0 0 12 21"></path>
              <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path>
              <path d="M20.31 15.44A9 9 0 0 0 21 12"></path>
              <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path>
              <path d="M15.44 3.69A9 9 0 0 0 12 3"></path>
              <circle cx="12" cy="12" r="2"></circle>
            </svg>
          )}
        </button>
      </div>

      <header
        className={`bg-white border-b sticky top-0 z-10 shadow-sm ${
          isFocusMode ? "focus-header" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo mode={mode} />

          <div className="flex items-center gap-4">
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value)}
              className="bg-gray-100 p-1 rounded-lg"
            >
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="normal"
                  className={mode === "normal" ? "bg-white shadow-sm" : ""}
                >
                  Standard Mode
                </TabsTrigger>
                <TabsTrigger
                  value="dyslexia"
                  className={
                    mode === "dyslexia"
                      ? "bg-amber-100 text-amber-900 shadow-sm font-sans tracking-wide"
                      : ""
                  }
                >
                  Dyslexia Support
                </TabsTrigger>
                <TabsTrigger
                  value="adhd"
                  className={
                    mode === "adhd" ? "bg-blue-100 text-blue-900 shadow-sm" : ""
                  }
                >
                  ADHD Support
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="border-blue-300 text-blue-600"
                asChild
              >
                <Link href="/lessons">All Courses</Link>
              </Button>

              <Button
                variant="outline"
                className="border-purple-300 text-purple-600"
                asChild
              >
                <Link href="/student-dashboard">My Dashboard</Link>
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
        <div
          className={`p-2 rounded-md text-sm ${
            mode === "dyslexia"
              ? "bg-amber-50 text-amber-800 border border-amber-200"
              : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}
        >
          <span className="font-medium">Keyboard shortcuts:</span>
          <span className="mx-1">
            Alt+{mode === "dyslexia" ? "D" : "A"} (current mode),
          </span>
          <span className="mx-1">
            Alt+{mode === "dyslexia" ? "A" : "D"} (switch mode),
          </span>
          <span className="mx-1">Alt+N (normal),</span>
          <span className="mx-1">Alt+S (read selected text),</span>
          <span className="mx-1">Escape (stop reading)</span>
        </div>
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
                <span>Dyslexia Support Mode Active</span>
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
                <span>ADHD Support Mode Active</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex mb-6 border-b pb-1 overflow-x-auto scrollbar-hide">
          <button
            className={`px-4 py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
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
            <div className="flex items-center gap-2 whitespace-nowrap">
              <BookOpen size={mode === "dyslexia" ? 22 : 18} />
              <span className={mode === "dyslexia" ? "text-lg" : ""}>
                Course Content
              </span>
            </div>
          </button>
          <button
            className={`px-4 py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
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
            <div className="flex items-center gap-2 whitespace-nowrap">
              <FileDown size={mode === "dyslexia" ? 22 : 18} />
              <span className={mode === "dyslexia" ? "text-lg" : ""}>
                Course Materials
              </span>
            </div>
          </button>
          <button
            className={`px-4 py-3 font-medium transition-all duration-200 rounded-t-lg focus-element ${
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
            <div className="flex items-center gap-2 whitespace-nowrap">
              <FileText size={mode === "dyslexia" ? 22 : 18} />
              <span className={mode === "dyslexia" ? "text-lg" : ""}>
                Study Notes
              </span>
            </div>
          </button>
        </div>

        {activeTab === "content" && (
          <div className="space-y-8">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`border rounded-lg ${
                  mode === "dyslexia"
                    ? "bg-amber-50 border-amber-300"
                    : mode === "adhd"
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`p-5 ${
                    mode === "dyslexia"
                      ? "border-b border-amber-300"
                      : mode === "adhd"
                      ? "border-b border-blue-300 bg-blue-100"
                      : "border-b border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2
                      className={`
                      ${
                        mode === "dyslexia"
                          ? "text-xl font-sans tracking-wide leading-relaxed font-bold text-amber-900"
                          : mode === "adhd"
                          ? "text-xl font-bold text-blue-900"
                          : "text-xl font-bold"
                      }`}
                    >
                      Lesson {lesson.id}: {lesson.title}
                    </h2>

                    {mode === "dyslexia" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-amber-400 text-amber-700"
                        onClick={() => speakText(lesson.content)}
                      >
                        <Volume2 size={18} />
                        <span className="text-base">Listen to Content</span>
                      </Button>
                    )}

                    {mode === "adhd" && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5">
                        <span className="font-semibold">
                          Estimated time: 15 min
                        </span>
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className={`
                    ${
                      mode === "dyslexia"
                        ? "text-lg font-sans tracking-wide leading-relaxed text-gray-800"
                        : mode === "adhd"
                        ? "text-base leading-relaxed text-gray-800"
                        : "text-gray-700"
                    }`}
                  >
                    {lesson.content}
                  </p>

                  <div
                    className={`mt-6 space-y-3 
                    ${
                      mode === "dyslexia"
                        ? "border-t border-amber-200 pt-4"
                        : mode === "adhd"
                        ? "pt-4"
                        : ""
                    }`}
                  >
                    <h3
                      className={`
                      ${
                        mode === "dyslexia"
                          ? "text-lg font-sans tracking-wide font-medium text-amber-800"
                          : mode === "adhd"
                          ? "text-lg font-medium text-blue-700 border-l-4 border-blue-400 pl-3"
                          : "text-lg font-medium text-gray-800"
                      }`}
                    >
                      Key Points
                    </h3>

                    <ul
                      className={`space-y-2 
                      ${
                        mode === "dyslexia"
                          ? "ml-6"
                          : mode === "adhd"
                          ? "space-y-4"
                          : "ml-5"
                      }`}
                    >
                      {lesson.sections.map((section, idx) => (
                        <li
                          key={idx}
                          className={`
                            ${
                              mode === "dyslexia"
                                ? "text-base font-sans tracking-wide leading-relaxed flex items-start gap-3"
                                : mode === "adhd"
                                ? "bg-white p-4 rounded-md shadow-sm border border-blue-200 flex items-start gap-3"
                                : "text-gray-700 flex items-start gap-2"
                            }`}
                        >
                          {mode === "dyslexia" && (
                            <div className="min-w-5 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mt-1">
                              {idx + 1}
                            </div>
                          )}

                          {mode === "adhd" && (
                            <div className="min-w-8 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg shadow-sm">
                              {idx + 1}
                            </div>
                          )}

                          {!mode.includes("dyslexia") &&
                            !mode.includes("adhd") && (
                              <div className="min-w-4 mt-1">•</div>
                            )}

                          <span
                            className={`
                              ${
                                mode === "dyslexia"
                                  ? "text-gray-800"
                                  : mode === "adhd"
                                  ? "text-gray-700 font-medium"
                                  : ""
                              }`}
                          >
                            {section}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {mode === "dyslexia" && (
              <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-lg mt-8">
                <h3 className="text-xl font-medium mb-3 font-sans tracking-wide text-amber-800">
                  Reading Tips for Dyslexia:
                </h3>
                <ul className="space-y-3 text-base font-sans tracking-wide leading-relaxed text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>
                      Use the "Listen" button to hear the content read aloud
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>Take breaks when needed to avoid visual fatigue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>
                      Use the "Generate Study Notes" feature to create
                      simplified summaries
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {mode === "adhd" && (
              <div className="p-5 bg-blue-50 border-2 border-blue-300 rounded-lg mt-8">
                <h3 className="text-xl font-medium mb-3 text-blue-800">
                  Focus Tips for ADHD:
                </h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>Focus on one key point at a time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>
                      Take short breaks between sections (try the Pomodoro
                      technique)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-5 w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold mt-1">
                      ✓
                    </div>
                    <span>Use the progress tracker to maintain motivation</span>
                  </li>
                </ul>
              </div>
            )}

            <div
              className={`flex justify-end mt-8 ${
                mode === "adhd" ? "animate-pulse" : ""
              }`}
            >
              <Button
                asChild
                size={mode === "dyslexia" ? "lg" : "default"}
                className={`
                  ${
                    mode === "dyslexia"
                      ? "bg-amber-600 hover:bg-amber-700 text-white font-sans tracking-wide px-6 py-6 text-lg"
                      : mode === "adhd"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6"
                      : ""
                  }
                `}
              >
                <Link href={`/quiz/${courseId}`}>
                  {mode === "adhd"
                    ? "Take Interactive Quiz! 🎮"
                    : mode === "dyslexia"
                    ? "Take Quiz (Visual Format)"
                    : "Take Quiz"}
                </Link>
              </Button>
            </div>
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
              <div key={lesson.id} className="space-y-4">
                <h2
                  className={`text-xl font-bold mb-2 ${
                    mode === "dyslexia"
                      ? "text-xl leading-relaxed font-sans tracking-wide"
                      : ""
                  }`}
                >
                  Lesson {lesson.id}: {lesson.title}
                </h2>

                <div
                  className={`border rounded-lg ${
                    mode === "dyslexia"
                      ? "bg-amber-50 border-amber-300"
                      : mode === "adhd"
                      ? "bg-blue-50 border-blue-300"
                      : "bg-white"
                  }`}
                >
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3
                      className={`font-medium ${
                        mode === "dyslexia"
                          ? "text-lg font-sans tracking-wide"
                          : mode === "adhd"
                          ? "text-blue-700 font-bold"
                          : ""
                      }`}
                    >
                      Course Materials
                    </h3>
                    {mode === "dyslexia" && (
                      <Badge className="bg-purple-100 text-purple-700">
                        Dyslexia-Friendly Format
                      </Badge>
                    )}
                    {mode === "adhd" && (
                      <Badge className="bg-blue-100 text-blue-700">
                        ADHD-Optimized View
                      </Badge>
                    )}
                  </div>

                  <div
                    className={`divide-y ${
                      mode === "adhd" ? "divide-blue-200" : "divide-gray-100"
                    }`}
                  >
                    {lesson.materials.map((material, index) => (
                      <div
                        key={material.id}
                        className={`p-4 ${
                          mode === "adhd" && index === expandedSection
                            ? "bg-blue-100 shadow-inner transition-all duration-300 transform scale-105"
                            : mode === "adhd" &&
                              expandedSection !== null &&
                              expandedSection !== index
                            ? "opacity-60"
                            : ""
                        }`}
                      >
                        <div className="space-y-3 w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {material.type === "pdf" && (
                                <FileText
                                  size={mode === "dyslexia" ? 24 : 18}
                                  className={
                                    mode === "dyslexia"
                                      ? "text-red-600 mr-3"
                                      : mode === "adhd"
                                      ? "text-blue-600 mr-2"
                                      : "text-gray-500 mr-2"
                                  }
                                />
                              )}
                              {material.type === "ppt" && (
                                <FileDown
                                  size={mode === "dyslexia" ? 24 : 18}
                                  className={
                                    mode === "dyslexia"
                                      ? "text-amber-600 mr-3"
                                      : mode === "adhd"
                                      ? "text-green-600 mr-2"
                                      : "text-gray-500 mr-2"
                                  }
                                />
                              )}
                              {material.type === "video" && (
                                <BookOpen
                                  size={mode === "dyslexia" ? 24 : 18}
                                  className={
                                    mode === "dyslexia"
                                      ? "text-purple-600 mr-3"
                                      : mode === "adhd"
                                      ? "text-purple-600 mr-2"
                                      : "text-gray-500 mr-2"
                                  }
                                />
                              )}
                              {material.type === "doc" && (
                                <FileText
                                  size={mode === "dyslexia" ? 24 : 18}
                                  className={
                                    mode === "dyslexia"
                                      ? "text-blue-600 mr-3"
                                      : mode === "adhd"
                                      ? "text-orange-600 mr-2"
                                      : "text-gray-500 mr-2"
                                  }
                                />
                              )}
                              <span
                                className={`font-medium ${
                                  mode === "dyslexia"
                                    ? "text-lg font-sans tracking-wide leading-relaxed"
                                    : mode === "adhd"
                                    ? "text-base font-bold"
                                    : ""
                                }`}
                              >
                                {material.title}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleDownloadCourse(material.type)
                                }
                                className={`${
                                  mode === "dyslexia"
                                    ? "border-amber-500 text-amber-700 hover:bg-amber-50"
                                    : mode === "adhd"
                                    ? "border-blue-500 text-blue-700 hover:bg-blue-50"
                                    : ""
                                } flex items-center gap-1`}
                              >
                                <Download size={16} />
                                <span>Download</span>
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleSection(index)}
                                className={`${
                                  expandedSection === index ? "bg-blue-50" : ""
                                }`}
                              >
                                {expandedSection === index
                                  ? "Hide Preview"
                                  : "Preview"}
                              </Button>
                            </div>
                          </div>

                          {mode === "dyslexia" && (
                            <div className="ml-9 text-base text-gray-600 tracking-wide leading-relaxed">
                              <span className="bg-amber-100 px-2 py-0.5 rounded text-amber-800">
                                {material.type.toUpperCase()} Format
                              </span>
                              {material.completed && (
                                <span className="ml-2 bg-green-100 px-2 py-0.5 rounded text-green-800">
                                  ✓ Completed
                                </span>
                              )}
                            </div>
                          )}

                          {(expandedSection === index ||
                            mode === "dyslexia") && (
                            <div
                              className={`mt-4 border rounded-lg overflow-hidden ${
                                mode === "dyslexia"
                                  ? "border-amber-300 bg-white"
                                  : mode === "adhd"
                                  ? "border-blue-300 shadow-md"
                                  : "border-gray-200"
                              }`}
                            >
                              {material.type === "pdf" && (
                                <div
                                  className={`p-4 ${
                                    mode === "dyslexia"
                                      ? "bg-amber-50"
                                      : mode === "adhd"
                                      ? "bg-blue-50"
                                      : "bg-gray-50"
                                  }`}
                                >
                                  <div className="flex justify-between mb-2">
                                    <h4
                                      className={`font-medium ${
                                        mode === "dyslexia"
                                          ? "text-amber-800 text-lg tracking-wide"
                                          : mode === "adhd"
                                          ? "text-blue-800"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      PDF Preview
                                    </h4>

                                    {mode === "dyslexia" && (
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            speakText(
                                              "This is a sample PDF document preview that demonstrates the content format for dyslexia mode."
                                            )
                                          }
                                          className="flex items-center gap-1 text-amber-700 border border-amber-200"
                                        >
                                          <Volume2 size={16} />
                                          <span>Listen</span>
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center gap-1 text-amber-700 border border-amber-200"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M17 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9z"></path>
                                            <path d="M15 2h6v6"></path>
                                            <path d="M21 2l-9 9"></path>
                                          </svg>
                                          <span>Open in Reader View</span>
                                        </Button>
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="flex gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="flex items-center gap-1 text-blue-700 border border-blue-200"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line
                                              x1="16"
                                              y1="13"
                                              x2="8"
                                              y2="13"
                                            ></line>
                                            <line
                                              x1="16"
                                              y1="17"
                                              x2="8"
                                              y2="17"
                                            ></line>
                                            <line
                                              x1="10"
                                              y1="9"
                                              x2="8"
                                              y2="9"
                                            ></line>
                                          </svg>
                                          <span>Focus Mode</span>
                                        </Button>
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className={`border ${
                                      mode === "dyslexia"
                                        ? "border-amber-200"
                                        : mode === "adhd"
                                        ? "border-blue-200"
                                        : "border-gray-200"
                                    } rounded p-3 bg-white`}
                                  >
                                    <div
                                      className={`${
                                        mode === "adhd"
                                          ? "bg-blue-50 p-2 rounded-md"
                                          : ""
                                      }`}
                                    >
                                      <h5
                                        className={`font-bold ${
                                          mode === "dyslexia"
                                            ? "text-xl mb-2 text-amber-800"
                                            : mode === "adhd"
                                            ? "text-blue-800 mb-1"
                                            : "mb-1"
                                        }`}
                                      >
                                        {material.title.split(" - ")[0]}
                                      </h5>

                                      <p
                                        className={`${
                                          mode === "dyslexia"
                                            ? "mb-3 text-gray-800 leading-relaxed"
                                            : mode === "adhd"
                                            ? "text-gray-700"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        {lesson.sections[0]}
                                      </p>
                                    </div>

                                    <div
                                      className={`${
                                        mode === "adhd"
                                          ? "bg-blue-50 p-2 rounded-md"
                                          : ""
                                      }`}
                                    >
                                      <p
                                        className={
                                          mode === "dyslexia"
                                            ? "text-gray-800 leading-relaxed"
                                            : mode === "adhd"
                                            ? "text-gray-700"
                                            : "text-gray-600"
                                        }
                                      >
                                        {lesson.sections[1]}
                                      </p>
                                    </div>

                                    {mode === "dyslexia" && (
                                      <div className="bg-amber-50 p-3 border-l-4 border-amber-400 mb-2">
                                        <div className="flex gap-2 items-start">
                                          <svg
                                            className="h-5 w-5 text-amber-600 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                          </svg>
                                          <div>
                                            <p className="text-amber-800 font-medium">
                                              Dyslexia-Friendly Features:
                                            </p>
                                            <ul className="list-disc ml-5 mt-1 text-amber-700">
                                              <li>
                                                Larger font with increased
                                                letter spacing
                                              </li>
                                              <li>
                                                Warm background to reduce visual
                                                stress
                                              </li>
                                              <li>
                                                Text-to-speech available for all
                                                content
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="bg-blue-100 p-2 rounded-md border border-blue-200">
                                        <div className="flex items-start gap-2">
                                          <div className="mt-1 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span>i</span>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-blue-800">
                                              ADHD Support Features:
                                            </p>
                                            <ul className="list-disc ml-5 mt-1 text-sm text-blue-700">
                                              <li>
                                                Content divided into focused
                                                sections with visual cues
                                              </li>
                                              <li>
                                                Reduced distractions and clear
                                                structure
                                              </li>
                                              <li>
                                                Reading time estimate: 3-5
                                                minutes
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {mode === "adhd" && (
                                    <div className="mt-3 p-2 bg-white border border-blue-200 rounded-md">
                                      <div className="flex items-center gap-2">
                                        <div className="w-16 h-4 bg-blue-100 rounded-full overflow-hidden">
                                          <div className="w-8 h-full bg-blue-500"></div>
                                        </div>
                                        <span className="text-xs text-blue-700">
                                          Reading progress: 50%
                                        </span>
                                        <span className="ml-auto text-xs text-blue-700 flex items-center gap-1">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                          </svg>
                                          2:30 min remaining
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {material.type === "ppt" && (
                                <div className="overflow-hidden">
                                  <div className="p-2 border-b border-gray-700 flex justify-between items-center bg-gray-800 text-white">
                                    <div className="text-sm">Slide 1 of 3</div>
                                    <div className="flex gap-2">
                                      {mode === "dyslexia" && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            speakText(
                                              "This is a sample presentation slide that demonstrates the format for dyslexia mode."
                                            )
                                          }
                                          className="flex items-center gap-1 text-amber-300 hover:text-amber-200"
                                        >
                                          <Volume2 size={16} />
                                          <span>Listen</span>
                                        </Button>
                                      )}
                                      {mode === "adhd" && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-blue-300 hover:text-blue-200 flex items-center gap-1"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <rect
                                              x="2"
                                              y="2"
                                              width="20"
                                              height="20"
                                              rx="5"
                                              ry="5"
                                            ></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line
                                              x1="17.5"
                                              y1="6.5"
                                              x2="17.5"
                                              y2="6.5"
                                            ></line>
                                          </svg>
                                          <span>Visual Mode</span>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`p-8 flex flex-col items-center justify-center min-h-[200px] ${
                                      mode === "dyslexia"
                                        ? "bg-amber-950 text-amber-50"
                                        : mode === "adhd"
                                        ? "bg-gradient-to-br from-blue-900 to-purple-900"
                                        : "bg-gradient-to-r from-blue-800 to-purple-900"
                                    }`}
                                  >
                                    <h1
                                      className={`text-2xl mb-4 text-center ${
                                        mode === "dyslexia"
                                          ? "font-sans tracking-wider leading-relaxed"
                                          : ""
                                      }`}
                                    >
                                      {lesson.title}
                                    </h1>
                                    <ul
                                      className={`${
                                        mode === "dyslexia"
                                          ? "space-y-4 text-lg tracking-wide"
                                          : mode === "adhd"
                                          ? "space-y-3"
                                          : "space-y-2"
                                      }`}
                                    >
                                      <li
                                        className={`flex items-center gap-2 ${
                                          mode === "adhd"
                                            ? "bg-blue-800 p-2 rounded-md"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className={`w-3 h-3 rounded-full ${
                                            mode === "dyslexia"
                                              ? "bg-amber-300"
                                              : "bg-blue-300"
                                          }`}
                                        ></div>
                                        <span>
                                          {lesson.sections[0].split(".")[0]}
                                        </span>
                                      </li>
                                      <li
                                        className={`flex items-center gap-2 ${
                                          mode === "adhd"
                                            ? "bg-blue-800 p-2 rounded-md"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className={`w-3 h-3 rounded-full ${
                                            mode === "dyslexia"
                                              ? "bg-amber-300"
                                              : "bg-blue-300"
                                          }`}
                                        ></div>
                                        <span>
                                          {lesson.sections[1].split(".")[0]}
                                        </span>
                                      </li>
                                    </ul>

                                    {mode === "adhd" && (
                                      <div className="mt-6 bg-blue-800 p-2 rounded-md text-blue-200 text-sm border border-blue-600">
                                        <div className="flex items-center gap-2">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
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
                                          <span>
                                            Slide timer: 1:30 remaining
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    {mode === "dyslexia" && (
                                      <div className="mt-6 bg-amber-900 p-2 rounded-md text-amber-200 text-sm border border-amber-800 font-medium">
                                        Tip: Press space to advance to next
                                        slide. Press 'A' for text-to-speech.
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-2 flex justify-between items-center bg-gray-800 text-gray-300">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gray-300 hover:text-white"
                                    >
                                      Previous
                                    </Button>

                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full text-gray-300 hover:text-white"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                          ></circle>
                                          <line
                                            x1="12"
                                            y1="8"
                                            x2="12"
                                            y2="16"
                                          ></line>
                                          <line
                                            x1="8"
                                            y1="12"
                                            x2="16"
                                            y2="12"
                                          ></line>
                                        </svg>
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full text-gray-300 hover:text-white"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full text-gray-300 hover:text-white"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <rect
                                            x="4"
                                            y="4"
                                            width="16"
                                            height="16"
                                            rx="2"
                                            ry="2"
                                          ></rect>
                                        </svg>
                                      </Button>
                                    </div>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gray-300 hover:text-white"
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {material.type === "video" && (
                                <div>
                                  <div
                                    className={`aspect-video bg-gray-900 flex items-center justify-center relative ${
                                      mode === "dyslexia"
                                        ? "border-4 border-amber-300"
                                        : mode === "adhd"
                                        ? "border-4 border-blue-400"
                                        : ""
                                    }`}
                                  >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-center">
                                        <div
                                          className={`mx-auto mb-4 rounded-full p-3 ${
                                            mode === "dyslexia"
                                              ? "bg-amber-100 text-amber-600"
                                              : mode === "adhd"
                                              ? "bg-blue-100 text-blue-600"
                                              : "bg-white/20 text-white"
                                          }`}
                                        >
                                          <svg
                                            className="w-12 h-12"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                        <h3
                                          className={`${
                                            mode === "dyslexia"
                                              ? "text-xl text-amber-100 font-sans tracking-wide"
                                              : mode === "adhd"
                                              ? "text-lg text-blue-100"
                                              : "text-white"
                                          }`}
                                        >
                                          {material.title}
                                        </h3>
                                        <p
                                          className={`mt-2 ${
                                            mode === "dyslexia"
                                              ? "text-amber-200 tracking-wide"
                                              : mode === "adhd"
                                              ? "text-blue-200"
                                              : "text-gray-300"
                                          }`}
                                        >
                                          Click to play video
                                        </p>
                                      </div>
                                    </div>

                                    {mode === "dyslexia" && (
                                      <div className="absolute top-4 right-4 bg-amber-800 text-amber-100 px-3 py-1 rounded-md text-sm font-medium opacity-90">
                                        Captions Available
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <div className="bg-blue-800 text-blue-100 px-3 py-1 rounded-md text-sm font-medium opacity-90 flex items-center gap-1">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                            ></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                          </svg>
                                          <span>Duration: 12:30</span>
                                        </div>
                                        <div className="bg-blue-800 text-blue-100 px-3 py-1 rounded-md text-sm font-medium opacity-90 flex items-center gap-1">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                          </svg>
                                          <span>New Content</span>
                                        </div>
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 bg-blue-900/70 p-1 px-2 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                      </div>
                                    )}
                                  </div>

                                  <div
                                    className={`p-3 ${
                                      mode === "dyslexia"
                                        ? "bg-amber-100"
                                        : mode === "adhd"
                                        ? "bg-blue-100"
                                        : "bg-gray-100"
                                    }`}
                                  >
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`rounded-full p-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                                              : mode === "adhd"
                                              ? "text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                                              : ""
                                          }`}
                                        >
                                          <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </Button>

                                        <div
                                          className={`h-1.5 w-32 sm:w-48 rounded-full overflow-hidden ${
                                            mode === "dyslexia"
                                              ? "bg-amber-200"
                                              : mode === "adhd"
                                              ? "bg-blue-200"
                                              : "bg-gray-200"
                                          }`}
                                        >
                                          <div
                                            className={`h-full w-1/3 ${
                                              mode === "dyslexia"
                                                ? "bg-amber-500"
                                                : mode === "adhd"
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                            }`}
                                          ></div>
                                        </div>

                                        <div
                                          className={`text-xs ${
                                            mode === "dyslexia"
                                              ? "text-amber-800"
                                              : mode === "adhd"
                                              ? "text-blue-800"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          0:00 / 12:30
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`rounded-full p-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                                              : mode === "adhd"
                                              ? "text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                                              : ""
                                          }`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                          </svg>
                                        </Button>

                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`rounded-full p-1 font-mono text-xs ${
                                            mode === "dyslexia"
                                              ? "text-amber-700 hover:text-amber-900 hover:bg-amber-200 border border-amber-300"
                                              : mode === "adhd"
                                              ? "text-blue-700 hover:text-blue-900 hover:bg-blue-200 border border-blue-300"
                                              : ""
                                          }`}
                                        >
                                          {mode === "dyslexia" ? "CC" : "CC"}
                                        </Button>

                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`rounded-full p-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                                              : mode === "adhd"
                                              ? "text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                                              : ""
                                          }`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"></path>
                                            <path d="M10 2c1 .5 2 2 2 5"></path>
                                          </svg>
                                        </Button>

                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className={`rounded-full p-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-700 hover:text-amber-900 hover:bg-amber-200"
                                              : mode === "adhd"
                                              ? "text-blue-700 hover:text-blue-900 hover:bg-blue-200"
                                              : ""
                                          }`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                          </svg>
                                        </Button>
                                      </div>
                                    </div>

                                    {mode === "dyslexia" && (
                                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                                        <div className="flex gap-2 items-start">
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
                                            className="text-amber-700"
                                          >
                                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                          </svg>
                                          <div>
                                            <p className="font-medium text-amber-800">
                                              Dyslexia Support Features:
                                            </p>
                                            <ul className="list-disc ml-5 mt-1 text-amber-700">
                                              <li>
                                                Closed captions with adjustable
                                                text size
                                              </li>
                                              <li>
                                                Variable playback speed (0.75x,
                                                1x, 1.25x)
                                              </li>
                                              <li>
                                                Audio descriptions available
                                              </li>
                                              <li>High contrast visual mode</li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                                        <div className="flex gap-2 items-start">
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
                                            className="text-blue-700"
                                          >
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                          </svg>
                                          <div>
                                            <p className="font-medium text-blue-800">
                                              ADHD Support Features:
                                            </p>
                                            <ul className="list-disc ml-5 mt-1 text-blue-700">
                                              <li>
                                                Video chapters with visual
                                                bookmarks
                                              </li>
                                              <li>
                                                Interactive transcript with key
                                                points highlighted
                                              </li>
                                              <li>
                                                Visual attention indicators
                                              </li>
                                              <li>
                                                Progress and focus tracking
                                              </li>
                                            </ul>
                                          </div>
                                        </div>

                                        <div className="mt-2 flex items-center gap-3">
                                          <div className="text-xs font-medium text-blue-700">
                                            Video sections:
                                          </div>
                                          <div className="flex gap-1 items-center">
                                            <div className="h-2 w-10 bg-blue-300 rounded-sm"></div>
                                            <div className="h-2 w-6 bg-blue-500 rounded-sm"></div>
                                            <div className="h-2 w-12 bg-blue-300 rounded-sm"></div>
                                            <div className="h-2 w-8 bg-blue-300 rounded-sm"></div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {material.type === "doc" && (
                                <div
                                  className={`${
                                    mode === "dyslexia"
                                      ? "bg-amber-50"
                                      : mode === "adhd"
                                      ? "bg-blue-50"
                                      : "bg-white"
                                  }`}
                                >
                                  <div className="p-3 border-b flex justify-between items-center">
                                    <h4
                                      className={`font-medium ${
                                        mode === "dyslexia"
                                          ? "text-amber-800 tracking-wide"
                                          : mode === "adhd"
                                          ? "text-blue-800"
                                          : ""
                                      }`}
                                    >
                                      Worksheet Preview
                                    </h4>

                                    {mode === "dyslexia" && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          speakText(
                                            "This is a sample worksheet document that demonstrates the content for dyslexia mode."
                                          )
                                        }
                                        className="flex items-center gap-1 text-amber-700"
                                      >
                                        <Volume2 size={16} />
                                        <span>Listen</span>
                                      </Button>
                                    )}
                                  </div>

                                  <div className="p-4">
                                    <div
                                      className={`mb-4 ${
                                        mode === "dyslexia"
                                          ? "text-lg tracking-wide space-y-3"
                                          : mode === "adhd"
                                          ? "space-y-4"
                                          : "space-y-2"
                                      }`}
                                    >
                                      <h5
                                        className={`font-bold ${
                                          mode === "dyslexia"
                                            ? "text-xl mb-2"
                                            : "mb-1"
                                        }`}
                                      >
                                        Practice Problems
                                      </h5>

                                      <div
                                        className={`${
                                          mode === "adhd"
                                            ? "bg-white p-3 rounded-md shadow-sm border border-blue-200"
                                            : mode === "dyslexia"
                                            ? "p-3 border-l-4 border-amber-300"
                                            : "p-2 border rounded-md"
                                        }`}
                                      >
                                        <p
                                          className={`font-medium mb-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-800"
                                              : mode === "adhd"
                                              ? "text-blue-800"
                                              : ""
                                          }`}
                                        >
                                          Problem 1:
                                        </p>
                                        <p
                                          className={
                                            mode === "dyslexia"
                                              ? "leading-relaxed"
                                              : ""
                                          }
                                        >
                                          Based on {lesson.title}, explain how{" "}
                                          {lesson.sections[0]
                                            .toLowerCase()
                                            .includes("energy")
                                            ? "energy is conserved in a closed system"
                                            : "the concept applies to real-world scenarios"}
                                          .
                                        </p>
                                      </div>

                                      <div
                                        className={`${
                                          mode === "adhd"
                                            ? "bg-white p-3 rounded-md shadow-sm border border-blue-200"
                                            : mode === "dyslexia"
                                            ? "p-3 border-l-4 border-amber-300"
                                            : "p-2 border rounded-md"
                                        }`}
                                      >
                                        <p
                                          className={`font-medium mb-1 ${
                                            mode === "dyslexia"
                                              ? "text-amber-800"
                                              : mode === "adhd"
                                              ? "text-blue-800"
                                              : ""
                                          }`}
                                        >
                                          Problem 2:
                                        </p>
                                        <p
                                          className={
                                            mode === "dyslexia"
                                              ? "leading-relaxed"
                                              : ""
                                          }
                                        >
                                          Using the principles from this lesson,
                                          calculate{" "}
                                          {lesson.title
                                            .toLowerCase()
                                            .includes("physics")
                                            ? "the force required to accelerate a 10kg object by 5m/s²"
                                            : "how this applies to the examples discussed in class"}
                                          .
                                        </p>
                                      </div>
                                    </div>

                                    {mode === "dyslexia" && (
                                      <div className="mt-4 p-3 bg-amber-100 rounded-md">
                                        <p className="text-amber-800 font-medium">
                                          This worksheet uses dyslexia-friendly
                                          formatting with:
                                        </p>
                                        <ul className="mt-2 space-y-1 text-amber-700 list-disc pl-5">
                                          <li>
                                            Clear visual separation between
                                            problems
                                          </li>
                                          <li>
                                            Larger text with increased spacing
                                          </li>
                                          <li>
                                            Text-to-speech functionality for
                                            instructions
                                          </li>
                                        </ul>
                                      </div>
                                    )}

                                    {mode === "adhd" && (
                                      <div className="mt-4 p-3 bg-blue-100 rounded-md border border-blue-200">
                                        <p className="text-blue-800 font-medium">
                                          ADHD-optimized worksheet features:
                                        </p>
                                        <ul className="mt-2 space-y-1 text-blue-700 list-disc pl-5">
                                          <li>
                                            One problem at a time to maintain
                                            focus
                                          </li>
                                          <li>
                                            Visual cues to distinguish between
                                            sections
                                          </li>
                                          <li>
                                            Step-by-step guidance through
                                            complex problems
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {mode === "adhd" && (
                    <div className="p-4 bg-blue-50 border-t border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-blue-700 font-medium">
                          Progress tracker:{" "}
                          {lesson.materials.filter((m) => m.completed).length}/
                          {lesson.materials.length} materials completed
                        </div>
                        <Progress
                          value={
                            (lesson.materials.filter((m) => m.completed)
                              .length /
                              lesson.materials.length) *
                            100
                          }
                          className="w-48 h-2 bg-blue-200"
                          indicatorClassName="bg-blue-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
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
                      Larger, more spaced text with dyslexia-friendly font
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>Warm background colors to reduce visual stress</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>Text-to-speech functionality for all materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                      ✓
                    </div>
                    <span>Enhanced visual cues and clear formatting</span>
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
                    <span>Focus highlighting to minimize distractions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Interactive elements to maintain engagement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Progress tracking for instant feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      ✓
                    </div>
                    <span>Chunked information with visual cues</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Generate Study Notes
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI can generate comprehensive study notes based on the
                course content. These notes are personalized to your learning
                style and preferences.
              </p>

              {!notesGenerated ? (
                <div className="text-center p-8 border rounded-lg bg-blue-50">
                  <h3 className="text-lg font-medium mb-4">
                    Ready to generate your study notes?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    The AI will analyze the course content and create
                    personalized notes that highlight key concepts, definitions,
                    and examples to help you study more effectively.
                  </p>
                  <Button
                    onClick={generateNotes}
                    disabled={generatingNotes}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {generatingNotes ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Generating Notes...
                      </>
                    ) : (
                      <>Generate Study Notes</>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <div className="bg-blue-50 p-4 border-b flex justify-between items-center">
                    <h3 className="font-medium text-blue-700">
                      Generated Study Notes - {course.title}
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Download size={16} />
                      <span>Download PDF</span>
                    </Button>
                  </div>
                  <div className="p-6 space-y-6">
                    {course.lessons.map((lesson) => (
                      <div key={lesson.id} className="space-y-4">
                        <h3 className="text-lg font-bold text-blue-700 border-b pb-2">
                          {lesson.id}. {lesson.title}
                        </h3>
                        <div className="pl-4 border-l-2 border-blue-200">
                          <h4 className="font-medium text-blue-600 mb-2">
                            Key Concepts:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 mb-4">
                            {lesson.sections.map((section, index) => (
                              <li key={index} className="text-gray-700">
                                {section}
                              </li>
                            ))}
                          </ul>

                          <h4 className="font-medium text-blue-600 mb-2">
                            Summary:
                          </h4>
                          <p className="text-gray-700 mb-4">{lesson.content}</p>

                          <h4 className="font-medium text-blue-600 mb-2">
                            Study Tips:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li className="text-gray-700">
                              Review the key concepts regularly
                            </li>
                            <li className="text-gray-700">
                              Practice with examples from the course materials
                            </li>
                            <li className="text-gray-700">
                              Connect these concepts with real-world
                              applications
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}

                    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mt-6">
                      <h4 className="font-medium text-amber-700 mb-2">
                        Study Recommendations:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li className="text-gray-700">
                          Focus on understanding the fundamental principles
                          rather than memorizing facts
                        </li>
                        <li className="text-gray-700">
                          Create flashcards for key terms and concepts
                        </li>
                        <li className="text-gray-700">
                          Explain concepts to others to reinforce your
                          understanding
                        </li>
                        <li className="text-gray-700">
                          Complete all practice problems in the course materials
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
