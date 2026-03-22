import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Lock, Star, Trophy, Flame } from "lucide-react";
import { useNavigate } from "react-router";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";

interface Language {
  id: string;
  name: string;
  flag: string;
  color: string;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  locked: boolean;
  completed: number;
  total: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'lesson' | 'story' | 'practice' | 'test';
  icon: string;
  completed: boolean;
  locked: boolean;
  stars: number;
}

export function LanguageLearningNew() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [streak, setStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(350);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const languages: Language[] = [
    {
      id: "english",
      name: "English",
      flag: "🇬🇧",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "russian",
      name: "Русский",
      flag: "🇷🇺",
      color: "from-red-400 to-pink-400",
    },
    {
      id: "german",
      name: "Deutsch",
      flag: "🇩🇪",
      color: "from-yellow-400 to-amber-400",
    },
  ];

  // Get units based on selected language
  const getUnitsForLanguage = () => {
    // Create base units structure
    let baseUnits: Unit[] = [];
    
    switch (selectedLanguage) {
      case "english":
        baseUnits = [
          {
            id: "unit1",
            title: "Salomlashish",
            description: "Asosiy salomlashish so'zlari",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "1", title: "Hello, Hi!", type: "lesson", icon: "👋", completed: false, locked: false, stars: 0 },
              { id: "2", title: "Good morning", type: "lesson", icon: "🌅", completed: false, locked: false, stars: 0 },
              { id: "3", title: "Mashq", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "4", title: "How are you?", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "5", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit2",
            title: "Oila",
            description: "Oila a'zolari haqida",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "6", title: "Mom & Dad", type: "lesson", icon: "👨‍👩‍👧", completed: false, locked: false, stars: 0 },
              { id: "7", title: "Brother & Sister", type: "lesson", icon: "👧👦", completed: false, locked: false, stars: 0 },
              { id: "8", title: "Mashq", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "9", title: "Oila hikoyasi", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "10", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit3",
            title: "Hayvonlar",
            description: "Uy va yovvoyi hayvonlar",
            completed: 0,
            total: 6,
            locked: false,
            lessons: [
              { id: "11", title: "Uy hayvonlari", type: "lesson", icon: "🐶", completed: false, locked: false, stars: 0 },
              { id: "12", title: "Yovvoyi hayvonlar", type: "lesson", icon: "🦁", completed: false, locked: false, stars: 0 },
              { id: "13", title: "Qushlar", type: "lesson", icon: "🦅", completed: false, locked: false, stars: 0 },
              { id: "14", title: "Mashq", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "15", title: "Hayvonlar safari", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "16", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit4",
            title: "Ranglar",
            description: "Asosiy ranglar va kombinatsiyalar",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "17", title: "Asosiy ranglar", type: "lesson", icon: "🎨", completed: false, locked: false, stars: 0 },
              { id: "18", title: "Ko'proq ranglar", type: "lesson", icon: "🌈", completed: false, locked: false, stars: 0 },
              { id: "19", title: "Mashq", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "20", title: "Rangli dunyo", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "21", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit5",
            title: "Raqamlar 1-10",
            description: "Birinchi 10 ta raqam",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "22", title: "1-5 raqamlar", type: "lesson", icon: "1️⃣", completed: false, locked: false, stars: 0 },
              { id: "23", title: "6-10 raqamlar", type: "lesson", icon: "🔟", completed: false, locked: false, stars: 0 },
              { id: "24", title: "Mashq", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "25", title: "Sanoq hikoyasi", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "26", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
        ];
        break;
      case "russian":
        baseUnits = [
          {
            id: "unit1",
            title: "Приветствия",
            description: "Основные приветствия",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "1", title: "Привет, Здравствуй!", type: "lesson", icon: "👋", completed: false, locked: false, stars: 0 },
              { id: "2", title: "Доброе утро", type: "lesson", icon: "🌅", completed: false, locked: false, stars: 0 },
              { id: "3", title: "Спасибо, Пожалуйста", type: "lesson", icon: "🙏", completed: false, locked: false, stars: 0 },
              { id: "4", title: "Как дела?", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "5", title: "Тест", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit2",
            title: "Семья",
            description: "Члены семьи",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "6", title: "Мама и Папа", type: "lesson", icon: "👨‍👩‍👧", completed: false, locked: false, stars: 0 },
              { id: "7", title: "Брат и Сестра", type: "lesson", icon: "👧👦", completed: false, locked: false, stars: 0 },
              { id: "8", title: "Практика", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "9", title: "Семейная история", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "10", title: "Тест", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
        ];
        break;
      case "german":
        baseUnits = [
          {
            id: "unit1",
            title: "Begrüßungen",
            description: "Grundlegende Begrüßungen",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "1", title: "Hallo, Guten Tag!", type: "lesson", icon: "👋", completed: false, locked: false, stars: 0 },
              { id: "2", title: "Guten Morgen", type: "lesson", icon: "🌅", completed: false, locked: false, stars: 0 },
              { id: "3", title: "Danke, Bitte", type: "lesson", icon: "🙏", completed: false, locked: false, stars: 0 },
              { id: "4", title: "Wie geht's?", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "5", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
          {
            id: "unit2",
            title: "Familie",
            description: "Familienmitglieder",
            completed: 0,
            total: 5,
            locked: false,
            lessons: [
              { id: "6", title: "Mutter und Vater", type: "lesson", icon: "👨‍👩‍👧", completed: false, locked: false, stars: 0 },
              { id: "7", title: "Bruder und Schwester", type: "lesson", icon: "👧👦", completed: false, locked: false, stars: 0 },
              { id: "8", title: "Übung", type: "practice", icon: "📝", completed: false, locked: false, stars: 0 },
              { id: "9", title: "Familiengeschichte", type: "story", icon: "📖", completed: false, locked: false, stars: 0 },
              { id: "10", title: "Test", type: "test", icon: "🏆", completed: false, locked: false, stars: 0 },
            ],
          },
        ];
        break;
    }
    
    // Update lessons based on completed lessons from localStorage
    return baseUnits.map((unit, unitIndex) => {
      let completedCount = 0;
      
      const updatedLessons = unit.lessons.map((lesson, lessonIndex) => {
        const lessonKey = `${selectedLanguage}_${unit.id}_${lesson.id}`;
        const isCompleted = completedLessons.includes(lessonKey);
        
        // Check if previous lesson is completed (for locking logic)
        const isPreviousCompleted = lessonIndex === 0 || completedLessons.includes(
          `${selectedLanguage}_${unit.id}_${unit.lessons[lessonIndex - 1].id}`
        );
        
        // Check if previous unit is completed (for unit locking)
        const isPreviousUnitCompleted = unitIndex === 0 || 
          baseUnits[unitIndex - 1].lessons.every(l => 
            completedLessons.includes(`${selectedLanguage}_${baseUnits[unitIndex - 1].id}_${l.id}`)
          );
        
        if (isCompleted) {
          completedCount++;
        }
        
        return {
          ...lesson,
          completed: isCompleted,
          locked: unitIndex === 0 ? !isPreviousCompleted : (!isPreviousUnitCompleted || !isPreviousCompleted),
          stars: isCompleted ? 3 : 0,
        };
      });
      
      return {
        ...unit,
        lessons: updatedLessons,
        completed: completedCount,
        locked: unitIndex > 0 && baseUnits[unitIndex - 1].lessons.some((l, i) => 
          !completedLessons.includes(`${selectedLanguage}_${baseUnits[unitIndex - 1].id}_${l.id}`)
        ),
      };
    });
  };

  // Get language info
  const getLanguageInfo = () => {
    return languages.find(lang => lang.id === selectedLanguage) || languages[0];
  };

  const currentUnits = getUnitsForLanguage();
  const currentLanguage = getLanguageInfo();

  const getLessonColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'from-green-400 to-emerald-400';
      case 'story': return 'from-purple-400 to-pink-400';
      case 'practice': return 'from-blue-400 to-cyan-400';
      case 'test': return 'from-yellow-400 to-amber-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  useEffect(() => {
    const progress = authService.getProgress();
    setStreak(progress.streakDays || 0);
    setTotalXP(progress.totalXP || 0);
    
    // Get completed lessons as array of IDs
    const completedLessonsArray = authService.getCompletedLessons();
    setCompletedLessons(completedLessonsArray);
  }, []);

  // Refresh progress when navigating back to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const progress = authService.getProgress();
        setStreak(progress.streakDays || 0);
        setTotalXP(progress.totalXP || 0);
        
        // Get completed lessons as array of IDs
        const completedLessonsArray = authService.getCompletedLessons();
        setCompletedLessons(completedLessonsArray);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleLessonClick = (lesson: Lesson, unitId: string) => {
    if (lesson.locked) {
      audioService.playError();
      return;
    }
    
    audioService.playClick();
    // Navigate to lesson page with correct parameters
    navigate(`/language-lesson/${unitId}/${lesson.id}?lang=${selectedLanguage}&unit=${unitId}&lesson=${lesson.id}`);
  };

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
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
              <span>🌍</span>
              Tillar
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
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <CharacterMascot mood="celebrating" size="md" />
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
                Qaysi tilni o'rganmoqchisiz? 🚀
              </h2>
              <p className="text-gray-600">
                Har bir til ajoyib sarguzashtni boshlaydi!
              </p>
            </div>
          </motion.div>

          {/* Language Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  audioService.playClick();
                  setSelectedLanguage(lang.id);
                }}
                className={`
                  bg-gradient-to-br ${lang.color}
                  rounded-[3rem] p-8 shadow-2xl
                  transform transition-all
                `}
              >
                <div className="text-8xl mb-4">{lang.flag}</div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {lang.name}
                </h2>
                <div className="text-white/90 text-lg">
                  Noldan boshlang
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <KidsNavBar />
      </div>
    );
  }

  // Learning path view
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-24">
      {/* Header with stats */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                audioService.playClick();
                setSelectedLanguage(null);
              }}
              className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span>{currentLanguage.flag}</span>
              {currentLanguage.name}
            </h1>

            <div className="w-14" />
          </div>

          {/* Stats bar */}
          <div className="flex gap-4 justify-center">
            <div className="bg-orange-100 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-bold text-orange-700">{streak}</span>
            </div>
            <div className="bg-yellow-100 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <span className="font-bold text-yellow-700">{totalXP} XP</span>
            </div>
            <div className="bg-purple-100 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span className="font-bold text-purple-700">5/25</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Learning Path */}
        <div className="space-y-12 relative">
          {/* Connecting path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 via-blue-200 to-purple-200 -translate-x-1/2 hidden md:block" />

          {currentUnits.map((unit, unitIndex) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: unitIndex * 0.1 }}
              className="relative"
            >
              {/* Unit Header */}
              <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">📚</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Unit {unitIndex + 1}: {unit.title}
                      </h3>
                      <p className="text-sm text-gray-600">{unit.description}</p>
                    </div>
                  </div>
                  {unit.locked && (
                    <Lock className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{unit.completed} / {unit.total} bajarildi</span>
                    <span>{Math.round((unit.completed / unit.total) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all"
                      style={{ width: `${(unit.completed / unit.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lessons Path */}
              <div className="space-y-4 relative">
                {unit.lessons.map((lesson, lessonIndex) => (
                  <motion.div
                    key={lesson.id}
                    className={`
                      ${lessonIndex % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'}
                      max-w-md relative
                    `}
                    initial={{ opacity: 0, x: lessonIndex % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: unitIndex * 0.1 + lessonIndex * 0.05 }}
                  >
                    <motion.button
                      whileHover={!lesson.locked ? { scale: 1.05 } : {}}
                      whileTap={!lesson.locked ? { scale: 0.95 } : {}}
                      disabled={lesson.locked}
                      onClick={() => {
                        if (!lesson.locked) {
                          audioService.playClick();
                          handleLessonClick(lesson, unit.id);
                        }
                      }}
                      className={`
                        w-full bg-gradient-to-br ${getLessonColor(lesson.type)}
                        rounded-3xl p-6 shadow-lg
                        transition-all relative
                        ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                        ${lesson.completed ? 'ring-4 ring-yellow-300' : ''}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{lesson.icon}</div>
                        <div className="flex-1 text-left">
                          <div className="text-xs text-white/80 uppercase font-semibold mb-1">
                            {lesson.type === 'lesson' ? 'Dars' : 
                             lesson.type === 'story' ? 'Hikoya' :
                             lesson.type === 'practice' ? 'Mashq' : 'Test'}
                          </div>
                          <h4 className="text-lg font-bold text-white">
                            {lesson.title}
                          </h4>
                          {lesson.completed && (
                            <div className="flex gap-1 mt-2">
                              {[...Array(3)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-4 w-4 ${i < lesson.stars ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {lesson.locked && (
                          <Lock className="h-5 w-5 text-white/70" />
                        )}
                      </div>
                    </motion.button>

                    {/* Connector to next lesson */}
                    {lessonIndex < unit.lessons.length - 1 && (
                      <div className="h-4 w-1 bg-gray-300 mx-auto my-2 rounded-full" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}