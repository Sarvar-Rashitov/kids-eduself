import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { ProgressStars } from "@/app/components/ProgressStars";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate, useParams } from "react-router";
import { numbersLessons } from "@/data/numbersContent";
import { englishNumbers } from "@/data/numbersEnglish";
import { russianNumbers } from "@/data/numbersRussian";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

export function NumbersLearningUpdated() {
  const navigate = useNavigate();
  const params = useParams();
  const language = params.language || "russian";
  
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Select numbers based on language
  const lessons = language === "english" ? englishNumbers : russianNumbers;
  const languageName = language === "english" ? "English" : "Русский";
  const speechLang = language === "english" ? "en-US" : "ru-RU";

  const current = lessons[currentNumber];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleNext = () => {
    audioService.playClick();

    if (currentNumber < lessons.length - 1) {
      setCurrentNumber(currentNumber + 1);
      authService.addStars(1);
    } else {
      setShowReward(true);
      audioService.playReward();
      authService.completeLesson(`numbers_${language}`, 'numbers');
      authService.addStars(5);
      setTimeout(() => {
        navigate("/numbers");
      }, 3000);
    }
  };

  const playSound = () => {
    audioService.playClick();
    speechService.speak(`${current.number}. ${current.word}`, speechLang);
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CharacterMascot mood="celebrating" size="lg" animate />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">
            {language === "english" ? "Fantastic! 🎉" : "Отлично! 🎉"}
          </h2>
          <p className="text-2xl text-gray-700 mb-6">
            {language === "english" 
              ? "You learned all numbers 1-20!" 
              : "Вы выучили все числа 1-20!"}
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/numbers");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex-1 mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">
              {languageName} - Raqamlar 1-20
            </h1>
            <div className="flex gap-1">
              {lessons.map((_, index) => (
                <div
                  key={`progress-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index <= currentNumber
                      ? "bg-gradient-to-r from-orange-400 to-pink-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Raqam</p>
            <p className="text-xl font-bold text-orange-600">
              {currentNumber + 1}/{lessons.length}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character guide */}
        <motion.div
          key={`character-${currentNumber}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="thinking" size="sm" />
          <div className="bg-orange-100 rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              {language === "english" 
                ? "Count with me!" 
                : "Давайте посчитаем!"}
            </p>
          </div>
        </motion.div>

        {/* Number Card */}
        <motion.div
          key={`number-${currentNumber}`}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={`
            bg-gradient-to-br ${current.color}
            rounded-[4rem] p-8 md:p-12 shadow-2xl mb-8
            relative overflow-hidden
          `}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-6xl opacity-20">
            ✨
          </div>
          <div className="absolute bottom-4 left-4 text-6xl opacity-20">
            🌟
          </div>

          {/* Number Display */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-9xl md:text-[12rem] font-bold text-white mb-4"
            >
              {current.number}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl text-white/90 mb-4 font-bold"
            >
              {current.word}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-white/80"
            >
              {current.pronunciation}
            </motion.div>
          </div>

          {/* Sound Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playSound}
            className="mx-auto block bg-white text-orange-600 rounded-full p-6 shadow-xl mb-8"
          >
            <Volume2 className="h-12 w-12" />
          </motion.button>

          {/* Visual representation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {[...Array(Math.min(current.number, 10))].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-5xl md:text-6xl"
                >
                  {current.emoji}
                </motion.div>
              ))}
              {current.number > 10 && (
                <div className="text-4xl text-white font-bold">
                  + {current.number - 10} more
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          {currentNumber > 0 && (
            <button
              onClick={() => {
                audioService.playClick();
                setCurrentNumber(currentNumber - 1);
              }}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-3xl font-bold text-lg hover:bg-gray-300 transition-all"
            >
              ← Oldingi
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {currentNumber === lessons.length - 1 ? "Yakunlash 🎉" : "Keyingi →"}
          </button>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
