"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart } from "@/components/charts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function StudentReport() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id;
  const [activeTab, setActiveTab] = useState("overview");

  // Fake student data (would come from API in a real app)
  const studentData = {
    S12345: {
      id: "S12345",
      name: "Sarah Johnson",
      grade: "10th Grade",
      recommendedMode: "Dyslexia",
      progress: 95,
      attendance: 98,
      performance: 88,
      needsHelp: false,
      courses: [
        {
          name: "Physics",
          progress: 95,
          message: "Excellent progress – keep up the momentum",
        },
        {
          name: "Mathematics",
          progress: 96,
          message: "Good effort – complete remaining problem sets",
        },
        {
          name: "Biology",
          progress: 92,
          message: "Well-rounded progress across science and humanities",
        },
        {
          name: "Chemistry",
          progress: 98,
          message: "Learning patterns indicate strong focus and retention.",
        },
        {
          name: "History",
          progress: 97,
          message: "Strong comprehension – consistent effort noticed",
        },
      ],

      weeklyActivity: [
        { name: "Mon", value: 45 },
        { name: "Tue", value: 60 },
        { name: "Wed", value: 30 },
        { name: "Thu", value: 75 },
        { name: "Fri", value: 50 },
        { name: "Sat", value: 20 },
        { name: "Sun", value: 15 },
      ],
      modePerformance: [
        { name: "Normal", value: 72, color: "#3b82f6" },
        { name: "Dyslexia", value: 88, color: "#8b5cf6" },
        { name: "ADHD", value: 65, color: "#10b981" },
      ],
      strengths: [
        "Visual learning",
        "Reading comprehension",
        "Problem-solving",
      ],
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
        {
          name: "Physics",
          progress: 45,
          message: "Incomplete practice tasks",
        },
        {
          name: "Mathematics",
          progress: 38,
          message: "Low engagement — review sessions recommended",
        },
        {
          name: "Biology",
          progress: 62,
          message: "Incomplete assignments and low quiz performance",
        },
        {
          name: "Chemistry",
          progress: 40,
          message: "Learning objectives not yet met",
        },
        {
          name: "History",
          progress: 55,
          message: "Mid-level performance — potential to improve",
        },
      ],

      weeklyActivity: [
        { name: "Mon", value: 25 },
        { name: "Tue", value: 30 },
        { name: "Wed", value: 15 },
        { name: "Thu", value: 45 },
        { name: "Fri", value: 20 },
        { name: "Sat", value: 10 },
        { name: "Sun", value: 5 },
      ],
      modePerformance: [
        { name: "Normal", value: 48, color: "#3b82f6" },
        { name: "Dyslexia", value: 52, color: "#8b5cf6" },
        { name: "ADHD", value: 68, color: "#10b981" },
      ],
      strengths: [
        "Interactive learning",
        "Hands-on activities",
        "Creative thinking",
      ],
      weaknesses: [
        "Extended focus",
        "Text-heavy content",
        "Sequential instructions",
      ],
      recommendations: [
        "Use ADHD mode for all subjects to improve engagement",
        "Break learning into shorter, more interactive segments",
        "Incorporate more gamified elements into learning",
      ],
    },
  };

  const student = studentData[studentId];

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
    );
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
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600"
              asChild
            >
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
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  {student.grade}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 border-gray-200"
                >
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
              <CardTitle className="text-lg font-medium text-blue-700">
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm font-medium">
                      {student.progress}%
                    </span>
                  </div>
                  <Progress
                    value={student.progress}
                    className="h-2"
                    indicatorClassName="bg-blue-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Attendance</span>
                    <span className="text-sm font-medium">
                      {student.attendance}%
                    </span>
                  </div>
                  <Progress
                    value={student.attendance}
                    className="h-2"
                    indicatorClassName="bg-green-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Performance</span>
                    <span className="text-sm font-medium">
                      {student.performance}%
                    </span>
                  </div>
                  <Progress
                    value={student.performance}
                    className="h-2"
                    indicatorClassName="bg-purple-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Learning Mode Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <BarChart data={student.modePerformance} height={180} />
              </div>
              <div className="mt-4 text-center text-sm font-medium text-blue-600">
                {
                  student.modePerformance.sort((a, b) => b.value - a.value)[0]
                    .name
                }{" "}
                mode is most effective for {student.name.split(" ")[0]}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <LineChart data={student.weeklyActivity} height={180} />
              </div>
              <div className="mt-4 text-center text-sm font-medium">
                Total:{" "}
                {student.weeklyActivity.reduce(
                  (acc, curr) => acc + curr.value,
                  0
                )}{" "}
                minutes this week
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex w-full overflow-x-auto whitespace-nowrap no-scrollbar gap-2 p-1 mb-6 bg-transparent">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.courses.map((course, index) => {
                    let colorClasses = "";

                    if (course.progress < 50) {
                      colorClasses = "bg-red-100 text-red-700";
                    } else if (course.progress <= 70) {
                      colorClasses = "bg-yellow-100 text-yellow-700";
                    } else {
                      colorClasses = "bg-green-100 text-green-700";
                    }

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between"
                      >
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            {course.name}
                          </h3>
                          <div
                            className={`text-sm px-3 py-1 rounded-full inline-block ${colorClasses}`}
                          >
                            {course.message}
                          </div>
                        </div>

                        <div className="relative w-20 h-20">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
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
                              stroke={
                                course.progress < 50
                                  ? "#ef4444"
                                  : course.progress <= 70
                                  ? "#facc15"
                                  : "#22c55e"
                              }
                              strokeWidth="4"
                              strokeDasharray="100"
                              strokeDashoffset={100 - course.progress}
                              strokeLinecap="round"
                              transform="rotate(-90 18 18)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                            {course.progress}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                    <h3 className="font-bold text-red-700 mb-3">
                      Areas for Improvement
                    </h3>
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
                  <h3 className="font-bold text-blue-700 mb-3">
                    Teacher Recommendations
                  </h3>
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
                  <h3 className="font-bold text-purple-700 mb-3">
                    System Recommendations
                  </h3>
                  <p className="mb-3">
                    Based on {student.name.split(" ")[0]}'s learning patterns
                    and performance data, we recommend the following:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <span>
                        Switch all courses to{" "}
                        {
                          student.modePerformance.sort(
                            (a, b) => b.value - a.value
                          )[0].name
                        }{" "}
                        mode for optimal learning outcomes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <span>
                        Focus additional support on{" "}
                        {
                          student.courses.sort(
                            (a, b) => a.progress - b.progress
                          )[0].name
                        }{" "}
                        where progress is lowest.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <span>
                        Schedule learning sessions on{" "}
                        {
                          student.weeklyActivity.reduce((max, item) =>
                            item.value > max.value ? item : max
                          ).name
                        }{" "}
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
  );
}
