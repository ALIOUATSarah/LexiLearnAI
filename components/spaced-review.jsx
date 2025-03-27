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
  RefreshCcw,
  Settings,
  BarChart2,
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
  const [showSettings, setShowSettings] = useState(false);
  const [algorithm, setAlgorithm] = useState("standard");
  const [dailyCount, setDailyCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

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

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const handleRateRecall = (difficulty) => {
    // In a real app, this would update the spaced repetition algorithm
    // with the student's reported recall difficulty
    setSelectedDifficulty(difficulty);

    // Mock update the review items
    const updatedItems = [...reviewItems];
    updatedItems[currentQuestion].lastRecallDifficulty = difficulty;
    setReviewItems(updatedItems);

    // Show the next question after a brief delay
    setTimeout(() => {
      if (currentQuestion < reviewItems.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowAnswer(false);
      } else {
        setIsReviewComplete(true);
        toast({
          title: "Review Complete!",
          description: "Great job completing your spaced repetition review.",
        });
      }
    }, 1000);
  };

  const formatItemType = (type) => {
    // Implement formatItemType logic
  };

  const formatTimeAgo = (time) => {
    // Implement formatTimeAgo logic
  };

  const formatNextReview = (lastReviewed, rating) => {
    // Implement formatNextReview logic
  };

  const getItemTypeIcon = (type, reviewed) => {
    // Implement getItemTypeIcon logic
  };

  if (reviewItems.length === 0) {
    return (
      <div className="p-4 sm:p-8 flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-100 mb-4">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">
            All Caught Up!
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            You have no review items scheduled for today.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {!isReviewComplete ? (
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Spaced Review
              </h2>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {reviewItems.length}
              </p>
            </div>
            <div className="flex space-x-1">
              {reviewItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-4 sm:w-6 rounded-full ${
                    index < currentQuestion
                      ? "bg-indigo-500"
                      : index === currentQuestion
                      ? "bg-indigo-300"
                      : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {reviewItems[currentQuestion].subject}
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">
              {reviewItems[currentQuestion].question}
            </h3>

            {showAnswer ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 sm:p-5 md:p-6 mb-6">
                <h4 className="font-medium text-indigo-900 mb-2 text-sm sm:text-base">
                  Answer:
                </h4>
                <div className="prose prose-sm sm:prose max-w-none">
                  <p>
                    {
                      reviewItems[currentQuestion].options[
                        reviewItems[currentQuestion].correctAnswer
                      ]
                    }
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleRevealAnswer}
                className="w-full py-5 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors mb-6"
              >
                Reveal Answer
              </button>
            )}

            {showAnswer && (
              <div className="animate-fadeIn">
                <h4 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
                  How well did you recall this?
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={() => handleRateRecall("Easy")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === "Easy"
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => handleRateRecall("Medium")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handleRateRecall("Hard")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === "Hard"
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    Hard
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <div className="text-xs sm:text-sm text-gray-500">
              Last reviewed:{" "}
              {new Date(
                reviewItems[currentQuestion].lastReviewed
              ).toLocaleDateString()}
            </div>
            {showAnswer && selectedDifficulty && (
              <div className="animate-fadeIn text-xs sm:text-sm text-gray-500">
                Next review:{" "}
                {selectedDifficulty === "Easy"
                  ? "7 days"
                  : selectedDifficulty === "Medium"
                  ? "3 days"
                  : "Tomorrow"}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 mb-4 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            Review Complete!
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Great job! You've completed your spaced repetition review for today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <BarChart2 className="h-4 w-4 mr-2" />
              View Progress
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Start Another Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
