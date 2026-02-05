import { Header } from "@/app/components/Header";
import { BottomNav } from "@/app/components/BottomNav";
import { 
  Clock, 
  Users, 
  Star, 
  Play,
  FileText,
  Award,
  CheckCircle,
  ChevronDown,
  Heart,
  Share2
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

export function CourseDetail() {
  const { id } = useParams();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const course = {
    title: "Python dasturlash asoslari - Boshlovchilar uchun to'liq kurs",
    instructor: "Alisher Karimov",
    rating: 4.8,
    reviews: 256,
    students: 1250,
    duration: "12 soat",
    lessons: 48,
    level: "Boshlang'ich",
    language: "O'zbek",
    image: "https://images.unsplash.com/photo-1698919585693-191c51b66cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzY5NDk4MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Python dasturlash tilining asoslarini o'rganing. Bu kurs sizga dasturlash olamiga kirishingiz va kuchli asos yaratishingiz uchun mo'ljallangan. Amaliy mashg'ulotlar va loyihalar orqali Python tilini chuqur o'rganasiz.",
  };

  const modules = [
    {
      title: "Kirish va muhit sozlash",
      lessons: 5,
      duration: "45 daqiqa",
      lessons_detail: [
        { title: "Kursga xush kelibsiz", duration: "5 min", completed: true },
        { title: "Python nima?", duration: "10 min", completed: true },
        { title: "Python o'rnatish", duration: "15 min", completed: false },
        { title: "IDE tanlash", duration: "10 min", completed: false },
        { title: "Birinchi dastur", duration: "5 min", completed: false },
      ],
    },
    {
      title: "Asosiy tushunchalar",
      lessons: 8,
      duration: "1.5 soat",
      lessons_detail: [
        { title: "O'zgaruvchilar", duration: "12 min", completed: false },
        { title: "Ma'lumot turlari", duration: "15 min", completed: false },
        { title: "Operatorlar", duration: "10 min", completed: false },
        { title: "Shartli operatorlar", duration: "12 min", completed: false },
        { title: "Sikllar", duration: "15 min", completed: false },
      ],
    },
    {
      title: "Funksiyalar",
      lessons: 6,
      duration: "1 soat",
      lessons_detail: [],
    },
  ];

  const features = [
    { icon: FileText, label: `${course.lessons} ta dars` },
    { icon: Clock, label: course.duration },
    { icon: Award, label: "Sertifikat" },
    { icon: Users, label: `${course.students.toLocaleString()} talaba` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative">
        <div className="h-56 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
            <ChevronDown className="h-6 w-6 text-gray-900 rotate-90" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full"
            >
              <Heart className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-900"}`} />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
              <Share2 className="h-6 w-6 text-gray-900" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 rounded-full">
              {course.language}
            </span>
          </div>
        </div>
      </div>
      
      <main className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        {/* Course Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {course.title}
          </h1>
          
          <p className="text-gray-700 mb-3">{course.instructor}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{course.rating}</span>
              <span className="text-sm text-gray-600">({course.reviews} baho)</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 py-4 border-y border-gray-100">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="text-center">
                  <Icon className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{feature.label}</p>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mt-4">
            {course.description}
          </p>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="font-bold text-gray-900 mb-4">Kurs tarkibi</h3>
          
          <div className="space-y-3">
            {modules.map((module, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 mb-1">
                      {index + 1}. {module.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {module.lessons} dars • {module.duration}
                    </p>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedModule === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                
                {expandedModule === index && module.lessons_detail.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {module.lessons_detail.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Play className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                        </div>
                        <span className="text-xs text-gray-600">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enroll Button */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <div className="max-w-md mx-auto">
            <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all">
              Kursni boshlash
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
