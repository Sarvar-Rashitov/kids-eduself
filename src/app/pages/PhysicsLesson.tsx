import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Heart, Star, Check, RotateCcw } from "lucide-react";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { useNavigate, useSearchParams } from "react-router";
import { CharacterMascot } from "@/app/components/CharacterMascot";

interface Question {
  id: string;
  type: "choice" | "truefalse" | "interactive";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  animation?: "gravity" | "light" | "sound" | "magnet";
}

// Lesson data for all physics modules
const lessonData: Record<string, Question[]> = {
  // ===== GRAVITY LESSONS =====
  "gravity_1": [
    {
      id: "q1",
      type: "choice",
      question: "Olmani yerga tashlasangiz, nima bo'ladi?",
      options: ["Pastga tushadi", "Havoda suzadi", "Tepaga ko'tariladi", "Joyida qoladi"],
      correctAnswer: "Pastga tushadi",
      explanation: "Gravitatsiya barcha narsalarni pastga tortadi! 🍎⬇️",
      animation: "gravity",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Gravitatsiya - bu Yerning tortishish kuchi",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "To'g'ri",
      explanation: "Ha! Gravitatsiya Yerning barcha narsalarni o'ziga tortish kuchidir. 🌍",
    },
    {
      id: "q3",
      type: "choice",
      question: "Qaysi narsa tezroq tushadi?",
      options: ["Tosh", "Pat", "Bir xilda tushadi", "Hech biri tushmaydi"],
      correctAnswer: "Bir xilda tushadi",
      explanation: "Havosiz joyda har ikkisi bir xilda tushadi! Lekin havoda pat sekinroq tushadi. 🪶",
    },
  ],
  "gravity_2": [
    {
      id: "q1",
      type: "choice",
      question: "Oyda nima uchun sakrash oson?",
      options: ["Gravitatsiya kuchsiz", "Havo yo'q", "Oy kichik", "Gravitatsiya yo'q"],
      correctAnswer: "Gravitatsiya kuchsiz",
      explanation: "Oyda gravitatsiya Yerga qaraganda 6 marta kuchsiz! 🌙",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Barcha sayyoralarda bir xil gravitatsiya bor",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "Noto'g'ri",
      explanation: "Har bir sayyorada turlicha gravitatsiya! Yupit gravita tsiyasi Yernikidan 2.5 marta kuchliroq! 🪐",
    },
  ],

  // ===== LIGHT LESSONS =====
  "light_1": [
    {
      id: "q1",
      type: "choice",
      question: "Yorug'likning eng katta manbai nima?",
      options: ["Quyosh", "Chiroq", "Yulduzlar", "Oy"],
      correctAnswer: "Quyosh",
      explanation: "Quyosh - bizning eng katta yorug'lik manbaymiz! ☀️",
      animation: "light",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Yorug'lik to'g'ri chiziq bo'ylab harakatlanadi",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "To'g'ri",
      explanation: "Ha! Yorug'lik har doim to'g'ri chiziqda harakatlanadi. 💡➡️",
    },
    {
      id: "q3",
      type: "choice",
      question: "Oynada o'z aksimizni ko'ramiz, chunki...",
      options: ["Yorug'lik qaytadi", "Oyna shaffof", "Oyna rangli", "Oyna sovuq"],
      correctAnswer: "Yorug'lik qaytadi",
      explanation: "Oyna yorug'likni qaytaradi (aks ettiradi) va biz o'zimizni ko'ramiz! 🪞",
    },
  ],
  "light_2": [
    {
      id: "q1",
      type: "choice",
      question: "Kamalak nima uchun paydo bo'ladi?",
      options: ["Yorug'lik parchalanadi", "Yomg'ir yog'adi", "Quyosh yonadi", "Bulut boradi"],
      correctAnswer: "Yorug'lik parchalanadi",
      explanation: "Quyosh nuri tomchilarda 7 ta rangga parchalanadi va kamalak hosil bo'ladi! 🌈",
    },
    {
      id: "q2",
      type: "choice",
      question: "Qorong'i xonada nima uchun ko'ra olmaymiz?",
      options: ["Yorug'lik yo'q", "Ko'zimiz yopiq", "Havo qorong'i", "Xona katta"],
      correctAnswer: "Yorug'lik yo'q",
      explanation: "Ko'rish uchun yorug'lik kerak! Yorug'liksiz hech narsa ko'rinmaydi. 🕯️",
    },
  ],

  // ===== SOUND LESSONS =====
  "sound_1": [
    {
      id: "q1",
      type: "choice",
      question: "Tovush qanday hosil bo'ladi?",
      options: ["Tebranish", "Yorug'lik", "Issiqlik", "Shamol"],
      correctAnswer: "Tebranish",
      explanation: "Tovush - bu havo zarrachalarining tebranishi! 🔊",
      animation: "sound",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Kosmosda tovush eshitiladi",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "Noto'g'ri",
      explanation: "Kosmosda havo yo'q, shuning uchun tovush ham yo'q! 🚀",
    },
    {
      id: "q3",
      type: "choice",
      question: "Qaysi materialda tovush tezroq tarqaladi?",
      options: ["Temir", "Havo", "Suv", "Yog'och"],
      correctAnswer: "Temir",
      explanation: "Qattiq narsalarda tovush tezroq tarqaladi! 🔩",
    },
  ],

  // ===== MAGNETS LESSONS =====
  "magnets_1": [
    {
      id: "q1",
      type: "choice",
      question: "Magnitlar qaysi metallni tortadi?",
      options: ["Temir", "Oltin", "Kumush", "Mis"],
      correctAnswer: "Temir",
      explanation: "Magnitlar temir va ba'zi boshqa metalllarni tortadi! 🧲",
      animation: "magnet",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Magnitning ikki qutbi bor: shimoliy va janubiy",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "To'g'ri",
      explanation: "Ha! Har bir magnitda N (shimoliy) va S (janubiy) qutblar bor! 🧭",
    },
  ],

  // ===== WATER CYCLE =====
  "water_1": [
    {
      id: "q1",
      type: "choice",
      question: "Yomg'ir qaerdan keladi?",
      options: ["Bulutlardan", "Dengizdan", "Quyoshdan", "Yerdan"],
      correctAnswer: "Bulutlardan",
      explanation: "Bulutlardagi suv tomchilari yomg'ir bo'lib tushadi! ☁️💧",
    },
    {
      id: "q2",
      type: "choice",
      question: "Suv bug'langanida nima bo'ladi?",
      options: ["Gazga aylanadi", "Muzga aylanadi", "Yo'qoladi", "Rangi o'zgaradi"],
      correctAnswer: "Gazga aylanadi",
      explanation: "Issiq havoda suv bug'ga aylanadi va ko'kka ko'tariladi! ☀️💨",
    },
  ],

  // ===== ELECTRICITY =====
  "electricity_1": [
    {
      id: "q1",
      type: "choice",
      question: "Elektr tok qayerdan keladi?",
      options: ["Elektr stansiyasidan", "Quyoshdan", "Shamoldan", "Suvdan"],
      correctAnswer: "Elektr stansiyasidan",
      explanation: "Elektr stansiyalari elektr energiyasini ishlab chiqaradi! ⚡",
    },
    {
      id: "q2",
      type: "truefalse",
      question: "Chaqmoq - bu tabiiy elektr",
      options: ["To'g'ri", "Noto'g'ri"],
      correctAnswer: "To'g'ri",
      explanation: "Chaqmoq - bu bulutlardagi kuchli elektr zaryadi! ⚡🌩️",
    },
  ],

  // ===== FORCE & MOTION =====
  "force_1": [
    {
      id: "q1",
      type: "choice",
      question: "Mashinani harakatlantirish uchun nima kerak?",
      options: ["Kuch", "Yorug'lik", "Tovush", "Rang"],
      correctAnswer: "Kuch",
      explanation: "Narsalarni harakatlantirish uchun kuch kerak! 💪",
    },
    {
      id: "q2",
      type: "choice",
      question: "Silliq yuzada nima uchun sirpanish oson?",
      options: ["Ishqalanish kam", "Gravitatsiya yo'q", "Havo kuchli", "Yorug'lik bor"],
      correctAnswer: "Ishqalanish kam",
      explanation: "Silliq yuzada ishqalanish kamroq bo'ladi! 🛷",
    },
  ],

  // ===== ENERGY =====
  "energy_1": [
    {
      id: "q1",
      type: "choice",
      question: "Energiyaning asosiy manbai nima?",
      options: ["Quyosh", "Oy", "Yulduzlar", "Yer"],
      correctAnswer: "Quyosh",
      explanation: "Quyosh - barcha energiyaning asosiy manbai! ☀️🔋",
    },
    {
      id: "q2",
      type: "choice",
      question: "Ovqat bizga nima beradi?",
      options: ["Energiya", "Yorug'lik", "Tovush", "Rang"],
      correctAnswer: "Energiya",
      explanation: "Ovqat tanaga harakat qilish uchun energiya beradi! 🍎💪",
    },
  ],
};

// Animation Components
function GravityAnimation() {
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDropped(true);
      setTimeout(() => setDropped(false), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl overflow-hidden">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl">🌳</div>
      {!dropped ? (
        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 15 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-4xl"
        >
          🍎
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 15 }}
          animate={{ y: 150 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="absolute top-16 left-1/2 -translate-x-1/2 text-4xl"
        >
          🍎
        </motion.div>
      )}
    </div>
  );
}

function LightAnimation() {
  return (
    <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-6xl"
      >
        💡
      </motion.div>
    </div>
  );
}

function SoundAnimation() {
  return (
    <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden flex items-center justify-center">
      <div className="text-5xl">🔔</div>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 border-4 border-purple-400 rounded-full"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function MagnetAnimation() {
  return (
    <div className="relative h-48 bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center gap-8">
      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-5xl"
      >
        🧲
      </motion.div>
      <motion.div
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-5xl"
      >
        📎
      </motion.div>
    </div>
  );
}

export function PhysicsLesson() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("module") || "gravity";
  const lessonNumber = searchParams.get("lesson") || "1";

  const lessonId = `${moduleId}_${lessonNumber}`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  const questions = lessonData[lessonId] || lessonData["gravity_1"];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    audioService.playClick();
  }, []);

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      audioService.playSuccess();
      setScore(score + 20);
    } else {
      audioService.playError();
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      audioService.playClick();
    } else {
      setLessonComplete(true);
      const earnedStars = score >= 80 ? 3 : score >= 50 ? 2 : 1;
      authService.completeLesson(`physics_${moduleId}_${lessonNumber}`, 'physics', earnedStars);
      authService.addXP(score);
      authService.addStars(earnedStars);
      audioService.playSuccess();
    }
  };

  if (lessonComplete) {
    const earnedStars = score >= 80 ? 3 : score >= 50 ? 2 : 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-8 shadow-2xl text-center max-w-md"
        >
          <CharacterMascot mood="celebrating" size="lg" />
          <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
            Ajoyib! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Siz {score} ball yig'dingiz!
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`h-12 w-12 ${i < earnedStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              audioService.playClick();
              navigate("/science");
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Davom etish 🚀
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                audioService.playClick();
                navigate("/science");
              }}
              className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>

            <div className="flex gap-4">
              <div className="bg-purple-100 px-4 py-2 rounded-2xl">
                <span className="font-bold text-purple-700">💯 {score}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            {/* Animation */}
            {currentQuestion.animation && !showFeedback && (
              <div className="mb-6">
                {currentQuestion.animation === "gravity" && <GravityAnimation />}
                {currentQuestion.animation === "light" && <LightAnimation />}
                {currentQuestion.animation === "sound" && <SoundAnimation />}
                {currentQuestion.animation === "magnet" && <MagnetAnimation />}
              </div>
            )}

            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {currentQuestion.options?.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                  whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  className={`
                    p-4 rounded-2xl font-semibold text-lg transition-all
                    ${selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : showFeedback && option === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }
                    ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-2xl mb-6 ${
                    isCorrect ? 'bg-green-100' : 'bg-blue-100'
                  }`}
                >
                  <p className={`text-center font-semibold ${
                    isCorrect ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {showFeedback && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Keyingisi →' : 'Tugatish ✓'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
