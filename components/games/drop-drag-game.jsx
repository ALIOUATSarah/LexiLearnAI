"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function GameDragDrop() {
  const { toast } = useToast()
  const [draggedItem, setDraggedItem] = useState(null)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  // Initialize the game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Define categories
    const gameCategories = [
      { id: "forces", name: "Forces", items: [] },
      { id: "energy", name: "Energy Types", items: [] },
      { id: "motion", name: "Motion Concepts", items: [] },
    ]

    // Define items
    const gameItems = [
      { id: "gravity", text: "Gravity", category: "forces", placed: false },
      { id: "friction", text: "Friction", category: "forces", placed: false },
      { id: "magnetism", text: "Magnetism", category: "forces", placed: false },
      { id: "kinetic", text: "Kinetic Energy", category: "energy", placed: false },
      { id: "potential", text: "Potential Energy", category: "energy", placed: false },
      { id: "thermal", text: "Thermal Energy", category: "energy", placed: false },
      { id: "velocity", text: "Velocity", category: "motion", placed: false },
      { id: "acceleration", text: "Acceleration", category: "motion", placed: false },
      { id: "momentum", text: '  text: "Acceleration', category: "motion", placed: false },
      { id: "momentum", text: "Momentum", category: "motion", placed: false },
    ]

    // Shuffle the items
    const shuffledItems = [...gameItems].sort(() => Math.random() - 0.5)

    setCategories(gameCategories)
    setItems(shuffledItems)
    setScore(0)
    setGameComplete(false)
  }

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (categoryId) => {
    if (!draggedItem) return

    // Check if the item is dropped in the correct category
    const isCorrect = draggedItem.category === categoryId

    // Update the items list
    const updatedItems = items.map((item) => (item.id === draggedItem.id ? { ...item, placed: true } : item))

    // Update the categories
    const updatedCategories = [...categories]
    const categoryIndex = updatedCategories.findIndex((c) => c.id === categoryId)

    if (categoryIndex !== -1) {
      updatedCategories[categoryIndex].items.push(draggedItem)
    }

    setItems(updatedItems)
    setCategories(updatedCategories)
    setDraggedItem(null)

    // Update score
    if (isCorrect) {
      setScore(score + 10)
      toast({
        title: "Correct! +10 points",
        description: `${draggedItem.text} belongs to ${categories.find((c) => c.id === categoryId)?.name}`,
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect placement",
        description: `Try again! That's not the right category for ${draggedItem.text}`,
        variant: "destructive",
      })

      // Remove the item from the category after a delay
      setTimeout(() => {
        const resetCategories = [...updatedCategories]
        const catIndex = resetCategories.findIndex((c) => c.id === categoryId)

        if (catIndex !== -1) {
          resetCategories[catIndex].items = resetCategories[catIndex].items.filter((item) => item.id !== draggedItem.id)
        }

        const resetItems = updatedItems.map((item) => (item.id === draggedItem.id ? { ...item, placed: false } : item))

        setCategories(resetCategories)
        setItems(resetItems)
      }, 1000)
    }

    // Check if all items are correctly placed
    const allPlaced = updatedItems.every((item) => item.placed)
    if (allPlaced) {
      setGameComplete(true)
      toast({
        title: "Game Complete!",
        description: `You scored ${score + (isCorrect ? 10 : 0)} points!`,
        variant: "default",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          Score: {score}
        </div>
        <Button
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
          onClick={initializeGame}
        >
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className={`border-2 ${
              index === 0
                ? "border-red-400 bg-red-50"
                : index === 1
                  ? "border-blue-400 bg-blue-50"
                  : "border-green-400 bg-green-50"
            }`}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(category.id)}
          >
            <CardHeader
              className={`${
                index === 0
                  ? "bg-red-100 border-b border-red-200"
                  : index === 1
                    ? "bg-blue-100 border-b border-blue-200"
                    : "bg-green-100 border-b border-green-200"
              }`}
            >
              <CardTitle
                className={`text-center ${
                  index === 0 ? "text-red-700" : index === 1 ? "text-blue-700" : "text-green-700"
                }`}
              >
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 min-h-[200px]">
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 ${
                      category.id === "forces"
                        ? "bg-red-100 border border-red-300 text-red-800"
                        : category.id === "energy"
                          ? "bg-blue-100 border border-blue-300 text-blue-800"
                          : "bg-green-100 border border-green-300 text-green-800"
                    } rounded-md text-center font-medium shadow-sm`}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-md border border-purple-200 shadow-md">
        <h3 className="font-bold text-lg text-purple-700 mb-3">Drag these items to their correct categories:</h3>
        <div className="flex flex-wrap gap-3">
          {items
            .filter((item) => !item.placed)
            .map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className={`p-3 ${
                  item.category === "forces"
                    ? "bg-white border-2 border-red-400 text-red-700"
                    : item.category === "energy"
                      ? "bg-white border-2 border-blue-400 text-blue-700"
                      : "bg-white border-2 border-green-400 text-green-700"
                } rounded-md cursor-move hover:shadow-md transition-all duration-200 font-medium`}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>

      {gameComplete && (
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-md border border-green-300 shadow-md">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
            Congratulations!
          </h3>
          <p className="mb-4 text-lg">
            You completed the game with <span className="font-bold text-blue-600">{score}</span> points!
          </p>
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            onClick={initializeGame}
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

