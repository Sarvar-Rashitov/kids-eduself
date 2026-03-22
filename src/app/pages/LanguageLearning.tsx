import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { ProgressStars } from "@/app/components/ProgressStars";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { languageWords, categoryMeta, type LanguageWord } from "@/data/languageContent";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

const ALL_CATEGORIES = Object.keys(categoryMeta) as LanguageWord['category'][];

export function LanguageLearning() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<LanguageWord['category'] | 'all'>('all');
  const [currentWord, setCurrentWord] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const filtered = selectedCategory === 'all'
    ? languageWords
    : languageWords.filter(w => w.category === selectedCategory);

  const current = filtered[currentWord] ?? filtered[0];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  useEffect(() => {
    setCurrentWord(0);
  }, [selectedCategory]);

  const handleNext = () => {
    audioService.playClick();
    if (currentWord < filtered.length - 1) {
      setCurrentWord(currentWord + 1);
      authService.addStars(1);
    } else {
      setShowReward(true);
      audioService.playReward();
      authService.completeLesson('language_basics', 'language');
      authService.addStars(5);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  };

  const playEnglish = () => {
    audioService.playClick();
    speechService.speak(current.english, 'en-US');
  };

  const playUzbek = () => {
    audioService.playClick();
    speechService.speak(current.uzbek, 'uz-UZ');
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <CharacterMascot mood="celebrating" size="lg" animate />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">Ajoyib! 🎉</h2>
          <p className="text-2xl text-gray-700 mb-6">Barcha so'zlarni o'rgandingiz!</p>
          <ProgressStars earned={5} total={5} size="lg" />
          <p className="text-xl text-gray-600 mt-6">+5 yulduz qo'shildi! ⭐</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => { audioService.playClick(); navigate("/home"); }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex-1 mx-4">
            <div className="flex gap-1">
              {filtered.map((_, index) => (
                <div
                  key={`prog-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index <= currentWord
                      ? "bg-gradient-to-r from-indigo-400 to-purple-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-sm font-bold text-purple-600">
            {currentWord + 1}/{filtered.length}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => { audioService.playClick(); setSelectedCategory('all'); }}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md'
                : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            🌍 Hammasi
          </button>
          {ALL_CATEGORIES.map(cat => {
            const meta = categoryMeta[cat];
            return (
              <button
                key={cat}
                onClick={() => { audioService.playClick(); setSelectedCategory(cat); }}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md'
                    : 'bg-white text-gray-600 shadow-sm'
                }`}
              >
                {meta.emoji} {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Character */}
        <motion.div
          key={current.id}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="happy" size="sm" />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              Yangi so'z o'rganamiz! 📖
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Word Card */}
          <motion.div
            key={`card-${current.id}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`
              bg-gradient-to-br ${current.color}
              rounded-[3rem] p-6 md:p-12 shadow-2xl
              relative overflow-hidden text-center
            `}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[5rem] md:text-[9rem] mb-2 md:mb-4 relative z-10"
            >
              {current.emoji}
            </motion.div>

            <div className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-3 relative z-10">
              {current.english}
            </div>
            <div className="text-base text-white/70 relative z-10 font-medium">
              {current.pronunciationEn}
            </div>
          </motion.div>

          {/* Translation + Info Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-5 md:p-8 shadow-lg flex flex-col justify-center"
          >
            {/* Category badge */}
            <div className="flex justify-center mb-3 md:mb-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                {categoryMeta[current.category].emoji} {categoryMeta[current.category].label}
              </span>
            </div>

            {/* Translations */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="bg-green-50 rounded-2xl px-4 py-2 md:px-5 md:py-3 text-center">
                <p className="text-xs text-gray-500 mb-1">🇺🇿 O'zbekcha</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{current.uzbek}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl px-4 py-2 md:px-5 md:py-3 text-center">
                <p className="text-xs text-gray-500 mb-1">🇷🇺 Ruscha</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">{current.russian}</p>
              </div>
            </div>

            {/* Example */}
            <div className="bg-indigo-50 rounded-2xl p-3 md:p-4">
              <p className="text-sm text-indigo-700 font-semibold mb-1">Misol:</p>
              <p className="text-gray-700 italic text-sm">"{current.exampleEn}"</p>
              <p className="text-gray-600 text-sm mt-1">"{current.exampleUz}"</p>
            </div>
          </motion.div>
        </div>

        {/* Sound Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playEnglish}
            className="py-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl shadow-lg text-white font-bold text-lg flex items-center justify-center gap-2"
          >
            <Volume2 className="h-6 w-6" />
            🇬🇧 English
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playUzbek}
            className="py-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl shadow-lg text-white font-bold text-lg flex items-center justify-center gap-2"
          >
            <Volume2 className="h-6 w-6" />
            🇺🇿 O'zbek
          </motion.button>
        </div>

        {/* Next Button */}
        <div className="mt-4 mb-8">
          <LargeButton color="green" icon="✅" onClick={handleNext}>
            {currentWord < filtered.length - 1 ? "Keyingi so'z" : "Tugadi!"}
          </LargeButton>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}