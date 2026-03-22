import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Check, X } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { ProgressStars } from "@/app/components/ProgressStars";

export function MathLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const lesson = location.state?.lesson;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stars, setStars] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    if (!lesson) {
      navigate("/math-new");
    }
  }, [lesson, navigate]);

  if (!lesson) {
    return null;
  }

  const questions = lesson.content || [];
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answer: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQ.answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      audioService.playSuccess();
      setStars(prev => prev + 1);
    } else {
      audioService.playError();
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
      audioService.playClick();
    } else {
      // Lesson completed
      const earnedStars = Math.min(Math.ceil((stars / questions.length) * 3), 3);
      authService.completeLesson(lesson.id, 'math', earnedStars);
      authService.addStars(earnedStars);
      authService.updateSubjectProgress('math', 1);
      setShowReward(true);
      audioService.playReward();
    }
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center max-w-md"
        >
          <CharacterMascot mood="celebrating" size="lg" animate />
          
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">
            Ajoyib! 🎉
          </h2>
          
          <p className="text-xl text-gray-700 mb-6">
            {lesson.title} darsini tugatdingiz!
          </p>

          <ProgressStars 
            earned={Math.min(Math.ceil((stars / questions.length) * 3), 3)} 
            total={3} 
            size="lg" 
          />

          <p className="text-lg text-gray-600 mt-6">
            {stars}/{questions.length} to'g'ri javob! ⭐
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              audioService.playClick();
              navigate("/math-new");
            }}
            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl"
          >
            Matematikaga qaytish
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                audioService.playClick();
                navigate("/math-new");
              }}
              className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {lesson.title}
            </h1>

            <div className="text-right">
              <p className="text-sm text-gray-600">Savol</p>
              <p className="text-xl font-bold text-blue-600">
                {currentQuestion + 1}/{questions.length}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index <= currentQuestion
                    ? "bg-gradient-to-r from-blue-400 to-purple-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <CharacterMascot 
            mood={showFeedback ? (isCorrect ? "celebrating" : "sad") : "thinking"} 
            size="md" 
            animate={showFeedback}
          />
        </motion.div>

        {/* Question */}
        <motion.div
          key={`question-${currentQuestion}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-lg mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            {currentQ.question}
          </h2>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQ.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQ.answer;
              const showCorrect = showFeedback && isCorrectAnswer;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: showFeedback ? 1 : 1.05 }}
                  whileTap={{ scale: showFeedback ? 1 : 0.95 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`
                    relative p-6 rounded-2xl text-2xl font-bold
                    transition-all transform
                    ${
                      showCorrect
                        ? "bg-gradient-to-br from-green-400 to-emerald-400 text-white"
                        : showWrong
                        ? "bg-gradient-to-br from-red-400 to-pink-400 text-white"
                        : isSelected
                        ? "bg-gradient-to-br from-blue-400 to-purple-400 text-white"
                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300"
                    }
                    shadow-lg
                  `}
                >
                  {option}
                  
                  {showCorrect && (
                    <Check className="absolute top-2 right-2 h-8 w-8" />
                  )}
                  {showWrong && (
                    <X className="absolute top-2 right-2 h-8 w-8" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                mt-6 p-6 rounded-2xl
                ${
                  isCorrect
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-orange-100 border-2 border-orange-400"
                }
              `}
            >
              <p className={`text-lg font-bold mb-2 ${isCorrect ? "text-green-700" : "text-orange-700"}`}>
                {isCorrect ? "✅ To'g'ri!" : "💡 Noto'g'ri"}
              </p>
              <p className="text-gray-700">{currentQ.explanation}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Next button */}
        {showFeedback && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-full font-bold text-xl shadow-xl"
          >
            {currentQuestion < questions.length - 1 ? "Keyingi savol" : "Yakunlash"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
