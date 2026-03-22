import { motion } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, Check, X } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { useNavigate } from "react-router";
import { mathQuestions } from "@/data/mathContent";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { KidsNavBar } from "@/app/components/KidsNavBar";

export function MathLearning() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const current = mathQuestions[currentQuestion];

  // Shuffle answers properly using Fisher-Yates - NEW random shuffle each render
  const shuffledAnswers = useMemo(() => {
    const arr = [...current.answers];
    // True Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentQuestion, current.answers]);

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const correct = answer === current.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      audioService.playSuccess();
      authService.addStars(1);
    } else {
      audioService.playError();
    }

    setTimeout(() => {
      if (currentQuestion < mathQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        authService.completeLesson('math_basic', 'math');
        audioService.playReward();
        setTimeout(() => navigate("/progress"), 1500);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/home");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>➕</span>
            Matematika
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold text-purple-600">
              {score}
            </span>
            <span className="text-sm md:text-base text-gray-600">
              /{mathQuestions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character helper */}
        <motion.div
          key={`${currentQuestion}-${isCorrect}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot 
            mood={isCorrect === null ? "thinking" : isCorrect ? "celebrating" : "happy"} 
            size="sm" 
          />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              {isCorrect === null 
                ? "Sanab ko'ring va javobni toping! 🤔"
                : isCorrect 
                  ? "Ajoyib! To'g'ri! 🎉"
                  : "Yaxshi harakat! Davom eting! 💪"
              }
            </p>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
            bg-gradient-to-br ${current.color}
            rounded-[4rem] p-8 md:p-12 shadow-2xl mb-8
            text-center
          `}
        >
          <div className="text-5xl md:text-6xl font-bold text-white mb-6">
            {current.question}
          </div>
          
          {/* Visual representation */}
          <div className="text-7xl md:text-8xl mb-4">{current.emoji1}</div>
          <div className="text-4xl md:text-5xl text-white/80 mb-4">{current.operation}</div>
          <div className="text-7xl md:text-8xl">{current.emoji2}</div>
        </motion.div>

        {/* Answer options */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 max-w-2xl mx-auto">
          {shuffledAnswers.map((answer, answerIndex) => (
            <motion.button
              key={`answer-${currentQuestion}-${answerIndex}`}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
              className={`
                relative py-8 md:py-10 rounded-3xl font-bold text-4xl md:text-5xl
                transition-all shadow-lg
                ${
                  selectedAnswer === answer
                    ? answer === current.correct
                      ? "bg-gradient-to-br from-green-400 to-emerald-400 text-white scale-110"
                      : "bg-gradient-to-br from-red-400 to-pink-400 text-white scale-95"
                    : selectedAnswer !== null && answer === current.correct
                      ? "bg-gradient-to-br from-green-400 to-emerald-400 text-white scale-105"
                      : "bg-white text-gray-800 hover:shadow-xl"
                }
                ${selectedAnswer !== null && selectedAnswer !== answer && answer !== current.correct ? "opacity-50" : ""}
              `}
            >
              {answer}
              
              {/* Check/X icons */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-2 -right-2"
                >
                  {answer === current.correct ? (
                    <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                  ) : selectedAnswer === answer ? (
                    <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <X className="h-8 w-8 text-white" />
                    </div>
                  ) : null}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-md max-w-2xl mx-auto">
          <p className="text-center text-sm md:text-base text-gray-600 mb-2">
            Savol {currentQuestion + 1} / {mathQuestions.length}
          </p>
          <div className="flex gap-2">
            {mathQuestions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index < currentQuestion
                    ? "bg-gradient-to-r from-green-400 to-emerald-400"
                    : index === currentQuestion
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}