import { Header } from "@/app/components/Header";
import { BottomNav } from "@/app/components/BottomNav";
import { 
  Settings, 
  Bell, 
  Heart, 
  Award, 
  FileText, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Star,
  BookOpen
} from "lucide-react";

export function Profile() {
  const menuItems = [
    { icon: Settings, label: "Sozlamalar", path: "/settings" },
    { icon: Bell, label: "Bildirishnomalar", path: "/notifications" },
    { icon: Heart, label: "Sevimlilar", path: "/favorites", badge: "12" },
    { icon: Award, label: "Sertifikatlarim", path: "/certificates", badge: "5" },
    { icon: FileText, label: "To'lovlar tarixi", path: "/payments" },
    { icon: HelpCircle, label: "Yordam markazi", path: "/help" },
  ];

  const stats = [
    { label: "Kurslar", value: "12", icon: BookOpen },
    { label: "Sertifikatlar", value: "5", icon: Award },
    { label: "Reytingim", value: "4.8", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profil" showMenu={false} showNotifications={false} />
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-4 border-white/30">
              AK
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Alisher Karimov</h2>
              <p className="text-indigo-100 text-sm">alisher.k@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  Premium
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-white/80" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-indigo-100">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Yangi yutuq!</p>
              <p className="text-sm text-gray-600">7 kun davomiyligi mukofoti</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-colors">
          <LogOut className="h-5 w-5" />
          Chiqish
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Versiya 1.0.0 • EduSelf © 2025
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
