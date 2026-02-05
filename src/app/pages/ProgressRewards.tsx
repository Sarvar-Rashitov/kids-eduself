import { motion } from "motion/react";
import { ChevronLeft, Trophy, Star, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { ProgressStars } from "@/app/components/ProgressStars";
import { RewardBadge } from "@/app/components/RewardBadge";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { useNavigate } from "react-router";
import { authService } from "@/services/authService";
import { audioService } from "@/services/audioService";
import type { UserProgress } from "@/services/authService";

export function ProgressRewards() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const userProgress = authService.getProgress();
    setProgress(userProgress);
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Yuklanmoqda...</p>
      </div>
    );
  }

  const badges = [
    { icon: "🌟", title: "Birinchi qadam", earned: progress.completedLessons.length >= 1 },
    { icon: "🎯", title: "5 dars", earned: progress.completedLessons.length >= 5 },
    { icon: "🏆", title: "10 dars", earned: progress.completedLessons.length >= 10 },
    { icon: "⚡", title: "Tez o'rganuvchi", earned: progress.level >= 3 },
    { icon: "🎨", title: "San'atkor", earned: progress.subjectProgress.alphabet >= 5 },
    { icon: "🔥", title: "7 kun ketma-ket", earned: progress.streakDays >= 7 },
    { icon: "📚", title: "Kitobxon", earned: progress.totalStars >= 50 },
    { icon: "🎵", title: "Musiqachi", earned: progress.subjectProgress.speaking >= 5 },
  ];

  const stats = [
    { icon: Trophy, label: "Jami yulduzlar", value: String(progress.totalStars), color: "from-yellow-400 to-orange-400" },
    { icon: Star, label: "Darajangiz", value: String(progress.level), color: "from-purple-400 to-pink-400" },
    { icon: Zap, label: "Ketma-ketlik", value: `${progress.streakDays} kun`, color: "from-blue-400 to-cyan-400" },
    { icon: Target, label: "O'rganildi", value: String(progress.completedLessons.length), color: "from-green-400 to-emerald-400" },
  ];

  const weekData = [
    { day: "Du", progress: Math.min(progress.subjectProgress.alphabet * 10, 100) },
    { day: "Se", progress: Math.min(progress.subjectProgress.numbers * 10, 100) },
    { day: "Ch", progress: Math.min(progress.subjectProgress.speaking * 10, 100) },
    { day: "Pa", progress: Math.min(progress.subjectProgress.math * 10, 100) },
    { day: "Ju", progress: Math.min(progress.subjectProgress.science * 10, 100) },
    { day: "Sh", progress: Math.min(progress.subjectProgress.language * 10, 100) },
    { day: "Ya", progress: Math.min(progress.totalStars, 100) },
  ];

  const todayStars = Math.min(progress.totalStars % 5, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="p-3 bg-gray-100 rounded-2xl"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">
            Yutuqlar 🏆
          </h1>

          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Character celebration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-6"
        >
          <CharacterMascot mood="celebrating" size="lg" />
        </motion.div>

        {/* Today's stars */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
            Bugungi yulduzlar ⭐
          </h3>
          <ProgressStars earned={todayStars} total={5} size="md" />
          <p className="text-center text-gray-600 mt-4">
            {todayStars < 5 ? `Yana ${5 - todayStars} ta yulduz yutib oling! 🎯` : "Bugun barcha yulduzlarni yutdingiz! 🎉"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  bg-gradient-to-br ${stat.color}
                  rounded-3xl p-6 shadow-lg text-center
                  text-white
                `}
              >
                <Icon className="h-10 w-10 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm font-semibold">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🏅</span>
            Nishonlar
          </h3>
          
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <RewardBadge {...badge} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📊</span>
            Bu hafta
          </h3>
          
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map((day, index) => {
              const isToday = index === 6;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${day.progress}%` }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="w-full bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <div
                      className={`w-full rounded-xl ${
                        isToday
                          ? "bg-gradient-to-t from-purple-400 to-pink-400"
                          : "bg-gradient-to-t from-blue-300 to-cyan-300"
                      }`}
                      style={{ height: "100%" }}
                    />
                  </motion.div>
                  <span className={`text-xs font-bold ${isToday ? "text-purple-600" : "text-gray-600"}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}