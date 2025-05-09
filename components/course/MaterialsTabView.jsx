import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Download,
  FileDown,
  Folder,
  Search,
} from "lucide-react";
import { getFileIcon } from "@/lib/course-utils";
import * as Icons from "lucide-react";

const MaterialsTabView = ({
  course,
  mode,
  downloadProgress,
  handleDownloadMaterial,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Get all materials from all lessons
  const allMaterials = course.lessons.flatMap((lesson) =>
    lesson.materials.map((material) => ({
      ...material,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
    }))
  );

  // Get unique material types
  const materialTypes = [
    "all",
    ...Array.from(new Set(allMaterials.map((material) => material.type))),
  ];

  // Filter materials based on search term and selected type
  const filteredMaterials = allMaterials.filter((material) => {
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || material.type === selectedType;
    const matchesCategory =
      expandedCategory === "all" ||
      expandedCategory === material.lessonId.toString();
    return matchesSearch && matchesType && matchesCategory;
  });

  // Group materials by lesson
  const materialsByLesson = {};
  filteredMaterials.forEach((material) => {
    if (!materialsByLesson[material.lessonId]) {
      materialsByLesson[material.lessonId] = {
        id: material.lessonId,
        title: material.lessonTitle,
        materials: [],
      };
    }
    materialsByLesson[material.lessonId].materials.push(material);
  });

  // Get color classes based on mode
  const getColorClasses = () => {
    switch (mode) {
      case "dyslexia":
        return {
          button: "bg-amber-600 hover:bg-amber-700",
          outlineButton: "border-amber-200 text-amber-700 hover:bg-amber-50",
          header: "bg-amber-500 text-white",
          accent: "text-amber-600",
          badge: "bg-amber-100 text-amber-700",
          card: "border-amber-200 hover:border-amber-300",
          icon: "text-amber-500",
        };
      case "adhd":
        return {
          button: "bg-blue-600 hover:bg-blue-700",
          outlineButton: "border-blue-200 text-blue-700 hover:bg-blue-50",
          header: "bg-blue-500 text-white",
          accent: "text-blue-600",
          badge: "bg-blue-100 text-blue-700",
          card: "border-blue-200 hover:border-blue-300",
          icon: "text-blue-500",
        };
      case "adaptive":
        return {
          button: "bg-indigo-600 hover:bg-indigo-700",
          outlineButton: "border-indigo-200 text-indigo-700 hover:bg-indigo-50",
          header: "bg-indigo-500 text-white",
          accent: "text-indigo-600",
          badge: "bg-indigo-100 text-indigo-700",
          card: "border-indigo-200 hover:border-indigo-300",
          icon: "text-indigo-500",
        };
      default:
        return {
          button: "bg-purple-600 hover:bg-purple-700",
          outlineButton: "border-purple-200 text-purple-700 hover:bg-purple-50",
          header: "bg-purple-500 text-white",
          accent: "text-purple-600",
          badge: "bg-purple-100 text-purple-700",
          card: "border-purple-200 hover:border-purple-300",
          icon: "text-purple-500",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div>
      {/* Search and Filters */}
      <div className={`mb-6 p-4 rounded-lg border ${colors.card}`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border pl-10"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-md border"
            >
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all"
                    ? "All Types"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={expandedCategory}
              onChange={(e) => setExpandedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border"
            >
              <option value="all">All Lessons</option>
              {course.lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id.toString()}>
                  Lesson {lesson.id}: {lesson.title.substring(0, 30)}
                  {lesson.title.length > 30 ? "..." : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-6">
        {Object.values(materialsByLesson).map((lessonGroup) => (
          <div key={lessonGroup.id}>
            {/* Lesson Header (only show if viewing all) */}
            {expandedCategory === "all" && (
              <div className={`mb-3 px-4 py-2 rounded-md ${colors.header}`}>
                <h3 className="font-medium">
                  Lesson {lessonGroup.id}: {lessonGroup.title}
                </h3>
              </div>
            )}

            {/* Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessonGroup.materials.map((material) => (
                <Card
                  key={material.id}
                  className={`overflow-hidden transition-all hover:shadow-md ${colors.card}`}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className={`mr-3 flex-shrink-0 ${colors.icon}`}>
                        {getFileIcon(material.type, Icons)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{material.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={colors.badge}>
                            {material.type.charAt(0).toUpperCase() +
                              material.type.slice(1)}
                          </Badge>
                          {material.duration && (
                            <span className="text-xs text-gray-500">
                              {material.duration}
                            </span>
                          )}
                          {material.completed && (
                            <Badge
                              variant="outline"
                              className="border-green-300 text-green-700 flex items-center gap-1"
                            >
                              <CheckCircle2 size={12} />
                              <span>Completed</span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={colors.outlineButton}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={colors.outlineButton}
                        onClick={() => handleDownloadMaterial(material)}
                        disabled={downloadProgress !== null}
                      >
                        <div className="flex items-center">
                          {downloadProgress !== null &&
                          downloadProgress.id === material.id ? (
                            <span className="mr-2">
                              {downloadProgress.progress}%
                            </span>
                          ) : (
                            <Download size={14} className="mr-2" />
                          )}
                          <span>Download</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-3">
              <FileDown size={40} className="mx-auto text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              No materials found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* All Materials Download Button */}
      <div className="mt-8 text-center">
        <Button
          className={`px-6 ${colors.button}`}
          onClick={() => handleDownloadMaterial({ id: "all" })}
          disabled={downloadProgress !== null}
        >
          <div className="flex items-center">
            <Folder className="mr-2" size={18} />
            <span>Download All Materials</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MaterialsTabView;
