import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Volume2 } from "lucide-react";
import { VoiceButton } from "@/app/components/VoiceButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { ProgressStars } from "@/app/components/ProgressStars";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate, useParams } from "react-router";
import { speechService } from "@/services/speechService";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { getWordsForSpeaking } from "@/data/languageContent";

interface SpeakingWord {
  id: string;
  word: string;
  translation: string;
  emoji: string;
  category: string;
  phrase: string;
}

const englishWords: SpeakingWord[] = [
  { id: "hello", word: "Hello", translation: "Salom", emoji: "👋", category: "greeting", phrase: "Hello, friend!" },
  { id: "goodbye", word: "Goodbye", translation: "Xayr", emoji: "👋", category: "greeting", phrase: "Goodbye, see you!" },
  { id: "please", word: "Please", translation: "Iltimos", emoji: "🙏", category: "polite", phrase: "Please help me" },
  { id: "thankyou", word: "Thank you", translation: "Rahmat", emoji: "🙏", category: "polite", phrase: "Thank you very much" },
  { id: "cat", word: "Cat", translation: "Mushuk", emoji: "🐱", category: "animal", phrase: "I like cats" },
  { id: "dog", word: "Dog", translation: "It", emoji: "🐶", category: "animal", phrase: "Dogs are loyal" },
  { id: "apple", word: "Apple", translation: "Olma", emoji: "🍎", category: "food", phrase: "Apple is red" },
  { id: "water", word: "Water", translation: "Suv", emoji: "💧", category: "food", phrase: "I drink water" },
  { id: "happy", word: "Happy", translation: "Xursand", emoji: "😊", category: "emotion", phrase: "I am happy" },
  { id: "love", word: "Love", translation: "Sevgi", emoji: "❤️", category: "emotion", phrase: "I love you" },
];

const russianWords: SpeakingWord[] = [
  { id: "privet", word: "Привет", translation: "Salom", emoji: "👋", category: "greeting", phrase: "Привет, друг!" },
  { id: "dosvidaniya", word: "До свидания", translation: "Xayr", emoji: "👋", category: "greeting", phrase: "До свидания!" },
  { id: "pozhaluysta", word: "Пожалуйста", translation: "Iltimos", emoji: "🙏", category: "polite", phrase: "Пожалуйста, помогите" },
  { id: "spasibo", word: "Спасибо", translation: "Rahmat", emoji: "🙏", category: "polite", phrase: "Спасибо большое" },
  { id: "koshka", word: "Кошка", translation: "Mushuk", emoji: "🐱", category: "animal", phrase: "Мне нравятся кошки" },
  { id: "sobaka", word: "Собака", translation: "It", emoji: "🐶", category: "animal", phrase: "Собака верная" },
  { id: "yabloko", word: "Яблоко", translation: "Olma", emoji: "🍎", category: "food", phrase: "Яблоко красное" },
  { id: "voda", word: "Вода", translation: "Suv", emoji: "💧", category: "food", phrase: "Я пью воду" },
  { id: "schastlivyy", word: "Счастливый", translation: "Xursand", emoji: "😊", category: "emotion", phrase: "Я счастлив" },
  { id: "lyubov", word: "Любовь", translation: "Sevgi", emoji: "❤️", category: "emotion", phrase: "Я люблю тебя" },
];

export function SpeakingPracticeUpdated() {
  const navigate = useNavigate();
  const params = useParams();
  const language = params.language || "russian";
  
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const practiceWords = language === "english" ? englishWords : russianWords;
  const languageName = language === "english" ? "English" : "Русский";
  const speechLang = language === "english" ? "en-US" : "ru-RU";
  const currentWord = practiceWords[currentWordIndex];

  useEffect(() => {
    authService.updateStreak();
  }, []);

  const playWord = () => {
    audioService.playClick();
    speechService.speak(currentWord.word, speechLang);
  };

  const handleStart = () => {
    setIsListening(true);
    setFeedback(null);
    setScore(null);
    audioService.playClick();

    // Request microphone permission first
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // Permission granted, start listening
          speechService.startListening(
            (transcript) => handleStop(transcript),
            (error) => {
              console.error('Speech recognition error:', error);
              setIsListening(false);
              if (error === 'not-allowed') {
                setFeedback("Mikrofonga ruxsat berilmadi. Sozlamalarda mikrofon ruxsatini yoqing! 🎤");
              } else {
                setFeedback("Ovoz yozishda xatolik. Yana urinib ko'ring!");
              }
            },
            speechLang // Pass language parameter
          );
        })
        .catch((error) => {
          console.error('Microphone permission denied:', error);
          setIsListening(false);
          setFeedback("Mikrofonga ruxsat berilmadi. Sozlamalarda mikrofon ruxsatini yoqing! 🎤");
        });
    } else {
      speechService.startListening(
        (transcript) => handleStop(transcript),
        (error) => {
          console.error('Speech recognition error:', error);
          setIsListening(false);
          setFeedback("Ovoz yozishda xatolik. Yana urinib ko'ring!");
        },
        speechLang // Pass language parameter
      );
    }
  };

  const handleStop = (transcript?: string) => {
    setIsListening(false);
    speechService.stopListening();

    if (transcript) {
      const result = speechService.analyzePronunciation(transcript, currentWord.word);
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
        authService.completeLesson(`speaking_${language}_${currentWord.id}`, 'speaking');
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
      setTimeout(() => {
        navigate("/speaking");
      }, 3000);
    }
  };

  if (showReward) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <CharacterMascot mood="celebrating" size="lg" animate />
          <h2 className="text-4xl font-bold text-gray-800 mt-6 mb-4">
            {language === "english" ? "Excellent speaking! 🎉" : "Отлично говорите! 🎉"}
          </h2>
          <p className="text-2xl text-gray-700 mb-6">
            Barcha so'zlarni to'g'ri talaffuz qildingiz!
          </p>
          <ProgressStars earned={5} total={5} size="lg" />
          <p className="text-xl text-gray-600 mt-6">
            +10 yulduz qo'shildi! ⭐
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/speaking");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex-1 mx-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-2">
              {languageName} - Gapirish mashqi
            </h1>
            <div className="flex gap-2">
              {practiceWords.map((_, index) => (
                <div
                  key={`progress-${index}`}
                  className={`flex-1 h-2 rounded-full ${
                    index <= currentWordIndex
                      ? "bg-gradient-to-r from-green-400 to-blue-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600">So'z</p>
            <p className="text-xl font-bold text-green-600">
              {currentWordIndex + 1}/{practiceWords.length}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character guide */}
        <motion.div
          key={`character-${currentWordIndex}`}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8 bg-white rounded-3xl p-4 shadow-md"
        >
          <CharacterMascot 
            mood={score ? (score >= 90 ? "celebrating" : score >= 75 ? "happy" : "thinking") : "happy"} 
            size="sm" 
          />
          <div className="bg-blue-100 rounded-2xl p-3 shadow-sm flex-1">
            <p className="text-lg md:text-xl font-semibold text-gray-800">
              {!feedback 
                ? (language === "english" ? "Listen and repeat!" : "Слушайте и повторяйте!")
                : feedback}
            </p>
          </div>
        </motion.div>

        {/* Word Card */}
        <motion.div
          key={`word-${currentWordIndex}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 rounded-[4rem] p-8 md:p-12 shadow-2xl mb-8"
        >
          <div className="text-center">
            {/* Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              className="text-9xl mb-6"
            >
              {currentWord.emoji}
            </motion.div>

            {/* Word */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              {currentWord.word}
            </motion.div>

            {/* Translation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 mb-6"
            >
              {currentWord.translation}
            </motion.div>

            {/* Listen button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playWord}
              className="bg-white text-blue-600 rounded-full p-6 shadow-xl mb-8 mx-auto block"
            >
              <Volume2 className="h-12 w-12" />
            </motion.button>

            {/* Example phrase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 text-xl text-white/90"
            >
              {currentWord.phrase}
            </motion.div>
          </div>
        </motion.div>

        {/* Voice Recording */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Endi siz aytib ko'ring! 🎤
          </h3>
          <p className="text-gray-600 mb-6">
            Mikrofon tugmasini bosing va so'zni takrorlang
          </p>
          
          <VoiceButton
            isListening={isListening}
            onStart={handleStart}
            onStop={() => handleStop()}
          />

          {score !== null && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-6"
            >
              <div className="text-6xl font-bold mb-2" 
                style={{
                  color: score >= 90 ? '#10b981' : score >= 75 ? '#f59e0b' : '#ef4444'
                }}
              >
                {score}%
              </div>
              <ProgressStars 
                earned={score >= 90 ? 3 : score >= 75 ? 2 : 1} 
                total={3} 
                size="md" 
              />
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          {score !== null && score >= 70 && (
            <button
              onClick={handleNext}
              className="flex-1 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {currentWordIndex === practiceWords.length - 1 ? "Yakunlash 🎉" : "Keyingi so'z →"}
            </button>
          )}
          
          {score !== null && score < 70 && (
            <button
              onClick={() => {
                audioService.playClick();
                setScore(null);
                setFeedback(null);
              }}
              className="flex-1 py-4 bg-yellow-500 text-white rounded-3xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Qayta urinish 🔄
            </button>
          )}
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}