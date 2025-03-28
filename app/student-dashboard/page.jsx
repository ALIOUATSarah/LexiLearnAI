"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ListChecks,
  BrainCircuit,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  PlusCircle,
  X,
  Info as InfoIcon,
  CheckCircle,
  LightbulbIcon,
  PlayIcon,
  TrendingDown,
  Star,
  CalendarClock,
  LevelUp,
  CalendarCheck,
  ArrowUpCircle,
  Brain,
} from "lucide-react";
import Logo from "@/app/components/Logo";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mode, setMode] = useState("normal");
  const [showTaskBreakdown, setShowTaskBreakdown] = useState(false);
  const [taskProgress, setTaskProgress] = useState(15);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showStartTemplate, setShowStartTemplate] = useState(false);
  const [transitionWarning, setTransitionWarning] = useState(false);
  const [scaffoldingLevel, setScaffoldingLevel] = useState(3); // Levels: 3 (High), 2 (Medium), 1 (Low), 0 (Independent)
  const [showScaffoldingInfo, setShowScaffoldingInfo] = useState(false);
  const [supportHistory, setSupportHistory] = useState([
    { date: "2023-03-01", level: 3, completedTasks: 1 },
    { date: "2023-03-03", level: 3, completedTasks: 2 },
    { date: "2023-03-07", level: 2, completedTasks: 3 },
    { date: "2023-03-10", level: 2, completedTasks: 4 },
    { date: "2023-03-14", level: 1, completedTasks: 3 },
  ]);
  const [showAdaptiveTips, setShowAdaptiveTips] = useState(false);
  const [adaptiveTipIndex, setAdaptiveTipIndex] = useState(0);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();

  // Enhanced simulation for executive function support
  useEffect(() => {
    let timer;
    if (mode === "executive") {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);

        // Show transition warning after 45 seconds
        if (timeSpent === 45 && !transitionWarning) {
          setTransitionWarning(true);
        }

        // Auto-dismiss warning after 10 seconds
        if (timeSpent === 55 && transitionWarning) {
          setTransitionWarning(false);
        }

        // Show adaptive tips based on time spent
        if (timeSpent === 15) {
          setShowAdaptiveTips(true);
          setAdaptiveTipIndex(0);
        } else if (timeSpent === 30) {
          setShowAdaptiveTips(true);
          setAdaptiveTipIndex(1);
        } else if (timeSpent === 60) {
          setShowAdaptiveTips(true);
          setAdaptiveTipIndex(2);
        }

        // Auto-hide tips after 8 seconds
        if (showAdaptiveTips && timeSpent % 8 === 0) {
          setShowAdaptiveTips(false);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [mode, timeSpent, transitionWarning, showAdaptiveTips]);

  // Decrease scaffolding level based on task progress
  useEffect(() => {
    if (mode === "executive") {
      if (taskProgress >= 60 && scaffoldingLevel === 3) {
        setScaffoldingLevel(2);
      } else if (taskProgress >= 80 && scaffoldingLevel === 2) {
        setScaffoldingLevel(1);
      }
    }
  }, [taskProgress, mode, scaffoldingLevel]);

  // Simulated student data (in a real app, this would come from an API)
  const studentData = {
    id: "S12345",
    name: "Alex Johnson",
    grade: "10th Grade",
    email: "alex.j@example.com",

    // Overall stats
    overallProgress: 78,
    quizAverage: 82,
    gameScore: 645,

    // Weekly activity tracking
    weeklyActivity: [
      { name: "Mon", value: 45 },
      { name: "Tue", value: 60 },
      { name: "Wed", value: 30 },
      { name: "Thu", value: 75 },
      { name: "Fri", value: 50 },
      { name: "Sat", value: 20 },
      { name: "Sun", value: 15 },
    ],

    // Quiz performance by subject
    quizPerformance: [
      { name: "Physics", value: 85, color: "#3b82f6" },
      { name: "Math", value: 78, color: "#8b5cf6" },
      { name: "Chemistry", value: 92, color: "#10b981" },
      { name: "Biology", value: 65, color: "#f59e0b" },
    ],

    // Game performance
    gamePerformance: [
      { name: "Memory Match", value: 92, color: "#3b82f6" },
      { name: "Drag & Drop", value: 78, color: "#8b5cf6" },
      { name: "Speed Quiz", value: 85, color: "#10b981" },
    ],

    // Quiz history (most recent first)
    recentQuizzes: [
      {
        id: "Q1001",
        subject: "Physics",
        title: "Newton's Laws",
        score: 90,
        date: "2023-03-15",
        timeSpent: "12:45",
        totalQuestions: 10,
        correctAnswers: 9,
      },
      {
        id: "Q1002",
        subject: "Chemistry",
        title: "Periodic Table",
        score: 95,
        date: "2023-03-12",
        timeSpent: "10:30",
        totalQuestions: 10,
        correctAnswers: 9.5,
      },
      {
        id: "Q1003",
        subject: "Math",
        title: "Calculus Basics",
        score: 80,
        date: "2023-03-10",
        timeSpent: "15:20",
        totalQuestions: 10,
        correctAnswers: 8,
      },
      {
        id: "Q1004",
        subject: "Biology",
        title: "Cell Structure",
        score: 75,
        date: "2023-03-08",
        timeSpent: "14:10",
        totalQuestions: 10,
        correctAnswers: 7.5,
      },
    ],

    // Practice recommendations based on performance
    reviewRecommendations: [
      {
        id: "REC1",
        subject: "Biology",
        topic: "Cell Structure",
        reason: "You scored 75% on your last quiz",
      },
      {
        id: "REC2",
        subject: "Math",
        topic: "Derivatives",
        reason: "You answered 3 questions incorrectly",
      },
      {
        id: "REC3",
        subject: "Physics",
        topic: "Force and Motion",
        reason: "This concept appears in 40% of your incorrect answers",
      },
    ],

    // Achievements and badges
    achievements: [
      {
        id: "ACH1",
        title: "Quiz Master",
        description: "Achieved 90%+ on 5 quizzes",
        date: "2023-03-14",
        icon: "🏆",
      },
      {
        id: "ACH2",
        title: "Memory Champion",
        description: "Completed Memory Match in record time",
        date: "2023-03-10",
        icon: "🧠",
      },
      {
        id: "ACH3",
        title: "Consistent Learner",
        description: "Logged in for 7 consecutive days",
        date: "2023-03-07",
        icon: "📚",
      },
    ],
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full sm:w-auto mb-4 sm:mb-0">
            <Logo mode={mode} />

            {/* Mobile-only mode switcher */}
            <div className="sm:hidden">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="p-2 border rounded-md text-sm"
              >
                <option value="normal">Standard Mode</option>
                <option value="dyslexia">Dyslexia Support</option>
                <option value="adhd">ADHD Support</option>
                <option value="executive">Executive Function Support</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Desktop-only mode switcher */}
            <div className="hidden sm:block mr-4">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="p-2 border rounded-md text-sm"
              >
                <option value="normal">Standard Mode</option>
                <option value="dyslexia">Dyslexia Support</option>
                <option value="adhd">ADHD Support</option>
                <option value="executive">Executive Function Support</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-purple-300 text-purple-600 text-xs sm:text-sm px-2 sm:px-3"
                asChild
              >
                <Link href="/games">Play Games</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-3">
                <Link href="/lessons" className="text-white">
                  My Lessons
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Function Scaffolding System Banner */}
      {mode === "executive" && (
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-200 sticky top-16 z-10">
          <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div className="bg-teal-100 rounded-full p-1.5">
                <BrainCircuit className="h-4 w-4 text-teal-600" />
              </div>
              <span className="font-medium text-teal-800 text-sm">
                Executive Function Support
              </span>
              <div
                className="cursor-pointer ml-1 bg-white rounded-full w-5 h-5 inline-flex items-center justify-center shadow-sm hover:bg-teal-100 transition-colors"
                onClick={() => setShowScaffoldingInfo(!showScaffoldingInfo)}
              >
                <span className="text-teal-700 text-xs font-bold">?</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-teal-600">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <div className="text-sm text-teal-600 flex items-center bg-white px-2 py-1 rounded-full border border-teal-200">
                <span className="mr-2 text-xs">Support:</span>
                <div className="flex items-center">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-4 mx-0.5 rounded-sm transition-all duration-500 ${
                        i < scaffoldingLevel ? "bg-teal-600" : "bg-gray-200"
                      }`}
                      style={{
                        height: `${(i + 1) * 3 + 5}px`,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="ml-1.5 text-xs font-medium">
                  {scaffoldingLevel === 3
                    ? "High"
                    : scaffoldingLevel === 2
                    ? "Medium"
                    : "Low"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Improved Scaffolding Info Popup */}
      {mode === "executive" && showScaffoldingInfo && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowScaffoldingInfo(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-0 m-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start p-5 border-b">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full mr-3">
                  <BrainCircuit className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="font-semibold text-xl text-gray-800">
                  Executive Function Scaffolding
                </h3>
              </div>
              <button
                onClick={() => setShowScaffoldingInfo(false)}
                className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 max-h-[70vh] overflow-y-auto">
              <div className="prose max-w-none mb-5">
                <p className="text-gray-600">
                  This system provides dynamic support for executive function
                  skills. As you demonstrate greater independence and
                  proficiency, the level of scaffolding will gradually decrease.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="col-span-2">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm uppercase tracking-wider">
                    Support Levels
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-teal-50 p-3 rounded-lg border border-teal-100 flex flex-col sm:flex-row sm:items-center">
                      <div className="w-full sm:w-16 text-center sm:text-right font-medium text-teal-800 mb-2 sm:mb-0 sm:mr-3">
                        High
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          Detailed task breakdowns, structured templates,
                          frequent reminders
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 p-3 rounded-lg border border-teal-100 flex flex-col sm:flex-row sm:items-center">
                      <div className="w-full sm:w-16 text-center sm:text-right font-medium text-teal-800 mb-2 sm:mb-0 sm:mr-3">
                        Medium
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: "67%" }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          Basic task organization, occasional prompts, guided
                          check-ins
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 p-3 rounded-lg border border-teal-100 flex flex-col sm:flex-row sm:items-center">
                      <div className="w-full sm:w-16 text-center sm:text-right font-medium text-teal-800 mb-2 sm:mb-0 sm:mr-3">
                        Low
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: "33%" }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600">
                          Self-monitored workflow, subtle reminders, independent
                          planning
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3 text-sm uppercase tracking-wider">
                    Your Progress
                  </h4>
                  <div className="h-32 w-full mb-3">
                    <LineChart
                      data={supportHistory.map((item) => ({
                        name: item.date.split("-")[2], // Just the day
                        value: 4 - item.level, // Invert so higher on chart means less scaffolding
                      }))}
                      height={120}
                      yAxisLabel="Independence"
                      xAxisLabel="Day of Month"
                    />
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-2">
                    Your need for scaffolding is decreasing as you build skills
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  How This Helps You
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Breaks overwhelming tasks into manageable pieces
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Provides just-in-time support when you need it most
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Gradually builds independent executive function skills
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Adapts to your individual growth and progress</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end">
              <Button
                onClick={() => setShowScaffoldingInfo(false)}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Streamlined Adaptive Tips */}
      {mode === "executive" && showAdaptiveTips && (
        <div className="fixed bottom-4 left-4 z-40 bg-white border border-teal-200 rounded-lg shadow-lg max-w-xs animate-fadeIn fixed-element-mobile-adjust">
          <div className="flex items-start p-3 relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 h-1 bg-teal-500 animate-shrink"
              style={{ width: "100%" }}
            ></div>
            <div className="bg-teal-100 rounded-full p-2 mr-3 mt-1">
              <LightbulbIcon className="h-4 w-4 text-teal-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 text-sm mb-1 pr-6">
                Executive Function Tip
              </h4>
              <p className="text-xs text-gray-600">
                {adaptiveTipIndex === 0 &&
                  "Break down your assignment into smaller steps to make it less overwhelming. This helps with task initiation."}
                {adaptiveTipIndex === 1 &&
                  "Remember to check your progress and update completed tasks. Regular monitoring helps you stay on track."}
                {adaptiveTipIndex === 2 &&
                  "Try creating your own structure for the remaining tasks. This builds independent executive function skills."}
              </p>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowAdaptiveTips(false)}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Improved Transition Warning */}
      {mode === "executive" && transitionWarning && (
        <div className="fixed bottom-4 right-4 z-50 bg-white border-l-4 border-amber-400 rounded-lg shadow-lg max-w-md animate-fadeIn fixed-element-mobile-adjust">
          <div className="p-4 pr-12">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800 mb-1">
                  Time to transition soon
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  You'll need to switch tasks in about 1 minute. Start wrapping
                  up your current activity.
                </p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => setTransitionWarning(false)}
                  >
                    Dismiss
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Need more time
                  </Button>
                </div>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setTransitionWarning(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard header with executive function support */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Your Learning Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and see where you can improve
            </p>

            {/* Executive Function Task Initiation Support */}
            {mode === "executive" && (
              <div className="mt-6 bg-white border rounded-xl p-0 shadow-sm overflow-hidden relative">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 h-1.5 w-full"></div>

                {/* Scaffolding Level Indicator */}
                <div className="absolute right-4 top-4 flex flex-col items-end">
                  <div className="text-xs text-gray-400 mb-1 flex items-center">
                    <span className="mr-1">Support Level:</span>
                    <span className="font-medium text-teal-700">
                      {scaffoldingLevel === 3
                        ? "High"
                        : scaffoldingLevel === 2
                        ? "Medium"
                        : "Low"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-5 mx-0.5 rounded-sm transition-all duration-500 ${
                          i < scaffoldingLevel ? "bg-teal-500" : "bg-gray-200"
                        }`}
                        style={{
                          height: `${(i + 1) * 3 + 5}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center mb-4">
                    <div className="bg-teal-100 rounded-full p-2 mr-3">
                      <ListChecks className="h-4 w-4 text-teal-600" />
                    </div>
                    <h3 className="font-medium text-gray-800 text-lg">
                      Today's Learning Plan
                    </h3>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100 overflow-hidden mb-4">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-800">
                              Physics: Forces & Motion
                            </h4>
                            {taskProgress > 0 && (
                              <Badge className="ml-2 bg-teal-100 text-teal-800 border-none">
                                In progress
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Due: Tomorrow at 3:00 PM
                          </p>
                        </div>
                        <div className="text-sm flex items-center">
                          <span className="font-medium text-teal-700 mr-1">
                            {taskProgress}%
                          </span>
                          <span className="text-gray-400 text-xs">
                            complete
                          </span>
                        </div>
                      </div>

                      <Progress
                        value={taskProgress}
                        className="h-2 mb-3"
                        indicatorClassName={`bg-gradient-to-r from-teal-500 to-cyan-500 ${
                          taskProgress > 50 ? "animate-progress-pulse" : ""
                        }`}
                      />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Clock3 className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">Est. time: 30 mins</span>

                          {scaffoldingLevel < 3 && (
                            <span className="ml-2 text-teal-600 text-xs italic">
                              {scaffoldingLevel === 2
                                ? "Making good progress!"
                                : "Handling this independently!"}
                            </span>
                          )}
                        </div>

                        <div className="flex space-x-2 items-center">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-teal-300 text-teal-700 h-8"
                            onClick={() =>
                              setShowTaskBreakdown(!showTaskBreakdown)
                            }
                          >
                            {showTaskBreakdown ? "Hide Steps" : "Show Steps"}
                          </Button>

                          {taskProgress === 0 ? (
                            <Button
                              size="sm"
                              className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-8"
                              onClick={() => setShowStartTemplate(true)}
                            >
                              <PlayIcon className="h-3.5 w-3.5 mr-1.5" /> Get
                              Started
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-teal-600 hover:bg-teal-700 text-white text-xs h-8"
                              onClick={() => {
                                const newProgress = Math.min(
                                  taskProgress + 15,
                                  100
                                );
                                setTaskProgress(newProgress);

                                // If we reach 100%, show the complete dialog after a delay
                                if (newProgress === 100) {
                                  setTimeout(() => {
                                    setShowCompletionDialog(true);
                                  }, 1000);
                                }
                              }}
                            >
                              <ArrowRight className="h-3.5 w-3.5 mr-1.5" />{" "}
                              Continue
                            </Button>
                          )}

                          {/* Show "I'm Stuck" button at lower scaffolding levels */}
                          {scaffoldingLevel < 3 &&
                            taskProgress > 0 &&
                            taskProgress < 100 && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs border-amber-300 text-amber-700 h-8"
                                onClick={() => {
                                  setScaffoldingLevel((prev) =>
                                    Math.min(prev + 1, 3)
                                  );
                                  toast({
                                    title: "Support level increased",
                                    description:
                                      "We've provided additional guidance to help you through this task.",
                                    duration: 5000,
                                  });
                                }}
                              >
                                I'm Stuck
                              </Button>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Redesigned Task Breakdown - varies by scaffolding level */}
                    {showTaskBreakdown && (
                      <div
                        className={`border-t border-teal-100 bg-white ${
                          scaffoldingLevel < 3 ? "bg-opacity-90" : ""
                        }`}
                      >
                        <div className="px-4 py-3 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-teal-100 text-teal-700">
                              1
                            </div>
                            <div className="flex-1">
                              <div
                                className={`flex justify-between ${
                                  taskProgress >= 15
                                    ? "text-teal-700 opacity-70"
                                    : "text-gray-700"
                                }`}
                              >
                                <div className="font-medium text-sm">
                                  Read introduction to Newton's Laws
                                  {taskProgress >= 15 && (
                                    <span className="inline-block ml-2">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  5 min
                                </div>
                              </div>

                              {scaffoldingLevel === 3 && !taskProgress && (
                                <div className="text-xs text-teal-600 mt-0.5 ml-0.5">
                                  Focus on understanding the basic principles
                                  first
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-teal-100 text-teal-700">
                              2
                            </div>
                            <div className="flex-1">
                              <div
                                className={`flex justify-between ${
                                  taskProgress >= 30
                                    ? "text-teal-700 opacity-70"
                                    : "text-gray-700"
                                }`}
                              >
                                <div className="font-medium text-sm">
                                  Take notes on key concepts
                                  {taskProgress >= 30 && (
                                    <span className="inline-block ml-2">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  10 min
                                </div>
                              </div>

                              {scaffoldingLevel === 3 &&
                                taskProgress < 30 &&
                                taskProgress >= 15 && (
                                  <div className="text-xs text-teal-600 mt-0.5 ml-0.5">
                                    Use the template to organize your thoughts
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-teal-100 text-teal-700">
                              3
                            </div>
                            <div className="flex-1">
                              <div
                                className={`flex justify-between ${
                                  taskProgress >= 60
                                    ? "text-teal-700 opacity-70"
                                    : "text-gray-700"
                                }`}
                              >
                                <div className="font-medium text-sm">
                                  Complete practice problems 1-3
                                  {taskProgress >= 60 && (
                                    <span className="inline-block ml-2">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  10 min
                                </div>
                              </div>

                              {scaffoldingLevel >= 2 &&
                                taskProgress < 60 &&
                                taskProgress >= 30 && (
                                  <div className="text-xs text-teal-600 mt-0.5 ml-0.5">
                                    Attempt each problem before checking the
                                    solution
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-teal-100 text-teal-700">
                              4
                            </div>
                            <div className="flex-1">
                              <div
                                className={`flex justify-between ${
                                  taskProgress >= 100
                                    ? "text-teal-700 opacity-70"
                                    : "text-gray-700"
                                }`}
                              >
                                <div className="font-medium text-sm">
                                  Review and submit your work
                                  {taskProgress >= 100 && (
                                    <span className="inline-block ml-2">
                                      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500">
                                  5 min
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Scaffolding level indication */}
                          {scaffoldingLevel < 3 && (
                            <div className="mt-3 text-xs text-teal-600 italic border-t border-teal-100 pt-2 opacity-90">
                              {scaffoldingLevel === 2 ? (
                                <div className="flex items-center">
                                  <TrendingDown className="h-3.5 w-3.5 mr-1.5" />
                                  <span>
                                    Scaffolding reduced - you're doing well with
                                    less guidance
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Star className="h-3.5 w-3.5 mr-1.5" />
                                  <span>
                                    Minimal scaffolding - you're taking
                                    ownership of this task!
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-3.5 mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                      Coming Up Next
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="bg-purple-100 rounded-full p-1">
                        <BookOpen className="h-3.5 w-3.5 text-purple-700" />
                      </div>
                      <span className="flex-1">
                        Math Assignment: Calculus Practice
                      </span>
                      <Badge className="bg-purple-100 text-purple-700 font-normal border-none text-xs">
                        Tomorrow
                      </Badge>
                    </div>

                    {/* Show additional info at higher scaffolding levels */}
                    {scaffoldingLevel >= 2 && (
                      <div className="mt-3 bg-blue-50 p-2.5 rounded-lg text-xs text-blue-700 flex items-start">
                        <InfoIcon className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 mr-2" />
                        <div>
                          <span className="font-medium">Planning tip: </span>
                          <span>
                            Start your math assignment with at least 2 hours
                            before bedtime. It should take about 45 minutes to
                            complete.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scaffolding fade indicator */}
                {scaffoldingLevel < 3 && (
                  <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-500 opacity-50"></div>
                )}
              </div>
            )}
          </div>

          {/* Getting Started Template Dialog */}
          {mode === "executive" && showStartTemplate && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
                <div className="p-5 border-b">
                  <h3 className="text-xl font-bold text-teal-800">
                    Getting Started: Forces & Motion
                  </h3>
                  <p className="text-gray-500 text-sm">
                    This template will help you begin your assignment with clear
                    structure
                  </p>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      1. What I already know about this topic:
                    </h4>
                    <textarea
                      className="w-full border rounded-md p-3 h-20 text-sm"
                      placeholder="I know that Newton's laws describe how objects move..."
                    ></textarea>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. Questions I have:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-full border rounded-md p-2 text-sm">
                          How does friction affect the motion of objects?
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-full border rounded-md p-2 text-sm"
                          placeholder="Add another question..."
                        />
                        <button className="ml-2 text-teal-600 hover:text-teal-800">
                          <PlusCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      3. Resources I'll need:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="textbook"
                          className="mr-2"
                          checked
                        />
                        <label htmlFor="textbook" className="text-sm">
                          Textbook, Chapter 4
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notes"
                          className="mr-2"
                          checked
                        />
                        <label htmlFor="notes" className="text-sm">
                          Class notes from Tuesday
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="calculator"
                          className="mr-2"
                        />
                        <label htmlFor="calculator" className="text-sm">
                          Calculator
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t bg-gray-50 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowStartTemplate(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      setShowStartTemplate(false);
                      setTaskProgress(15);
                    }}
                  >
                    Start Working
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Overview Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-2 bg-blue-50">
                <CardTitle className="text-lg font-medium text-blue-700">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset={100 - studentData.overallProgress}
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-600">
                        {studentData.overallProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-500">
                      Keep going, {studentData.name.split(" ")[0]}!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-2 bg-purple-50">
                <CardTitle className="text-lg font-medium text-purple-700">
                  Quiz Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">
                    {studentData.quizAverage}%
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Average Score
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${studentData.quizAverage}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <span className="font-medium">
                      {studentData.recentQuizzes.length}
                    </span>{" "}
                    quizzes completed
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-2 bg-green-50">
                <CardTitle className="text-lg font-medium text-green-700">
                  Game Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {studentData.gameScore}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">Total Points</div>
                  <div className="flex gap-2">
                    {studentData.gamePerformance.map((game, index) => (
                      <Badge
                        key={index}
                        className={`${
                          index === 0
                            ? "bg-blue-100 text-blue-700"
                            : index === 1
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {game.name}: {game.value}%
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity and Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>
                  Minutes spent learning per day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <LineChart data={studentData.weeklyActivity} height={250} />
                </div>
                <div className="mt-4 text-center text-sm">
                  Total:{" "}
                  {studentData.weeklyActivity.reduce(
                    (acc, curr) => acc + curr.value,
                    0
                  )}{" "}
                  minutes this week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance by Subject</CardTitle>
                <CardDescription>Your average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <BarChart data={studentData.quizPerformance} height={250} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
  <TabsList className="flex w-full overflow-x-auto whitespace-nowrap no-scrollbar gap-2 p-1 mb-6 bg-transparent">
    <TabsTrigger
      value="overview"
      className="px-4 py-2.5 text-sm font-medium rounded-md bg-white hover:bg-gray-50 
                 data-[state=active]:bg-[#6C48C5] data-[state=active]:text-white 
                 shadow-sm transition-all"
    >
      Quiz History
    </TabsTrigger>
    <TabsTrigger
      value="review"
      className="px-4 py-2.5 text-sm font-medium rounded-md bg-white hover:bg-gray-50 
                 data-[state=active]:bg-[#6C48C5] data-[state=active]:text-white 
                 shadow-sm transition-all"
    >
      Spaced Review
    </TabsTrigger>
    <TabsTrigger
      value="achievements"
      className="px-4 py-2.5 text-sm font-medium rounded-md bg-white hover:bg-gray-50 
                 data-[state=active]:bg-[#6C48C5] data-[state=active]:text-white 
                 shadow-sm transition-all"
    >
      Achievements
    </TabsTrigger>
    <TabsTrigger
      value="lessons"
      className="px-4 py-2.5 text-sm font-medium rounded-md bg-white hover:bg-gray-50 
                 data-[state=active]:bg-[#6C48C5] data-[state=active]:text-white 
                 shadow-sm transition-all"
    >
      My Lessons
    </TabsTrigger>
  </TabsList>


            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quiz Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">Subject</th>
                          <th className="py-3 px-4 text-left">Title</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Score</th>
                          <th className="py-3 px-4 text-left">Time Spent</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.recentQuizzes.map((quiz, index) => (
                          <tr
                            key={quiz.id}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : ""
                            } hover:bg-blue-50 transition-colors`}
                          >
                            <td className="py-3 px-4">
                              <Badge
                                className={`
                                ${
                                  quiz.subject === "Physics"
                                    ? "bg-blue-100 text-blue-700"
                                    : ""
                                }
                                ${
                                  quiz.subject === "Chemistry"
                                    ? "bg-green-100 text-green-700"
                                    : ""
                                }
                                ${
                                  quiz.subject === "Math"
                                    ? "bg-purple-100 text-purple-700"
                                    : ""
                                }
                                ${
                                  quiz.subject === "Biology"
                                    ? "bg-amber-100 text-amber-700"
                                    : ""
                                }
                              `}
                              >
                                {quiz.subject}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 font-medium">
                              {quiz.title}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {formatDate(quiz.date)}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`font-medium ${
                                  quiz.score >= 90
                                    ? "text-green-600"
                                    : quiz.score >= 80
                                    ? "text-blue-600"
                                    : quiz.score >= 70
                                    ? "text-amber-600"
                                    : "text-red-600"
                                }`}
                              >
                                {quiz.score}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {quiz.timeSpent}
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600"
                              >
                                Review
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="review" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Review Topics</CardTitle>
                  <CardDescription>
                    Based on your performance, we recommend reviewing these
                    topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {studentData.reviewRecommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-all bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium mb-1">
                                <Badge
                                  className={`mr-2 ${
                                    rec.subject === "Physics"
                                      ? "bg-blue-100 text-blue-700"
                                      : rec.subject === "Chemistry"
                                      ? "bg-green-100 text-green-700"
                                      : rec.subject === "Math"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {rec.subject}
                                </Badge>
                                {rec.topic}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {rec.reason}
                              </p>
                            </div>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                              Start Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Added Spaced Review section */}
                    <Card className="border-2 border-purple-200 mt-8">
                      <CardHeader className="bg-purple-50 pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-purple-700">
                            Spaced Repetition Review
                          </CardTitle>
                          <Badge className="bg-purple-100 text-purple-700">
                            5 items due
                          </Badge>
                        </div>
                        <CardDescription>
                          Scientific, time-based approach to memorization and
                          mastery
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                              Overall Mastery
                            </span>
                            <span className="text-sm font-medium">43%</span>
                          </div>
                          <Progress
                            value={43}
                            className="h-2"
                            indicatorClassName="bg-purple-600"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-green-600">
                              2
                            </div>
                            <div className="text-xs text-gray-500">
                              Mastered
                            </div>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-yellow-600">
                              3
                            </div>
                            <div className="text-xs text-gray-500">
                              Learning
                            </div>
                          </div>
                          <div className="bg-red-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-red-600">
                              5
                            </div>
                            <div className="text-xs text-gray-500">
                              Due Today
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            className="bg-purple-600 hover:bg-purple-700 w-full"
                            asChild
                          >
                            <Link href="/spaced-review">
                              Start Spaced Review Session
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Info about spaced repetition */}
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        About Spaced Repetition
                      </h4>
                      <p>
                        Spaced repetition is a learning technique that
                        incorporates increasing intervals of time between
                        reviews of previously learned material. This method
                        helps improve long-term retention of information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>
                    Badges and rewards you've earned
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {studentData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="p-4 border border-purple-200 rounded-lg bg-purple-50 hover:shadow-md transition-all flex flex-col items-center text-center"
                      >
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h3 className="font-bold text-purple-700 mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <div className="text-xs text-gray-500">
                          Earned on {formatDate(achievement.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>
                    Continue learning from where you left off
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Physics Course Card */}
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="h-3 bg-blue-500"></div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">Physics 101</h3>
                            <p className="text-sm text-gray-500">PHY101</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">
                            95% Complete
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>95%</span>
                          </div>
                          <Progress
                            value={95}
                            className="h-2"
                            indicatorClassName="bg-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              16 Lessons
                            </span>
                          </div>
                          <Button asChild>
                            <Link href="/course/physics101">Continue</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Math Course Card */}
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="h-3 bg-purple-500"></div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">Mathematics</h3>
                            <p className="text-sm text-gray-500">MAT201</p>
                          </div>
                          <Badge className="bg-purple-100 text-purple-700">
                            75% Complete
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>75%</span>
                          </div>
                          <Progress
                            value={75}
                            className="h-2"
                            indicatorClassName="bg-purple-500"
                          />
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              14 Lessons
                            </span>
                          </div>
                          <Button asChild>
                            <Link href="/course/math201">Continue</Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* View All Courses Button */}
                    <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                      <Button
                        variant="outline"
                        className="border-blue-300 text-blue-600"
                        asChild
                      >
                        <Link href="/lessons">View All Courses</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

// Global styles for animations
export const dynamic = "force-dynamic";
