import { motion } from "motion/react";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { SubjectCard } from "@/app/components/SubjectCard";
import { ProgressStars } from "@/app/components/ProgressStars";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { Trophy, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { audioService } from "@/services/audioService";

export function Home() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(authService.getProgress());
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const userProgress = authService.getProgress();
    setProgress(userProgress);
    authService.updateStreak();
  }, []);

  const subjects = [
    {
      title: "Alifbo",
      icon: "🔤",
      color: "blue",
      path: "/alphabet",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      title: "Raqamlar",
      icon: "🔢",
      color: "purple",
      path: "/numbers",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      title: "Gapirish",
      icon: "🎤",
      color: "orange",
      path: "/speaking",
      gradient: "from-orange-400 to-yellow-400",
    },
    {
      title: "Tillar",
      icon: "🌍",
      color: "green",
      path: "/language",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      title: "Videolar",
      icon: "📺",
      color: "red",
      path: "/videos",
      gradient: "from-red-400 to-pink-400",
    },
    {
      title: "O'yinlar",
      icon: "🎮",
      color: "purple",
      path: "/games",
      gradient: "from-violet-400 to-purple-500",
    },
  ];

  const todayStars = progress ? Math.min(progress.totalStars % 5, 5) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 pb-24">
      {/* Header with character */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{currentUser?.avatar || "👦"}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Salom, {currentUser?.name || "Bola"}! 👋
                </h2>
                <p className="text-gray-600">Nimani o'rganamiz?</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  audioService.playClick();
                  navigate("/progress");
                }}
                className="p-3 bg-yellow-100 rounded-2xl"
              >
                <Trophy className="h-6 w-6 text-yellow-600" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  audioService.playClick();
                  navigate("/parent");
                }}
                className="p-3 bg-purple-100 rounded-2xl"
              >
                <User className="h-6 w-6 text-purple-600" />
              </motion.button>
            </div>
          </div>

          {/* Today's progress */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-4">
            <p className="text-sm text-gray-700 font-semibold mb-2 text-center">
              Bugungi yulduzlar ⭐
            </p>
            <ProgressStars earned={todayStars} total={5} size="sm" />
            {progress && (
              <p className="text-center text-xs text-gray-600 mt-2">
                Jami: {progress.totalStars} ⭐ | Daraja: {progress.level} 🎯
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Floating decorations */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-24 right-8 text-4xl pointer-events-none"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        className="absolute top-96 left-6 text-3xl pointer-events-none"
      >
        🌟
      </motion.div>

      {/* Subject Grid */}
      <div className="max-w-md mx-auto px-4">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span>📚</span>
          Fanlarni tanlang
        </motion.h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <SubjectCard {...subject} />
            </motion.div>
          ))}
        </div>

        {/* Math */}
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            audioService.playClick();
            navigate("/math-new");
          }}
          className="w-full bg-gradient-to-br from-orange-400 to-red-400 text-white p-8 rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden mb-4"
        >
          <div className="absolute -top-6 -right-6 text-9xl opacity-20">
            ➕
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🔢</div>
            <div className="text-left flex-1">
              <h3 className="text-2xl font-bold">Matematika</h3>
              <p className="text-sm text-white/90">
                Qo'shish, ayirish, sanoq
              </p>
            </div>
            <ChevronRight className="h-8 w-8" />
          </div>
          <div className="flex gap-2">
            <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
              0/7 modul
            </div>
          </div>
        </motion.button>

        {/* Science - Physics */}
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            audioService.playClick();
            navigate("/science");
          }}
          className="w-full bg-gradient-to-br from-cyan-400 to-blue-400 text-white p-8 rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 text-9xl opacity-20">
            🧪
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🔬</div>
            <div className="text-left flex-1">
              <h3 className="text-2xl font-bold">Fizika</h3>
              <p className="text-sm text-white/90">
                Qiziqarli tajribalar
              </p>
            </div>
            <ChevronRight className="h-8 w-8" />
          </div>
          <div className="flex gap-2">
            <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
              0/8 modul
            </div>
          </div>
        </motion.button>
      </div>

      <KidsNavBar />
    </div>
  );
}
