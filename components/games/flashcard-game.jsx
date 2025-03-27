"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Repeat,
  BookOpen,
  Brain,
  Check,
  X,
  RotateCcw,
} from "lucide-react";

export function GameFlashcards({ courseTopic = "default" }) {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);
  const [mode, setMode] = useState("learn"); // 'learn' or 'review'
  const [isFinished, setIsFinished] = useState(false);
  const { toast } = useToast();

  // Topic-specific flashcard data
  const topicFlashcards = {
    physics101: [
      {
        id: 1,
        front: "Newton's First Law of Motion",
        back: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
      },
      {
        id: 2,
        front: "Newton's Second Law of Motion",
        back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma",
      },
      {
        id: 3,
        front: "Newton's Third Law of Motion",
        back: "For every action, there is an equal and opposite reaction.",
      },
      {
        id: 4,
        front: "Law of Conservation of Energy",
        back: "Energy cannot be created or destroyed, only transformed from one form to another.",
      },
      {
        id: 5,
        front: "Kinetic Energy",
        back: "The energy an object possesses due to its motion. KE = 1/2 × m × v²",
      },
      {
        id: 6,
        front: "Potential Energy",
        back: "The energy an object possesses due to its position or state. For gravitational PE: PE = mgh",
      },
      {
        id: 7,
        front: "Momentum",
        back: "The product of an object's mass and velocity. p = mv",
      },
      {
        id: 8,
        front: "Gravitational Force",
        back: "The force of attraction between any two objects with mass. F = G(m₁m₂/r²)",
      },
    ],
    math101: [
      {
        id: 1,
        front: "Pythagorean Theorem",
        back: "In a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. a² + b² = c²",
      },
      {
        id: 2,
        front: "Quadratic Formula",
        back: "For a quadratic equation ax² + bx + c = 0, x = [-b ± √(b² - 4ac)]/2a",
      },
      {
        id: 3,
        front: "Derivative of a Function",
        back: "The rate at which a function changes at a particular point, denoted as f′(x) or df/dx",
      },
      {
        id: 4,
        front: "Integral of a Function",
        back: "The accumulation of quantities, such as area under a curve, denoted as ∫f(x)dx",
      },
      {
        id: 5,
        front: "Law of Sines",
        back: "In any triangle, the ratio of the sine of an angle to the length of the side opposite that angle is constant. sin(A)/a = sin(B)/b = sin(C)/c",
      },
      {
        id: 6,
        front: "Law of Cosines",
        back: "In any triangle, c² = a² + b² - 2ab·cos(C), where C is the angle opposite to side c",
      },
      {
        id: 7,
        front: "Logarithmic Properties",
        back: "log(xy) = log(x) + log(y), log(x/y) = log(x) - log(y), log(xⁿ) = n·log(x)",
      },
      {
        id: 8,
        front: "Euler's Identity",
        back: "e^(iπ) + 1 = 0, connecting five fundamental mathematical constants",
      },
    ],
    chemistry101: [
      {
        id: 1,
        front: "Periodic Table",
        back: "A tabular arrangement of chemical elements organized by atomic number, electron configuration, and recurring chemical properties.",
      },
      {
        id: 2,
        front: "Atomic Structure",
        back: "Atoms consist of a nucleus (protons and neutrons) surrounded by electrons in various energy levels or shells.",
      },
      {
        id: 3,
        front: "Chemical Bond",
        back: "A lasting attraction between atoms, ions or molecules that enables the formation of chemical compounds.",
      },
      {
        id: 4,
        front: "Avogadro's Number",
        back: "The number of particles (atoms or molecules) in one mole of a substance, equal to 6.022 × 10²³.",
      },
      {
        id: 5,
        front: "pH Scale",
        back: "A logarithmic scale used to specify the acidity or basicity of an aqueous solution. pH = -log[H⁺]",
      },
      {
        id: 6,
        front: "Oxidation-Reduction",
        back: "Chemical reactions involving the transfer of electrons between species, where oxidation is the loss of electrons and reduction is the gain of electrons.",
      },
      {
        id: 7,
        front: "Le Chatelier's Principle",
        back: "If a dynamic equilibrium is disturbed by changing the conditions, the position of equilibrium shifts to counteract the change.",
      },
      {
        id: 8,
        front: "Ideal Gas Law",
        back: "An equation of state for a gas, where PV = nRT (P: pressure, V: volume, n: moles, R: gas constant, T: temperature).",
      },
    ],
    biology101: [
      {
        id: 1,
        front: "Cell Theory",
        back: "All living organisms are composed of cells, cells are the basic unit of life, and all cells come from pre-existing cells.",
      },
      {
        id: 2,
        front: "DNA Structure",
        back: "A double helix consisting of two polynucleotide chains that coil around each other, with base pairs (A-T, G-C) held together by hydrogen bonds.",
      },
      {
        id: 3,
        front: "Photosynthesis",
        back: "The process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, producing oxygen as a byproduct.",
      },
      {
        id: 4,
        front: "Cellular Respiration",
        back: "The metabolic process that converts nutrients into ATP (energy) with the consumption of oxygen and production of carbon dioxide and water.",
      },
      {
        id: 5,
        front: "Mitosis",
        back: "Cell division resulting in two identical daughter cells, each with the same number of chromosomes as the parent cell.",
      },
      {
        id: 6,
        front: "Meiosis",
        back: "Cell division that results in four daughter cells, each with half the number of chromosomes as the parent cell, essential for sexual reproduction.",
      },
      {
        id: 7,
        front: "Natural Selection",
        back: "The process by which organisms better adapted to their environment tend to survive and produce more offspring, driving evolution.",
      },
      {
        id: 8,
        front: "Mendelian Inheritance",
        back: "The pattern of inheritance of traits determined by genes that are passed from parents to offspring according to Mendel's laws.",
      },
    ],
    default: [
      {
        id: 1,
        front: "Learning",
        back: "The acquisition of knowledge or skills through study, experience, or being taught.",
      },
      {
        id: 2,
        front: "Memory",
        back: "The faculty by which the mind stores and remembers information.",
      },
      {
        id: 3,
        front: "Critical Thinking",
        back: "The objective analysis and evaluation of an issue in order to form a judgment.",
      },
      {
        id: 4,
        front: "Problem Solving",
        back: "The process of finding solutions to difficult or complex issues.",
      },
      {
        id: 5,
        front: "Metacognition",
        back: "Awareness and understanding of one's own thought processes.",
      },
      {
        id: 6,
        front: "Bloom's Taxonomy",
        back: "A hierarchical ordering of cognitive skills that can help teachers teach and students learn.",
      },
      {
        id: 7,
        front: "Growth Mindset",
        back: "The belief that abilities can be developed through dedication and hard work.",
      },
      {
        id: 8,
        front: "Spaced Repetition",
        back: "A learning technique that involves increasing intervals of time between subsequent reviews of previously learned material.",
      },
    ],
  };

  // Initialize cards based on topic
  useEffect(() => {
    const topicCards = topicFlashcards[courseTopic] || topicFlashcards.default;
    setCards(topicCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setMode("learn");
    setIsFinished(false);
  }, [courseTopic]);

  // Handle flipping a card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Move to the next card
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // If all cards have been viewed
      if (mode === "learn") {
        toast({
          title: "Learning Phase Complete!",
          description: `You've gone through all cards. Now let's review the ones you're still learning.`,
        });

        // If there are unknown cards, switch to review mode
        if (unknownCards.length > 0) {
          setMode("review");
          setCards(unknownCards);
          setCurrentCardIndex(0);
          setIsFlipped(false);
        } else {
          setIsFinished(true);
        }
      } else {
        setIsFinished(true);
      }
    }
  };

  // Move to the previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  // Mark current card as known
  const markAsKnown = () => {
    const currentCard = cards[currentCardIndex];
    setKnownCards([...knownCards, currentCard]);

    // If in review mode, remove from unknown cards
    if (mode === "review") {
      setUnknownCards(
        unknownCards.filter((card) => card.id !== currentCard.id)
      );
    }

    toast({
      title: "Card Marked as Known",
      description: "Great job! You'll see this card less frequently.",
      variant: "success",
    });

    nextCard();
  };

  // Mark current card as still learning
  const markAsUnknown = () => {
    const currentCard = cards[currentCardIndex];

    // Only add to unknown if not already there
    if (!unknownCards.some((card) => card.id === currentCard.id)) {
      setUnknownCards([...unknownCards, currentCard]);
    }

    toast({
      title: "Card Marked for Review",
      description: "You'll see this card again in the review phase.",
      variant: "default",
    });

    nextCard();
  };

  // Reset the flashcards
  const resetCards = () => {
    const topicCards = topicFlashcards[courseTopic] || topicFlashcards.default;
    setCards(topicCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setUnknownCards([]);
    setMode("learn");
    setIsFinished(false);
  };

  // Start a new review session with just the unknown cards
  const reviewUnknownCards = () => {
    if (unknownCards.length > 0) {
      setCards(unknownCards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setMode("review");
      setIsFinished(false);
    } else {
      toast({
        title: "No Cards to Review",
        description: "You've marked all cards as known. Great job!",
        variant: "success",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!isFinished ? (
        <div className="space-y-6">
          {/* Header section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge
                className={`px-3 py-1 ${
                  mode === "learn"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {mode === "learn" ? (
                  <>
                    <BookOpen className="w-4 h-4 mr-1" /> Learning Mode
                  </>
                ) : (
                  <>
                    <Repeat className="w-4 h-4 mr-1" /> Review Mode
                  </>
                )}
              </Badge>

              <span className="text-sm font-medium text-gray-500">
                Card {currentCardIndex + 1} of {cards.length}
              </span>
            </div>

            <div>
              <Badge className="bg-green-100 text-green-700 px-3 py-1">
                <Check className="w-4 h-4 mr-1" />
                {knownCards.length} Known
              </Badge>
            </div>
          </div>

          {/* Progress bar */}
          <Progress
            value={((currentCardIndex + 1) / cards.length) * 100}
            className="h-2 bg-gray-100"
            indicatorClassName={`${
              mode === "learn" ? "bg-blue-500" : "bg-purple-500"
            }`}
          />

          {/* Flashcard */}
          <div
            className={`
              relative w-full h-[300px] perspective-1000 cursor-pointer 
              transition-transform transform hover:scale-[1.01]
            `}
            onClick={flipCard}
          >
            <div
              className={`
                absolute w-full h-full transition-all duration-500 transform preserve-3d
                ${isFlipped ? "rotate-y-180" : ""}
              `}
            >
              {/* Front of card */}
              <div
                className={`
                  absolute w-full h-full backface-hidden rounded-xl p-6
                  flex items-center justify-center bg-white border-2 
                  ${mode === "learn" ? "border-blue-300" : "border-purple-300"}
                  shadow-lg text-center
                `}
              >
                <div>
                  <div className="text-sm text-gray-500 mb-3">TERM</div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {cards[currentCardIndex]?.front}
                  </h2>
                  <div className="mt-6 text-sm text-blue-500">
                    Click to flip
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div
                className={`
                  absolute w-full h-full backface-hidden rounded-xl p-6
                  flex items-center justify-center bg-white border-2 
                  ${mode === "learn" ? "border-blue-300" : "border-purple-300"}
                  shadow-lg text-center rotate-y-180 overflow-auto
                `}
              >
                <div>
                  <div className="text-sm text-gray-500 mb-3">DEFINITION</div>
                  <p className="text-gray-800 text-lg">
                    {cards[currentCardIndex]?.back}
                  </p>
                  <div className="mt-6 text-sm text-blue-500">
                    Click to flip back
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <Button
              variant="outline"
              className="border-gray-300 w-full sm:w-auto"
              onClick={prevCard}
              disabled={currentCardIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Previous
            </Button>

            <div className="flex space-x-2 w-full sm:w-auto">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-initial"
                onClick={markAsUnknown}
              >
                <X className="w-4 h-4 mr-1" /> Still Learning
              </Button>

              <Button
                className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-initial"
                onClick={markAsKnown}
              >
                <Check className="w-4 h-4 mr-1" /> Know It
              </Button>
            </div>

            <Button
              variant="outline"
              className="border-gray-300 w-full sm:w-auto"
              onClick={nextCard}
              disabled={
                currentCardIndex === cards.length - 1 && mode === "review"
              }
            >
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      ) : (
        // Finished state
        <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <Brain className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Session Complete!
          </h2>

          <div className="py-4">
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {knownCards.length}
                </div>
                <div className="text-sm text-gray-500">Cards Mastered</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {unknownCards.length}
                </div>
                <div className="text-sm text-gray-500">Need Review</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {cards.length}
                </div>
                <div className="text-sm text-gray-500">Total Cards</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600"
              onClick={resetCards}
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Start Over
            </Button>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={reviewUnknownCards}
              disabled={unknownCards.length === 0}
            >
              <Repeat className="w-4 h-4 mr-1" /> Review Difficult Cards (
              {unknownCards.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
