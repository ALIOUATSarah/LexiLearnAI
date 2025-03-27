"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from "@/app/components/Logo";

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debug: log when the component mounts
  useEffect(() => {
    console.log("Login page mounted");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log(`Attempting to log in as ${userType} with ID: ${userId}`);

      if (!userId || !password) {
        setError("Please enter both ID and password");
        setIsLoading(false);
        return;
      }

      // Add a small delay to simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate login based on user type
      if (userType === "student") {
        console.log("Redirecting to student dashboard");
        router.push("/student-dashboard");
      } else if (userType === "parent") {
        console.log("Redirecting to parent dashboard");
        router.push("/parent-dashboard");
      } else if (userType === "teacher") {
        console.log("Redirecting to teacher dashboard");
        router.push("/teacher-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative navigation function for testing
  const navigateDirectly = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-purple-50">
          <Logo size="lg" />
          <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Sign in
          </CardTitle>
          <CardDescription>
            Enter your ID and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <RadioGroup
                defaultValue="student"
                value={userType}
                onValueChange={setUserType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="student"
                    id="student"
                    className="text-blue-600"
                  />
                  <Label htmlFor="student" className="cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="parent"
                    id="parent"
                    className="text-purple-600"
                  />
                  <Label htmlFor="parent" className="cursor-pointer">
                    Parent
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="teacher"
                    id="teacher"
                    className="text-green-600"
                  />
                  <Label htmlFor="teacher" className="cursor-pointer">
                    Teacher
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-700">
                {userType === "student"
                  ? "Student ID"
                  : userType === "parent"
                  ? "Parent ID"
                  : "Teacher ID"}
              </Label>
              <Input
                id="userId"
                placeholder="Enter your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Fallback navigation links */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              If redirect doesn't work, use these direct links:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigateDirectly("/student-dashboard")}
                className="text-xs text-blue-600 hover:underline"
              >
                Student Dashboard
              </button>
              <button
                type="button"
                onClick={() => navigateDirectly("/parent-dashboard")}
                className="text-xs text-purple-600 hover:underline"
              >
                Parent Dashboard
              </button>
              <button
                type="button"
                onClick={() => navigateDirectly("/teacher-dashboard")}
                className="text-xs text-green-600 hover:underline"
              >
                Teacher Dashboard
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center bg-gradient-to-r from-blue-50 to-purple-50">
          <p className="text-sm text-gray-500">
            Demo credentials: Use any ID/password combination
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
