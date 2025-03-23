"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Fake student data
  const studentData = {
    name: "Alex Johnson",
    grade: "10th Grade",
    school: "Lincoln High School",
    id: "S12345",
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
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">Monitor your child's learning progress and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-lg font-medium text-blue-700">Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">{studentData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grade:</span>
                  <span className="font-medium">{studentData.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">School:</span>
                  <span className="font-medium">{studentData.school}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Student ID:</span>
                  <span className="font-medium">{studentData.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-purple-50">
              <CardTitle className="text-lg font-medium text-purple-700">Learning Mode Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <BarChart
                  data={studentData.modePerformance.map((item) => ({
                    name: item.mode,
                    value: item.score,
                    color: item.mode === "Normal" ? "#3b82f6" : item.mode === "Dyslexia" ? "#8b5cf6" : "#10b981",
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium text-purple-600 bg-purple-50 p-2 rounded-md">
                {studentData.modePerformance.sort((a, b) => b.score - a.score)[0].mode} mode is most effective for{" "}
                {studentData.name.split(" ")[0]}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-green-50">
              <CardTitle className="text-lg font-medium text-green-700">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <LineChart
                  data={studentData.weeklyActivity.map((item) => ({
                    name: item.day,
                    value: item.minutes,
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-green-50 p-2 rounded-md text-green-600">
                Total: {studentData.weeklyActivity.reduce((acc, curr) => acc + curr.minutes, 0)} minutes this week
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studentData.courses.map((course, index) => (
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

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h3 className="font-bold text-blue-700 mb-2">Mode Recommendation</h3>
                    <p>
                      {studentData.name.split(" ")[0]} learns 40% faster using Dyslexia mode. Consider encouraging use
                      of this mode for all subjects.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="font-bold text-green-700 mb-2">Study Pattern</h3>
                    <p>
                      Performance is best on Thursdays and Tuesdays. Consider scheduling more challenging subjects on
                      these days.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <h3 className="font-bold text-purple-700 mb-2">Subject Focus</h3>
                    <p>
                      Chemistry progress is below average. Consider additional support or switching to Dyslexia mode for
                      this subject.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Attendance Record</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/attendance">View Detailed Attendance</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48">
                      <PieChart
                        data={[
                          { name: "Present", value: 42, color: "#22c55e" },
                          { name: "Absent", value: 3, color: "#ef4444" },
                          { name: "Late", value: 5, color: "#f59e0b" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-md">
                      <div className="text-2xl font-bold text-green-600">42</div>
                      <div className="text-sm text-green-600">Present</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-md">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-sm text-red-600">Absent</div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-md">
                      <div className="text-2xl font-bold text-amber-600">5</div>
                      <div className="text-sm text-amber-600">Late</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

