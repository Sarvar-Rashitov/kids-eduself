import { Header } from "@/app/components/Header";
import { BottomNav } from "@/app/components/BottomNav";
import { CourseCard } from "@/app/components/CourseCard";
import { ProgressCircle } from "@/app/components/ProgressCircle";
import { Trophy, Target, Flame } from "lucide-react";

export function MyLearning() {
  const myCourses = [
    {
      id: "1",
      title: "Python dasturlash asoslari - Boshlovchilar uchun to'liq kurs",
      instructor: "Alisher Karimov",
      duration: "12 soat",
      students: 1250,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1698919585693-191c51b66cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzY5NDk4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Dasturlash",
      progress: 65,
    },
    {
      id: "2",
      title: "UX/UI Dizayn - Zamonaviy interfeys yaratish",
      instructor: "Dilnoza Rahimova",
      duration: "8 soat",
      students: 890,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1764258560063-d14eea44de4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMGdyYXBoaWN8ZW58MXx8fHwxNzY5NTI0NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Dizayn",
      progress: 40,
    },
    {
      id: "4",
      title: "Ingliz tili - A1 dan B2 gacha to'liq kurs",
      instructor: "Shahnoza Abdullayeva",
      duration: "25 soat",
      students: 2100,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1565022536102-f7645c84354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwYm9va3N8ZW58MXx8fHwxNzY5NDg0MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tillar",
      progress: 85,
    },
  ];

  const achievements = [
    { icon: Flame, label: "Kun davomiyligi", value: "7 kun", color: "from-orange-500 to-red-500" },
    { icon: Target, label: "Bajarilgan vazifalar", value: "24/30", color: "from-blue-500 to-cyan-500" },
    { icon: Trophy, label: "Darajangiz", value: "3-daraja", color: "from-yellow-500 to-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Mening o'rganishlarim" showMenu={false} showNotifications />
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Umumiy natija
              </h3>
              <p className="text-gray-600 text-sm">
                Siz juda yaxshi ish qilyapsiz! 🎉
              </p>
            </div>
            <ProgressCircle progress={63} size={80} strokeWidth={8} />
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.label} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{achievement.value}</p>
                  <p className="text-xs text-gray-600">{achievement.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Haftalik faollik</h3>
          <div className="flex justify-between items-end gap-2 h-32">
            {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((day, index) => {
              const heights = [60, 80, 45, 90, 70, 100, 55];
              const isToday = index === 6;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`w-full rounded-lg transition-all ${
                        isToday
                          ? "bg-gradient-to-t from-indigo-600 to-purple-600"
                          : "bg-gradient-to-t from-gray-300 to-gray-400"
                      }`}
                      style={{ height: `${heights[index]}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? "font-bold text-indigo-600" : "text-gray-600"}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Faol kurslar ({myCourses.length})
            </h3>
          </div>
          <div className="space-y-4">
            {myCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
