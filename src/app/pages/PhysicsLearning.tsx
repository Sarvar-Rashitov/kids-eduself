import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { audioService } from "@/services/audioService";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { authService } from "@/services/authService";
import { Star } from "lucide-react";

interface PhysicsModule {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  locked: boolean;
  lessons: number;
  completed: number;
}

export function PhysicsLearning() {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const progress = authService.getProgress();
    setUserXP(progress.totalXP);
  }, []);

  const modules: PhysicsModule[] = [
    {
      id: "gravity",
      title: "Gravitatsiya",
      description: "Narsalar nima uchun pastga tushadi?",
      emoji: "🍎",
      color: "from-red-400 to-pink-400",
      locked: false,
      lessons: 5,
      completed: 0,
    },
    {
      id: "light",
      title: "Yorug'lik",
      description: "Yorug'lik qanday tarqaladi?",
      emoji: "💡",
      color: "from-yellow-400 to-amber-400",
      locked: false,
      lessons: 4,
      completed: 0,
    },
    {
      id: "sound",
      title: "Tovush",
      description: "Tovush qanday paydo bo'ladi?",
      emoji: "🔊",
      color: "from-blue-400 to-cyan-400",
      locked: false,
      lessons: 4,
      completed: 0,
    },
    {
      id: "magnets",
      title: "Magnitlar",
      description: "Magnitlar qanday tortadi?",
      emoji: "🧲",
      color: "from-purple-400 to-pink-400",
      locked: userXP < 300,
      lessons: 5,
      completed: 0,
    },
    {
      id: "water",
      title: "Suv sikli",
      description: "Yomg'ir qayerdan keladi?",
      emoji: "💧",
      color: "from-cyan-400 to-blue-400",
      locked: userXP < 400,
      lessons: 4,
      completed: 0,
    },
    {
      id: "electricity",
      title: "Elektr",
      description: "Elektr quvvati qanday ishlaydi?",
      emoji: "⚡",
      color: "from-yellow-500 to-orange-500",
      locked: userXP < 500,
      lessons: 6,
      completed: 0,
    },
    {
      id: "force",
      title: "Kuch va harakat",
      description: "Narsalar qanday harakatlanadi?",
      emoji: "🚗",
      color: "from-green-400 to-emerald-400",
      locked: userXP < 600,
      lessons: 5,
      completed: 0,
    },
    {
      id: "energy",
      title: "Energiya",
      description: "Energiya nima va u qaerdan keladi?",
      emoji: "🔋",
      color: "from-indigo-400 to-purple-400",
      locked: userXP < 700,
      lessons: 5,
      completed: 0,
    },
  ];

  // Gravity Animation Demo
  const GravityDemo = () => {
    const [dropped, setDropped] = useState(false);

    return (
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-6xl">
          🌳
        </div>
        
        <AnimatePresence>
          {!dropped && (
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl cursor-pointer"
              onClick={() => {
                setDropped(true);
                audioService.playClick();
                setTimeout(() => setDropped(false), 2000);
              }}
            >
              🍎
            </motion.div>
          )}
        </AnimatePresence>

        {dropped && (
          <motion.div
            initial={{ y: 20 }}
            animate={{ 
              y: 200,
              rotate: [0, 180, 360]
            }}
            transition={{ 
              y: { duration: 0.8, ease: "easeIn" },
              rotate: { duration: 0.8 }
            }}
            className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl"
          >
            🍎
          </motion.div>
        )}

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm font-semibold text-gray-700">
            {dropped ? "Gravitatsiya tortadi! 🌍" : "Olmani bosing! 👆"}
          </p>
        </div>
      </div>
    );
  };

  // Light Animation Demo
  const LightDemo = () => {
    return (
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="text-8xl">💡</div>
        </motion.div>

        {/* Light rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-24 bg-yellow-300/50"
            style={{
              transformOrigin: 'top center',
              transform: `rotate(${i * 45}deg)`,
            }}
            animate={{
              scaleY: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm font-semibold text-white">
            Yorug'lik barcha yo'nalishlarda tarqaladi! ✨
          </p>
        </div>
      </div>
    );
  };

  // Sound Animation Demo
  const SoundDemo = () => {
    const [playing, setPlaying] = useState(false);

    return (
      <div className="relative h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setPlaying(!playing);
            if (!playing) {
              audioService.playClick();
            }
          }}
        >
          {playing ? "🔔" : "🔕"}
        </motion.div>

        {/* Sound waves */}
        <AnimatePresence>
          {playing && (
            <>
              {[1, 2, 3].map((wave) => (
                <motion.div
                  key={wave}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-blue-400 rounded-full"
                  initial={{ width: 0, height: 0, opacity: 0.8 }}
                  animate={{ 
                    width: 300, 
                    height: 300, 
                    opacity: 0 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: wave * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm font-semibold text-gray-700">
            {playing ? "Tovush to'lqinlari tarqalmoqda! 🌊" : "Qo'ng'iroqni bosing! 👆"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
            <span>🔬</span>
            Fizika
          </h1>

          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Character Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8 flex items-center gap-4"
        >
          <CharacterMascot mood="celebrating" size="sm" />
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Fizikaning qiziqarli dunyosiga xush kelibsiz! 🚀
            </h2>
            <p className="text-gray-600">
              Atrofimizda sodir bo'layotgan ajoyib hodisalarni birgalikda o'rganamiz
            </p>
          </div>
        </motion.div>

        {/* Interactive Demos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GravityDemo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LightDemo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SoundDemo />
          </motion.div>
        </div>

        {/* Learning Path - Roadmap Style */}
        <div className="space-y-12 relative max-w-4xl mx-auto">
          {/* Connecting path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-200 via-yellow-200 to-purple-200 -translate-x-1/2 hidden md:block" />

          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Module Header */}
              <div
                className={`bg-white rounded-3xl p-6 shadow-lg mb-6 relative z-10 ${
                  module.locked ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{module.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  {module.locked && (
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <Lock className="h-5 w-5 text-gray-400 inline mr-2" />
                      <span className="text-sm font-semibold text-gray-600">
                        Qulflangan
                      </span>
                    </div>
                  )}
                </div>
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>
                      {module.completed} / {module.lessons} dars
                    </span>
                    <span>
                      {Math.round((module.completed / module.lessons) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${module.color} transition-all`}
                      style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Module Lessons - Roadmap style */}
              {!module.locked && (
                <div className="space-y-4 relative">
                  {[...Array(module.lessons)].map((_, lessonIndex) => {
                    const lessonNum = lessonIndex + 1;
                    const isCompleted = lessonIndex < module.completed;
                    const isLocked = lessonIndex > module.completed;

                    return (
                      <motion.div
                        key={`${module.id}-lesson-${lessonNum}`}
                        className={`${
                          lessonIndex % 2 === 0 ? "md:ml-0" : "md:ml-auto"
                        } max-w-md relative`}
                        initial={{ opacity: 0, x: lessonIndex % 2 === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1 + lessonIndex * 0.05,
                        }}
                      >
                        <motion.button
                          whileHover={!isLocked ? { scale: 1.05 } : {}}
                          whileTap={!isLocked ? { scale: 0.95 } : {}}
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) {
                              audioService.playClick();
                              // Navigate to physics lesson page
                              navigate(`/physics-lesson?module=${module.id}&lesson=${lessonNum}`);
                            }
                          }}
                          className={`${
                            isLocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                          } w-full bg-gradient-to-br ${module.color} rounded-3xl p-6 shadow-lg transition-all relative ${
                            isCompleted ? "ring-4 ring-yellow-300" : ""
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-5xl">
                              {lessonNum === 1
                                ? "📖"
                                : lessonNum === 2
                                ? "🔬"
                                : lessonNum === 3
                                ? "🧪"
                                : lessonNum === 4
                                ? "⚗️"
                                : "🏆"}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-xs text-white/80 uppercase font-semibold mb-1">
                                Dars {lessonNum}
                              </div>
                              <h4 className="text-lg font-bold text-white">
                                {module.title} - {lessonNum}-qism
                              </h4>
                              {isCompleted && (
                                <div className="flex gap-1 mt-2">
                                  {[...Array(3)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4 text-yellow-300 fill-yellow-300"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                            {isLocked && <Lock className="h-5 w-5 text-white/70" />}
                          </div>
                        </motion.button>

                        {/* Connector to next lesson */}
                        {lessonIndex < module.lessons - 1 && (
                          <div className="h-4 w-1 bg-gray-300 mx-auto my-2 rounded-full" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}