"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Play, Clock, Award, BookOpen } from "lucide-react";

export default function Lessons() {
  const [mode, setMode] = useState("normal");
  const [focusedCard, setFocusedCard] = useState(null);

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
      learningTime: "4.5 hours",
      achievements: 12,
      lessons: 16,
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
      learningTime: "3.2 hours",
      achievements: 8,
      lessons: 14,
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
      learningTime: "2.8 hours",
      achievements: 6,
      lessons: 12,
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
      learningTime: "1.5 hours",
      achievements: 4,
      lessons: 10,
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
      learningTime: "3.5 hours",
      achievements: 10,
      lessons: 15,
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
      learningTime: "1.2 hours",
      achievements: 3,
      lessons: 12,
    },
  ];

  // Audio synthesis for text-to-speech in dyslexia mode
  useEffect(() => {
    let speechSynthesis;
    if (typeof window !== "undefined") {
      speechSynthesis = window.speechSynthesis;
    }
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text) => {
    if (mode === "dyslexia" && typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower rate
      window.speechSynthesis.speak(utterance);
    }
  };

  // Apply mode-specific classes
  const getModeClasses = () => {
    switch (mode) {
      case "dyslexia":
        return "font-sans bg-cream text-dark dyslexia-mode";
      case "adhd":
        return "bg-white adhd-mode";
      default:
        return "bg-white";
    }
  };

  return (
    <div className={`min-h-screen ${getModeClasses()}`}>
      <style jsx global>{`
        .dyslexia-mode p,
        .dyslexia-mode h1,
        .dyslexia-mode h2,
        .dyslexia-mode h3,
        .dyslexia-mode span {
          font-family: Arial, sans-serif;
          letter-spacing: 0.15em;
          line-height: 1.8;
          word-spacing: 0.25em;
          font-weight: 500;
        }
        .dyslexia-mode {
          background-color: #f8f5e4;
        }
        .adhd-mode .focus-card {
          transform: scale(1.05);
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
          border: 2px solid #3b82f6;
          z-index: 10;
        }
        .adhd-mode .unfocused-card {
          opacity: 0.7;
          filter: grayscale(0.3);
        }
      `}</style>

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

            <Button
              variant="outline"
              className="border-blue-300 text-blue-600"
              asChild
            >
              <Link href="/student-dashboard">My Dashboard</Link>
            </Button>

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
            {mode === "dyslexia" ? (
              <span className="inline-flex items-center text-blue-700">
                <button
                  onClick={() =>
                    speakText(
                      "Welcome back, Student! Continue your learning journey."
                    )
                  }
                  className="mr-2 bg-blue-100 rounded-full p-1"
                  aria-label="Read aloud"
                >
                  <Play size={16} />
                </button>
                Welcome back, Student! Continue your learning journey.
              </span>
            ) : (
              "Welcome back, Student! Continue your learning journey."
            )}
          </p>

          {mode === "adhd" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h2 className="font-semibold text-blue-800 mb-2 flex items-center">
                <Clock size={18} className="mr-2" /> Today's Study Focus
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Complete Physics lesson 10</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Take Math practice quiz</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Review Biology notes (20 minutes)</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link href={`/course/${course.id}`} key={course.id}>
              <Card
                className={`overflow-hidden transition-all duration-300 ${
                  mode === "adhd" && focusedCard === course.id
                    ? "focus-card"
                    : mode === "adhd" &&
                      focusedCard !== null &&
                      focusedCard !== course.id
                    ? "unfocused-card"
                    : mode === "adhd"
                    ? "hover:scale-105 border-2 border-transparent hover:border-blue-400"
                    : "hover:shadow-lg"
                }`}
                onMouseEnter={() =>
                  mode === "adhd" && setFocusedCard(course.id)
                }
                onMouseLeave={() => mode === "adhd" && setFocusedCard(null)}
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
                        {mode === "dyslexia" ? (
                          <span className="inline-flex items-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                speakText(course.title);
                              }}
                              className="mr-2 bg-blue-100 rounded-full p-1"
                              aria-label="Read course title aloud"
                            >
                              <Play size={14} />
                            </button>
                            {course.title}
                          </span>
                        ) : (
                          course.title
                        )}
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
                      mode === "dyslexia" ? "text-base" : "text-sm"
                    }`}
                  >
                    {mode === "dyslexia" ? (
                      <span className="inline-flex items-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            speakText(course.description);
                          }}
                          className="mr-2 bg-blue-100 rounded-full p-1"
                          aria-label="Read description aloud"
                        >
                          <Play size={14} />
                        </button>
                        {course.description}
                      </span>
                    ) : (
                      course.description
                    )}
                  </p>

                  {mode === "adhd" && (
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="flex flex-col items-center bg-blue-50 rounded-lg p-2">
                        <Clock className="w-4 h-4 text-blue-600 mb-1" />
                        <span className="text-blue-700 font-medium">
                          {course.learningTime}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-amber-50 rounded-lg p-2">
                        <Award className="w-4 h-4 text-amber-600 mb-1" />
                        <span className="text-amber-700 font-medium">
                          {course.achievements}
                        </span>
                      </div>
                      <div className="flex flex-col items-center bg-green-50 rounded-lg p-2">
                        <BookOpen className="w-4 h-4 text-green-600 mb-1" />
                        <span className="text-green-700 font-medium">
                          {course.lessons}
                        </span>
                      </div>
                    </div>
                  )}

                  <Progress
                    value={course.progress}
                    className={`h-2 ${
                      mode === "dyslexia" ? "bg-gray-300" : ""
                    }`}
                    indicatorClassName={course.color.replace("bg-", "bg-")}
                  />
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3 border-t">
                  <Button
                    variant={mode === "adhd" ? "default" : "ghost"}
                    size="sm"
                    className={`ml-auto ${
                      mode === "adhd"
                        ? `${course.color.replace(
                            "bg-",
                            "bg-"
                          )} hover:opacity-90 text-white`
                        : `hover:${course.color.replace(
                            "bg-",
                            "bg-"
                          )} hover:text-white`
                    }`}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {mode === "dyslexia" && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-800 mb-2">
              Dyslexia Mode Features
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>
                  Increased letter spacing and line height for easier reading
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>Text-to-speech buttons to hear content read aloud</span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>Specialized color contrast to reduce visual stress</span>
              </li>
            </ul>
          </div>
        )}

        {mode === "adhd" && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-800 mb-2">
              ADHD Mode Features
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>
                  Focus highlighting reduces distractions and emphasizes current
                  task
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>
                  Visual metrics for time, achievements, and progress to improve
                  motivation
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-2"></div>
                <span>
                  Structured daily study plan to help with time management
                </span>
              </li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
