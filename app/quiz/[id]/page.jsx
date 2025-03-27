"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Volume2, CheckCircle2, XCircle, Trophy, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const courseId = params.id;
  const [mode, setMode] = useState("normal");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [points, setPoints] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Quiz questions (would come from API in a real app)
  const quizQuestions = {
    physics101: [
      {
        id: 1,
        question:
          "Which of Newton's laws states that an object at rest stays at rest unless acted upon by an external force?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Newton's Law of Gravity",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is the formula for calculating force?",
        options: ["F = mv", "F = ma", "F = mg", "F = m/a"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which of the following is a form of energy?",
        options: ["Velocity", "Acceleration", "Kinetic Energy", "Momentum"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "What does the law of conservation of energy state?",
        options: [
          "Energy can be created but not destroyed",
          "Energy can be destroyed but not created",
          "Energy cannot be created or destroyed, only transformed",
          "Energy can be both created and destroyed",
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Which scientist is known for the theory of relativity?",
        options: [
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Niels Bohr",
        ],
        correctAnswer: 1,
      },
    ],
    math101: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is the formula for the area of a circle?",
        options: ["A = πr", "A = πr²", "A = 2πr", "A = πd"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is the Pythagorean theorem?",
        options: ["a + b = c", "a² + b² = c²", "a × b = c", "a² - b² = c²"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "What is the value of log₁₀(100)?",
        options: ["1", "2", "10", "100"],
        correctAnswer: 1,
      },
    ],
    chemistry101: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "10", "14"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Which of these is a noble gas?",
        options: ["Oxygen", "Chlorine", "Neon", "Sodium"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "What is the chemical formula for water?",
        options: ["H₂O", "CO₂", "NaCl", "C₆H₁₂O₆"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Carbon", "Helium", "Hydrogen"],
        correctAnswer: 3,
      },
    ],
    biology101: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
        question: "Which of these is NOT a type of blood cell?",
        options: ["Red Blood Cell", "White Blood Cell", "Platelet", "Neuron"],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: "What is the basic unit of life?",
        options: ["Cell", "Atom", "Molecule", "Tissue"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "Which of these is NOT a part of the digestive system?",
        options: ["Stomach", "Liver", "Lungs", "Intestines"],
        correctAnswer: 2,
      },
    ],
    // Default questions for any course that doesn't have specific questions
    default: [
      {
        id: 1,
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
        id: 2,
        question: "Which learning style focuses on visual aids?",
        options: ["Auditory", "Kinesthetic", "Visual", "Reading/Writing"],
        correctAnswer: 2,
      },
      {
        id: 3,
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
        id: 4,
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
        id: 5,
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

  const questions = quizQuestions[courseId] || quizQuestions.default || [];

  // Start timer for ADHD mode
  useEffect(() => {
    let timer;
    if (mode === "adhd" && !showResult && timeRemaining !== null) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, timeRemaining, showResult]);

  // Reset timer when changing modes
  useEffect(() => {
    if (mode === "adhd") {
      setTimeRemaining(20); // 20 seconds for ADHD mode
    } else {
      setTimeRemaining(null);
    }
  }, [mode]);

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
        return "font-sans bg-cream text-dark";
      case "adhd":
        return "bg-blue-50";
      default:
        return "";
    }
  };

  const handleOptionSelect = (index) => {
    // Only allow selection if no answer has been confirmed yet
    if (isCorrect === null) {
      setSelectedOption(index);
    }
  };

  const handleNextQuestion = () => {
    // If no option selected, do nothing
    if (selectedOption === null) return;

    // Check if answer is correct
    const isAnswerCorrect =
      selectedOption === questions[currentQuestion].correctAnswer;

    if (isAnswerCorrect) {
      setScore(score + 1);

      if (mode === "adhd") {
        // Calculate bonus points based on remaining time
        const timeBonus = timeRemaining > 0 ? Math.ceil(timeRemaining / 2) : 0;
        const newPoints = points + 10 + timeBonus;
        setPoints(newPoints);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);

        toast({
          title: `Correct! +${10 + timeBonus} points`,
          description: `Great job! ${
            timeBonus > 0 ? `+${timeBonus} time bonus!` : "Keep going!"
          }`,
          variant: "default",
        });
      } else {
        toast({
          title: "Correct!",
          description: "Great job!",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${
          questions[currentQuestion].options[
            questions[currentQuestion].correctAnswer
          ]
        }`,
        variant: "destructive",
      });
    }

    setIsCorrect(isAnswerCorrect);

    // Show result for a moment before moving to next question
    setTimeout(
      () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          if (mode === "adhd") {
            setTimeRemaining(20); // Reset timer for next question
          }
        } else {
          setShowResult(true);
          setTimeRemaining(null); // Stop timer when showing results
        }
      },
      mode === "adhd" ? 1500 : 1000
    );
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setPoints(0);
    setIsCorrect(null);
    if (mode === "adhd") {
      setTimeRemaining(20);
    }
  };

  // Render question card based on mode
  const renderQuestionCard = () => {
    if (mode === "adhd") {
      return (
        <Card className="border-2 border-blue-400 shadow-lg bg-gradient-to-b from-blue-50 to-white">
          <CardHeader className="bg-blue-100 border-b border-blue-300">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-blue-800">
                {questions[currentQuestion]?.question}
              </CardTitle>
              {timeRemaining !== null && (
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    timeRemaining > 10
                      ? "bg-green-100 text-green-700"
                      : timeRemaining > 5
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <Clock size={16} />
                  <span className="font-bold">{timeRemaining}s</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <RadioGroup
              value={selectedOption?.toString()}
              className="space-y-4"
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-4 rounded-md transition-all duration-200 ${
                    selectedOption === index
                      ? "border-2 border-blue-500 bg-blue-50 shadow-md transform scale-105"
                      : "border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                  } ${
                    isCorrect !== null &&
                    index === questions[currentQuestion].correctAnswer
                      ? "bg-green-100 border-green-500 shadow-md"
                      : isCorrect === false && index === selectedOption
                      ? "bg-red-100 border-red-500"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    checked={selectedOption === index}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-lg"
                  >
                    {option}

                    {isCorrect !== null &&
                      index === questions[currentQuestion].correctAnswer && (
                        <CheckCircle2
                          className="inline ml-2 text-green-500"
                          size={20}
                        />
                      )}

                    {isCorrect === false && index === selectedOption && (
                      <XCircle className="inline ml-2 text-red-500" size={20} />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>

          <CardFooter className="flex justify-end p-4 bg-blue-50 border-t border-blue-200">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-6 py-2 rounded-md shadow-md disabled:opacity-50"
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      );
    } else if (mode === "dyslexia") {
      return (
        <Card className="border-2 shadow-md bg-cream">
          <CardHeader className="border-b border-amber-200 bg-amber-50">
            <CardTitle className="text-2xl">
              {questions[currentQuestion]?.question}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 inline-flex items-center"
                onClick={() => speakText(questions[currentQuestion]?.question)}
              >
                <Volume2 size={16} className="mr-1" />
                <span className="sr-only">Listen</span>
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <RadioGroup
              value={selectedOption?.toString()}
              className="space-y-4"
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-4 rounded-md border-2 ${
                    selectedOption === index
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  } ${
                    isCorrect !== null &&
                    index === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border-green-500"
                      : isCorrect === false && index === selectedOption
                      ? "bg-red-50 border-red-500"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    checked={selectedOption === index}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-lg"
                  >
                    {option}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 p-1 h-auto inline-flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(option);
                      }}
                    >
                      <Volume2 size={14} />
                      <span className="sr-only">Listen</span>
                    </Button>

                    {isCorrect !== null &&
                      index === questions[currentQuestion].correctAnswer && (
                        <CheckCircle2
                          className="inline ml-2 text-green-500"
                          size={20}
                        />
                      )}

                    {isCorrect === false && index === selectedOption && (
                      <XCircle className="inline ml-2 text-red-500" size={20} />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>

          <CardFooter className="flex justify-end p-4 bg-amber-50 border-t border-amber-200">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2"
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      );
    } else {
      // Normal mode
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {questions[currentQuestion]?.question}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={selectedOption?.toString()}
              className="space-y-4"
            >
              {questions[currentQuestion]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border ${
                    selectedOption === index
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  } ${
                    isCorrect !== null &&
                    index === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border-green-500"
                      : isCorrect === false && index === selectedOption
                      ? "bg-red-50 border-red-500"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    checked={selectedOption === index}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}

                    {isCorrect !== null &&
                      index === questions[currentQuestion].correctAnswer && (
                        <CheckCircle2
                          className="inline ml-2 text-green-500"
                          size={16}
                        />
                      )}

                    {isCorrect === false && index === selectedOption && (
                      <XCircle className="inline ml-2 text-red-500" size={16} />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      );
    }
  };

  // Render result card based on mode
  const renderResultCard = () => {
    if (mode === "adhd") {
      return (
        <Card className="text-center border-2 border-blue-400 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <CardTitle className="text-3xl font-bold">
              <Trophy className="inline-block mr-2 mb-1" size={28} />
              Quiz Results
            </CardTitle>
          </div>

          <CardContent className="space-y-4 p-8">
            <div className="py-6">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {points} Points!
              </div>
              <div className="text-2xl font-medium mb-6">
                You got {score} out of {questions.length} questions correct!
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner animate-pulse">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <div className="text-blue-600 font-medium">Score</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-lg border border-green-300 transform hover:scale-105 transition-transform">
                  <div className="text-green-600 font-bold text-lg">
                    Great Job!
                  </div>
                  <div className="text-green-700">Keep it up!</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg border border-blue-300 transform hover:scale-105 transition-transform">
                  <div className="text-blue-600 font-bold text-lg">
                    {points} Points
                  </div>
                  <div className="text-blue-700">Earned</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg border border-purple-300 transform hover:scale-105 transition-transform">
                  <div className="text-purple-600 font-bold text-lg">
                    Level Up!
                  </div>
                  <div className="text-purple-700">+1 Achievement</div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 p-6 bg-gray-50 border-t">
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600"
              asChild
            >
              <Link href={`/course/${courseId}`}>Back to Course</Link>
            </Button>
            <Button
              onClick={restartQuiz}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </Button>
            <Button
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              asChild
            >
              <Link href={`/games?topic=${courseId.replace("101", "")}`}>
                Play Learning Games
              </Link>
            </Button>
          </CardFooter>
        </Card>
      );
    } else if (mode === "dyslexia") {
      return (
        <Card className="text-center border-2 bg-cream">
          <CardHeader className="bg-amber-50 border-b border-amber-200">
            <CardTitle className="text-3xl">Quiz Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <div className="py-6">
              <div className="text-2xl font-medium mb-4">
                You got {score} out of {questions.length} questions correct!
              </div>
              <div className="text-4xl font-bold mb-2">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <Progress
                value={(score / questions.length) * 100}
                className="h-4 w-64 mx-auto mt-4"
              />

              <Button
                variant="ghost"
                className="mt-4 flex items-center gap-2"
                onClick={() =>
                  speakText(`You got ${score} out of ${
                    questions.length
                  } questions correct. 
                  Your score is ${Math.round(
                    (score / questions.length) * 100
                  )} percent.`)
                }
              >
                <Volume2 size={16} />
                <span>Listen to your results</span>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 bg-amber-50 border-t border-amber-200 p-4">
            <Button variant="outline" asChild>
              <Link href={`/course/${courseId}`}>Back to Course</Link>
            </Button>
            <Button
              onClick={restartQuiz}
              className="bg-amber-500 hover:bg-amber-600"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      );
    } else {
      // Normal mode
      return (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="py-6">
              <div className="text-2xl font-medium mb-4">
                You got {score} out of {questions.length} questions correct!
              </div>
              <div className="text-4xl font-bold mb-2">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <Progress
                value={(score / questions.length) * 100}
                className="h-4 w-64 mx-auto mt-4"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href={`/course/${courseId}`}>Back to Course</Link>
            </Button>
            <Button onClick={restartQuiz}>Try Again</Button>
          </CardFooter>
        </Card>
      );
    }
  };

  return (
    <div className={`min-h-screen ${getModeClasses()}`}>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
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
                <TabsTrigger value="adaptive">Adaptive</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" asChild>
              <Link href={`/course/${courseId}`}>Back to Course</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!showResult ? (
          <div className="max-w-3xl mx-auto">
            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                {mode === "adhd" && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
                    Points: {points}
                  </div>
                )}
              </div>
              <Progress
                value={((currentQuestion + 1) / questions.length) * 100}
                className={`h-3 ${
                  mode === "adhd"
                    ? "bg-blue-200"
                    : mode === "dyslexia"
                    ? "bg-amber-200"
                    : ""
                }`}
                indicatorClassName={
                  mode === "adhd"
                    ? "bg-gradient-to-r from-green-400 to-blue-500"
                    : mode === "dyslexia"
                    ? "bg-amber-500"
                    : ""
                }
              />
            </div>

            {/* Question card */}
            {renderQuestionCard()}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Results card */}
            {renderResultCard()}
          </div>
        )}
      </main>
    </div>
  );
}
