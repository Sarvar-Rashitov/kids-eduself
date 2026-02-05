import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { languageWords } from "@/data/languageContent";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

export function LanguageLearning() {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const current = languageWords[currentWord];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleNext = () => {
    audioService.playClick();
    
    if (currentWord < languageWords.length - 1) {
      setCurrentWord(currentWord + 1);
      setShowTranslation(false);
      authService.addStars(1);
    } else {
      authService.completeLesson('language_basics', 'language');
      audioService.playReward();
      navigate("/home");
    }
  };

  const playSound = () => {
    audioService.playClick();
    // Speak the word in English
    speechService.speak(current.english, 'en-US');
  };

  const playUzbek = () => {
    audioService.playClick();
    speechService.speak(current.uzbek, 'uz-UZ');
  };

  const toggleCard = () => {
    audioService.playClick();
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-24">
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
          
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>🌍</span>
            Ingliz tili
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span>
            <span className="text-sm font-bold text-purple-600">
              {currentWord + 1}/{languageWords.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Character helper */}
        <motion.div
          key={currentWord}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="happy" size="sm" />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg font-semibold text-gray-800">
              Yangi so'zni o'rganamiz! 📖
            </p>
          </div>
        </motion.div>

        {/* Word Card - Flippable */}
        <motion.div
          key={currentWord}
          initial={{ scale: 0, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8 perspective"
        >
          <motion.div
            animate={{ rotateY: showTranslation ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={toggleCard}
            className="relative cursor-pointer"
          >
            {/* Front side (English) */}
            <div
              className={`
                bg-gradient-to-br ${current.color}
                rounded-[4rem] p-12 shadow-2xl
                text-center relative overflow-hidden
                ${showTranslation ? "opacity-0" : "opacity-100"}
              `}
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
              }}
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[8rem] mb-6 relative z-10"
              >
                {current.emoji}
              </motion.div>

              <div className="text-6xl font-bold text-white mb-4 relative z-10">
                {current.english}
              </div>
              
              <div className="text-xl text-white/80 mb-4 relative z-10">
                {current.pronunciation}
              </div>

              <div className="text-white/80 text-lg relative z-10">
                Kartani bosing 👆
              </div>
            </div>

            {/* Back side (Uzbek) */}
            <div
              className={`
                absolute inset-0
                bg-gradient-to-br ${current.color}
                rounded-[4rem] p-12 shadow-2xl
                text-center overflow-hidden
                ${showTranslation ? "opacity-100" : "opacity-0"}
              `}
              style={{ 
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

              <div className="text-[8rem] mb-6 relative z-10">
                {current.emoji}
              </div>

              <div className="text-6xl font-bold text-white mb-4 relative z-10">
                {current.uzbek}
              </div>

              <div className="text-white/80 text-lg relative z-10">
                O'zbekcha 🇺🇿
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sound Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playSound}
            className="py-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl shadow-lg text-white font-bold text-lg flex items-center justify-center gap-2"
          >
            <Volume2 className="h-6 w-6" />
            English
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playUzbek}
            className="py-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl shadow-lg text-white font-bold text-lg flex items-center justify-center gap-2"
          >
            <Volume2 className="h-6 w-6" />
            O'zbek
          </motion.button>
        </div>

        {/* Info box */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600 mb-1">Inglizcha</p>
              <p className="text-2xl font-bold text-gray-800">{current.english}</p>
            </div>
            
            <div className="text-4xl">⇄</div>
            
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600 mb-1">O'zbekcha</p>
              <p className="text-2xl font-bold text-gray-800">{current.uzbek}</p>
            </div>
          </div>
          
          {/* Category badge */}
          <div className="flex justify-center mb-3">
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              {current.category === 'greeting' && '👋 Salomlashish'}
              {current.category === 'food' && '🍎 Ovqat'}
              {current.category === 'animal' && '🐱 Hayvonlar'}
              {current.category === 'object' && '📚 Narsalar'}
              {current.category === 'family' && '👨‍👩‍👧 Oila'}
              {current.category === 'color' && '🎨 Ranglar'}
              {current.category === 'number' && '🔢 Raqamlar'}
            </span>
          </div>
          
          {/* Example sentence */}
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm text-gray-600 mb-1">Misol:</p>
            <p className="text-gray-800 italic">"{current.example}"</p>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-3">
            Kartani bosib tarjimani ko'ring! 👆
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <LargeButton
            color="green"
            icon="✅"
            onClick={handleNext}
          >
            {currentWord < languageWords.length - 1 ? "Keyingi so'z" : "Tugadi!"}
          </LargeButton>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex gap-2 mb-2">
              {languageWords.map((_, index) => (
                <div
                  key={index}
                  className={`
                    flex-1 h-2 rounded-full transition-all
                    ${index <= currentWord 
                      ? "bg-gradient-to-r from-blue-400 to-purple-400" 
                      : "bg-gray-200"
                    }
                  `}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              So'z {currentWord + 1} / {languageWords.length}
            </p>
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
