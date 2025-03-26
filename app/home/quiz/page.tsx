"use client";

import { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question: "Who won Minigolf?",
    options: ["Alex", "Talicia", "Draw"],
    correctAnswer: 0,
    explanation: "Hehehe ❤️"
  },
  {
    question: "What's the first movie we watched together?",
    options: ["Annabelle", "Insideous 3", "Conjuring 2", "Battleship"],
    correctAnswer: 2,
    explanation:
      "I hope you got this first try as you were sOoOoOo interested in the movie and didn't want to 💋"
  },
  {
    question: "Who texted first?",
    options: ["Alex", "Talicia"],
    correctAnswer: 1,
    explanation: "hehehe"
  },
  {
    question: "What's our favorite activity to do together?",
    options: ["Watching movies", "Going on walks", "Bangkok Brothers", "Monopoly"],
    correctAnswer: 2,
    explanation: "🦆🥞"
  },
  {
    question: "What is my worst habit?",
    options: [
      "1x Brushing Teeth",
      "Not cleaning 🦻",
      "Toilet Seat left up",
      "Nothing Alex, you're perfect"
    ],
    correctAnswer: 3,
    explanation:
      "I have no bad habit because My bad habits lead to late nights endin' alone Conversations with a stranger I barely know (ok i'll stop)"
  },
  {
    question: "What’s my biggest fear?",
    options: ["Heights", "Spiders", "The Dark", "Bees"],
    correctAnswer: 1,
    explanation: "Incy wincy spider 🕸️"
  },
  {
    question: "If I were an animal, what would I be?",
    options: ["A Lion", "A Dolphin", "A Panda", "A sloth"],
    correctAnswer: 2,
    explanation: "Kung Fu Panda because i'm chinese when i don't shave 🐼"
  },
  {
    question: "What’s one thing I always say when I’m excited?",
    options: [
      "Start Talking about business and AI",
      "Say OKAY HELLO HELLO OKAY",
      "Pull funny faces",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "I know I'm a Re sometimes 😢"
  },
  {
    question: "Do you love or hate me today?",
    options: ["You love me", "You hate me"],
    correctAnswer: 0,
    explanation: "I hope you clicked love me otherwise awkward..."
  }
];

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  onClick: () => void;
  disabled: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  isCorrect,
  onClick,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full p-4 rounded-xl text-left transition-all duration-300
        ${disabled && !isSelected ? 'opacity-50' : 'opacity-100'}
        ${
          isSelected
            ? isCorrect
              ? 'bg-green-50 border-2 border-green-500 ring-2 ring-green-200 ring-offset-2'
              : 'bg-red-50 border-2 border-red-500 ring-2 ring-red-200 ring-offset-2'
            : 'bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg hover:-translate-y-0.5'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`
          flex items-center justify-center w-8 h-8 rounded-lg font-semibold
          transition-all duration-300
          ${
            isSelected
              ? isCorrect
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : 'bg-pink-100 text-pink-500 group-hover:bg-pink-500 group-hover:text-white'
          }
        `}
        >
          {String.fromCharCode(65 + index)}
        </div>
        <span className="font-medium text-gray-700">{option}</span>
      </div>

      {isSelected && (
        <div
          className={`
          absolute right-4 top-1/2 -translate-y-1/2
          ${isCorrect ? 'text-green-500' : 'text-red-500'}
        `}
        >
          {isCorrect ? '✓' : '✗'}
        </div>
      )}
    </button>
  );
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Resets all quiz state values to let the user try again.
  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4 sm:p-8">
      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className={`absolute text-pink-300 opacity-20 animate-float-${i + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          className={`mb-8 transition-all duration-700 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <Link
            href="/home"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div
          className={`transition-all duration-700 delay-100 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {!isQuizComplete ? (
            <div className="space-y-8">
              {/* Title */}
              <div className="text-center">
                <Heart
                  className="mx-auto text-pink-500 mb-4 animate-pulse"
                  size={40}
                />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Our Love Quiz
                </h1>
                <p className="text-pink-600 font-medium">
                  Let's see how well you know our story! ✨
                </p>
              </div>

              {/* Quiz Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-6 md:p-8">
                {/* Progress bar */}
                <div className="w-full h-1 bg-pink-100 rounded-full mb-8 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>

                {/* Question counter */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-pink-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-pink-600">
                    Score: {score}
                  </span>
                </div>

                {/* Question */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <QuizOption
                      key={index}
                      option={option}
                      index={index}
                      isSelected={selectedAnswer === index}
                      isCorrect={
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                          : null
                      }
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    />
                  ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div
                    className="mt-8 text-center transform transition-all duration-300 animate-fade-in-up"
                  >
                    <p className="text-pink-600 font-medium mb-6">
                      {questions[currentQuestion].explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      {currentQuestion + 1 === questions.length
                        ? 'See Results'
                        : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Results screen
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-8 text-center">
              <Trophy
                className="mx-auto text-pink-500 mb-6 animate-bounce"
                size={48}
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quiz Complete!
              </h2>
              <p
                className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-4"
              >
                {score}/{questions.length}
              </p>
              {score >= questions.length * 0.8 ? (
                <>
                  <p className="text-xl text-gray-700 mb-4 font-medium">
                    {score === questions.length
                      ? "Perfect score! You know me so well! 💝"
                      : "Amazing! Our love is strong! 💖"}
                  </p>
                  <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-pink-600 mb-2">
                      🎉 Congratulations! You've unlocked a special gift!
                    </h3>
                    <p className="text-gray-700">
                      To claim your gift, sing the magic phrase:
                      <br />
                      <span className="font-bold">
                        "OKAY HELLOOO HELLO OKAY OKAY HELLOOO HELLO OKAYYY"
                      </span>
                      <br />
                      and end with
                      <br />
                      <span className="font-bold">"BAI BAI"</span>
                    </p>
                  </div>
                  <Link
                    href="/home"
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 active:scale-95 transition-all duration-200 inline-block"
                  >
                    Back to Home
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-700 mb-4 font-medium">
                    Oops! It looks like you didn't score 80% this time. Don't worry—every attempt is a step closer to unlocking the magic phrase! Give it another go!
                  </p>
                  <button
                    onClick={handleRetry}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 active:scale-95 transition-all duration-200 inline-block"
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
