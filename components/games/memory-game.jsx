"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function GameMemory({ courseTopic }) {
  const { toast } = useToast();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // easy, medium, hard
  const [gameTime, setGameTime] = useState(0); // Track game time in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Course concepts for the memory game
  const coursesConcepts = {
    physics: [
      "Force",
      "Mass",
      "Acceleration",
      "Energy",
      "Momentum",
      "Velocity",
      "Gravity",
      "Friction",
      "Inertia",
      "Density",
      "Pressure",
      "Work",
      "Power",
      "Electricity",
      "Magnetism",
      "Waves",
      "Sound",
      "Light",
    ],
    math: [
      "Algebra",
      "Geometry",
      "Calculus",
      "Trigonometry",
      "Function",
      "Equation",
      "Derivative",
      "Integral",
      "Vector",
      "Matrix",
      "Logarithm",
      "Exponent",
      "Prime",
      "Fraction",
      "Polynomial",
      "Series",
      "Sequence",
      "Probability",
    ],
    chemistry: [
      "Element",
      "Compound",
      "Molecule",
      "Atom",
      "Reaction",
      "Catalyst",
      "Acid",
      "Base",
      "Solution",
      "Electron",
      "Proton",
      "Neutron",
      "Isotope",
      "Periodic",
      "Organic",
      "Inorganic",
      "Bonding",
      "Mixture",
    ],
    biology: [
      "Cell",
      "DNA",
      "RNA",
      "Protein",
      "Organ",
      "Tissue",
      "Evolution",
      "Species",
      "Ecosystem",
      "Photosynthesis",
      "Respiration",
      "Metabolism",
      "Nucleus",
      "Mitosis",
      "Meiosis",
      "Genetics",
      "Enzyme",
      "Hormone",
    ],
    default: [
      "Learning",
      "Study",
      "Practice",
      "Memory",
      "Focus",
      "Recall",
      "Knowledge",
      "Skill",
      "Understanding",
      "Comprehension",
      "Analysis",
      "Application",
      "Synthesis",
      "Evaluation",
      "Reflection",
      "Creativity",
      "Critical",
      "Thinking",
    ],
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && !gameComplete) {
      timer = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, gameComplete]);

  // Get the appropriate concepts based on the course topic
  const conceptsByTopic =
    courseTopic && coursesConcepts[courseTopic]
      ? coursesConcepts[courseTopic]
      : coursesConcepts.default;

  const initializeGame = () => {
    // Get number of pairs based on difficulty
    const pairsCount =
      difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;

    // Create pairs of cards - use an appropriate number based on available concepts and difficulty
    const selectedConcepts = conceptsByTopic.slice(0, pairsCount);
    const cardPairs = [...selectedConcepts, ...selectedConcepts];

    // Shuffle the cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        flipped: false,
        matched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameComplete(false);
    setGameStarted(true);
    setGameTime(0);
    setTimerActive(true);
  };

  const handleCardClick = (id) => {
    // Ignore if already flipped or if two cards are already flipped
    if (cards[id].flipped || cards[id].matched || flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].flipped = true;
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for matches if we have two flipped cards
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      if (cards[firstId].content === cards[secondId].content) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].matched = true;
          matchedCards[secondId].matched = true;
          setCards(matchedCards);
          setMatchedPairs(matchedPairs + 1);
          setFlippedCards([]);

          toast({
            title: "Match found!",
            description: `You found a pair: ${cards[firstId].content}`,
            variant: "default",
          });

          // Check if game is complete
          if (matchedPairs + 1 === cards.length / 2) {
            setGameComplete(true);
            setTimerActive(false);
            toast({
              title: "Game Complete!",
              description: `You completed the game in ${
                moves + 1
              } moves and ${formatTime(gameTime)}!`,
              variant: "default",
            });
          }
        }, 500);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].flipped = false;
          resetCards[secondId].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate score based on moves and time
  const calculateScore = () => {
    if (moves === 0) return 0;
    const basePoints = 1000;
    const movePenalty = 10;
    const timePenalty = 1;
    const difficultyMultiplier =
      difficulty === "easy" ? 1 : difficulty === "medium" ? 1.5 : 2;

    return Math.max(
      0,
      Math.round(
        (basePoints - moves * movePenalty - gameTime * timePenalty) *
          difficultyMultiplier
      )
    );
  };

  useEffect(() => {
    // Initialize the game when component mounts or difficulty changes
    if (gameStarted) {
      initializeGame();
    }
  }, [difficulty]);

  return (
    <div className="space-y-6">
      {!gameStarted ? (
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Memory Match Challenge
          </h2>
          <p className="mb-6 text-gray-700">
            Test your memory by matching pairs of cards with{" "}
            {courseTopic || "educational"} concepts!
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-blue-700">
              Select Difficulty:
            </h3>
            <div className="flex justify-center gap-3">
              <Button
                variant={difficulty === "easy" ? "default" : "outline"}
                className={
                  difficulty === "easy"
                    ? "bg-green-500 hover:bg-green-600"
                    : "border-green-300 text-green-600"
                }
                onClick={() => setDifficulty("easy")}
              >
                Easy (4 pairs)
              </Button>
              <Button
                variant={difficulty === "medium" ? "default" : "outline"}
                className={
                  difficulty === "medium"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-blue-300 text-blue-600"
                }
                onClick={() => setDifficulty("medium")}
              >
                Medium (6 pairs)
              </Button>
              <Button
                variant={difficulty === "hard" ? "default" : "outline"}
                className={
                  difficulty === "hard"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-300 text-purple-600"
                }
                onClick={() => setDifficulty("hard")}
              >
                Hard (8 pairs)
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 animate-pulse"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="space-y-1">
              <div className="flex gap-4">
                <p className="text-sm font-medium">
                  Moves:{" "}
                  <span className="text-blue-600 font-bold">{moves}</span>
                </p>
                <p className="text-sm font-medium">
                  Time:{" "}
                  <span className="text-purple-600 font-bold">
                    {formatTime(gameTime)}
                  </span>
                </p>
              </div>
              <p className="text-sm font-medium">
                Pairs Found:{" "}
                <span className="text-green-600 font-bold">{matchedPairs}</span>{" "}
                / <span className="text-gray-600">{cards.length / 2}</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${(matchedPairs / (cards.length / 2)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="sm"
                onClick={initializeGame}
              >
                New Game
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setGameStarted(false);
                  setTimerActive(false);
                }}
              >
                Change Difficulty
              </Button>
            </div>
          </div>

          <div
            className={`grid ${
              difficulty === "easy"
                ? "grid-cols-2 md:grid-cols-4"
                : difficulty === "medium"
                ? "grid-cols-3 md:grid-cols-4"
                : "grid-cols-4"
            } gap-3`}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className={`aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  card.flipped || card.matched ? "rotate-y-180" : ""
                } ${card.matched ? "opacity-70" : ""}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="relative w-full h-full preserve-3d">
                  <div
                    className={`absolute w-full h-full backface-hidden ${
                      card.flipped || card.matched ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Card className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl border-2 border-blue-600 shadow-md">
                      ?
                    </Card>
                  </div>
                  <div
                    className={`absolute w-full h-full rotate-y-180 backface-hidden ${
                      card.flipped || card.matched ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Card
                      className={`w-full h-full flex items-center justify-center text-center p-2 border-2 ${
                        card.matched
                          ? "bg-green-100 border-green-500 shadow-md"
                          : "bg-white border-blue-400 shadow-md"
                      }`}
                    >
                      <span
                        className={`font-medium text-lg ${
                          card.matched ? "text-green-700" : "text-blue-700"
                        }`}
                      >
                        {card.content}
                      </span>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gameComplete && (
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-md border border-green-300 shadow-md">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
                Congratulations!
              </h3>
              <div className="mb-4">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {calculateScore()}
                </div>
                <p className="text-lg">
                  You completed the game in{" "}
                  <span className="font-bold text-blue-600">{moves}</span> moves
                  and{" "}
                  <span className="font-bold text-purple-600">
                    {formatTime(gameTime)}
                  </span>
                  !
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="text-blue-600 font-bold">{moves}</div>
                  <div className="text-blue-500 text-sm">Moves</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <div className="text-purple-600 font-bold">
                    {formatTime(gameTime)}
                  </div>
                  <div className="text-purple-500 text-sm">Time</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-green-600 font-bold">{difficulty}</div>
                  <div className="text-green-500 text-sm">Difficulty</div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  onClick={initializeGame}
                >
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-600"
                  onClick={() => {
                    setGameStarted(false);
                    setTimerActive(false);
                  }}
                >
                  Change Difficulty
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
