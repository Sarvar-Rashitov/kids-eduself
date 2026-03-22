import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { audioService } from "@/services/audioService";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";

export function AlphabetSelection() {
  const navigate = useNavigate();

  const languages = [
    {
      name: "Русский язык",
      flag: "🇷🇺",
      gradient: "from-blue-400 to-cyan-400",
      path: "/alphabet/russian",
    },
    {
      name: "English",
      flag: "🇬🇧",
      gradient: "from-red-400 to-pink-400",
      path: "/alphabet/english",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/home");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>🔤</span>
            Alifbo
          </h1>

          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <CharacterMascot mood="celebrating" size="md" />
            <p className="text-center mt-4 text-lg font-semibold text-gray-800">
              Qaysi tilni o'rganmoqchisiz? 🌟
            </p>
          </div>
        </motion.div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioService.playClick();
                navigate(lang.path);
              }}
              className={`
                bg-gradient-to-br ${lang.gradient}
                rounded-[3rem] p-8 shadow-2xl
                transform transition-all
                hover:shadow-3xl
              `}
            >
              <div className="text-8xl mb-4">{lang.flag}</div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {lang.name}
              </h2>
              <div className="text-white/80 text-lg">
                Alifboni o'rganing
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}
