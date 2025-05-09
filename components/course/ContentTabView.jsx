import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Files as FilesIcon,
  Info,
  LightbulbIcon,
  Target,
  Check,
} from "lucide-react";
import { detectPatterns } from "@/lib/course-utils";

const ContentTabView = ({
  course,
  mode,
  expandedSection,
  setExpandedSection,
  sensitivityProfile,
  getFileIcon,
}) => {
  // Function to toggle section expansion
  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  // Normal Mode Content
  if (mode === "normal") {
    return (
      <div className="space-y-8">
        {course.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="overflow-hidden border-l-4 border-purple-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
          >
            <div className="p-1 bg-gradient-to-r from-purple-500 to-indigo-600">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                    <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                      {lesson.id}
                    </span>
                    {lesson.title}
                  </h2>
                  <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm font-medium">
                    Lesson {lesson.id}
                  </Badge>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed border-l-4 border-purple-200 pl-4 py-1 italic bg-purple-50 rounded-r-md">
                    {lesson.content.split(".")[0]}.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <BookOpen size={18} className="mr-2 text-purple-600" />
                    Key Concepts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.sections.map((section, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow transition duration-200"
                      >
                        <div className="mr-3 bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div className="text-gray-700">{section}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-gray-600"
                    >
                      <FileText size={14} />
                      <span>{lesson.materials.length} Resources</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-gray-600"
                    >
                      <Clock size={14} />
                      <span>~{Math.floor(Math.random() * 20) + 25} min</span>
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 flex items-center gap-1"
                    onClick={() => toggleSection(lesson.id)}
                  >
                    <span>View Materials</span>
                    <ChevronDown size={16} />
                  </Button>
                </div>

                {expandedSection === lesson.id && (
                  <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-4">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <FilesIcon size={18} className="mr-2 text-purple-600" />
                      Lesson Materials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lesson.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-start p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow hover:border-purple-300 transition duration-200"
                        >
                          <div className="mr-3 text-purple-600 flex-shrink-0">
                            {getFileIcon(material.type)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {material.title}
                            </h4>
                            <div className="flex items-center mt-1 gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-600 text-xs"
                              >
                                {material.type.charAt(0).toUpperCase() +
                                  material.type.slice(1)}
                              </Badge>
                              {material.duration && (
                                <span className="text-xs text-gray-500">
                                  {material.duration}
                                </span>
                              )}
                              {material.completed && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {course.quizData && (
          <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-white mx-auto mt-12">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{course.quizData.title}</h3>
                  <p className="text-sm opacity-90 mt-1">
                    {course.quizData.questions.length} questions •{" "}
                    {course.quizData.timeLimit} minutes
                  </p>
                </div>
                <div className="flex flex-col items-end text-base">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Time Limit: {course.quizData.timeLimit} min</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Target size={16} className="mr-1" />
                    <span>Passing Score: {course.quizData.passingScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-gray-700">
                  Sample Question:
                </h4>

                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="mb-3">
                    {course.quizData.questions[0].question}
                  </p>

                  <div className="space-y-2">
                    {course.quizData.questions[0].options.map((option, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-2 rounded hover:bg-gray-100"
                      >
                        <div className="w-5 h-5 rounded-full border border-gray-400 flex-shrink-0 mr-3"></div>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg mb-4 bg-purple-50 border border-purple-200">
                <div className="flex items-center">
                  <Info size={20} className="mr-2 text-purple-700" />
                  <h4 className="font-medium text-purple-800">
                    Quiz Information
                  </h4>
                </div>

                <ul className="mt-2 space-y-1 text-purple-700">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 flex-shrink-0" />
                    <span>Multiple choice and true/false questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 flex-shrink-0" />
                    <span>
                      Covers material from all {course.lessons.length} lessons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-1 flex-shrink-0" />
                    <span>Detailed explanations provided after submission</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <LightbulbIcon size={18} className="mr-2 text-purple-700" />
                  <span className="text-sm text-gray-600">
                    You can retake the quiz to improve your score
                  </span>
                </div>

                <Button
                  className="bg-[#6C48C5] hover:bg-[#5a39b0] text-white px-6 py-2 rounded-lg"
                  asChild
                >
                  <Link href={`/quiz/${course.code.toLowerCase()}`}>
                    Start Quiz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dyslexia Mode Content
  if (mode === "dyslexia") {
    return (
      <div className="dyslexia-font space-y-8">
        {course.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="overflow-hidden border-l-4 border-amber-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
          >
            <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-amber-800 flex items-center">
                    <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                      {lesson.id}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: lesson.title,
                      }}
                    ></span>
                  </h2>
                  <Badge className="bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium">
                    Lesson {lesson.id}
                  </Badge>
                </div>

                <div className="mb-6">
                  <p
                    className="text-gray-700 leading-relaxed border-l-4 border-amber-200 pl-4 py-1 italic bg-amber-50 rounded-r-md"
                    dangerouslySetInnerHTML={{
                      __html: lesson.content.split(".")[0] + ".",
                    }}
                  ></p>
                </div>

                <h3 className="font-semibold text-amber-700 mb-2">
                  Key Topics
                </h3>
                <ul className="space-y-2 mb-6">
                  {lesson.sections.map((section, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: section,
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 mt-4">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ADHD Mode Content
  if (mode === "adhd") {
    return (
      <div className="adhd-friendly space-y-8">
        {course.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="overflow-hidden border-l-4 border-blue-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
          >
            <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-blue-800 flex items-center">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                      {lesson.id}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: lesson.title,
                      }}
                    ></span>
                  </h2>
                  <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                    Lesson {lesson.id}
                  </Badge>
                </div>

                <div className="mb-6">
                  <p
                    className="text-gray-700 leading-relaxed border-l-4 border-blue-200 pl-4 py-1 italic bg-blue-50 rounded-r-md"
                    dangerouslySetInnerHTML={{
                      __html: lesson.content.split(".")[0] + ".",
                    }}
                  ></p>
                </div>

                <h3 className="font-semibold text-blue-700 mb-2">Key Topics</h3>
                <ul className="space-y-2 mb-6">
                  {lesson.sections.map((section, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: section,
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Adaptive Mode Content
  if (mode === "adaptive") {
    return (
      <div className="adaptive-sensory space-y-8">
        {course.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="overflow-hidden border-l-4 border-indigo-400 shadow-md rounded-lg bg-white hover:shadow-lg transition duration-300"
          >
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-indigo-800 flex items-center">
                    <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm">
                      {lesson.id}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: detectPatterns(
                          lesson.title,
                          mode,
                          sensitivityProfile
                        ),
                      }}
                    ></span>
                  </h2>
                  <Badge className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-medium">
                    Lesson {lesson.id}
                  </Badge>
                </div>

                <div className="mb-6">
                  <p
                    className="text-gray-700 leading-relaxed border-l-4 border-indigo-200 pl-4 py-1 italic bg-indigo-50 rounded-r-md"
                    dangerouslySetInnerHTML={{
                      __html: detectPatterns(
                        lesson.content.split(".")[0] + ".",
                        mode,
                        sensitivityProfile
                      ),
                    }}
                  ></p>
                </div>

                <h3 className="font-semibold text-indigo-700 mb-2">
                  Key Topics
                </h3>
                <ul className="space-y-2 mb-6">
                  {lesson.sections.map((section, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: detectPatterns(
                            section,
                            mode,
                            sensitivityProfile
                          ),
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-3 mt-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button
                    variant="outline"
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ContentTabView;
