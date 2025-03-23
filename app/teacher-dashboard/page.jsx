"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("students")

  // Fake class data
  const classData = {
    name: "Physics 101",
    teacher: "Ms. Sarah Johnson",
    students: [
      {
        id: "S12345",
        name: "Alex Johnson",
        progress: 95,
        attendance: 98,
        recommendedMode: "Dyslexia",
        performance: 88,
        needsHelp: false,
      },
      {
        id: "S12346",
        name: "Emma Wilson",
        progress: 75,
        attendance: 92,
        recommendedMode: "Normal",
        performance: 76,
        needsHelp: false,
      },
      {
        id: "S12347",
        name: "Michael Brown",
        progress: 45,
        attendance: 85,
        recommendedMode: "ADHD",
        performance: 52,
        needsHelp: true,
      },
      {
        id: "S12348",
        name: "Sophia Davis",
        progress: 88,
        attendance: 95,
        recommendedMode: "Dyslexia",
        performance: 84,
        needsHelp: false,
      },
      {
        id: "S12349",
        name: "James Miller",
        progress: 35,
        attendance: 78,
        recommendedMode: "ADHD",
        performance: 48,
        needsHelp: true,
      },
      {
        id: "S12350",
        name: "Olivia Garcia",
        progress: 92,
        attendance: 97,
        recommendedMode: "Normal",
        performance: 90,
        needsHelp: false,
      },
    ],
    weeklyEngagement: [
      { day: "Mon", value: 85 },
      { day: "Tue", value: 92 },
      { day: "Wed", value: 78 },
      { day: "Thu", value: 88 },
      { day: "Fri", value: 76 },
    ],
    modeDistribution: [
      { name: "Normal", value: 40 },
      { name: "Dyslexia", value: 35 },
      { name: "ADHD", value: 25 },
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
            Teacher Dashboard
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-gray-600">Monitor your class performance and student progress</p>
            <div className="mt-2 md:mt-0">
              <Badge variant="outline" className="text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
                Class: {classData.name}
              </Badge>
              <Badge
                variant="outline"
                className="ml-2 text-sm font-medium bg-purple-50 text-purple-700 border-purple-200"
              >
                Teacher: {classData.teacher}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-lg font-medium text-blue-700">Class Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Students:</span>
                  <span className="font-medium">{classData.students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Progress:</span>
                  <span className="font-medium">
                    {Math.round(
                      classData.students.reduce((acc, student) => acc + student.progress, 0) /
                        classData.students.length,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Attendance:</span>
                  <span className="font-medium">
                    {Math.round(
                      classData.students.reduce((acc, student) => acc + student.attendance, 0) /
                        classData.students.length,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Students Needing Help:</span>
                  <span className="font-medium text-red-500">
                    {classData.students.filter((student) => student.needsHelp).length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-green-50">
              <CardTitle className="text-lg font-medium text-green-700">Weekly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <LineChart
                  data={classData.weeklyEngagement.map((item) => ({
                    name: item.day,
                    value: item.value,
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-green-50 p-2 rounded-md text-green-600">
                Highest engagement on{" "}
                {classData.weeklyEngagement.reduce((max, item) => (item.value > max.value ? item : max)).day}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-purple-50">
              <CardTitle className="text-lg font-medium text-purple-700">Learning Mode Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px]">
                <PieChart
                  data={classData.modeDistribution.map((item) => ({
                    name: item.name,
                    value: item.value,
                    color: item.name === "Normal" ? "#3b82f6" : item.name === "Dyslexia" ? "#8b5cf6" : "#10b981",
                  }))}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-purple-50 p-2 rounded-md text-purple-600">
                {classData.modeDistribution.sort((a, b) => b.value - a.value)[0].name} is the most common mode
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="insights">Class Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classData.students.map((student) => (
                    <div
                      key={student.id}
                      className={`p-4 rounded-md border ${
                        student.needsHelp ? "border-red-200 bg-red-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">ID: {student.id}</div>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/student-report/${student.id}`}>View Report</Link>
                        </Button>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Progress</div>
                          <Progress value={student.progress} className="h-2" />
                          <div className="text-sm mt-1 font-medium">{student.progress}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Attendance</div>
                          <Progress value={student.attendance} className="h-2" />
                          <div className="text-sm mt-1 font-medium">{student.attendance}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Recommended Mode</div>
                          <Badge
                            variant="outline"
                            className={`${
                              student.recommendedMode === "Dyslexia"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : student.recommendedMode === "ADHD"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {student.recommendedMode}
                          </Badge>
                        </div>
                      </div>

                      {student.needsHelp && (
                        <div className="mt-3 text-sm text-red-600 font-medium">
                          This student needs additional support. Performance is below average.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h3 className="font-bold text-blue-700 mb-2">Learning Mode Effectiveness</h3>
                    <p className="mb-3">
                      Students using Dyslexia mode show 15% higher performance on average compared to Normal mode.
                    </p>
                    <div className="h-[200px]">
                      <BarChart
                        data={[
                          { name: "Normal", value: 76 },
                          { name: "Dyslexia", value: 87 },
                          { name: "ADHD", value: 68 },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="font-bold text-green-700 mb-2">Topic Mastery</h3>
                    <p>The following topics have the lowest mastery levels in your class:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Energy and Work (45% mastery)</li>
                      <li>Electromagnetic Forces (52% mastery)</li>
                      <li>Quantum Mechanics (38% mastery)</li>
                    </ul>
                    <p className="mt-3 text-sm">Consider revisiting these topics or providing additional resources.</p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <h3 className="font-bold text-purple-700 mb-2">Students Needing Support</h3>
                    <p className="mb-2">2 students are currently flagged as needing additional support:</p>
                    <div className="space-y-2">
                      {classData.students
                        .filter((s) => s.needsHelp)
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex justify-between items-center p-2 bg-white rounded border border-purple-200"
                          >
                            <span>{student.name}</span>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/student-report/${student.id}`}>View Report</Link>
                            </Button>
                          </div>
                        ))}
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

