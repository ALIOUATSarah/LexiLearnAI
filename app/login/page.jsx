"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Login() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (!userId || !password) {
      setError("Please enter both ID and password")
      return
    }

    // Simulate login based on user type
    if (userType === "student") {
      router.push("/lessons")
    } else if (userType === "parent") {
      router.push("/parent-dashboard")
    } else if (userType === "teacher") {
      router.push("/teacher-dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h2 className="text-xl font-bold">LexiLearn AI</h2>
          </div>
          <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Sign in
          </CardTitle>
          <CardDescription>Enter your ID and password to access your account</CardDescription>
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
                  <RadioGroupItem value="student" id="student" className="text-blue-600" />
                  <Label htmlFor="student" className="cursor-pointer">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" className="text-purple-600" />
                  <Label htmlFor="parent" className="cursor-pointer">
                    Parent
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" className="text-green-600" />
                  <Label htmlFor="teacher" className="cursor-pointer">
                    Teacher
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-700">
                {userType === "student" ? "Student ID" : userType === "parent" ? "Parent ID" : "Teacher ID"}
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center bg-gradient-to-r from-blue-50 to-purple-50">
          <p className="text-sm text-gray-500">Demo credentials: Use any ID/password combination</p>
        </CardFooter>
      </Card>
    </div>
  )
}

