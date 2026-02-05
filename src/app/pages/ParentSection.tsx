import { motion } from "motion/react";
import { ChevronLeft, Settings, BarChart3, Shield, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/authService";
import type { User, UserProgress } from "@/services/authService";

export function ParentSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const userProgress = authService.getProgress();
    setUser(currentUser);
    setProgress(userProgress);
  }, []);

  const menuItems = [
    { icon: BarChart3, label: "Taraqqiyot", desc: "Bolangizning o'sishini kuzating", path: "/progress" },
    { icon: Settings, label: "Sozlamalar", desc: "Ilovani moslash", path: "/settings" },
    { icon: Shield, label: "Xavfsizlik", desc: "Maxfiylik sozlamalari", path: "/settings" },
    { icon: Bell, label: "Bildirishnomalar", desc: "Eslatmalar va yangiliklar", path: "/settings" },
  ];

  const stats = [
    { label: "O'rganilgan darslar", value: String(progress?.completedLessons.length || 0) },
    { label: "Yulduzlar", value: String(progress?.totalStars || 0) },
    { label: "Darajasi", value: String(progress?.level || 1) },
    { label: "Ketma-ketlik", value: `${progress?.streakDays || 0} kun` },
  ];

  const recentActivity = [
    { activity: "Alifboni o'rgandi", time: "10 daqiqa oldin", icon: "🔤", show: (progress?.subjectProgress.alphabet || 0) > 0 },
    { activity: "Raqamlarni sanadi", time: "Bugun", icon: "🔢", show: (progress?.subjectProgress.numbers || 0) > 0 },
    { activity: "Matematika masalasi", time: "Kecha", icon: "➕", show: (progress?.subjectProgress.math || 0) > 0 },
  ].filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-b-[3rem] shadow-lg p-6 mb-6 text-white">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-white/20 rounded-2xl mb-4"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Ota-ona bo'limi</h1>
          <p className="text-indigo-100">Bolangizning rivojlanishini kuzatib boring</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Child Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-5xl border-4 border-white shadow-lg">
              {user?.avatar || "👶"}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{user?.name || "Foydalanuvchi"}</h3>
              <p className="text-gray-600">{user?.age || 5} yoshda</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Oxirgi faollik
          </h3>
          
          <div className="space-y-3">
            {recentActivity.length > 0 ? recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="text-3xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.activity}</p>
                  <p className="text-sm text-gray-600">{item.time}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-gray-500 py-4">
                Hali faollik yo'q. O'rganishni boshlang!
              </p>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}