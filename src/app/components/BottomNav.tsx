import { Home, BookOpen, GraduationCap, User } from "lucide-react";
import { Link, useLocation } from "react-router";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Asosiy", path: "/" },
    { icon: BookOpen, label: "Kurslar", path: "/courses" },
    { icon: GraduationCap, label: "O'rganishlar", path: "/my-learning" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 flex-1 transition-colors ${
                isActive ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "fill-indigo-100" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
