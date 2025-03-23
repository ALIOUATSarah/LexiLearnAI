"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Volume2, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const courseId = params.id
  const [mode, setMode] = useState("normal")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [points, setPoints] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  // Quiz questions (would come from API in a real app)
  const quizQuestions = {
    physics101: [
      {
        id: 1,
        question:
          "Which of Newton's laws states that an object at rest stays at rest unless acted upon by an external force?",
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Newton's Law of Gravity"],
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
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
        correctAnswer: 1,
      },
    ],
    // Add other courses as needed
  }

  const questions = quizQuestions[courseId] || []

  // Text-to-speech function
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9 // Slightly slower for better comprehension
      window.speechSynthesis.speak(utterance)
    }
  }

  // Apply mode-specific classes
  const getModeClasses = () => {
    switch (mode) {
      case "dyslexia":
        return "font-dyslexic bg-cream text-dark"
      case "adhd":
        return "bg-light-blue"
      default:
        return ""
    }
  }

  const handleOptionSelect = (index) => {
    setSelectedOption(index)
  }

  const handleNextQuestion = () => {
    // Check if answer is correct
    const isAnswerCorrect = selectedOption === questions[currentQuestion].correctAnswer

    if (isAnswerCorrect) {
      setScore(score + 1)

      if (mode === "adhd") {
        const newPoints = points + 10
        setPoints(newPoints)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)

        toast({
          title: "Correct! +10 points",
          description: "Great job! Keep going!",
          variant: "default",
        })
      }
    }

    setIsCorrect(isAnswerCorrect)

    // Show result for a moment before moving to next question
    setTimeout(
      () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
          setIsCorrect(null)
        } else {
          setShowResult(true)
        }
      },
      mode === "adhd" ? 1500 : 1000,
    )
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
    setPoints(0)
  }

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
          <>
            {mode === "adhd" && !showResult ? (
              <div className="max-w-3xl mx-auto">
                {/* Progress indicator */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
                      Points: {points}
                    </div>
                  </div>
                  <Progress
                    value={((currentQuestion + 1) / questions.length) * 100}
                    className="h-3 bg-blue-200"
                    indicatorClassName="bg-gradient-to-r from-green-400 to-blue-500"
                  />
                </div>

                {/* Question card */}
                <Card className="border-2 border-blue-400 shadow-lg bg-gradient-to-b from-blue-50 to-white">
                  <CardHeader className="bg-blue-100 border-b border-blue-300">
                    <CardTitle className="text-xl text-blue-800">{questions[currentQuestion]?.question}</CardTitle>
                  </CardHeader>

                  <CardContent className="p-6">
                    <RadioGroup value={selectedOption?.toString()} className="space-y-4">
                      {questions[currentQuestion]?.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-4 rounded-md transition-all duration-200 ${
                            selectedOption === index
                              ? "border-2 border-blue-500 bg-blue-50 shadow-md transform scale-105"
                              : "border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
                          } ${
                            isCorrect !== null && index === questions[currentQuestion].correctAnswer
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
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                            {option}

                            {isCorrect !== null && index === questions[currentQuestion].correctAnswer && (
                              <CheckCircle2 className="inline ml-2 text-green-500" size={20} />
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
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : null}

            {mode !== "adhd" ? (
              <div className="max-w-3xl mx-auto">
                {/* Progress indicator */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    {mode === "adhd" && (
                      <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold">Points: {points}</div>
                    )}
                  </div>
                  <Progress
                    value={((currentQuestion + 1) / questions.length) * 100}
                    className={`h-2 ${mode === "adhd" ? "bg-blue-200" : ""}`}
                  />
                </div>

                {/* Question card */}
                <Card
                  className={`${
                    mode === "adhd" ? "border-2 border-blue-400 shadow-lg" : mode === "dyslexia" ? "border-2" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className={`${mode === "dyslexia" ? "text-2xl" : "text-xl"}`}>
                      {questions[currentQuestion]?.question}

                      {mode === "dyslexia" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 inline-flex items-center"
                          onClick={() => speakText(questions[currentQuestion]?.question)}
                        >
                          <Volume2 size={16} className="mr-1" />
                          <span className="sr-only">Listen</span>
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <RadioGroup value={selectedOption?.toString()} className="space-y-4">
                      {questions[currentQuestion]?.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-3 rounded-md ${
                            mode === "adhd" ? "border-2 hover:border-blue-400 transition-all duration-200" : "border"
                          } ${
                            selectedOption === index
                              ? mode === "adhd"
                                ? "border-blue-500 bg-blue-50"
                                : "border-primary"
                              : ""
                          } ${
                            isCorrect !== null && index === questions[currentQuestion].correctAnswer
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
                            className={`flex-1 cursor-pointer ${mode === "dyslexia" ? "text-lg" : ""}`}
                          >
                            {option}

                            {isCorrect !== null && index === questions[currentQuestion].correctAnswer && (
                              <CheckCircle2 className="inline ml-2 text-green-500" size={16} />
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
                      className={`${mode === "adhd" ? "bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2" : ""}`}
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : null}
          </>
        ) : (
          <>
            {mode === "adhd" && showResult ? (
              <div className="max-w-3xl mx-auto">
                <Card className="text-center border-2 border-blue-400 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                    <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
                  </div>

                  <CardContent className="space-y-4 p-8">
                    <div className="py-6">
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                        {points} Points!
                      </div>
                      <div className="text-2xl font-medium mb-6">
                        You got {score} out of {questions.length} questions correct!
                      </div>
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-inner">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                              {Math.round((score / questions.length) * 100)}%
                            </div>
                            <div className="text-blue-600 font-medium">Score</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                          <div className="text-green-600 font-bold text-lg">Great Job!</div>
                          <div className="text-green-700">Keep it up!</div>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
                          <div className="text-blue-600 font-bold text-lg">{points} Points</div>
                          <div className="text-blue-700">Earned</div>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
                          <div className="text-purple-600 font-bold text-lg">Level Up!</div>
                          <div className="text-purple-700">+1 Achievement</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-center gap-4 p-6 bg-gray-50 border-t">
                    <Button variant="outline" className="border-blue-300 text-blue-600" asChild>
                      <Link href={`/course/${courseId}`}>Back to Course</Link>
                    </Button>
                    <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700">
                      Try Again
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      asChild
                    >
                      <Link href="/games">Play Learning Games</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : null}

            {mode !== "adhd" ? (
              <div className="max-w-3xl mx-auto">
                <Card
                  className={`text-center ${
                    mode === "adhd" ? "border-2 border-blue-400 shadow-lg" : mode === "dyslexia" ? "border-2" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className={`${mode === "dyslexia" ? "text-3xl" : "text-2xl"}`}>Quiz Results</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {mode === "adhd" ? (
                      <div className="py-6">
                        <div className="text-5xl font-bold text-blue-600 mb-2">{points} Points!</div>
                        <div className="text-2xl font-medium mb-6">
                          You got {score} out of {questions.length} questions correct!
                        </div>
                        <div className="flex justify-center">
                          <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-blue-600">
                                {Math.round((score / questions.length) * 100)}%
                              </div>
                              <div className="text-blue-600 font-medium">Score</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <div className="text-2xl font-medium mb-4">
                          You got {score} out of {questions.length} questions correct!
                        </div>
                        <div className="text-4xl font-bold mb-2">{Math.round((score / questions.length) * 100)}%</div>
                        <Progress value={(score / questions.length) * 100} className="h-4 w-64 mx-auto mt-4" />
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-center gap-4">
                    <Button variant="outline" asChild>
                      <Link href={`/course/${courseId}`}>Back to Course</Link>
                    </Button>
                    <Button onClick={restartQuiz}>Try Again</Button>
                    {mode === "adhd" && (
                      <Button className="bg-green-500 hover:bg-green-600" asChild>
                        <Link href="/games">Play Learning Games</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ) : null}
          </>
        )}
      </main>
    </div>
  )
}

