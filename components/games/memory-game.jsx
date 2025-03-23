"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function GameMemory() {
  const { toast } = useToast()
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // Physics concepts for the memory game
  const concepts = ["Force", "Mass", "Acceleration", "Energy", "Momentum", "Velocity", "Gravity", "Friction", "Inertia"]

  const initializeGame = () => {
    // Create pairs of cards
    const selectedConcepts = concepts.slice(0, 6)
    const cardPairs = [...selectedConcepts, ...selectedConcepts]

    // Shuffle the cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        flipped: false,
        matched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setGameComplete(false)
    setGameStarted(true)
  }

  const handleCardClick = (id) => {
    // Ignore if already flipped or if two cards are already flipped
    if (cards[id].flipped || cards[id].matched || flippedCards.length >= 2) {
      return
    }

    // Flip the card
    const updatedCards = [...cards]
    updatedCards[id].flipped = true
    setCards(updatedCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // Check for matches if we have two flipped cards
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards
      if (cards[firstId].content === cards[secondId].content) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstId].matched = true
          matchedCards[secondId].matched = true
          setCards(matchedCards)
          setMatchedPairs(matchedPairs + 1)
          setFlippedCards([])

          toast({
            title: "Match found!",
            description: `You found a pair: ${cards[firstId].content}`,
            variant: "default",
          })

          // Check if game is complete
          if (matchedPairs + 1 === cards.length / 2) {
            setGameComplete(true)
            toast({
              title: "Game Complete!",
              description: `You completed the game in ${moves + 1} moves!`,
              variant: "default",
            })
          }
        }, 500)
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstId].flipped = false
          resetCards[secondId].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  useEffect(() => {
    // Initialize the game when component mounts
    initializeGame()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Moves: <span className="text-blue-600 font-bold">{moves}</span>
          </p>
          <p className="text-sm font-medium">
            Pairs Found: <span className="text-green-600 font-bold">{matchedPairs}</span> /{" "}
            <span className="text-gray-600">{cards.length / 2}</span>
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          onClick={initializeGame}
        >
          New Game
        </Button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square cursor-pointer transition-all duration-300 transform ${
              card.flipped || card.matched ? "rotate-y-180" : ""
            } ${card.matched ? "opacity-70" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="relative w-full h-full preserve-3d">
              <div
                className={`absolute w-full h-full backface-hidden ${
                  card.flipped || card.matched ? "opacity-0" : "opacity-100"
                }`}
              >
                <Card className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl border-2 border-blue-600 shadow-md">
                  ?
                </Card>
              </div>
              <div
                className={`absolute w-full h-full rotate-y-180 backface-hidden ${
                  card.flipped || card.matched ? "opacity-100" : "opacity-0"
                }`}
              >
                <Card
                  className={`w-full h-full flex items-center justify-center text-center p-2 border-2 ${
                    card.matched ? "bg-green-100 border-green-500 shadow-md" : "bg-white border-blue-400 shadow-md"
                  }`}
                >
                  <span className={`font-medium text-lg ${card.matched ? "text-green-700" : "text-blue-700"}`}>
                    {card.content}
                  </span>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameComplete && (
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-md border border-green-300 shadow-md">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-3">
            Congratulations!
          </h3>
          <p className="mb-4 text-lg">
            You completed the game in <span className="font-bold text-blue-600">{moves}</span> moves!
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

