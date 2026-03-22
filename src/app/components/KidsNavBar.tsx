import { motion } from "motion/react";
import { Home, Trophy, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

export function KidsNavBar() {
  const location = useLocation();

  const navItems = [
    { icon: "🏠", label: "Bosh",     path: "/home",     color: "from-blue-400 to-cyan-400" },
    { icon: "🎮", label: "O'yinlar", path: "/games",    color: "from-purple-400 to-pink-400" },
    { icon: "🏆", label: "Yutuqlar", path: "/progress", color: "from-yellow-400 to-orange-400" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-purple-200 z-50 pb-safe">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    flex flex-col items-center gap-1 px-6 py-3 rounded-3xl
                    ${isActive ? `bg-gradient-to-br ${item.color} shadow-lg` : ""}
                    transition-all
                  `}
                >
                  <span className={`text-4xl ${isActive ? "animate-bounce-soft" : ""}`}>
                    {item.icon}
                  </span>
                  <span className={`text-xs font-bold ${isActive ? "text-white" : "text-gray-600"}`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}