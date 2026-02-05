import { Header } from "@/app/components/Header";
import { BottomNav } from "@/app/components/BottomNav";
import { CourseCard } from "@/app/components/CourseCard";
import { CategoryChip } from "@/app/components/CategoryChip";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function Courses() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Hammasi", icon: "🎯" },
    { id: "programming", name: "Dasturlash", icon: "💻" },
    { id: "design", name: "Dizayn", icon: "🎨" },
    { id: "business", name: "Biznes", icon: "📊" },
    { id: "language", name: "Tillar", icon: "🌐" },
    { id: "science", name: "Fan", icon: "🔬" },
  ];

  const allCourses = [
    {
      id: "1",
      title: "Python dasturlash asoslari - Boshlovchilar uchun to'liq kurs",
      instructor: "Alisher Karimov",
      duration: "12 soat",
      students: 1250,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1698919585693-191c51b66cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzY5NDk4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Dasturlash",
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
    },
    {
      id: "3",
      title: "Biznes strategiyasi va menejment asoslari",
      instructor: "Jamshid Tursunov",
      duration: "10 soat",
      students: 650,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1496180470114-6ef490f3ff22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY5NDgwNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Biznes",
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
    },
    {
      id: "5",
      title: "JavaScript - React.js va zamonaviy web dasturlash",
      instructor: "Bobur Normatov",
      duration: "18 soat",
      students: 1580,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1698919585693-191c51b66cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzY5NDk4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Dasturlash",
    },
    {
      id: "6",
      title: "Matematika asoslari - Oliy matematika kursi",
      instructor: "Shohruh Ismoilov",
      duration: "15 soat",
      students: 780,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1758685733737-71f8945decf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMHNjaWVuY2UlMjBzdHVkZW50fGVufDF8fHx8MTc2OTUyNDY0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Fan",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Kurslar" showMenu={false} showNotifications />
      
      <main className="max-w-md mx-auto px-4 py-4">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
          <button className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-gray-200 hover:border-indigo-600 transition-colors">
            <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {allCourses.length} ta kurs topildi
          </p>
          <select className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none">
            <option>Mashhur</option>
            <option>Yangi</option>
            <option>Reyting bo'yicha</option>
            <option>Narx bo'yicha</option>
          </select>
        </div>

        {/* Course Grid */}
        <div className="space-y-4">
          {allCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
