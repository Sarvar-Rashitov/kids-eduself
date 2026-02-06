import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { SoundButton } from "@/app/components/SoundButton";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { scienceTopics } from "@/data/scienceContent";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

export function ScienceLearning() {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const current = scienceTopics[currentTopic];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const handleNext = () => {
    audioService.playClick();
    
    if (currentTopic < scienceTopics.length - 1) {
      setCurrentTopic(currentTopic + 1);
      setShowQuiz(false);
      setSelectedAnswer(null);
      authService.addStars(1);
    } else {
      authService.completeLesson('science_basics', 'science');
      audioService.playReward();
      navigate("/home");
    }
  };

  const playSound = () => {
    audioService.playClick();
    speechService.speak(`${current.title}. ${current.description}`, 'uz-UZ');
  };

  const handleQuizAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = current.quiz && index === current.quiz.correct;
    
    if (correct) {
      audioService.playSuccess();
      authService.addStars(2);
    } else {
      audioService.playError();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bgColor} pb-24`}>
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
            <span>🔬</span>
            Ilm-fan
          </h1>

          <div className="text-sm md:text-base font-bold text-purple-600">
            {currentTopic + 1}/{scienceTopics.length}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character helper */}
        <motion.div
          key={currentTopic}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot mood="excited" size="sm" />
          <div className="bg-white rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              Keling, {current.title} haqida bilib olaylik! 🎯
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Main Topic Card */}
          <motion.div
            key={currentTopic}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`
              bg-gradient-to-br ${current.color}
              rounded-[4rem] p-12 shadow-2xl
              text-center relative overflow-hidden
            `}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />

            {/* Main emoji */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-[8rem] md:text-[10rem] mb-4 relative z-10"
            >
              {current.emoji}
            </motion.div>

            {/* Title */}
            <div className="text-4xl md:text-5xl font-bold text-white relative z-10">
              {current.title}
            </div>

            {/* Sound button */}
            <div className="flex justify-center relative z-10 mt-6">
              <SoundButton onClick={playSound} size="lg" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-lg flex items-center"
          >
            <p className="text-xl md:text-2xl text-gray-800 text-center leading-relaxed">
              {current.description}
            </p>
          </motion.div>
        </div>

        {/* Quiz */}
        {current.quiz && !showQuiz && (
          <LargeButton
            color="orange"
            icon="❓"
            onClick={() => {
              audioService.playClick();
              setShowQuiz(true);
            }}
          >
            Savol javob
          </LargeButton>
        )}

        {current.quiz && showQuiz && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-lg mb-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
              {current.quiz.question}
            </h3>
            
            <div className="space-y-3">
              {current.quiz.options.map((option, index) => (
                <motion.button
                  key={`quiz-${currentTopic}-option-${index}`}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    w-full p-4 md:p-5 rounded-2xl font-semibold text-lg md:text-xl
                    transition-all shadow-md
                    ${
                      selectedAnswer === index
                        ? index === current.quiz!.correct
                          ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                          : "bg-gradient-to-r from-red-400 to-pink-400 text-white"
                        : selectedAnswer !== null && index === current.quiz!.correct
                          ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  `}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center font-semibold text-lg md:text-xl"
              >
                {selectedAnswer === current.quiz.correct
                  ? "✅ To'g'ri javob! +2 yulduz"
                  : "❌ Noto'g'ri. Yana urinib ko'ring!"
                }
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="space-y-4">
          <LargeButton
            color="green"
            icon="✅"
            onClick={handleNext}
          >
            {currentTopic < scienceTopics.length - 1 ? "Keyingisi" : "Tugadi!"}
          </LargeButton>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            {scienceTopics.map((_, index) => (
              <div
                key={index}
                className={`
                  h-3 w-3 rounded-full transition-all
                  ${index === currentTopic 
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 w-8" 
                    : index < currentTopic
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}