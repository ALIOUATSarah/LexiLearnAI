import React, { useEffect } from "react";
import { X, Bell, Pause, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TimerToast = ({
  isVisible,
  type,
  minutes,
  seconds,
  onClose,
  onPause,
  onContinue,
  onAcknowledge,
}) => {
  // Auto-hide after 10 seconds if not paused
  useEffect(() => {
    if (isVisible && type === "completed") {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose]);

  // Don't render if not visible
  if (!isVisible) return null;

  const getMessage = () => {
    if (type === "running") {
      return "Focus time remaining";
    } else if (type === "break-running") {
      return "Break time remaining";
    } else if (type === "completed") {
      return "Focus time completed!";
    } else if (type === "break-completed") {
      return "Break time completed!";
    }
    return "";
  };

  const getActionButton = () => {
    if (type === "running" || type === "break-running") {
      return (
        <Button
          size="sm"
          variant="outline"
          className="h-7 px-2"
          onClick={onPause}
        >
          <Pause size={14} className="mr-1" />
          <span>Pause</span>
        </Button>
      );
    } else if (type === "completed" || type === "break-completed") {
      return (
        <Button
          size="sm"
          className={`h-7 px-2 ${
            type === "completed" ? "bg-blue-500" : "bg-green-500"
          }`}
          onClick={onAcknowledge}
        >
          <Check size={14} className="mr-1" />
          <span>{type === "completed" ? "Take a break" : "Back to focus"}</span>
        </Button>
      );
    }
    return null;
  };

  const getBgColor = () => {
    if (type === "running") return "bg-blue-100 border-blue-300";
    if (type === "break-running") return "bg-green-100 border-green-300";
    if (type === "completed") return "bg-blue-100 border-blue-300";
    if (type === "break-completed") return "bg-green-100 border-green-300";
    return "bg-gray-100 border-gray-300";
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`rounded-lg border shadow-md p-3 ${getBgColor()}`}>
        <div className="flex items-start gap-2">
          <div
            className={`p-2 rounded-full ${
              type.includes("break") ? "bg-green-200" : "bg-blue-200"
            }`}
          >
            <Bell
              size={16}
              className={
                type.includes("break") ? "text-green-600" : "text-blue-600"
              }
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-sm">{getMessage()}</h4>
                {(type === "running" || type === "break-running") && (
                  <p className="text-xl font-bold mt-1">
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-2">{getActionButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerToast;
