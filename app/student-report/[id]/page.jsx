"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart } from "@/components/charts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function StudentReport() {
  const params = useParams()
  const router = useRouter()
  const studentId = params.id
  const [activeTab, setActiveTab] = useState("overview")

  // Fake student data (would come from API in a real app)
  const studentData = {
    S12345: {
      id: "S12345",
      name: "Alex Johnson",
      grade: "10th Grade",
      recommendedMode: "Dyslexia",
      progress: 95,
      attendance: 98,
      performance: 88,
      needsHelp: false,
      courses: [
        { name: "Physics", progress: 95, mode: "Dyslexia" },
        { name: "Mathematics", progress: 75, mode: "Normal" },
        { name: "Biology", progress: 60, mode: "ADHD" },
        { name: "Chemistry", progress: 40, mode: "Normal" },
        { name: "History", progress: 85, mode: "Dyslexia" },
      ],
      weeklyActivity: [
        { day: "Mon", minutes: 45 },
        { day: "Tue", minutes: 60 },
        { day: "Wed", minutes: 30 },
        { day: "Thu", minutes: 75 },
        { day: "Fri", minutes: 50 },
        { day: "Sat", minutes: 20 },
        { day: "Sun", minutes: 15 },
      ],
      modePerformance: [
        { mode: "Normal", score: 72 },
        { mode: "Dyslexia", score: 88 },
        { mode: "ADHD", score: 65 },
      ],
      strengths: ["Visual learning", "Reading comprehension", "Problem-solving"],
      weaknesses: ["Timed tests", "Verbal explanations"],
      recommendations: [
        "Continue using Dyslexia mode for text-heavy subjects",
        "Provide additional time for timed assessments",
        "Encourage use of visual learning aids",
      ],
    },
    S12347: {
      id: "S12347",
      name: "Michael Brown",
      grade: "10th Grade",
      recommendedMode: "ADHD",
      progress: 45,
      attendance: 85,
      performance: 52,
      needsHelp: true,
      courses: [
        { name: "Physics", progress: 45, mode: "Normal" },
        { name: "Mathematics", progress: 38, mode: "Normal" },
        { name: "Biology", progress: 62, mode: "ADHD" },
        { name: "Chemistry", progress: 40, mode: "Normal" },
        { name: "History", progress: 55, mode: "ADHD" },
      ],
      weeklyActivity: [
        { day: "Mon", minutes: 25 },
        { day: "Tue", minutes: 30 },
        { day: "Wed", minutes: 15 },
        { day: "Thu", minutes: 45 },
        { day: "Fri", minutes: 20 },
        { day: "Sat", minutes: 10 },
        { day: "Sun", minutes: 5 },
      ],
      modePerformance: [
        { mode: "Normal", score: 48 },
        { mode: "Dyslexia", score: 52 },
        { mode: "ADHD", score: 68 },
      ],
      strengths: ["Interactive learning", "Hands-on activities", "Creative thinking"],
      weaknesses: ["Extended focus", "Text-heavy content", "Sequential instructions"],
      recommendations: [
        "Use ADHD mode for all subjects to improve engagement",
        "Break learning into shorter, more interactive segments",
        "Incorporate more gamified elements into learning",
      ],
    },
  }

  const student = studentData[studentId]

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Student not found</h1>
          <Button asChild>
            <Link href="/teacher-dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-blue-300 text-blue-600" asChild>
              <Link href="/teacher-dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600">
              <AvatarFallback className="text-xl text-white">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {student.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {student.grade}
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  ID: {student.id}
                </Badge>
                <Badge
                  className={`${
                    student.recommendedMode === "Dyslexia"
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : student.recommendedMode === "ADHD"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                  }`}
                >
                  Recommended: {student.recommendedMode} Mode
                </Badge>
                {student.needsHelp && (
                  <Badge variant="destructive" className="animate-pulse">
                    Needs Support
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-lg font-medium text-blue-700">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Attendance</span>
                    <span className="text-sm font-medium">{student.attendance}%</span>
                  </div>
                  <Progress value={student.attendance} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Performance</span>
                    <span className="text-sm font-medium">{student.performance}%</span>
                  </div>
                  <Progress value={student.performance} className="h-2" indicatorClassName="bg-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Learning Mode Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <BarChart
                  data={student.modePerformance.map((item) => ({
                    name: item.mode,
                    value: item.score,
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium text-blue-600">
                {student.modePerformance.sort((a, b) => b.score - a.score)[0].mode} mode is most effective for{" "}
                {student.name.split(" ")[0]}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <LineChart
                  data={student.weeklyActivity.map((item) => ({
                    name: item.day,
                    value: item.minutes,
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium">
                Total: {student.weeklyActivity.reduce((acc, curr) => acc + curr.minutes, 0)} minutes this week
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Course Progress</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {student.courses.map((course, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">{course.name}</span>
                          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">{course.mode} Mode</span>
                        </div>
                        <span className="text-sm font-medium">{course.progress}% Complete</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strengths" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Strengths & Weaknesses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="font-bold text-green-700 mb-3">Strengths</h3>
                    <ul className="space-y-2">
                      {student.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <h3 className="font-bold text-red-700 mb-3">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {student.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-bold text-blue-700 mb-3">Teacher Recommendations</h3>
                  <ul className="space-y-3">
                    {student.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
                  <h3 className="font-bold text-purple-700 mb-3">System Recommendations</h3>
                  <p className="mb-3">
                    Based on {student.name.split(" ")[0]}'s learning patterns and performance data, we recommend the
                    following:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <span>
                        Switch all courses to {student.modePerformance.sort((a, b) => b.score - a.score)[0].mode} mode
                        for optimal learning outcomes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <span>
                        Focus additional support on {student.courses.sort((a, b) => a.progress - b.progress)[0].name}{" "}
                        where progress is lowest.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <span>
                        Schedule learning sessions on{" "}
                        {student.weeklyActivity.reduce((max, item) => (item.minutes > max.minutes ? item : max)).day}{" "}
                        when engagement is highest.
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

