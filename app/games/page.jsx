"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GameMemory } from "@/components/games/memory-game";
import { GameDragDrop } from "@/components/games/drop-drag-game";
import { GameQuiz } from "@/components/games/quiz-game";
import { GameWordScramble } from "@/components/games/word-scramble-game";
import { GameFlashcards } from "@/components/games/flashcard-game";
import { useSearchParams } from "next/navigation";

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const courseTopic = searchParams.get("topic") || "default";

  const games = [
    {
      id: "memory",
      title: "Memory Match",
      description:
        "Match pairs of cards to test your memory skills while learning physics concepts.",
      component: GameMemory,
    },
    {
      id: "dragdrop",
      title: "Drag & Drop Challenge",
      description:
        "Drag items to their correct categories to reinforce your understanding of scientific principles.",
      component: GameDragDrop,
    },
    {
      id: "quiz",
      title: "Speed Quiz",
      description:
        "Answer questions quickly to earn more points in this fast-paced learning game.",
      component: GameQuiz,
    },
    {
      id: "wordscramble",
      title: "Word Scramble",
      description:
        "Unscramble words related to your subject to strengthen vocabulary and spelling skills.",
      component: GameWordScramble,
    },
    {
      id: "flashcards",
      title: "Flashcards",
      description:
        "Practice with interactive flashcards using spaced repetition to improve long-term memory retention.",
      component: GameFlashcards,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
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
              className="border-blue-300 text-blue-600 hidden sm:flex"
              asChild
            >
              <Link href="/lessons">Back to Lessons</Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-600"
              asChild
            >
              <Link href="/student-dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Learning Games
            </h1>
            <p className="text-lg text-gray-700">
              Have fun while reinforcing what you've learned with these
              interactive games!
            </p>
          </div>

          {!activeGame ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <Card
                  key={game.id}
                  className={`border-2 ${
                    index % 5 === 0
                      ? "border-blue-400 bg-blue-50"
                      : index % 5 === 1
                      ? "border-purple-400 bg-purple-50"
                      : index % 5 === 2
                      ? "border-green-400 bg-green-50"
                      : index % 5 === 3
                      ? "border-amber-400 bg-amber-50"
                      : "border-rose-400 bg-rose-50"
                  } hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <CardHeader
                    className={`${
                      index % 5 === 0
                        ? "bg-blue-100 border-b border-blue-200"
                        : index % 5 === 1
                        ? "bg-purple-100 border-b border-purple-200"
                        : index % 5 === 2
                        ? "bg-green-100 border-b border-green-200"
                        : index % 5 === 3
                        ? "bg-amber-100 border-b border-amber-200"
                        : "bg-rose-100 border-b border-rose-200"
                    }`}
                  >
                    <CardTitle
                      className={`${
                        index % 5 === 0
                          ? "text-blue-700"
                          : index % 5 === 1
                          ? "text-purple-700"
                          : index % 5 === 2
                          ? "text-green-700"
                          : index % 5 === 3
                          ? "text-amber-700"
                          : "text-rose-700"
                      }`}
                    >
                      {game.title}
                    </CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-center p-4">
                    <Button
                      className={`w-full ${
                        index % 5 === 0
                          ? "bg-blue-500 hover:bg-blue-600"
                          : index % 5 === 1
                          ? "bg-purple-500 hover:bg-purple-600"
                          : index % 5 === 2
                          ? "bg-green-500 hover:bg-green-600"
                          : index % 5 === 3
                          ? "bg-amber-500 hover:bg-amber-600"
                          : "bg-rose-500 hover:bg-rose-600"
                      }`}
                      onClick={() => setActiveGame(game.id)}
                    >
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {games.find((g) => g.id === activeGame)?.title}
                </h2>
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-600"
                  onClick={() => setActiveGame(null)}
                >
                  Back to Games
                </Button>
              </div>

              <Card className="border-2 border-blue-400 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <CardContent className="p-6">
                  {activeGame === "memory" && (
                    <GameMemory courseTopic={courseTopic} />
                  )}
                  {activeGame === "dragdrop" && <GameDragDrop />}
                  {activeGame === "quiz" && (
                    <GameQuiz courseTopic={courseTopic} />
                  )}
                  {activeGame === "wordscramble" && (
                    <GameWordScramble courseTopic={courseTopic} />
                  )}
                  {activeGame === "flashcards" && (
                    <GameFlashcards courseTopic={courseTopic} />
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
