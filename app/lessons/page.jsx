"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Lessons() {
  const [mode, setMode] = useState("normal");

  // Course data
  const courses = [
    {
      id: "physics101",
      title: "Physics 101",
      code: "PHY101",
      progress: 95,
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1470",
      description: "Introduction to basic physics concepts and mechanics.",
      color: "bg-blue-500",
    },
    {
      id: "math201",
      title: "Mathematics",
      code: "MAT201",
      progress: 75,
      image:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1470",
      description: "Advanced algebra and calculus fundamentals.",
      color: "bg-purple-500",
    },
    {
      id: "bio150",
      title: "Biology",
      code: "BIO150",
      progress: 60,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470",
      description: "Study of living organisms and biological systems.",
      color: "bg-green-500",
    },
    {
      id: "chem110",
      title: "Chemistry",
      code: "CHEM110",
      progress: 40,
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470",
      description: "Introduction to chemical principles and reactions.",
      color: "bg-red-500",
    },
    {
      id: "hist101",
      title: "History",
      code: "HIST101",
      progress: 85,
      image:
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=1474",
      description: "World history from ancient civilizations to modern times.",
      color: "bg-amber-500",
    },
    {
      id: "eng202",
      title: "English Literature",
      code: "ENG202",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1470",
      description: "Analysis of classic and contemporary literary works.",
      color: "bg-teal-500",
    },
  ];

  // Apply mode-specific classes
  const getModeClasses = () => {
    switch (mode) {
      case "dyslexia":
        return "font-dyslexic bg-amber-50 text-dark";
      case "adhd":
        return "bg-blue-50";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`min-h-screen ${getModeClasses()}`}>
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Tabs value={mode} onValueChange={(value) => setMode(value)}>
              <TabsList>
                <TabsTrigger value="normal">Normal Mode</TabsTrigger>
                <TabsTrigger value="dyslexia">Dyslexia Mode</TabsTrigger>
                <TabsTrigger value="adhd">ADHD Mode</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" asChild>
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              mode === "dyslexia" ? "text-xl" : ""
            }`}
          >
            My Courses
          </h1>
          <p
            className={`text-gray-600 ${mode === "dyslexia" ? "text-lg" : ""}`}
          >
            Welcome back, Student! Continue your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link href={`/course/${course.id}`} key={course.id}>
              <Card
                className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
                  mode === "adhd"
                    ? "transform hover:scale-105 border-2 border-blue-400"
                    : ""
                }`}
              >
                <div className={`w-full h-2 ${course.color}`}></div>
                <div className="w-full h-40 relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3
                        className={`font-bold ${
                          mode === "dyslexia" ? "text-xl" : "text-lg"
                        }`}
                      >
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">{course.code}</p>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        course.progress >= 75
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {course.progress}% complete
                    </span>
                  </div>
                  <p
                    className={`text-gray-600 mb-4 ${
                      mode === "dyslexia"
                        ? "text-base leading-relaxed"
                        : "text-sm"
                    }`}
                  >
                    {course.description}
                  </p>
                  <Progress
                    value={course.progress}
                    className="h-2"
                    indicatorClassName={course.color.replace("bg-", "bg-")}
                  />
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`ml-auto hover:${course.color.replace(
                      "bg-",
                      "bg-"
                    )} hover:text-white`}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
