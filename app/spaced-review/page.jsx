"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SpacedReview } from "@/components/spaced-review";

export default function SpacedReviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold">LexiLearn AI</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-purple-300 text-purple-600"
              asChild
            >
              <Link href="/student-dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Spaced Repetition Review
            </h1>
            <p className="text-gray-600">
              Review challenging questions at optimal intervals for better
              long-term memory
            </p>
          </div>

          <SpacedReview />
        </div>
      </main>
    </div>
  );
}
