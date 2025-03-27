import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="lg" />

          <div>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to{" "}
            <span className="inline-flex items-baseline">
              LexiLearn<span className="text-sm font-semibold ml-1">AI</span>
            </span>
          </h1>
          <p className="text-xl mb-8">
            An intelligent learning platform designed for every student
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-blue-600"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                Personalized Learning
              </h2>
              <p className="text-gray-600">
                Adaptive content that adjusts to your unique learning style and
                pace
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-purple-600"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-purple-700">
                Interactive Content
              </h2>
              <p className="text-gray-600">
                Engaging materials with multimedia resources and AI-generated
                study notes
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-green-600"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-green-700">
                Progress Tracking
              </h2>
              <p className="text-gray-600">
                Comprehensive analytics and insights to monitor your educational
                journey
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            asChild
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 mt-8">
          <p>
            © 2025{" "}
            <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LexiLearn AI
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
