import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { VoiceButton } from "@/app/components/VoiceButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { LargeButton } from "@/app/components/LargeButton";
import { ProgressStars } from "@/app/components/ProgressStars";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { getWordsForSpeaking } from "@/data/languageContent";

export function SpeakingPractice() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const practiceWords = getWordsForSpeaking(10);
  const currentWord = practiceWords[currentWordIndex];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleStart = () => {
    setIsListening(true);
    setFeedback(null);
    setScore(null);
    audioService.playClick();

    speechService.startListening(
      (transcript) => handleStop(transcript),
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        setFeedback("Ovoz yozishda xatolik. Yana urinib ko'ring!");
      }
    );
  };

  const handleStop = (transcript?: string) => {
    setIsListening(false);
    speechService.stopListening();

    if (transcript) {
      const result = speechService.analyzePronunciation(transcript, currentWord.english);
      setScore(result.score);
      setFeedback(result.feedback);
      setAttempts(prev => prev + 1);

      if (result.score >= 90) {
        audioService.playSuccess();
        authService.addStars(2);
      } else if (result.score >= 75) {
        audioService.playClick();
        authService.addStars(1);
      }

      if (attempts >= 2 || result.score >= 95) {
        authService.completeLesson(`speaking_${currentWord.id}`, 'speaking');
      }
    }
  };

  const handleNext = () => {
    audioService.playClick();
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setFeedback(null);
      setScore(null);
      setAttempts(0);
    } else {
      setShowReward(true);
      audioService.playReward();
      authService.addStars(5);
      setTimeout(() => navigate("/home"), 3000);
    }
  };

  const handleTryAgain = () => {
    audioService.playClick();
    setFeedback(null);
    setScore(null);
  };

  const playExample = () => {
    audioService.playClick();
    speechService.speak(currentWord.english, 'en-US');
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <CharacterMascot mood="celebrating" size="lg" animate />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">Zo'r! 🎤</h2>
          <p className="text-2xl text-gray-700 mb-6">Barcha so'zlarni talaffuz qildingiz!</p>
          <ProgressStars earned={5} total={5} size="lg" />
          <p className="text-xl text-gray-600 mt-6">+5 yulduz qo'shildi! ⭐</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => { audioService.playClick(); navigate("/home"); }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex-1 mx-4">
            <div className="flex gap-1">
              {practiceWords.map((_, index) => (
                <div
                  key={`prog-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index < currentWordIndex
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : index === currentWordIndex
                        ? "bg-gradient-to-r from-blue-400 to-purple-400"
                        : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-sm font-bold text-purple-600">
            {currentWordIndex + 1}/{practiceWords.length}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="happy" size="sm" animate={!isListening} />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg font-semibold text-gray-800">
              {isListening
                ? "Eshitmoqdaman... 👂"
                : "Menga qarab aytib ko'ring! 😊"
              }
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Word Display Card */}
          <motion.div
            key={currentWordIndex}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`
              bg-gradient-to-br ${currentWord.color}
              rounded-[4rem] p-10 shadow-2xl
              text-center relative overflow-hidden
            `}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[7rem] md:text-[8rem] mb-4 relative z-10"
            >
              {currentWord.emoji}
            </motion.div>

            <div className="text-5xl md:text-6xl font-bold text-white mb-3 relative z-10">
              {currentWord.english}
            </div>
            <div className="text-xl text-white/80 mb-6 relative z-10">
              {currentWord.uzbek}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playExample}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white font-semibold relative z-10"
            >
              Namunani eshiting 🔊
            </motion.button>
          </motion.div>

          {/* Voice + Feedback */}
          <div className="flex flex-col gap-6">
            {/* Voice Button */}
            <VoiceButton
              onStart={handleStart}
              onStop={() => handleStop()}
              isListening={isListening}
            />

            {/* Browser warning */}
            {!speechService.isSupported() && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 text-center">
                <p className="text-sm text-yellow-800">
                  ⚠️ Chrome yoki Edge dan foydalaning.
                </p>
              </div>
            )}

            {/* Feedback */}
            {feedback && score !== null && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`rounded-3xl p-6 text-center ${
                  score >= 90
                    ? "bg-gradient-to-br from-green-100 to-emerald-100"
                    : score >= 75
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100"
                      : "bg-gradient-to-br from-blue-100 to-purple-100"
                }`}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: star * 0.1 }}
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= Math.floor(score / 20)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="text-4xl font-bold text-gray-800 mb-2">{score}%</div>
                <p className="text-lg font-semibold text-gray-700">{feedback}</p>
                {score >= 75 && (
                  <p className="text-base text-gray-600 mt-2">
                    +{score >= 90 ? 2 : 1} yulduz ⭐
                  </p>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            {feedback && (
              <div className="space-y-3">
                <LargeButton color="green" icon="🔄" onClick={handleTryAgain}>
                  Yana bir marta
                </LargeButton>
                <LargeButton color="blue" icon="➡️" onClick={handleNext}>
                  {currentWordIndex < practiceWords.length - 1 ? "Keyingi so'z" : "Tugadi!"}
                </LargeButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
