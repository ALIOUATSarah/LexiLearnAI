"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, LineChart, PieChart } from "@/components/charts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("students");

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
      { name: "Mon", value: 85 },
      { name: "Tue", value: 92 },
      { name: "Wed", value: 78 },
      { name: "Thu", value: 88 },
      { name: "Fri", value: 76 },
    ],
    modeDistribution: [
      { name: "Normal", value: 40, color: "#3b82f6" },
      { name: "Dyslexia", value: 35, color: "#8b5cf6" },
      { name: "ADHD", value: 25, color: "#10b981" },
    ],
  };

  // Add a new state for tracking which students are using executive scaffolding
  const [executiveScaffolding, setExecutiveScaffolding] = useState(
    classData.students.reduce((acc, student) => {
      acc[student.id] = false;
      return acc;
    }, {})
  );

  // Add notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Update the toggleExecutiveScaffolding function to show a notification
  const toggleExecutiveScaffolding = (studentId) => {
    const studentName = classData.students.find((s) => s.id === studentId).name;
    const newValue = !executiveScaffolding[studentId];

    setExecutiveScaffolding((prev) => ({
      ...prev,
      [studentId]: newValue,
    }));

    setNotification({
      show: true,
      message: `Executive Scaffolding ${
        newValue ? "applied to" : "removed from"
      } ${studentName}`,
      type: newValue ? "success" : "info",
    });

    // Auto-dismiss notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

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
          <Button
            variant="outline"
            className="border-blue-300 text-blue-600"
            asChild
          >
            <Link href="/login">Logout</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Teacher Dashboard
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-gray-600">
              Monitor your class performance and student progress
            </p>
            <div className="mt-2 md:mt-0">
              <Badge
                variant="outline"
                className="text-sm font-medium bg-blue-50 text-blue-700 border-blue-200"
              >
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

          {notification.show && (
            <div
              className={`mt-4 p-3 rounded-md ${
                notification.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {notification.message}
            </div>
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
          <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-lg font-medium text-blue-700">
                Class Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Students:</span>
                  <span className="font-medium">
                    {classData.students.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Progress:</span>
                  <span className="font-medium">
                    {Math.round(
                      classData.students.reduce(
                        (acc, student) => acc + student.progress,
                        0
                      ) / classData.students.length
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Attendance:</span>
                  <span className="font-medium">
                    {Math.round(
                      classData.students.reduce(
                        (acc, student) => acc + student.attendance,
                        0
                      ) / classData.students.length
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Students Needing Help:</span>
                  <span className="font-medium text-red-500">
                    {
                      classData.students.filter((student) => student.needsHelp)
                        .length
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-green-50">
              <CardTitle className="text-lg font-medium text-green-700">
                Weekly Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <LineChart data={classData.weeklyEngagement} height={180} />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-green-50 p-2 rounded-md text-green-600">
                Highest engagement on{" "}
                {
                  classData.weeklyEngagement.reduce((max, item) =>
                    item.value > max.value ? item : max
                  ).name
                }
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2 bg-purple-50">
              <CardTitle className="text-lg font-medium text-purple-700">
                Learning Mode Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[180px]">
                <PieChart data={classData.modeDistribution} height={180} />
              </div>
              <div className="mt-4 text-center text-sm font-medium bg-purple-50 p-2 rounded-md text-purple-600">
                {
                  classData.modeDistribution.sort(
                    (a, b) => b.value - a.value
                  )[0].name
                }{" "}
                is the most common mode
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
                  {classData.students.map((student) => {
                    const modes = ["Normal", "Dyslexia", "ADHD"];

                    const [selectedModeIndex, setSelectedModeIndex] = useState(
                      modes.indexOf(student.recommendedMode)
                    );
                    const [currentModeIndex, setCurrentModeIndex] = useState(
                      modes.indexOf(student.recommendedMode)
                    );
                    const [showConfirm, setShowConfirm] = useState(false);

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

                    return (
                      <div
                        key={student.id}
                        className={`p-4 rounded-md border ${
                          student.needsHelp
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200"
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
                              <div className="text-sm text-gray-500">
                                ID: {student.id}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Link href={`/student-report/${student.id}`}>
                              View Report
                            </Link>
                          </Button>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Progress Circle */}
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Progress
                            </div>
                            <div className="relative w-16 h-16">
                              <svg
                                viewBox="0 0 36 36"
                                className="w-full h-full"
                              >
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
                                    student.progress < 50
                                      ? "#ef4444"
                                      : student.progress <= 70
                                      ? "#facc15"
                                      : "#22c55e"
                                  }
                                  strokeWidth="4"
                                  strokeDasharray="100"
                                  strokeDashoffset={100 - student.progress}
                                  strokeLinecap="round"
                                  transform="rotate(-90 18 18)"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                                {student.progress}%
                              </div>
                            </div>
                          </div>

                          {/* Attendance Bar */}
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Attendance
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full">
                              <div
                                className="h-3 bg-blue-500 rounded-full"
                                style={{ width: `${student.attendance}%` }}
                              ></div>
                            </div>
                            <p className="text-right text-sm font-semibold text-blue-600 mt-1">
                              {student.attendance}%
                            </p>
                          </div>

                          {/* Mode Dropdown */}
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              Mode
                            </div>
                            <select
                              value={selectedModeIndex}
                              onChange={handleModeChange}
                              className="border border-blue-300 bg-white shadow-sm rounded-lg px-4 py-2 text-sm font-medium text-blue-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                            <p className="mb-2 font-medium">
                              Are you sure you want to switch to{" "}
                              <strong className="text-blue-700">
                                {modes[selectedModeIndex]}
                              </strong>{" "}
                              mode?
                            </p>
                            <div className="flex gap-4 justify-end">
                              <Button
                                onClick={confirmChange}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm"
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

                        {student.needsHelp && (
                          <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <div className="text-sm text-red-600 font-medium">
                              This student needs additional support. Performance
                              is below average.
                            </div>
                            <Button
                              size="sm"
                              className={
                                executiveScaffolding[student.id]
                                  ? "bg-teal-600 hover:bg-teal-700"
                                  : "bg-amber-600 hover:bg-amber-700"
                              }
                              onClick={() =>
                                toggleExecutiveScaffolding(student.id)
                              }
                            >
                              {executiveScaffolding[student.id]
                                ? "Remove Executive Scaffolding"
                                : "Apply Executive Scaffolding"}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                    <h3 className="font-bold text-blue-700 mb-2">
                      Learning Mode Effectiveness
                    </h3>
                    <p className="mb-3">
                      Students using Dyslexia mode show 15% higher performance
                      on average compared to Normal mode.
                    </p>
                    <div className="h-[220px]">
                      <BarChart
                        data={[
                          { name: "Normal", value: 76, color: "#3b82f6" },
                          { name: "Dyslexia", value: 87, color: "#8b5cf6" },
                          { name: "ADHD", value: 68, color: "#10b981" },
                        ]}
                        height={220}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <h3 className="font-bold text-green-700 mb-2">
                      Topic Mastery
                    </h3>
                    <p>
                      The following topics have the lowest mastery levels in
                      your class:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Energy and Work (45% mastery)</li>
                      <li>Electromagnetic Forces (52% mastery)</li>
                      <li>Quantum Mechanics (38% mastery)</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Consider revisiting these topics or providing additional
                      resources.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <h3 className="font-bold text-purple-700 mb-2">
                      Students Needing Support
                    </h3>
                    <p className="mb-2">
                      2 students are currently flagged as needing additional
                      support:
                    </p>
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
                              <Link href={`/student-report/${student.id}`}>
                                View Report
                              </Link>
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-md">
                    <h3 className="font-bold text-teal-700 mb-2">
                      Executive Function Support
                    </h3>
                    <p className="mb-3">
                      {
                        Object.values(executiveScaffolding).filter(Boolean)
                          .length
                      }{" "}
                      students are currently using Executive Scaffolding
                      support.
                    </p>

                    {Object.values(executiveScaffolding).some(Boolean) ? (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">
                          Students with Executive Scaffolding:
                        </h4>
                        {classData.students
                          .filter((s) => executiveScaffolding[s.id])
                          .map((student) => (
                            <div
                              key={student.id}
                              className="flex justify-between items-center p-2 bg-white rounded border border-teal-200"
                            >
                              <span>{student.name}</span>
                              <Badge
                                variant="outline"
                                className="bg-teal-50 text-teal-700 border-teal-300"
                              >
                                Executive Support Active
                              </Badge>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm italic text-gray-600">
                        No students are currently using Executive Function
                        Scaffolding. Apply it to students who need help with
                        organization and planning.
                      </p>
                    )}

                    <div className="mt-4 p-3 bg-white rounded border border-teal-200">
                      <h4 className="font-medium text-teal-800 mb-1">
                        Benefits of Executive Scaffolding:
                      </h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>
                          Helps students break down complex tasks into
                          manageable steps
                        </li>
                        <li>
                          Provides time management tools and visual progress
                          tracking
                        </li>
                        <li>
                          Gradually reduces support as students develop
                          independent skills
                        </li>
                        <li>
                          Improves completion rates for assignments by 42% on
                          average
                        </li>
                      </ul>
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
