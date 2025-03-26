"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Volume2,
  FileText,
  Download,
  FileDown,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const [mode, setMode] = useState("normal");
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);

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

  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link href="/lessons">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Text-to-speech function
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      window.speechSynthesis.speak(utterance);
    }
  };

  // Apply mode-specific classes
  const getModeClasses = () => {
    switch (mode) {
      case "dyslexia":
        return "font-dyslexic bg-amber-50 text-dark";
      case "adhd":
        return "bg-blue-50";
      default:
        return "bg-white";
    }
  };

  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
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

  return (
    <div className={`min-h-screen ${getModeClasses()}`}>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Tabs value={mode} onValueChange={(value) => setMode(value)}>
              <TabsList>
                <TabsTrigger value="normal">Normal Mode</TabsTrigger>
                <TabsTrigger value="dyslexia">Dyslexia Mode</TabsTrigger>
                <TabsTrigger value="adhd">ADHD Mode</TabsTrigger>
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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className={`font-bold mb-2 ${
                  mode === "dyslexia" ? "text-3xl" : "text-3xl"
                }`}
              >
                {course.title}
              </h1>
              <p className="text-gray-600">{course.code}</p>
            </div>

            {mode === "dyslexia" && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => speakText(course.description)}
              >
                <Volume2 size={16} />
                <span>Listen</span>
              </Button>
            )}
          </div>
          <p
            className={`text-gray-700 mt-4 ${
              mode === "dyslexia" ? "text-lg leading-relaxed" : ""
            }`}
          >
            {course.description}
          </p>
        </div>

        <div className="flex mb-6 border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "content"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("content")}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              <span>Course Content</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "materials"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("materials")}
          >
            <div className="flex items-center gap-2">
              <FileDown size={18} />
              <span>Course Materials</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "notes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>Generate Notes</span>
            </div>
          </button>
        </div>

        {activeTab === "content" && (
          <div className="space-y-8">
            {/* Normal Mode Content */}
            {mode === "normal" && (
              <div className="space-y-8">
                {course.lessons.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">
                        Lesson {lesson.id}: {lesson.title}
                      </h2>
                      <p className="text-gray-700 mb-4">{lesson.content}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {lesson.sections.map((section, index) => (
                          <li key={index} className="text-gray-700">
                            {section}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end mt-8">
                  <Button asChild>
                    <Link href={`/quiz/${courseId}`}>Take Quiz</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Dyslexia Mode Content */}
            {mode === "dyslexia" && (
              <div className="space-y-8">
                {course.lessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="overflow-hidden bg-amber-50 border-2 border-amber-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-md shadow-sm">
                        <h2 className="text-2xl font-bold text-purple-800">
                          Lesson {lesson.id}: {lesson.title}
                        </h2>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 border-purple-300 text-purple-700"
                          onClick={() => speakText(lesson.content)}
                        >
                          <Volume2 size={16} />
                          <span>Listen</span>
                        </Button>
                      </div>
                      <p className="text-xl leading-relaxed mb-6 bg-white p-4 rounded-md">
                        {lesson.content}
                      </p>
                      <ul className="space-y-4 bg-white p-4 rounded-md">
                        {lesson.sections.map((section, index) => (
                          <li
                            key={index}
                            className="text-lg leading-relaxed flex gap-2 p-2 border-b border-amber-200"
                          >
                            <span className="text-purple-700 font-bold">•</span>
                            <span>{section}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end mt-8">
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <Link href={`/quiz/${courseId}`}>Take Quiz</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* ADHD Mode Content */}
            {mode === "adhd" && (
              <div className="space-y-8">
                {course.lessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="overflow-hidden border-2 border-blue-400 bg-white"
                  >
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-blue-600 bg-blue-50 p-2 rounded-md border border-blue-200">
                        Lesson {lesson.id}: {lesson.title}
                      </h2>

                      <p className="text-gray-700 mb-6 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        {lesson.content.split(".")[0]}.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {lesson.sections.map((section, index) => (
                          <Card
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ${
                              expandedSection === index
                                ? index === 0
                                  ? "bg-green-50 border-green-400"
                                  : index === 1
                                  ? "bg-purple-50 border-purple-400"
                                  : "bg-orange-50 border-orange-400"
                                : "bg-gray-50"
                            }`}
                            onClick={() => toggleSection(index)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3
                                  className={`font-bold ${
                                    index === 0
                                      ? "text-green-600"
                                      : index === 1
                                      ? "text-purple-600"
                                      : "text-orange-600"
                                  }`}
                                >
                                  Part {index + 1}
                                </h3>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    expandedSection === index
                                      ? index === 0
                                        ? "bg-green-100 text-green-600"
                                        : index === 1
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-orange-100 text-orange-600"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  {expandedSection === index
                                    ? "Expanded"
                                    : "Click to expand"}
                                </span>
                              </div>

                              <div
                                className={`overflow-hidden transition-all duration-300 ${
                                  expandedSection === index
                                    ? "max-h-96"
                                    : "max-h-12"
                                }`}
                              >
                                <p>{section}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center mt-8">
                  <Button
                    size="lg"
                    className="animate-pulse bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    asChild
                  >
                    <Link href={`/quiz/${courseId}`}>
                      Take Interactive Quiz! 🎮
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Course Materials
              </h2>
              <p className="text-gray-600 mb-4">
                Download lecture slides, readings, and other course materials.
              </p>

              {course.lessons.map((lesson) => (
                <div key={lesson.id} className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-blue-600 border-b pb-2">
                    Lesson {lesson.id}: {lesson.title}
                  </h3>
                  <div className="space-y-2">
                    {lesson.materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md border hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(material.type)}
                          <span className="font-medium">{material.title}</span>
                          <Badge
                            variant="outline"
                            className={`${
                              material.type === "pdf"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : material.type === "ppt"
                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                : material.type === "doc"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-purple-50 text-purple-700 border-purple-200"
                            }`}
                          >
                            {material.type.toUpperCase()}
                          </Badge>
                          {material.completed && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle size={12} className="mr-1" />{" "}
                              Completed
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
