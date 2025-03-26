"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-green-300 text-green-600 hidden sm:flex"
              asChild
            >
              <Link href="/quiz">Take a Quiz</Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-600"
              asChild
            >
              <Link href="/games">Play Games</Link>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/lessons" className="text-white">
                My Lessons
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Your Learning Dashboard
            </h1>
            <p className="text-gray-600">
              Track your progress and see where you can improve
            </p>
          </div>

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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Quiz History</TabsTrigger>
              <TabsTrigger value="review">Spaced Review</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="lessons">My Lessons</TabsTrigger>
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
