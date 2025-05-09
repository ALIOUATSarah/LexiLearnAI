import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Circle, Clock, Award, Eye } from "lucide-react";

const ProgressTracker = ({ isOpen, onClose, course }) => {
  const [progress, setProgress] = useState(null);

  // Initialize progress from local storage or create new
  useEffect(() => {
    if (!course) return;

    const savedProgress = localStorage.getItem(`${course.code}-progress`);

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    } else {
      // Initialize new progress data
      const newProgress = {
        completedLessons: [],
        completedMaterials: [],
        totalTimeSpent: 0,
        lastStudyDate: null,
        streakDays: 0,
        goals: [
          { id: 1, text: "Complete course introduction", completed: false },
          { id: 2, text: "Finish 3 lessons", completed: false },
          { id: 3, text: "Take first quiz", completed: false },
        ],
      };

      setProgress(newProgress);
      localStorage.setItem(
        `${course.code}-progress`,
        JSON.stringify(newProgress)
      );
    }
  }, [course]);

  // Update goal completion status
  const toggleGoal = (goalId) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      goals: progress.goals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      ),
    };

    setProgress(updatedProgress);
    localStorage.setItem(
      `${course.code}-progress`,
      JSON.stringify(updatedProgress)
    );
  };

  // Add new goal
  const addGoal = (text) => {
    if (!progress || !text.trim()) return;

    const newGoal = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    const updatedProgress = {
      ...progress,
      goals: [...progress.goals, newGoal],
    };

    setProgress(updatedProgress);
    localStorage.setItem(
      `${course.code}-progress`,
      JSON.stringify(updatedProgress)
    );
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    if (!course || !progress) return 0;

    const totalLessons = course.lessons.length;
    const completedLessons = progress.completedLessons.length;

    return Math.round((completedLessons / totalLessons) * 100);
  };

  const [newGoalText, setNewGoalText] = useState("");

  if (!isOpen || !progress) return null;

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[80vh] shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-blue-800">Progress Tracker</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
          {/* Overall Progress */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-blue-700 mb-3 flex items-center">
              <Eye size={18} className="mr-2" />
              Course Progress
            </h4>

            <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-blue-600"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>

            <div className="text-sm text-gray-600">
              {completionPercentage}% Complete
            </div>
          </div>

          {/* Study Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Study Time
                </span>
              </div>
              <p className="text-lg font-bold text-blue-700">
                {Math.round(progress.totalTimeSpent / 60)} hrs
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-1">
                <Award size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Study Streak
                </span>
              </div>
              <p className="text-lg font-bold text-blue-700">
                {progress.streakDays} days
              </p>
            </div>
          </div>

          {/* Study Goals */}
          <div>
            <h4 className="text-lg font-medium text-blue-700 mb-3">
              Study Goals
            </h4>

            <div className="space-y-2 mb-4">
              {progress.goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-3 border rounded-lg flex items-start transition-colors ${
                    goal.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className="flex-shrink-0 mt-0.5 mr-3"
                  >
                    {goal.completed ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                  </button>
                  <span
                    className={
                      goal.completed ? "text-gray-600 line-through" : ""
                    }
                  >
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Add New Goal */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new study goal..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-grow border rounded-md p-2 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newGoalText.trim()) {
                    addGoal(newGoalText);
                    setNewGoalText("");
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (newGoalText.trim()) {
                    addGoal(newGoalText);
                    setNewGoalText("");
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
