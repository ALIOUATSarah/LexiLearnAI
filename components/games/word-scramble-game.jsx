"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Clock, Zap, CheckCircle, XCircle, Trophy } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function GameWordScramble({ courseTopic = "default" }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [wordList, setWordList] = useState([]);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  // Topic-specific word lists
  const topicWordLists = {
    physics101: [
      { word: "gravity", hint: "Force that attracts objects with mass" },
      { word: "momentum", hint: "Product of mass and velocity" },
      { word: "velocity", hint: "Speed in a given direction" },
      { word: "friction", hint: "Force that opposes motion" },
      { word: "inertia", hint: "Resistance to change in motion" },
      { word: "acceleration", hint: "Rate of change of velocity" },
      { word: "force", hint: "Push or pull on an object" },
      { word: "energy", hint: "Capacity to do work" },
      { word: "mass", hint: "Amount of matter in an object" },
      {
        word: "wavelength",
        hint: "Distance between repeating units of a wave",
      },
    ],
    math101: [
      { word: "equation", hint: "Mathematical statement with equal parts" },
      { word: "fraction", hint: "Part of a whole number" },
      { word: "algebra", hint: "Using symbols to represent numbers" },
      { word: "geometry", hint: "Study of shapes and space" },
      { word: "calculus", hint: "Study of continuous change" },
      { word: "function", hint: "Relation from inputs to outputs" },
      { word: "variable", hint: "Symbol representing a value" },
      { word: "integral", hint: "Finds the area under a curve" },
      { word: "derivative", hint: "Rate of change of a function" },
      { word: "polynomial", hint: "Expression with variables and exponents" },
    ],
    chemistry101: [
      { word: "element", hint: "Pure substance with one type of atom" },
      { word: "molecule", hint: "Group of atoms bonded together" },
      { word: "reaction", hint: "Process where substances change" },
      {
        word: "solution",
        hint: "Mixture where one substance dissolves in another",
      },
      { word: "compound", hint: "Substance formed from multiple elements" },
      { word: "catalyst", hint: "Speeds up a reaction without being consumed" },
      { word: "acid", hint: "Substance with pH less than 7" },
      { word: "electron", hint: "Negatively charged particle" },
      {
        word: "isotope",
        hint: "Atoms with same number of protons but different neutrons",
      },
      { word: "valence", hint: "Combining power of an element" },
    ],
    biology101: [
      { word: "cell", hint: "Basic unit of life" },
      { word: "genetics", hint: "Study of heredity" },
      { word: "evolution", hint: "Change in species over time" },
      { word: "ecosystem", hint: "Community of living organisms" },
      { word: "protein", hint: "Large molecules made of amino acids" },
      { word: "mitosis", hint: "Cell division process" },
      { word: "photosynthesis", hint: "Process plants use to make food" },
      { word: "chromosome", hint: "Structure containing DNA" },
      { word: "respiration", hint: "Process of converting food to energy" },
      { word: "taxonomy", hint: "Classification of organisms" },
    ],
    default: [
      { word: "learning", hint: "Process of acquiring knowledge" },
      { word: "education", hint: "Process of receiving instruction" },
      { word: "knowledge", hint: "Facts, information, and skills acquired" },
      { word: "student", hint: "Person who is studying" },
      { word: "teacher", hint: "Person who helps others learn" },
      { word: "classroom", hint: "Room where lessons take place" },
      { word: "homework", hint: "Tasks assigned to be done outside class" },
      { word: "curriculum", hint: "Subjects comprising a course of study" },
      { word: "assessment", hint: "Evaluation of student knowledge" },
      { word: "graduation", hint: "Successful completion of a course" },
    ],
  };

  // Scramble a word
  const scrambleWord = (word) => {
    const wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    // Make sure the scrambled word is different from the original
    const scrambled = wordArray.join("");
    if (scrambled === word) {
      return scrambleWord(word);
    }

    return scrambled;
  };

  // Initialize word list
  useEffect(() => {
    setWordList(topicWordLists[courseTopic] || topicWordLists.default);
  }, [courseTopic]);

  // Start game
  const startGame = () => {
    setRound(0);
    setScore(0);
    setIsGameOver(false);
    setTimeRemaining(60);
    setIsTimerRunning(true);
    setStreak(0);
    nextWord();
  };

  // Move to next word
  const nextWord = () => {
    // Get a random word that hasn't been used yet
    if (round < 10 && wordList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const selectedWord = wordList[randomIndex];

      // Remove the selected word from the list to avoid duplicates
      setWordList((prevList) =>
        prevList.filter((_, index) => index !== randomIndex)
      );

      setCurrentWord(selectedWord);
      setScrambledWord(scrambleWord(selectedWord.word));
      setUserInput("");
      setIsCorrect(null);
      setRound((prev) => prev + 1);
    } else {
      endGame();
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isTimerRunning) {
      endGame();
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, isTimerRunning]);

  // End game
  const endGame = () => {
    setIsGameOver(true);
    setIsTimerRunning(false);

    // Show game over toast
    toast({
      title: "Game Over!",
      description: `Your final score: ${score} points`,
    });
  };

  // Check user answer
  const checkAnswer = () => {
    if (!currentWord) return;

    const isAnswerCorrect =
      userInput.toLowerCase() === currentWord.word.toLowerCase();
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      // Calculate points - faster answers = more points, with a streak bonus
      const timeBonus = Math.max(10, timeRemaining / 2);
      const streakBonus = streak * 5;
      const pointsEarned = Math.floor(50 + timeBonus + streakBonus);

      setScore((prev) => prev + pointsEarned);
      setStreak((prev) => prev + 1);

      toast({
        title: "Correct!",
        description: `+${pointsEarned} points`,
        variant: "success",
      });

      // Move to next word after a brief delay
      setTimeout(() => {
        nextWord();
      }, 800);
    } else {
      setStreak(0);
      toast({
        title: "Not quite right",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setIsCorrect(null);
  };

  // Handle key press (Enter to submit)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {!isGameOver && !currentWord && (
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Word Scramble</h1>
          <p className="text-gray-600">
            Unscramble the words as quickly as possible to earn points!
          </p>
          <div className="flex justify-center space-x-2 items-center">
            <Badge
              variant="outline"
              className="py-1 px-3 bg-blue-50 text-blue-700 border-blue-200"
            >
              <Clock className="w-4 h-4 mr-1" /> 60 Seconds
            </Badge>
            <Badge
              variant="outline"
              className="py-1 px-3 bg-purple-50 text-purple-700 border-purple-200"
            >
              <Zap className="w-4 h-4 mr-1" /> 10 Words
            </Badge>
          </div>
          <Button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Start Game
          </Button>
        </div>
      )}

      {!isGameOver && currentWord && (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <div className="flex flex-wrap gap-2">
              <div className="py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                Word {round}/10
              </div>
              <div className="py-1 px-3 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                Score: {score}
              </div>
              {streak > 0 && (
                <div className="py-1 px-3 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm">
                  Streak: {streak}x
                </div>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-red-300 text-red-600 text-xs sm:text-sm"
              onClick={startGame}
            >
              Reset
            </Button>
          </div>

          <Card className="border-2 border-blue-300 mb-4 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200 p-3 sm:p-4">
              <CardTitle className="text-center text-lg text-blue-800">
                Unscramble the word
              </CardTitle>
              <CardDescription className="text-center">
                Drag letters to rearrange them
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="bg-blue-50 p-3 mb-4 rounded-lg border border-blue-200 text-center">
                <span className="text-gray-600 text-sm">Hint: </span>
                <span className="font-medium text-gray-800">
                  {currentWord.hint}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-blue-400 rounded-md flex items-center justify-center text-lg sm:text-xl font-bold text-blue-700 cursor-move shadow-sm"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full sm:w-auto px-8"
                  onClick={checkAnswer}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>

          {isCorrect === true && (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Correct!</span>
            </div>
          )}

          {isCorrect === false && (
            <div className="flex items-center justify-center text-red-600">
              <XCircle className="w-5 h-5 mr-2" />
              <span>Try again!</span>
            </div>
          )}

          {/* Game progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm text-gray-600">Progress</span>
              <span className="text-xs sm:text-sm font-medium">
                {Math.round((round / 10) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: `${(round / 10) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold">Game Over!</h2>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {score} points
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={startGame}
              className="border-blue-300 text-blue-600"
            >
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
