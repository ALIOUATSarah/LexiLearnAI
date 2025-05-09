"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart, PieChart } from "@/components/charts";
import Logo from "@/components/Logo";

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const modes = ["Normal", "Dyslexia", "ADHD"];
  const [currentModeIndex, setCurrentModeIndex] = useState(2); // Default to ADHD
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedModeIndex, setSelectedModeIndex] = useState(currentModeIndex);

  const handleModeChange = (e) => {
    setSelectedModeIndex(parseInt(e.target.value));
    setShowConfirm(true);
  };

  const confirmChange = () => {
    setCurrentModeIndex(selectedModeIndex);
    setShowConfirm(false);
  };

  const cancelChange = () => {
    setSelectedModeIndex(currentModeIndex);
    setShowConfirm(false);
  };

  // Fake student data
  const studentData = {
    name: "Alex Johnson",
    grade: "10th Grade",
    school: "Lincoln High School",
    id: "S12345",
    currentMode: "ADHD",
    courses: [
      { name: "Physics", progress: 95, message: "Excellent progress" },
      {
        name: "Mathematics",
        progress: 75,
        message: "Incomplete practice tasks",
      },
      {
        name: "Biology",
        progress: 60,
        message: "Homework missing for Chapter 3",
      },
      {
        name: "Chemistry",
        progress: 40,
        message: "Low quiz scores – needs revision",
      },
      { name: "History", progress: 85, message: "Consistent effort noticed" },
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
      { mode: "Normal", score: 30 },
      { mode: "Dyslexia", score: 53 },
      { mode: "ADHD", score: 81 },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo mode={modes[currentModeIndex].toLowerCase()} size="md" />
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-blue-300 text-blue-600"
              asChild
            >
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
          <p className="text-gray-600">
            Monitor your child's learning progress and performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-lg font-medium text-blue-700">
                Student Information
              </CardTitle>
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
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Study Mode:</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedModeIndex}
                      onChange={handleModeChange}
                      className="border border-blue-300 bg-white shadow-sm rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {modes.map((mode, index) => (
                        <option key={mode} value={index}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {showConfirm && (
                  <div className="mt-4 p-4 border rounded bg-yellow-50 text-sm text-gray-700">
                    <p className="mb-2">
                      Are you sure you want to switch to{" "}
                      <strong>{modes[selectedModeIndex]}</strong> mode?
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={confirmChange}
                        className="bg-green-600 text-white px-4 py-1 text-sm"
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={cancelChange}
                        variant="outline"
                        className="text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-purple-50">
              <CardTitle className="text-lg font-medium text-purple-700">
                Learning Mode Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <BarChart
                  data={studentData.modePerformance.map((item) => ({
                    name: item.mode,
                    value: item.score,
                  }))}
                  height={200}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium text-purple-600 bg-purple-50 p-2 rounded-md">
                {
                  studentData.modePerformance.sort(
                    (a, b) => b.score - a.score
                  )[0].mode
                }{" "}
                mode is most effective for {studentData.name.split(" ")[0]}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-green-50">
              <CardTitle className="text-lg font-medium text-green-700">
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <LineChart
                  data={studentData.weeklyActivity.map((item) => ({
                    name: item.day,
                    value: item.minutes,
                  }))}
                  height={200}
                />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-green-50 p-2 rounded-md text-green-600">
                Total:{" "}
                {studentData.weeklyActivity.reduce(
                  (acc, curr) => acc + curr.minutes,
                  0
                )}{" "}
                minutes this week
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="flex w-full overflow-x-auto whitespace-nowrap no-scrollbar gap-2 p-1 mb-6 bg-transparent">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentData.courses.map((course, index) => {
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
                            className={`text-base px-3 py-1 rounded-full inline-block ${colorClasses}`}
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

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Mode Recommendation */}
                  <div className="flex items-start gap-4 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                    <div className="text-blue-600 text-2xl">🎯</div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-700 mb-1">
                        Mode Recommendation
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium">
                          {studentData.name.split(" ")[0]}
                        </span>{" "}
                        shows a{" "}
                        <span className="font-semibold">40% improvement</span>{" "}
                        when using{" "}
                        <span className="text-blue-600 font-semibold">
                          ADHD Mode
                        </span>
                        . We highly recommend enabling this mode consistently
                        across all subjects to maximize focus and comprehension.
                      </p>
                    </div>
                  </div>

                  {/* Study Pattern */}
                  <div className="flex items-start gap-4 p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                    <div className="text-green-600 text-2xl">📅</div>
                    <div>
                      <h3 className="text-lg font-bold text-green-700 mb-1">
                        Study Pattern
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Performance peaks on{" "}
                        <span className="font-semibold text-green-700">
                          Tuesdays
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-green-700">
                          Thursdays
                        </span>
                        . Consider scheduling more intensive subjects like{" "}
                        <strong>Math</strong> and <strong>Science</strong> on
                        these days for best results.
                      </p>
                    </div>
                  </div>

                  {/* Subject Focus */}
                  <div className="flex items-start gap-4 p-6 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
                    <div className="text-purple-600 text-2xl">🔬</div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-700 mb-1">
                        Subject Focus
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">Chemistry</span> shows
                        below average progress. Quiz scores indicate a lack of
                        concept clarity. We recommend revisiting topics from{" "}
                        <span className="font-medium">Chapter 2 to 4</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Attendance Record</CardTitle>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition-all duration-200"
                  asChild
                >
                  <Link href="/attendance">View Detailed Attendance</Link>
                </Button>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Pie Chart */}
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-md mx-auto">
                      <PieChart
                        data={[
                          { name: "Present", value: 42, color: "#22c55e" }, // ✅ Green
                          { name: "Absent", value: 3, color: "#facc15" }, // ✅ Yellow
                          { name: "Late", value: 5, color: "#ef4444" }, // ✅ Red
                        ]}
                      />
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-5 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="text-3xl font-bold text-emerald-500">
                        42
                      </div>
                      <div className="text-base font-medium text-emerald-600">
                        Present
                      </div>
                    </div>
                    <div className="p-5 bg-amber-50 rounded-lg border border-amber-100 shadow-sm">
                      <div className="text-3xl font-bold text-amber-500">3</div>
                      <div className="text-base font-medium text-amber-600">
                        Absent
                      </div>
                    </div>
                    <div className="p-5 bg-rose-50 rounded-lg border border-rose-100 shadow-sm">
                      <div className="text-3xl font-bold text-rose-500">5</div>
                      <div className="text-base font-medium text-rose-600">
                        Late
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
