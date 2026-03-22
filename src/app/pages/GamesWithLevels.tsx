import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Trophy, Star, RotateCcw, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { KidsNavBar } from "@/app/components/KidsNavBar";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type GameId = "menu" | "memory" | "puzzle" | "wordscramble" | "numbersort" | "colormatch" | "shapematch" | "mathquiz" | "animalfind";
type Difficulty = "easy" | "medium" | "hard";

interface GameLevel {
  level: number;
  difficulty: Difficulty;
  locked: boolean;
  stars: number;
  bestScore?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// GAME MENU
// ──────────────────────────────────────────────────────────────────────────────
export function GamesWithLevels() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameId>("menu");
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);
  const [userXP, setUserXP] = useState(0);

  useEffect(() => {
    const progress = authService.getProgress();
    setUserXP(progress.totalXP);
  }, []);

  const games = [
    {
      id: "memory" as GameId,
      title: "Xotira o'yini",
      icon: "🃏",
      color: "from-purple-400 to-pink-400",
      description: "Juftlarni toping!",
      levels: 5,
    },
    {
      id: "puzzle" as GameId,
      title: "Puzzle",
      icon: "🧩",
      color: "from-blue-400 to-cyan-400",
      description: "Rasmni yig'ing!",
      levels: 5,
    },
    {
      id: "wordscramble" as GameId,
      title: "So'z topish",
      icon: "📝",
      color: "from-green-400 to-emerald-400",
      description: "So'zni toping!",
      levels: 5,
    },
    {
      id: "numbersort" as GameId,
      title: "Raqam tartibi",
      icon: "🔢",
      color: "from-orange-400 to-red-400",
      description: "Tartiblab joylashtiring!",
      levels: 5,
    },
    {
      id: "colormatch" as GameId,
      title: "Rang moslamasi",
      icon: "🎨",
      color: "from-pink-400 to-rose-400",
      description: "Ranglarni moslang!",
      levels: 5,
    },
    {
      id: "shapematch" as GameId,
      title: "Shakl topish",
      icon: "🔷",
      color: "from-indigo-400 to-purple-400",
      description: "Shakllarni tanlang!",
      levels: 5,
    },
    {
      id: "mathquiz" as GameId,
      title: "Matematika viktorinasi",
      icon: "➕",
      color: "from-yellow-400 to-amber-400",
      description: "Hisoblang va javob bering!",
      levels: 5,
    },
    {
      id: "animalfind" as GameId,
      title: "Hayvonlarni top",
      icon: "🦁",
      color: "from-green-500 to-emerald-500",
      description: "Hayvonlarni toping!",
      levels: 5,
    },
  ];

  if (activeGame === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
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
              <span>🎮</span>
              O'yinlar
            </h1>

            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="font-bold text-yellow-700">24</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl text-gray-700 mb-8"
          >
            O'yinni tanlang va o'ynashni boshlang! 🎯
          </motion.p>

          {/* Games Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {games.map((game, index) => (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  audioService.playClick();
                  setActiveGame(game.id);
                }}
                className={`
                  bg-gradient-to-br ${game.color}
                  rounded-3xl p-6 shadow-xl
                  text-center relative overflow-hidden
                `}
              >
                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-20">
                  ✨
                </div>

                {/* Icon */}
                <div className="text-6xl mb-3">{game.icon}</div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {game.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-white/90 mb-3">
                  {game.description}
                </p>

                {/* Levels badge */}
                <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                  <span className="text-xs font-semibold text-white">
                    {game.levels} level
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <KidsNavBar />
      </div>
    );
  }

  // Level Selection Screen
  const selectedGame = games.find(g => g.id === activeGame);
  if (!selectedGame) return null;

  const completedLessons = authService.getCompletedLessons();

  const levels: GameLevel[] = Array.from({ length: selectedGame.levels }, (_, i) => {
    const isFirstLevel = i === 0;
    const previousLevelCompleted = i > 0 && completedLessons.includes(`game_${selectedGame.id}_level${i}`);
    
    return {
      level: i + 1,
      difficulty: i < 2 ? "easy" : i < 4 ? "medium" : "hard",
      locked: !isFirstLevel && !previousLevelCompleted, // First level unlocked, others need previous completed
      stars: completedLessons.includes(`game_${selectedGame.id}_level${i + 1}`) ? 3 : 0,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioService.playClick();
              setActiveGame("menu");
            }}
            className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>{selectedGame.icon}</span>
            {selectedGame.title}
          </h1>

          <div className="w-14" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xl text-gray-700 mb-8"
        >
          Levelni tanlang! 🎯
        </motion.p>

        {/* Levels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <motion.button
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!level.locked ? { scale: 1.05 } : {}}
              whileTap={!level.locked ? { scale: 0.95 } : {}}
              disabled={level.locked}
              onClick={() => {
                if (!level.locked) {
                  audioService.playClick();
                  // Navigate to game level page
                  navigate(`/game-level?game=${selectedGame.id}&level=${level.level}`);
                }
              }}
              className={`
                bg-gradient-to-br ${selectedGame.color}
                rounded-3xl p-8 shadow-xl
                text-center relative
                ${level.locked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-2xl'}
              `}
            >
              {/* Lock icon */}
              {level.locked && (
                <div className="absolute top-3 right-3">
                  <Lock className="h-6 w-6 text-white/70" />
                </div>
              )}

              {/* Level number */}
              <div className="text-5xl font-bold text-white mb-2">
                {level.level}
              </div>

              {/* Difficulty */}
              <div className="text-sm text-white/90 mb-3">
                {level.difficulty === "easy" ? "Oson" : 
                 level.difficulty === "medium" ? "O'rta" : "Qiyin"}
              </div>

              {/* Stars */}
              {!level.locked && (
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < level.stars ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                    />
                  ))}
                </div>
              )}

              {/* Best score */}
              {level.bestScore && (
                <div className="mt-2 text-xs text-white/80">
                  Eng yaxshi: {level.bestScore}
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Game Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-3xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Qanday o'ynash kerak? 🤔
          </h3>
          <p className="text-gray-600">
            {selectedGame.description} Har bir levelni tugatish uchun 
            topshiriqni bajaring va yulduzlar yig'ing!
          </p>
        </motion.div>
      </div>

      <KidsNavBar />
    </div>
  );
}