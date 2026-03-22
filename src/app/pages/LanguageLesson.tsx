import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { X, Heart, Star, Volume2, Check, RotateCcw } from "lucide-react";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { CharacterMascot } from "@/app/components/CharacterMascot";

interface Question {
  id: string;
  type: "match" | "select" | "speak" | "choice";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  image?: string;
  audio?: string;
}

// Sample lessons data - All languages
const lessonData: Record<string, Question[]> = {
  // ===== ENGLISH LESSONS =====
  "english_unit1_1": [
    {
      id: "q1",
      type: "choice",
      question: "Rasmni ko'ring va to'g'ri so'zni tanlang:",
      options: ["Hello", "Goodbye", "Please", "Thanks"],
      correctAnswer: "Hello",
      image: "👋",
    },
    {
      id: "q2",
      type: "select",
      question: "'Hi' so'zini tanlang:",
      options: ["Bye", "Hi", "No", "Yes"],
      correctAnswer: "Hi",
    },
    {
      id: "q3",
      type: "match",
      question: "So'zlarni moslashtiring:",
      options: ["Hello", "Привет", "Salom", "👋"],
      correctAnswer: ["Hello", "👋"],
    },
    {
      id: "q4",
      type: "choice",
      question: "Salomlashish uchun qaysi so'zni ishlatamiz?",
      options: ["Goodbye", "Hello", "Sorry", "Stop"],
      correctAnswer: "Hello",
      image: "🙋‍♂️",
    },
    {
      id: "q5",
      type: "speak",
      question: "Ushbu so'zni aytib ko'ring:",
      correctAnswer: "Hello",
      image: "👋",
    },
  ],
  "english_unit1_2": [
    {
      id: "q1",
      type: "choice",
      question: "'Good morning' qachon aytilamiz?",
      options: ["Ertalab", "Kechqurun", "Tunda", "Peshin"],
      correctAnswer: "Ertalab",
      image: "🌅",
    },
    {
      id: "q2",
      type: "select",
      question: "'Morning' so'zini toping:",
      options: ["Night", "Evening", "Morning", "Afternoon"],
      correctAnswer: "Morning",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos gapni tanlang:",
      options: ["Good night", "Good morning", "Good evening", "Good afternoon"],
      correctAnswer: "Good morning",
      image: "☀️",
    },
    {
      id: "q4",
      type: "speak",
      question: "Aytib ko'ring:",
      correctAnswer: "Good morning",
      image: "🌅",
    },
  ],
  "english_unit1_3": [
    {
      id: "q1",
      type: "choice",
      question: "'Thank you' ma'nosi nima?",
      options: ["Rahmat", "Kechirasiz", "Salom", "Xayr"],
      correctAnswer: "Rahmat",
      image: "🙏",
    },
    {
      id: "q2",
      type: "select",
      question: "'Please' so'zini tanlang:",
      options: ["Thanks", "Please", "Sorry", "Welcome"],
      correctAnswer: "Please",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos so'zni tanlang:",
      options: ["Thank you", "Sorry", "Hello", "Goodbye"],
      correctAnswer: "Thank you",
      image: "🎁",
    },
    {
      id: "q4",
      type: "speak",
      question: "Aytib ko'ring:",
      correctAnswer: "Thank you",
      image: "🙏",
    },
  ],
  "english_unit1_4": [
    {
      id: "q1",
      type: "choice",
      question: "'How are you?' qanday tarjima qilinadi?",
      options: ["Ahvolingiz qalay?", "Salom", "Xayr", "Rahmat"],
      correctAnswer: "Ahvolingiz qalay?",
      image: "❓",
    },
    {
      id: "q2",
      type: "choice",
      question: "'I am fine' ma'nosi:",
      options: ["Men yaxshiman", "Men kasalman", "Men charchadim", "Men o'qiyapman"],
      correctAnswer: "Men yaxshiman",
      image: "😊",
    },
    {
      id: "q3",
      type: "select",
      question: "'Fine' so'zini toping:",
      options: ["Bad", "Fine", "Sad", "Tired"],
      correctAnswer: "Fine",
    },
  ],
  "english_unit1_5": [
    {
      id: "q1",
      type: "choice",
      question: "'Goodbye' qachon aytilamiz?",
      options: ["Xayrlashganda", "Salomlashganda", "Rahmat aytganda", "Uzr so'raganda"],
      correctAnswer: "Xayrlashganda",
      image: "👋",
    },
    {
      id: "q2",
      type: "select",
      question: "'See you' so'zlarini tanlang:",
      options: ["Hello you", "See you", "Thank you", "Miss you"],
      correctAnswer: "See you",
    },
    {
      id: "q3",
      type: "choice",
      question: "'Bye bye' ma'nosi:",
      options: ["Xayr", "Salom", "Rahmat", "Kechirasiz"],
      correctAnswer: "Xayr",
      image: "🚶",
    },
  ],

  // ===== RUSSIAN LESSONS =====
  "russian_unit1_1": [
    {
      id: "q1",
      type: "choice",
      question: "Rasmni ko'ring va to'g'ri so'zni tanlang:",
      options: ["Привет", "Пока", "Спасибо", "Пожалуйста"],
      correctAnswer: "Привет",
      image: "👋",
    },
    {
      id: "q2",
      type: "select",
      question: "'Привет' so'zini tanlang:",
      options: ["Пока", "Привет", "Нет", "Да"],
      correctAnswer: "Привет",
    },
    {
      id: "q3",
      type: "match",
      question: "So'zlarni moslashtiring:",
      options: ["Привет", "Hello", "Salom", "👋"],
      correctAnswer: ["Привет", "👋"],
    },
    {
      id: "q4",
      type: "choice",
      question: "Salomlashish uchun qaysi so'zni ishlatamiz?",
      options: ["Пока", "Привет", "Извини", "Стоп"],
      correctAnswer: "Привет",
      image: "🙋‍♂️",
    },
    {
      id: "q5",
      type: "speak",
      question: "Ushbu so'zni aytib ko'ring:",
      correctAnswer: "Привет",
      image: "👋",
    },
  ],
  "russian_unit1_2": [
    {
      id: "q1",
      type: "choice",
      question: "'Доброе утро' qachon aytilamiz?",
      options: ["Ertalab", "Kechqurun", "Tunda", "Peshin"],
      correctAnswer: "Ertalab",
      image: "🌅",
    },
    {
      id: "q2",
      type: "select",
      question: "'Утро' so'zini toping:",
      options: ["Ночь", "Вечер", "Утро", "День"],
      correctAnswer: "Утро",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos gapni tanlang:",
      options: ["Спокойной ночи", "Доброе утро", "Добрый вечер", "Добрый день"],
      correctAnswer: "Доброе утро",
      image: "☀️",
    },
    {
      id: "q4",
      type: "speak",
      question: "Aytib ko'ring:",
      correctAnswer: "Доброе утро",
      image: "🌅",
    },
  ],
  "russian_unit1_3": [
    {
      id: "q1",
      type: "choice",
      question: "'Спасибо' ma'nosi nima?",
      options: ["Rahmat", "Kechirasiz", "Salom", "Xayr"],
      correctAnswer: "Rahmat",
      image: "🙏",
    },
    {
      id: "q2",
      type: "select",
      question: "'Пожалуйста' so'zini tanlang:",
      options: ["Спасибо", "Пожалуйста", "Извини", "Привет"],
      correctAnswer: "Пожалуйста",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos so'zni tanlang:",
      options: ["Спасибо", "Извини", "Привет", "Пока"],
      correctAnswer: "Спасибо",
      image: "🎁",
    },
  ],

  // ===== GERMAN LESSONS =====
  "german_unit1_1": [
    {
      id: "q1",
      type: "choice",
      question: "Rasmni ko'ring va to'g'ri so'zni tanlang:",
      options: ["Hallo", "Tschüss", "Danke", "Bitte"],
      correctAnswer: "Hallo",
      image: "👋",
    },
    {
      id: "q2",
      type: "select",
      question: "'Hallo' so'zini tanlang:",
      options: ["Tschüss", "Hallo", "Nein", "Ja"],
      correctAnswer: "Hallo",
    },
    {
      id: "q3",
      type: "match",
      question: "So'zlarni moslashtiring:",
      options: ["Hallo", "Hello", "Salom", "👋"],
      correctAnswer: ["Hallo", "👋"],
    },
    {
      id: "q4",
      type: "choice",
      question: "Salomlashish uchun qaysi so'zni ishlatamiz?",
      options: ["Tschüss", "Hallo", "Entschuldigung", "Stopp"],
      correctAnswer: "Hallo",
      image: "🙋‍♂️",
    },
    {
      id: "q5",
      type: "speak",
      question: "Ushbu so'zni aytib ko'ring:",
      correctAnswer: "Hallo",
      image: "👋",
    },
  ],
  "german_unit1_2": [
    {
      id: "q1",
      type: "choice",
      question: "'Guten Morgen' qachon aytilamiz?",
      options: ["Ertalab", "Kechqurun", "Tunda", "Peshin"],
      correctAnswer: "Ertalab",
      image: "🌅",
    },
    {
      id: "q2",
      type: "select",
      question: "'Morgen' so'zini toping:",
      options: ["Nacht", "Abend", "Morgen", "Nachmittag"],
      correctAnswer: "Morgen",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos gapni tanlang:",
      options: ["Gute Nacht", "Guten Morgen", "Guten Abend", "Guten Tag"],
      correctAnswer: "Guten Morgen",
      image: "☀️",
    },
    {
      id: "q4",
      type: "speak",
      question: "Aytib ko'ring:",
      correctAnswer: "Guten Morgen",
      image: "🌅",
    },
  ],
  "german_unit1_3": [
    {
      id: "q1",
      type: "choice",
      question: "'Danke' ma'nosi nima?",
      options: ["Rahmat", "Kechirasiz", "Salom", "Xayr"],
      correctAnswer: "Rahmat",
      image: "🙏",
    },
    {
      id: "q2",
      type: "select",
      question: "'Bitte' so'zini tanlang:",
      options: ["Danke", "Bitte", "Entschuldigung", "Hallo"],
      correctAnswer: "Bitte",
    },
    {
      id: "q3",
      type: "choice",
      question: "Rasmga mos so'zni tanlang:",
      options: ["Danke", "Entschuldigung", "Hallo", "Tschüss"],
      correctAnswer: "Danke",
      image: "🎁",
    },
  ],
};

export function LanguageLesson() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const unitId = searchParams.get("unit") || "unit1";
  const lessonNumber = searchParams.get("lesson") || "1";
  const language = searchParams.get("lang") || "english";

  // Build lesson key: language_unitId_lessonNumber
  const lessonId = `${language}_${unitId}_${lessonNumber}`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const questions = lessonData[lessonId] || lessonData["english_unit1_1"];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    audioService.playClick();
  }, []);

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    
    // Check if answer is correct
    let correct = false;
    if (Array.isArray(currentQuestion.correctAnswer)) {
      correct = currentQuestion.correctAnswer.includes(answer);
    } else {
      correct = answer === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      audioService.playSuccess();
      setScore(score + 20);
    } else {
      audioService.playError();
      setHearts(Math.max(0, hearts - 1));
    }
  };

  const handleMatchPair = (item: string) => {
    if (matchedPairs.includes(item)) {
      setMatchedPairs(matchedPairs.filter(p => p !== item));
    } else {
      const newPairs = [...matchedPairs, item];
      setMatchedPairs(newPairs);

      // Check if we have 2 items selected
      if (newPairs.length === 2) {
        const correct = Array.isArray(currentQuestion.correctAnswer) &&
          currentQuestion.correctAnswer.every(answer => newPairs.includes(answer));
        
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
          audioService.playSuccess();
          setScore(score + 20);
        } else {
          audioService.playError();
          setHearts(Math.max(0, hearts - 1));
        }
      }
    }
  };

  const handleSpeak = () => {
    // Simulate speaking - in real app, use Web Speech API
    audioService.playSuccess();
    setIsCorrect(true);
    setShowFeedback(true);
    setScore(score + 20);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setMatchedPairs([]);
      audioService.playClick();
    } else {
      // Lesson complete
      setLessonComplete(true);
      const earnedStars = hearts >= 4 ? 3 : hearts >= 2 ? 2 : 1;
      // Save lesson completion with correct key: language_unitId_lessonNumber
      authService.completeLesson(`${language}_${unitId}_${lessonNumber}`, 'language', earnedStars);
      authService.addXP(score);
      authService.addStars(earnedStars);
      audioService.playSuccess();
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setHearts(5);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setLessonComplete(false);
    setMatchedPairs([]);
    audioService.playClick();
  };

  const handleExit = () => {
    audioService.playClick();
    navigate(`/languages`);
  };

  if (hearts === 0 && !lessonComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-8 shadow-2xl text-center max-w-md"
        >
          <CharacterMascot mood="sad" size="lg" />
          <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
            Yuraklar tugadi! 💔
          </h2>
          <p className="text-gray-600 mb-8">
            Xavotir olmang, yana urinib ko'ring!
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Qayta urinish
            </button>
            <button
              onClick={handleExit}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl hover:bg-gray-300 transition-colors"
            >
              Chiqish
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (lessonComplete) {
    const earnedStars = hearts >= 4 ? 3 : hearts >= 2 ? 2 : 1;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[3rem] p-8 shadow-2xl text-center max-w-md"
        >
          <CharacterMascot mood="celebrating" size="lg" />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-2">
            🎉 Ajoyib! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Darsni yakunladingiz!
          </p>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-12 w-12 ${
                    i < earnedStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                +{score} XP
              </div>
              <div className="text-gray-600">
                {hearts} ❤️ qoldi
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Qayta
            </button>
            <button
              onClick={handleExit}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform"
            >
              Davom etish
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleExit}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
              />
            </div>
          </div>

          {/* Hearts */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`h-6 w-6 ${
                  i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-[3rem] p-8 shadow-2xl"
          >
            {/* Question */}
            <div className="text-center mb-8">
              {currentQuestion.image && (
                <div className="text-8xl mb-6 animate-bounce">
                  {currentQuestion.image}
                </div>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {currentQuestion.question}
              </h2>
              {currentQuestion.audio && (
                <button
                  onClick={() => audioService.playClick()}
                  className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-6 rounded-2xl transition-colors flex items-center gap-2 mx-auto"
                >
                  <Volume2 className="h-5 w-5" />
                  Tinglash
                </button>
              )}
            </div>

            {/* Answers */}
            {currentQuestion.type === "choice" || currentQuestion.type === "select" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`
                      p-6 rounded-3xl font-bold text-lg transition-all
                      ${
                        selectedAnswer === option
                          ? isCorrect
                            ? 'bg-green-400 text-white'
                            : 'bg-red-400 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }
                      ${showFeedback && option === currentQuestion.correctAnswer ? 'bg-green-400 text-white' : ''}
                      disabled:cursor-not-allowed
                    `}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : currentQuestion.type === "match" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentQuestion.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMatchPair(option)}
                    disabled={showFeedback}
                    className={`
                      p-6 rounded-3xl font-bold text-lg transition-all aspect-square flex items-center justify-center
                      ${
                        matchedPairs.includes(option)
                          ? 'bg-blue-400 text-white ring-4 ring-blue-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }
                      ${showFeedback && Array.isArray(currentQuestion.correctAnswer) && currentQuestion.correctAnswer.includes(option) ? 'bg-green-400 text-white' : ''}
                      disabled:cursor-not-allowed
                    `}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : currentQuestion.type === "speak" ? (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeak}
                  disabled={showFeedback}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-6 px-12 rounded-3xl text-2xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                >
                  🎤 Aytib ko'ring
                </motion.button>
                <p className="text-gray-600 mt-4">
                  Tugmani bosing va "{currentQuestion.correctAnswer}" deb ayting
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`
                mt-6 p-6 rounded-3xl shadow-xl
                ${isCorrect ? 'bg-green-100 border-4 border-green-400' : 'bg-red-100 border-4 border-red-400'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {isCorrect ? '🎉' : '😅'}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? 'To\'g\'ri!' : 'Xato!'}
                    </h3>
                    <p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? '+20 XP' : 'Qayta urinib ko\'ring!'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className={`
                    font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-2
                    ${isCorrect ? 'bg-green-400 hover:bg-green-500 text-white' : 'bg-red-400 hover:bg-red-500 text-white'}
                  `}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Davom' : 'Tugatish'}
                  <Check className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}