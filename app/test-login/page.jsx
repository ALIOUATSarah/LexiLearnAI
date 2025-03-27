"use client";

import { useState } from "react";
import Link from "next/link";

export default function TestLoginPage() {
  const [message, setMessage] = useState("This is a test login page");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Test Login Page</h1>
      <p className="mb-6">{message}</p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
        >
          Go to Login Page
        </Link>

        <Link
          href="/student-dashboard"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
        >
          Go to Student Dashboard
        </Link>

        <Link
          href="/parent-dashboard"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded text-center"
        >
          Go to Parent Dashboard
        </Link>

        <Link
          href="/teacher-dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-center"
        >
          Go to Teacher Dashboard
        </Link>

        <div className="mt-8 p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Alternative Login (Direct Link)
          </h2>
          <button
            onClick={() => (window.location.href = "/student-dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center w-full mb-2"
          >
            Student Login (Direct)
          </button>
        </div>
      </div>
    </div>
  );
}
