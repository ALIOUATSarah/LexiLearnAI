"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Trophy,
  Clock,
  Brain,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function SpacedReview({ studentId = "S12345" }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [reviewHistory, setReviewHistory] = useState({});
  const [streak, setStreak] = useState(0);
  const [isReviewComplete, setIsReviewComplete] = useState(false);
  const [reviewItems, setReviewItems] = useState([]);
  const { toast } = useToast();

  // Mock student's difficult questions for review
  const mockReviewData = {
    S12345: [
      {
        id: "Q1",
        subject: "Physics",
        topic: "Newton's Laws",
        question:
          "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
        options: [
          "Newton's First Law",
          "Newton's Second Law",
          "Newton's Third Law",
          "Law of Conservation of Mass",
        ],
        correctAnswer: 2,
        lastReviewed: null,
        nextReviewDate: null,
        reviewLevel: 0, // 0=new, 1=1 day, 2=3 days, 3=7 days, 4=14 days, 5=30 days
        mistakeCount: 2,
      },
      {
        id: "Q2",
        subject: "Math",
        topic: "Calculus",
        question: "What is the derivative of e^x?",
        options: ["e^x", "x*e^(x-1)", "1/x", "ln(x)"],
        correctAnswer: 0,
        lastReviewed: null,
        nextReviewDate: null,
        reviewLevel: 0,
        mistakeCount: 3,
      },
      {
        id: "Q3",
        subject: "Biology",
        topic: "Cell Structure",
        question:
          "Which organelle is responsible for energy production in the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
        correctAnswer: 1,
        lastReviewed: null,
        nextReviewDate: null,
        reviewLevel: 0,
        mistakeCount: 1,
      },
      {
        id: "Q4",
        subject: "Chemistry",
        topic: "Periodic Table",
        question: "What is the atomic number of Oxygen?",
        options: ["6", "8", "16", "32"],
        correctAnswer: 1,
        lastReviewed: null,
        nextReviewDate: null,
        reviewLevel: 0,
        mistakeCount: 2,
      },
      {
        id: "Q5",
        subject: "Physics",
        topic: "Electricity",
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 2,
        lastReviewed: null,
        nextReviewDate: null,
        reviewLevel: 0,
        mistakeCount: 4,
      },
    ],
  };

  // Load review items for the student
  useEffect(() => {
    // In a real app, this would load from an API or database
    const studentReviewItems = mockReviewData[studentId] || [];

    // Sort by priority (higher mistake count first)
    const sortedItems = [...studentReviewItems].sort(
      (a, b) => b.mistakeCount - a.mistakeCount
    );

    setReviewItems(sortedItems);

    // Load any existing review history from localStorage
    const savedHistory = localStorage.getItem(`reviewHistory-${studentId}`);
    if (savedHistory) {
      setReviewHistory(JSON.parse(savedHistory));
    }
  }, [studentId]);

  // Calculate next review date based on spaced repetition algorithm
  const calculateNextReview = (item, wasCorrect) => {
    // Current review level determines interval
    const intervals = [1, 3, 7, 14, 30, 60]; // days until next review
    let newReviewLevel = item.reviewLevel;

    if (wasCorrect) {
      // Move up a level if correct (max level is 5)
      newReviewLevel = Math.min(5, newReviewLevel + 1);
    } else {
      // Move down two levels if incorrect (min level is 0)
      newReviewLevel = Math.max(0, newReviewLevel - 2);
    }

    // Calculate next review date
    const today = new Date();
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + intervals[newReviewLevel]);

    return {
      newReviewLevel,
      lastReviewed: today.toISOString(),
      nextReviewDate: nextDate.toISOString(),
    };
  };

  // Handle submitting an answer
  const handleSubmit = () => {
    if (selectedOption === null) return;

    const currentItem = reviewItems[currentQuestion];
    const wasCorrect = selectedOption === currentItem.correctAnswer;

    setIsCorrect(wasCorrect);

    // Update streak
    if (wasCorrect) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    // Calculate next review timing
    const { newReviewLevel, lastReviewed, nextReviewDate } =
      calculateNextReview(currentItem, wasCorrect);

    // Update review history
    const updatedHistory = {
      ...reviewHistory,
      [currentItem.id]: {
        ...currentItem,
        reviewLevel: newReviewLevel,
        lastReviewed,
        nextReviewDate,
        mistakeCount: wasCorrect
          ? Math.max(0, currentItem.mistakeCount - 1)
          : currentItem.mistakeCount + 1,
      },
    };

    setReviewHistory(updatedHistory);

    // Save to localStorage (in a real app, would save to database)
    localStorage.setItem(
      `reviewHistory-${studentId}`,
      JSON.stringify(updatedHistory)
    );

    // Show feedback
    toast({
      title: wasCorrect ? "Correct!" : "Incorrect",
      description: wasCorrect
        ? "You'll see this question again in " +
          [1, 3, 7, 14, 30, 60][newReviewLevel] +
          " days"
        : "You'll review this question again soon",
      variant: wasCorrect ? "success" : "destructive",
    });

    // Proceed after a short delay
    setTimeout(() => {
      if (currentQuestion < reviewItems.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setIsReviewComplete(true);
      }
    }, 1500);
  };

  // Handle option selection
  const handleOptionSelect = (value) => {
    setSelectedOption(parseInt(value));
  };

  // Reset review session
  const resetReview = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setStreak(0);
    setIsReviewComplete(false);
  };

  // Calculate mastery percentage
  const calculateMastery = () => {
    if (Object.keys(reviewHistory).length === 0) return 0;

    const totalItems = reviewItems.length;
    const masteredItems = reviewItems.filter((item) => {
      const history = reviewHistory[item.id];
      return history && history.reviewLevel >= 3;
    }).length;

    return Math.round((masteredItems / totalItems) * 100);
  };

  // Get background style for the quiz based on subject
  const getSubjectStyle = (subject) => {
    switch (subject) {
      case "Physics":
        return "bg-blue-50";
      case "Math":
        return "bg-purple-50";
      case "Biology":
        return "bg-green-50";
      case "Chemistry":
        return "bg-amber-50";
      default:
        return "bg-gray-50";
    }
  };

  // Get badge style for the subject
  const getSubjectBadgeStyle = (subject) => {
    switch (subject) {
      case "Physics":
        return "bg-blue-100 text-blue-700";
      case "Math":
        return "bg-purple-100 text-purple-700";
      case "Biology":
        return "bg-green-100 text-green-700";
      case "Chemistry":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (reviewItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">No Review Items</h2>
        <p className="text-gray-600 mb-4">
          You don't have any questions that need review at the moment.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">Go to Lessons</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!isReviewComplete ? (
        <div className="space-y-6">
          {/* Header information */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                <Brain className="w-4 h-4 mr-1" /> Spaced Review
              </Badge>
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {reviewItems.length}
              </span>
            </div>

            {streak >= 2 && (
              <Badge className="bg-green-100 text-green-700 px-3 py-1">
                <Trophy className="w-4 h-4 mr-1" /> Streak: {streak}
              </Badge>
            )}
          </div>

          {/* Progress bar */}
          <Progress
            value={((currentQuestion + 1) / reviewItems.length) * 100}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-purple-500"
          />

          {/* Question card */}
          <Card
            className={`border-2 border-${reviewItems[
              currentQuestion
            ]?.subject?.toLowerCase()}-300 ${getSubjectStyle(
              reviewItems[currentQuestion]?.subject
            )}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <Badge
                    className={getSubjectBadgeStyle(
                      reviewItems[currentQuestion]?.subject
                    )}
                  >
                    {reviewItems[currentQuestion]?.subject}
                  </Badge>
                  <span className="text-sm text-gray-500 ml-2">
                    {reviewItems[currentQuestion]?.topic}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline-block mr-1" />
                  {reviewItems[currentQuestion]?.mistakeCount > 1
                    ? `Missed ${reviewItems[currentQuestion]?.mistakeCount} times`
                    : `Missed once`}
                </div>
              </div>
              <CardTitle className="text-xl mt-3">
                {reviewItems[currentQuestion]?.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <RadioGroup
                value={selectedOption?.toString()}
                onValueChange={handleOptionSelect}
              >
                <div className="space-y-3">
                  {reviewItems[currentQuestion]?.options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`
                        flex items-center space-x-2 p-3 rounded-md border
                        ${
                          isCorrect !== null &&
                          index === reviewItems[currentQuestion]?.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : isCorrect === false && index === selectedOption
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                        }
                        ${
                          selectedOption === index && isCorrect === null
                            ? "border-purple-500 bg-purple-50"
                            : ""
                        }
                        transition-colors
                      `}
                        onClick={() =>
                          isCorrect === null &&
                          handleOptionSelect(index.toString())
                        }
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          disabled={isCorrect !== null}
                          className={
                            isCorrect !== null ? "pointer-events-none" : ""
                          }
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          {option}
                        </Label>

                        {isCorrect !== null &&
                          index ===
                            reviewItems[currentQuestion]?.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}

                        {isCorrect === false && index === selectedOption && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </RadioGroup>

              <div className="mt-6 flex justify-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 px-8"
                  onClick={handleSubmit}
                  disabled={selectedOption === null || isCorrect !== null}
                >
                  {isCorrect !== null ? "Processing..." : "Submit Answer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-2 border-purple-300 shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Review Complete!
            </CardTitle>
            <CardDescription className="text-center text-base">
              Great job completing your spaced review session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-4 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-purple-600" />
              </div>

              <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden mt-6 mb-2">
                <div
                  className="absolute top-0 left-0 h-full bg-purple-500"
                  style={{ width: `${calculateMastery()}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">
                {calculateMastery()}% mastery of review materials
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {
                    reviewItems.filter(
                      (item) =>
                        reviewHistory[item.id] &&
                        reviewHistory[item.id].reviewLevel >= 3
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Mastered</div>
              </div>

              <div className="text-center bg-yellow-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-600">
                  {
                    reviewItems.filter(
                      (item) =>
                        reviewHistory[item.id] &&
                        reviewHistory[item.id].reviewLevel >= 1 &&
                        reviewHistory[item.id].reviewLevel < 3
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Learning</div>
              </div>

              <div className="text-center bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">
                  {
                    reviewItems.filter(
                      (item) =>
                        !reviewHistory[item.id] ||
                        reviewHistory[item.id].reviewLevel === 0
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Challenging</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-600"
                onClick={resetReview}
              >
                Review Again
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
