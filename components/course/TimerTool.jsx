import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import TimerToast from "./TimerToast";

const TimerTool = ({ isOpen, onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("running");
  const [minimized, setMinimized] = useState(false);

  // Effect to handle the timer countdown
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          clearInterval(interval);
          const audio = new Audio("/sounds/timer-complete.mp3");
          audio.play().catch((e) => console.log("Audio play failed:", e));

          // Show toast notification
          setToastType(isBreak ? "break-completed" : "completed");
          setShowToast(true);

          // Switch between focus and break
          setIsRunning(false);
          if (isBreak) {
            // End of break, set back to focus time
            setIsBreak(false);
            setMinutes(25);
          } else {
            // End of focus time, switch to break
            setIsBreak(true);
            setMinutes(5);
          }
        }
      }, 1000);

      // Show timer toast while running
      setToastType(isBreak ? "break-running" : "running");
      setShowToast(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak]);

  const handleStart = () => {
    setIsRunning(true);
    setMinimized(true);
    onClose(); // Close the main timer window
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setShowToast(false);
  };

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isRunning && !isNaN(value)) {
      setMinutes(value);
      setSeconds(0);
    }
  };

  const handleToastAcknowledge = () => {
    if (toastType === "completed") {
      // Start break time
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
      setIsRunning(true);
      setToastType("break-running");
    } else if (toastType === "break-completed") {
      // Start focus time again
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
      setIsRunning(true);
      setToastType("running");
    }
  };

  const closeToast = () => {
    setShowToast(false);
    if (isRunning) {
      // If we're closing while the timer is running, minimize
      setMinimized(true);
    } else {
      // If timer isn't running, fully close
      setMinimized(false);
    }
  };

  const reopenTimerModal = () => {
    if (minimized) {
      setMinimized(false);
      isOpen = true;
    }
  };

  // Return toast if minimized
  if (minimized && isRunning) {
    return (
      <TimerToast
        isVisible={showToast}
        type={toastType}
        minutes={minutes}
        seconds={seconds}
        onClose={closeToast}
        onPause={handlePause}
        onContinue={handleResume}
        onAcknowledge={handleToastAcknowledge}
      />
    );
  }

  if (!isOpen && !showToast) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[320px] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-blue-800">
            {isBreak ? "Break Time" : "Focus Timer"}
          </h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-700 mb-4">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>

            {!isRunning && !isBreak && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Set Timer (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={minutes}
                  onChange={handleTimeChange}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
            )}

            <p className="text-sm text-gray-600 mb-4">
              {isBreak
                ? "Take a short break to refresh your mind."
                : "Stay focused on your task during this time."}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                className="bg-blue-600 hover:bg-blue-700 px-5"
              >
                <Play size={16} className="mr-2" /> Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                className="bg-amber-600 hover:bg-amber-700 px-5"
              >
                <Pause size={16} className="mr-2" /> Pause
              </Button>
            )}

            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-300"
            >
              <RotateCcw size={16} className="mr-2" /> Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Timer Toast */}
      <TimerToast
        isVisible={showToast}
        type={toastType}
        minutes={minutes}
        seconds={seconds}
        onClose={closeToast}
        onPause={handlePause}
        onContinue={handleResume}
        onAcknowledge={handleToastAcknowledge}
      />
    </div>
  );
};

export default TimerTool;
