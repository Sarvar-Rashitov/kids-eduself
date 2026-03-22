import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { ProgressStars } from "@/app/components/ProgressStars";
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
  const [showReward, setShowReward] = useState(false);

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
      setShowReward(true);
      audioService.playReward();
      authService.completeLesson('numbers_1-20', 'numbers');
      authService.addStars(5);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };

  const playSound = () => {
    audioService.playClick();
    speechService.speak(current.uzbek, 'uz-UZ', () => {
      setTimeout(() => {
        speechService.speak(String(current.number), 'uz-UZ');
      }, 600);
    });
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CharacterMascot mood="celebrating" size="lg" animate />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">
            Ajoyib! 🎉
          </h2>
          <p className="text-2xl text-gray-700 mb-6">
            Barcha raqamlarni o'rgandingiz!
          </p>
          <ProgressStars earned={5} total={5} size="lg" />
          <p className="text-xl text-gray-600 mt-6">
            +5 yulduz qo'shildi! ⭐
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
      {/* Header with progress */}
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

          <div className="flex-1 mx-4">
            <div className="flex gap-1">
              {numbersLessons.map((_, index) => (
                <div
                  key={`prog-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index <= currentNumber
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-sm font-bold text-purple-600">
            {currentNumber + 1}/{numbersLessons.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Character helper */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="happy" size="sm" />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              Keling, "{current.uzbek}" raqamini o'rganamiz! 🎯
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Number Display Card */}
          <motion.div
            key={currentNumber}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`
              bg-gradient-to-br ${current.color}
              rounded-[4rem] p-12 shadow-2xl
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
              <div className="text-[10rem] md:text-[12rem] font-bold text-white leading-none">
                {current.number}
              </div>
            </motion.div>
          </motion.div>

          {/* Emoji + Name Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg text-center flex flex-col justify-center"
          >
            <div className="text-8xl md:text-9xl mb-6">{current.emoji}</div>
            <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-3">
              {current.uzbek}
            </div>
            <div className="text-2xl text-gray-500 mb-1">{current.russian}</div>
            <div className="text-xl text-gray-400">{current.english}</div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mt-8 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playSound}
            className="w-full py-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl shadow-lg text-white font-bold text-xl md:text-2xl flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
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
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
