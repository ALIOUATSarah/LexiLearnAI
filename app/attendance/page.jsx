"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("current")

  // Fake attendance data
  const currentMonthData = [
    { date: "2025-03-01", status: "present", notes: "" },
    { date: "2025-03-02", status: "weekend", notes: "" },
    { date: "2025-03-03", status: "present", notes: "" },
    { date: "2025-03-04", status: "present", notes: "" },
    { date: "2025-03-05", status: "present", notes: "" },
    { date: "2025-03-06", status: "late", notes: "Arrived 15 minutes late" },
    { date: "2025-03-07", status: "present", notes: "" },
    { date: "2025-03-08", status: "weekend", notes: "" },
    { date: "2025-03-09", status: "weekend", notes: "" },
    { date: "2025-03-10", status: "absent", notes: "Medical appointment" },
    { date: "2025-03-11", status: "present", notes: "" },
    { date: "2025-03-12", status: "present", notes: "" },
    { date: "2025-03-13", status: "present", notes: "" },
    { date: "2025-03-14", status: "present", notes: "" },
    { date: "2025-03-15", status: "weekend", notes: "" },
    { date: "2025-03-16", status: "weekend", notes: "" },
    { date: "2025-03-17", status: "present", notes: "" },
  ]

  const previousMonthData = [
    { date: "2025-02-01", status: "weekend", notes: "" },
    { date: "2025-02-02", status: "weekend", notes: "" },
    { date: "2025-02-03", status: "present", notes: "" },
    { date: "2025-02-04", status: "present", notes: "" },
    { date: "2025-02-05", status: "absent", notes: "Sick leave" },
    { date: "2025-02-06", status: "absent", notes: "Sick leave" },
    { date: "2025-02-07", status: "present", notes: "" },
    { date: "2025-02-08", status: "weekend", notes: "" },
    { date: "2025-02-09", status: "weekend", notes: "" },
    { date: "2025-02-10", status: "present", notes: "" },
    { date: "2025-02-11", status: "present", notes: "" },
    { date: "2025-02-12", status: "present", notes: "" },
    { date: "2025-02-13", status: "late", notes: "Arrived 10 minutes late" },
    { date: "2025-02-14", status: "present", notes: "" },
    { date: "2025-02-15", status: "weekend", notes: "" },
    { date: "2025-02-16", status: "weekend", notes: "" },
    { date: "2025-02-17", status: "present", notes: "" },
    { date: "2025-02-18", status: "present", notes: "" },
    { date: "2025-02-19", status: "present", notes: "" },
    { date: "2025-02-20", status: "present", notes: "" },
    { date: "2025-02-21", status: "present", notes: "" },
    { date: "2025-02-22", status: "weekend", notes: "" },
    { date: "2025-02-23", status: "weekend", notes: "" },
    { date: "2025-02-24", status: "present", notes: "" },
    { date: "2025-02-25", status: "present", notes: "" },
    { date: "2025-02-26", status: "present", notes: "" },
    { date: "2025-02-27", status: "present", notes: "" },
    { date: "2025-02-28", status: "late", notes: "Bus delay" },
  ]

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="text-green-500" size={18} />
      case "absent":
        return <XCircle className="text-red-500" size={18} />
      case "late":
        return <Clock className="text-amber-500" size={18} />
      default:
        return null
    }
  }

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Absent</Badge>
      case "late":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Late</Badge>
      case "weekend":
        return (
          <Badge variant="outline" className="text-gray-500">
            Weekend
          </Badge>
        )
      default:
        return null
    }
  }

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

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-blue-300 text-blue-600" asChild>
              <Link href="/parent-dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Attendance Record
          </h1>
          <p className="text-gray-600">View detailed attendance history for Alex Johnson</p>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Present</p>
                  <p className="text-2xl font-bold text-green-600">42</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-500" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-red-500 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Absent</p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="text-red-500" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Late</p>
                  <p className="text-2xl font-bold text-amber-600">5</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="text-amber-500" size={24} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">94%</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Month</TabsTrigger>
            <TabsTrigger value="previous">Previous Month</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>March 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Day</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMonthData.map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">{record.date}</td>
                          <td className="py-3 px-4">{formatDate(record.date)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              {getStatusBadge(record.status)}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{record.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="previous" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>February 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Day</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousMonthData.map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">{record.date}</td>
                          <td className="py-3 px-4">{formatDate(record.date)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              {getStatusBadge(record.status)}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{record.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

