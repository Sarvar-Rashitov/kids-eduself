import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Star } from "lucide-react";
import { VoiceButton } from "@/app/components/VoiceButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { LargeButton } from "@/app/components/LargeButton";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { alphabetLessons } from "@/data/alphabetContent";

export function SpeakingPractice() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Get random words from alphabet
  const practiceWords = alphabetLessons.slice(0, 5);
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
      (transcript) => {
        handleStop(transcript);
      },
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
      // Analyze pronunciation
      const result = speechService.analyzePronunciation(
        transcript,
        currentWord.word
      );

      setScore(result.score);
      setFeedback(result.feedback);
      setAttempts(attempts + 1);

      if (result.score >= 90) {
        audioService.playSuccess();
        authService.addStars(2);
      } else if (result.score >= 75) {
        audioService.playClick();
        authService.addStars(1);
      }

      // Complete lesson after 3 attempts or perfect score
      if (attempts >= 2 || result.score >= 95) {
        authService.completeLesson(`speaking_${currentWord.letter}`, 'speaking');
      }
    }
  };

  const handleNext = () => {
    audioService.playClick();
    
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setFeedback(null);
      setScore(null);
      setAttempts(0);
    } else {
      audioService.playReward();
      navigate("/home");
    }
  };

  const handleTryAgain = () => {
    audioService.playClick();
    setFeedback(null);
    setScore(null);
  };

  const playExample = () => {
    audioService.playClick();
    speechService.speak(currentWord.word, 'uz-UZ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-24">
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
            Gapirish 🎤
          </h1>

          <div className="text-sm font-bold text-purple-600">
            {currentWordIndex + 1}/{practiceWords.length}
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

        {/* Word to pronounce */}
        <motion.div
          key={currentWordIndex}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`
            bg-gradient-to-br ${currentWord.color}
            rounded-[4rem] p-12 shadow-2xl mb-6
            text-center
          `}
        >
          <div className="text-8xl mb-6">{currentWord.emoji}</div>
          <div className="text-6xl font-bold text-white mb-4">
            {currentWord.word}
          </div>
          <div className="text-2xl text-white/80 mb-6">
            {currentWord.wordEnglish}
          </div>
          
          {/* Play example button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playExample}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl text-white font-semibold"
          >
            Namunani eshiting 🔊
          </motion.button>
        </motion.div>

        {/* Voice Button */}
        <div className="mb-8">
          <VoiceButton
            onStart={handleStart}
            onStop={() => handleStop()}
            isListening={isListening}
          />
        </div>

        {/* Feedback Section */}
        {feedback && score !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`
              rounded-3xl p-6 mb-6 text-center
              ${score >= 90 
                ? "bg-gradient-to-br from-green-100 to-emerald-100" 
                : score >= 75
                  ? "bg-gradient-to-br from-yellow-100 to-orange-100"
                  : "bg-gradient-to-br from-blue-100 to-purple-100"
              }
            `}
          >
            {/* Score stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: star * 0.1 }}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= Math.floor(score / 20)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Score */}
            <div className="text-5xl font-bold text-gray-800 mb-3">
              {score}%
            </div>

            {/* Feedback text */}
            <p className="text-xl font-semibold text-gray-700 mb-4">
              {feedback}
            </p>

            {/* Character reaction */}
            <div className="flex justify-center mb-4">
              <CharacterMascot
                mood={score >= 90 ? "celebrating" : score >= 75 ? "excited" : "happy"}
                size="sm"
                animate
              />
            </div>

            {/* Stars earned */}
            {score >= 75 && (
              <p className="text-lg text-gray-700">
                +{score >= 90 ? 2 : 1} yulduz qo'shildi! ⭐
              </p>
            )}
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="space-y-4">
          {feedback && (
            <>
              <LargeButton
                color="green"
                icon="🔄"
                onClick={handleTryAgain}
              >
                Yana bir marta
              </LargeButton>
              
              <LargeButton
                color="blue"
                icon="➡️"
                onClick={handleNext}
              >
                {currentWordIndex < practiceWords.length - 1 ? "Keyingi so'z" : "Tugadi!"}
              </LargeButton>
            </>
          )}

          {/* Browser support warning */}
          {!speechService.isSupported() && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 text-center">
              <p className="text-sm text-yellow-800">
                ⚠️ Brauzeringiz ovoz yozishni qo'llab-quvvatlamaydi. Chrome yoki Edge dan foydalaning.
              </p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-md">
          <div className="flex gap-2 mb-2">
            {practiceWords.map((_, index) => (
              <div
                key={index}
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
      </div>

      <KidsNavBar />
    </div>
  );
}
