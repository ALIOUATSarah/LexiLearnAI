"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle } from "lucide-react";

export function GameQuiz({ courseTopic }) {
  const { toast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);

  // Initialize the game
  useEffect(() => {
    // Course-specific quiz questions
    const courseQuizQuestions = {
      physics: [
        {
          question: "What is the unit of force?",
          options: ["Watt", "Newton", "Joule", "Volt"],
          correctAnswer: 1,
        },
        {
          question: "Which of these is NOT a type of energy?",
          options: ["Kinetic", "Potential", "Thermal", "Velocity"],
          correctAnswer: 3,
        },
        {
          question: "What does E=mc² represent?",
          options: [
            "Theory of Relativity",
            "Mass-energy equivalence",
            "Gravitational force",
            "Momentum",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which scientist discovered the law of gravity?",
          options: [
            "Albert Einstein",
            "Isaac Newton",
            "Galileo Galilei",
            "Niels Bohr",
          ],
          correctAnswer: 1,
        },
        {
          question: "What is the SI unit of electric current?",
          options: ["Volt", "Watt", "Ampere", "Ohm"],
          correctAnswer: 2,
        },
        {
          question: "Which of these is a vector quantity?",
          options: ["Mass", "Temperature", "Velocity", "Time"],
          correctAnswer: 2,
        },
        {
          question: "What is the speed of light in vacuum?",
          options: [
            "300,000 km/s",
            "150,000 km/s",
            "3,000 km/s",
            "30,000 km/s",
          ],
          correctAnswer: 0,
        },
        {
          question:
            "Which law states that energy cannot be created or destroyed?",
          options: [
            "Newton's First Law",
            "Law of Conservation of Energy",
            "Ohm's Law",
            "Boyle's Law",
          ],
          correctAnswer: 1,
        },
      ],
      math: [
        {
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.14", "3.16", "3.12", "3.18"],
          correctAnswer: 0,
        },
        {
          question: "What is the formula for the area of a circle?",
          options: ["A = πr", "A = πr²", "A = 2πr", "A = πd"],
          correctAnswer: 1,
        },
        {
          question: "What is the Pythagorean theorem?",
          options: ["a + b = c", "a² + b² = c²", "a × b = c", "a² - b² = c²"],
          correctAnswer: 1,
        },
        {
          question: "What is the derivative of sin(x)?",
          options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
          correctAnswer: 0,
        },
        {
          question: "What is the value of log₁₀(100)?",
          options: ["1", "2", "10", "100"],
          correctAnswer: 1,
        },
      ],
      chemistry: [
        {
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2,
        },
        {
          question: "What is the pH of a neutral solution?",
          options: ["0", "7", "10", "14"],
          correctAnswer: 1,
        },
        {
          question: "Which of these is a noble gas?",
          options: ["Oxygen", "Chlorine", "Neon", "Sodium"],
          correctAnswer: 2,
        },
        {
          question: "What is the chemical formula for water?",
          options: ["H₂O", "CO₂", "NaCl", "C₆H₁₂O₆"],
          correctAnswer: 0,
        },
        {
          question: "Which element has the atomic number 1?",
          options: ["Oxygen", "Carbon", "Helium", "Hydrogen"],
          correctAnswer: 3,
        },
      ],
      biology: [
        {
          question: "What is the powerhouse of the cell?",
          options: [
            "Nucleus",
            "Mitochondria",
            "Endoplasmic Reticulum",
            "Golgi Apparatus",
          ],
          correctAnswer: 1,
        },
        {
          question: "What is the process by which plants make their own food?",
          options: [
            "Respiration",
            "Photosynthesis",
            "Transpiration",
            "Digestion",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which of these is NOT a type of blood cell?",
          options: ["Red Blood Cell", "White Blood Cell", "Platelet", "Neuron"],
          correctAnswer: 3,
        },
        {
          question: "What is the basic unit of life?",
          options: ["Cell", "Atom", "Molecule", "Tissue"],
          correctAnswer: 0,
        },
        {
          question: "Which of these is NOT a part of the digestive system?",
          options: ["Stomach", "Liver", "Lungs", "Intestines"],
          correctAnswer: 2,
        },
      ],
      default: [
        {
          question: "What is the primary purpose of education?",
          options: [
            "To memorize facts",
            "To develop critical thinking",
            "To pass tests",
            "To get a job",
          ],
          correctAnswer: 1,
        },
        {
          question: "Which learning style focuses on visual aids?",
          options: ["Auditory", "Kinesthetic", "Visual", "Reading/Writing"],
          correctAnswer: 2,
        },
        {
          question: "What is metacognition?",
          options: [
            "Thinking about thinking",
            "Memorization technique",
            "Learning by doing",
            "Group learning",
          ],
          correctAnswer: 0,
        },
        {
          question: "Which of these is a benefit of collaborative learning?",
          options: [
            "Less social interaction",
            "More competition",
            "Diverse perspectives",
            "Faster learning pace",
          ],
          correctAnswer: 2,
        },
        {
          question: "What is the purpose of formative assessment?",
          options: [
            "Grading students",
            "Monitoring progress",
            "Ranking students",
            "Final evaluation",
          ],
          correctAnswer: 1,
        },
      ],
    };

    // Get questions based on course topic
    const topicQuestions =
      courseTopic && courseQuizQuestions[courseTopic]
        ? courseQuizQuestions[courseTopic]
        : courseQuizQuestions.default;

    // Shuffle the questions
    const shuffledQuestions = [...topicQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuestions(shuffledQuestions.slice(0, 5)); // Take 5 random questions
  }, [courseTopic]);

  // Timer effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameActive && timeLeft === 0 && questions.length > 0) {
      // Time's up for this question - only proceed if we have questions
      handleNextQuestion();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameActive, timeLeft, questions]);

  const startGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    setGameOver(false);
    setSelectedOption(null);
  };

  const handleAnswer = (selectedIndex) => {
    if (!gameActive) return;

    // Clear the timer
    if (timerRef.current) clearTimeout(timerRef.current);

    setSelectedOption(selectedIndex);

    // Check if answer is correct
    const isCorrect =
      selectedIndex === questions[currentQuestion].correctAnswer;

    // Calculate points based on time left (faster answers get more points)
    const points = isCorrect ? Math.max(5, timeLeft * 2) : 0;

    // Update score
    if (isCorrect) {
      setScore(score + points);
      toast({
        title: `Correct! +${points} points`,
        description: `Great job! ${timeLeft > 5 ? "That was fast!" : ""}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer was: ${
          questions[currentQuestion].options[
            questions[currentQuestion].correctAnswer
          ]
        }`,
        variant: "destructive",
      });
    }

    // Visual feedback - highlight correct/incorrect answer
    setTimeout(() => {
      // Move to next question
      handleNextQuestion();
      setSelectedOption(null);
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
      setSelectedOption(null);
    } else {
      // Game over
      setGameActive(false);
      setGameOver(true);
    }
  };

  return (
    <div className="space-y-4">
      {!gameActive && !gameOver ? (
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Speed Quiz Challenge
          </h2>
          <p className="mb-6 text-gray-700">
            Answer quickly to earn more points! You have 10 seconds per
            question.
          </p>
          <div className="bg-white p-5 rounded-lg mb-8 border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">
              How to Play:
            </h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                  1
                </span>
                <span>Answer each question as quickly as possible</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                  2
                </span>
                <span>The faster you answer, the more points you earn</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center mr-2 shrink-0">
                  3
                </span>
                <span>If time runs out, you'll move to the next question</span>
              </li>
            </ul>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 animate-pulse"
            onClick={startGame}
          >
            Start Game
          </Button>
        </div>
      ) : gameOver ? (
        <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 shadow-md">
          <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Quiz Complete!
          </h3>

          <div className="mb-6">
            <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              {score} points
            </div>
            <p className="text-gray-600">
              You got{" "}
              <span className="font-bold text-green-600">{correctAnswers}</span>{" "}
              out of{" "}
              <span className="font-bold text-blue-600">
                {questions.length}
              </span>{" "}
              questions correct!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-blue-600 font-bold">{correctAnswers}</div>
              <div className="text-blue-500 text-xs sm:text-sm">Correct</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <div className="text-amber-600 font-bold">
                {averageTime.toFixed(1)}s
              </div>
              <div className="text-amber-500 text-xs sm:text-sm">Avg. Time</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="text-purple-600 font-bold">{streak}</div>
              <div className="text-purple-500 text-xs sm:text-sm">
                Best Streak
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto"
              onClick={startGame}
            >
              Play Again
            </Button>

            <Button
              variant="outline"
              className="border-blue-300 text-blue-600 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Score: {score}
            </div>
            <div className="text-xs sm:text-sm font-medium bg-white px-3 py-1 rounded-full border border-blue-200">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm font-medium">
                Time Left:{" "}
                <span
                  className={`font-bold ${
                    timeLeft > 7
                      ? "text-green-600"
                      : timeLeft > 3
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {timeLeft}s
                </span>
              </span>
              <span
                className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                  timeLeft > 7
                    ? "bg-green-100 text-green-700"
                    : timeLeft > 3
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {timeLeft > 7
                  ? "Fast answer = more points!"
                  : timeLeft > 3
                  ? "Hurry!"
                  : "Quick!"}
              </span>
            </div>
            <Progress
              value={(timeLeft / 10) * 100}
              className="h-2 sm:h-3"
              indicatorClassName={`${
                timeLeft > 7
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : timeLeft > 3
                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                  : "bg-gradient-to-r from-red-400 to-red-600"
              }`}
            />
          </div>

          <Card className="border-2 border-blue-400 mb-4 sm:mb-6 overflow-hidden shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 border-b border-blue-200 p-3 sm:p-4">
              <CardTitle className="text-center text-blue-800 text-sm sm:text-base md:text-lg">
                {questions[currentQuestion]?.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {questions[currentQuestion]?.options.map((option, index) => {
                  const isCorrectAnswer =
                    index === questions[currentQuestion]?.correctAnswer;
                  const isSelected = selectedOption === index;

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`justify-start text-left h-auto py-3 text-xs sm:text-sm border-2 
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }
                        ${
                          selectedOption !== null && isCorrectAnswer
                            ? "border-green-500 bg-green-50"
                            : ""
                        }
                        ${
                          selectedOption !== null &&
                          isSelected &&
                          !isCorrectAnswer
                            ? "border-red-500 bg-red-50"
                            : ""
                        }
                        transition-all duration-200`}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedOption !== null}
                    >
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3 flex items-center justify-center text-xs sm:text-sm
                          ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700"
                          }
                          ${
                            selectedOption !== null && isCorrectAnswer
                              ? "bg-green-500 text-white"
                              : ""
                          }
                          ${
                            selectedOption !== null &&
                            isSelected &&
                            !isCorrectAnswer
                              ? "bg-red-500 text-white"
                              : ""
                          }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>

                      {/* Show correct/incorrect indicators after selection */}
                      {selectedOption !== null && isCorrectAnswer && (
                        <CheckCircle2
                          className="ml-auto text-green-500 flex-shrink-0"
                          size={16}
                        />
                      )}
                      {selectedOption !== null &&
                        isSelected &&
                        !isCorrectAnswer && (
                          <XCircle
                            className="ml-auto text-red-500 flex-shrink-0"
                            size={16}
                          />
                        )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
