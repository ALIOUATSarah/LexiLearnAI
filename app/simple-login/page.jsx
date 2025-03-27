"use client";

import { useState } from "react";
import Link from "next/link";

export default function SimpleLoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", userId, password);

    if (!userId || !password) {
      setError("Please enter both ID and password");
      return;
    }

    // Use window.location for direct navigation
    window.location.href = "/student-dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Simple Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User ID
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Direct navigation links:</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/student-dashboard"
              className="text-sm text-blue-600 hover:underline"
            >
              Student Dashboard
            </Link>
            <Link
              href="/parent-dashboard"
              className="text-sm text-purple-600 hover:underline"
            >
              Parent Dashboard
            </Link>
            <Link
              href="/teacher-dashboard"
              className="text-sm text-green-600 hover:underline"
            >
              Teacher Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/test-login"
            className="text-sm text-blue-600 hover:underline"
          >
            Go to Test Page
          </Link>
        </div>
      </div>
    </div>
  );
}
