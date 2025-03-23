"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function GameQuiz() {
  const { toast } = useToast()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const timerRef = useRef(null)
  const [selectedOption, setSelectedOption] = useState(null)

  // Initialize the game
  useEffect(() => {
    const quizQuestions = [
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
        options: ["Theory of Relativity", "Mass-energy equivalence", "Gravitational force", "Momentum"],
        correctAnswer: 1,
      },
      {
        question: "Which scientist discovered the law of gravity?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Niels Bohr"],
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
        options: ["300,000 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"],
        correctAnswer: 0,
      },
      {
        question: "Which law states that energy cannot be created or destroyed?",
        options: ["Newton's First Law", "Law of Conservation of Energy", "Ohm's Law", "Boyle's Law"],
        correctAnswer: 1,
      },
    ]

    // Shuffle the questions
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions.slice(0, 5)) // Take 5 random questions
  }, [])

  // Timer effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (gameActive && timeLeft === 0) {
      // Time's up for this question
      handleNextQuestion()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [gameActive, timeLeft])

  const startGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(10)
    setGameActive(true)
    setGameOver(false)
    setSelectedOption(null)
  }

  const handleAnswer = (selectedIndex) => {
    if (!gameActive) return

    // Clear the timer
    if (timerRef.current) clearTimeout(timerRef.current)

    setSelectedOption(selectedIndex)

    // Check if answer is correct
    const isCorrect = selectedIndex === questions[currentQuestion].correctAnswer

    // Calculate points based on time left (faster answers get more points)
    const points = isCorrect ? Math.max(5, timeLeft * 2) : 0

    // Update score
    if (isCorrect) {
      setScore(score + points)
      toast({
        title: `Correct! +${points} points`,
        description: `Great job! ${timeLeft > 5 ? "That was fast!" : ""}`,
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect!",
        description: `The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`,
        variant: "destructive",
      })
    }

    // Move to next question
    setTimeout(() => {
      handleNextQuestion()
      setSelectedOption(null)
    }, 1000)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setTimeLeft(10)
    } else {
      // Game over
      setGameActive(false)
      setGameOver(true)
    }
  }

  return (
    <div className="space-y-6">
      {!gameActive && !gameOver ? (
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Speed Quiz Challenge
          </h2>
          <p className="mb-6 text-gray-700">Answer quickly to earn more points! You have 10 seconds per question.</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
            onClick={startGame}
          >
            Start Game
          </Button>
        </div>
      ) : gameOver ? (
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300 shadow-lg">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Game Over!
          </h2>
          <p className="text-xl mb-6">
            Your final score: <span className="font-bold text-blue-600">{score}</span> points
          </p>

          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {score}
              </div>
              <div className="text-blue-600 font-medium">Points</div>
            </div>
          </div>

          <div className="mb-6">
            {score > 75 ? (
              <p className="text-green-600 font-medium text-lg bg-green-50 p-3 rounded-md border border-green-200 inline-block">
                Amazing! You're a physics genius! 🏆
              </p>
            ) : score > 50 ? (
              <p className="text-blue-600 font-medium text-lg bg-blue-50 p-3 rounded-md border border-blue-200 inline-block">
                Great job! You know your physics well! 🎓
              </p>
            ) : (
              <p className="text-purple-600 font-medium text-lg bg-purple-50 p-3 rounded-md border border-purple-200 inline-block">
                Good effort! Keep practicing to improve! 💪
              </p>
            )}
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
            onClick={startGame}
          >
            Play Again
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Score: {score}
            </div>
            <div className="text-sm font-medium bg-white px-3 py-1 rounded-full border border-blue-200">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">
                Time Left:{" "}
                <span
                  className={`font-bold ${
                    timeLeft > 7 ? "text-green-600" : timeLeft > 3 ? "text-amber-600" : "text-red-600"
                  }`}
                >
                  {timeLeft}s
                </span>
              </span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  timeLeft > 7
                    ? "bg-green-100 text-green-700"
                    : timeLeft > 3
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {timeLeft > 7 ? "Fast answer = more points!" : timeLeft > 3 ? "Hurry!" : "Quick!"}
              </span>
            </div>
            <Progress
              value={(timeLeft / 10) * 100}
              className="h-3"
              indicatorClassName={`${
                timeLeft > 7
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : timeLeft > 3
                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                    : "bg-gradient-to-r from-red-400 to-red-600"
              }`}
            />
          </div>

          <Card className="border-2 border-blue-400 mb-6 overflow-hidden shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 border-b border-blue-200">
              <CardTitle className="text-center text-blue-800">{questions[currentQuestion]?.question}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-white">
              <div className="grid grid-cols-1 gap-3 mt-2">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`justify-start text-left h-auto py-4 border-2 ${
                      selectedOption === index
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    } transition-all duration-200`}
                    onClick={() => handleAnswer(index)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                        selectedOption === index ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

