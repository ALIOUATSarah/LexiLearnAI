"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Clock, Zap, CheckCircle, XCircle, Trophy } from "lucide-react";

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
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">
                Round {round}/10
              </Badge>
              <Badge className="bg-green-100 text-green-700 px-3 py-1 text-sm">
                Score: {score}
              </Badge>
              {streak > 1 && (
                <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-sm">
                  Streak: {streak}x
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span
                className={`font-mono font-bold ${
                  timeRemaining < 10 ? "text-red-500" : "text-gray-700"
                }`}
              >
                {timeRemaining}s
              </span>
            </div>
          </div>

          <Progress
            value={(timeRemaining / 60) * 100}
            className="h-2 bg-gray-100"
            indicatorClassName="bg-gradient-to-r from-green-400 to-blue-500"
          />

          <div className="bg-blue-50 p-6 rounded-xl shadow-sm text-center">
            <h2 className="text-gray-500 mb-2 text-sm uppercase font-semibold">
              Hint
            </h2>
            <p className="text-gray-700 font-medium">{currentWord.hint}</p>

            <div className="mt-6 mb-4">
              <h2 className="text-gray-500 mb-3 text-sm uppercase font-semibold">
                Unscramble this word
              </h2>
              <div className="flex justify-center">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center m-1 bg-white border-2 border-blue-300 rounded-md shadow-sm text-base sm:text-xl font-bold text-blue-700"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your answer..."
                className={`text-center text-lg ${
                  isCorrect === true
                    ? "border-green-500 bg-green-50"
                    : isCorrect === false
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
                autoFocus
              />
              <Button
                onClick={checkAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Check
              </Button>
            </div>

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
