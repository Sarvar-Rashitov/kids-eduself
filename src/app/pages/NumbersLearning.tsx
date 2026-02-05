import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { numbersLessons } from "@/data/numbersContent";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

export function NumbersLearning() {
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(0);

  const current = numbersLessons[currentNumber];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleNext = () => {
    audioService.playClick();
    
    if (currentNumber < numbersLessons.length - 1) {
      setCurrentNumber(currentNumber + 1);
      authService.addStars(1);
    } else {
      authService.completeLesson('numbers_1-10', 'numbers');
      audioService.playReward();
      navigate("/home");
    }
  };

  const playSound = () => {
    audioService.playClick();
    speechService.speak(`${current.uzbek}. ${current.number}`, 'uz-UZ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/home");
            }}
            className="p-3 bg-gray-100 rounded-2xl"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">
            Raqamlar 🔢
          </h1>

          <div className="text-sm font-bold text-purple-600">
            {currentNumber + 1}/{numbersLessons.length}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Character helper */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="thinking" size="sm" />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg font-semibold text-gray-800">
              Keling, {current.uzbek} raqamini sanaylik! 🎯
            </p>
          </div>
        </motion.div>

        {/* Number Display */}
        <motion.div
          key={currentNumber}
          initial={{ scale: 0, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className={`
            bg-gradient-to-br ${current.color}
            rounded-[4rem] p-12 shadow-2xl mb-8
            relative overflow-hidden
          `}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-center relative z-10"
          >
            <div className="text-[14rem] font-bold text-white leading-none">
              {current.number}
            </div>
          </motion.div>
        </motion.div>

        {/* Counting Items */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <p className="text-xl font-bold text-gray-800 mb-6 text-center">
            Sanab ko'ramiz! 👇
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {current.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-6xl"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: current.items.length * 0.2 }}
              className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-6 py-3"
            >
              <span className="text-4xl font-bold text-gray-800">
                {current.uzbek}
              </span>
              <span className="text-2xl text-gray-600 ml-3">
                ({current.english})
              </span>
            </motion.div>
          </div>

          {/* Story */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <p className="text-gray-700 text-center">
              {current.story}
            </p>
          </div>

          {/* Examples */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2 text-center">Misollar:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {current.examples.map((example, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playSound}
            className="w-full py-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl shadow-lg text-white font-bold text-xl flex items-center justify-center gap-3"
          >
            <Volume2 className="h-8 w-8" />
            Eshitish 🔊
          </motion.button>

          <LargeButton
            color="green"
            icon="✅"
            onClick={handleNext}
          >
            {currentNumber < numbersLessons.length - 1 ? "Keyingisi" : "Tugadi!"}
          </LargeButton>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex gap-2 mb-2">
              {numbersLessons.map((_, index) => (
                <div
                  key={index}
                  className={`
                    flex-1 h-2 rounded-full transition-all
                    ${index <= currentNumber 
                      ? "bg-gradient-to-r from-green-400 to-emerald-400" 
                      : "bg-gray-200"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
