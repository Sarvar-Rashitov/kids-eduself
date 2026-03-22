import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { ProgressStars } from "@/app/components/ProgressStars";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate, useParams } from "react-router";
import { russianAlphabet } from "@/data/alphabetContent";
import { englishAlphabet } from "@/data/englishAlphabet";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

export function AlphabetLearningUpdated() {
  const navigate = useNavigate();
  const params = useParams();
  const language = params.language || "russian"; // default to russian
  
  const [currentLetter, setCurrentLetter] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Select alphabet based on language
  const lessons = language === "english" ? englishAlphabet : russianAlphabet;
  const languageName = language === "english" ? "English" : "Русский";
  const speechLang = language === "english" ? "en-US" : "ru-RU";

  const current = lessons[currentLetter];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleNext = () => {
    audioService.playClick();
    
    if (currentLetter < lessons.length - 1) {
      setCurrentLetter(currentLetter + 1);
      authService.addStars(1);
    } else {
      setShowReward(true);
      audioService.playReward();
      authService.completeLesson(`alphabet_${language}`, 'alphabet');
      authService.addStars(5);
      
      setTimeout(() => {
        navigate("/alphabet");
      }, 3000);
    }
  };

  const playSound = () => {
    audioService.playClick();
    const textToSpeak = language === "english" 
      ? `${current.letter}. ${(current as any).word}`
      : `${(current as any).sound}. ${(current as any).word}`;
    
    speechService.speak(textToSpeak, speechLang);
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
            {language === "english" ? "Excellent! 🎉" : "Отлично! 🎉"}
          </h2>
          <p className="text-2xl text-gray-700 mb-6">
            {language === "english" 
              ? "You learned all the letters!" 
              : "Вы выучили все буквы!"}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/alphabet");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex-1 mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">
              {languageName} Alifbosi
            </h1>
            <div className="flex gap-2">
              {lessons.map((_, index) => (
                <div
                  key={`progress-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index <= currentLetter
                      ? "bg-gradient-to-r from-blue-400 to-purple-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">Harf</p>
            <p className="text-xl font-bold text-purple-600">
              {currentLetter + 1}/{lessons.length}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character guide */}
        <motion.div
          key={`character-${currentLetter}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="happy" size="sm" />
          <div className="bg-purple-100 rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              {language === "english" 
                ? "Let's learn the letter!" 
                : "Давайте выучим букву!"}
            </p>
          </div>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          key={`letter-${currentLetter}`}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={`
            bg-gradient-to-br ${(current as any).color || "from-blue-400 to-purple-400"}
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

          {/* Letter Display */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-9xl md:text-[12rem] font-bold text-white mb-4"
            >
              {language === "english" 
                ? (current as any).uppercase 
                : (current as any).letter}
            </motion.div>
            
            {language === "english" && (
              <div className="text-6xl md:text-7xl text-white/90 mb-4">
                {(current as any).lowercase}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl text-white/90 mb-2"
            >
              {language === "english" 
                ? (current as any).pronunciation 
                : (current as any).sound}
            </motion.div>
          </div>

          {/* Sound Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playSound}
            className="mx-auto block bg-white text-purple-600 rounded-full p-6 shadow-xl mb-8"
          >
            <Volume2 className="h-12 w-12" />
          </motion.button>

          {/* Word Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center"
          >
            <div className="text-7xl md:text-8xl mb-4">
              {(current as any).emoji}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {(current as any).word}
            </div>
            {language === "english" && (
              <div className="text-xl text-white/90">
                {(current as any).example}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          {currentLetter > 0 && (
            <button
              onClick={() => {
                audioService.playClick();
                setCurrentLetter(currentLetter - 1);
              }}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-3xl font-bold text-lg hover:bg-gray-300 transition-all"
            >
              ← Oldingi
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {currentLetter === lessons.length - 1 ? "Yakunlash 🎉" : "Keyingi →"}
          </button>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}