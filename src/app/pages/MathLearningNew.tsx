import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, Lock, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router";
import { audioService } from "@/services/audioService";
import { authService } from "@/services/authService";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { KidsNavBar } from "@/app/components/KidsNavBar";

interface MathUnit {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  lessons: MathLesson[];
  requiredXP: number;
}

interface MathLesson {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'challenge' | 'test';
  icon: string;
  content: {
    question: string;
    answer: number;
    options?: number[];
    explanation: string;
  }[];
}

export function MathLearningNew() {
  const navigate = useNavigate();
  const [userXP, setUserXP] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const progress = authService.getProgress();
    setUserXP(progress.totalXP);
    setCompletedLessons(Object.keys(progress.completedLessons));
  }, []);

  const mathUnits: MathUnit[] = [
    {
      id: "counting",
      title: "Sanoq",
      description: "1 dan 10 gacha sanashni o'rganing",
      emoji: "🔢",
      color: "from-blue-400 to-cyan-400",
      requiredXP: 0, // Always unlocked
      lessons: [
        {
          id: "math_counting_1",
          title: "1-5 raqamlar",
          type: "lesson",
          icon: "1️⃣",
          content: [
            { question: "1 + 1 = ?", answer: 2, options: [1, 2, 3, 4], explanation: "1 va yana 1 bo'lsa 2 bo'ladi" },
            { question: "2 + 1 = ?", answer: 3, options: [2, 3, 4, 5], explanation: "2 ga 1 qo'shsak 3 bo'ladi" },
            { question: "1 + 2 = ?", answer: 3, options: [2, 3, 4, 5], explanation: "1 ga 2 qo'shsak 3 bo'ladi" },
            { question: "2 + 2 = ?", answer: 4, options: [3, 4, 5, 6], explanation: "2 va 2 ni qo'shsak 4 bo'ladi" },
            { question: "3 + 2 = ?", answer: 5, options: [4, 5, 6, 7], explanation: "3 ga 2 qo'shsak 5 bo'ladi" },
          ],
        },
        {
          id: "math_counting_2",
          title: "6-10 raqamlar",
          type: "lesson",
          icon: "🔟",
          content: [
            { question: "5 + 1 = ?", answer: 6, options: [5, 6, 7, 8], explanation: "5 ga 1 qo'shsak 6 bo'ladi" },
            { question: "5 + 2 = ?", answer: 7, options: [6, 7, 8, 9], explanation: "5 ga 2 qo'shsak 7 bo'ladi" },
            { question: "5 + 3 = ?", answer: 8, options: [7, 8, 9, 10], explanation: "5 ga 3 qo'shsak 8 bo'ladi" },
            { question: "5 + 4 = ?", answer: 9, options: [8, 9, 10, 11], explanation: "5 ga 4 qo'shsak 9 bo'ladi" },
            { question: "5 + 5 = ?", answer: 10, options: [9, 10, 11, 12], explanation: "5 va 5 ni qo'shsak 10 bo'ladi" },
          ],
        },
      ],
    },
    {
      id: "addition1",
      title: "Qo'shish 1-5",
      description: "Kichik sonlarni qo'shish",
      emoji: "➕",
      color: "from-green-400 to-emerald-400",
      requiredXP: 100,
      lessons: [
        {
          id: "math_add1_1",
          title: "1+1, 1+2",
          type: "lesson",
          icon: "🍎",
          content: [
            { question: "1 + 1 = ?", answer: 2, options: [1, 2, 3, 4], explanation: "Bitta olma va yana bitta olma = 2 ta olma" },
            { question: "1 + 2 = ?", answer: 3, options: [2, 3, 4, 5], explanation: "Bitta va ikkita = 3 ta" },
            { question: "2 + 1 = ?", answer: 3, options: [2, 3, 4, 5], explanation: "Ikkita va bitta = 3 ta" },
          ],
        },
      ],
    },
    {
      id: "subtraction1",
      title: "Ayirish 1-5",
      description: "Kichik sonlarni ayirish",
      emoji: "➖",
      color: "from-red-400 to-pink-400",
      requiredXP: 200,
      lessons: [
        {
          id: "math_sub1_1",
          title: "3-1, 3-2",
          type: "lesson",
          icon: "🍊",
          content: [
            { question: "3 - 1 = ?", answer: 2, options: [1, 2, 3, 4], explanation: "3 tadan 1 tasini olsak 2 ta qoladi" },
            { question: "3 - 2 = ?", answer: 1, options: [0, 1, 2, 3], explanation: "3 tadan 2 tasini olsak 1 ta qoladi" },
            { question: "4 - 2 = ?", answer: 2, options: [1, 2, 3, 4], explanation: "4 tadan 2 tasini olsak 2 ta qoladi" },
          ],
        },
      ],
    },
    {
      id: "addition2",
      title: "Qo'shish 5-10",
      description: "Katta sonlarni qo'shish",
      emoji: "➕➕",
      color: "from-purple-400 to-pink-400",
      requiredXP: 300,
      lessons: [
        {
          id: "math_add2_1",
          title: "5+5, 6+4",
          type: "lesson",
          icon: "🎈",
          content: [
            { question: "5 + 5 = ?", answer: 10, options: [8, 9, 10, 11], explanation: "5 va 5 ni qo'shsak 10 bo'ladi" },
            { question: "6 + 4 = ?", answer: 10, options: [8, 9, 10, 11], explanation: "6 va 4 ni qo'shsak 10 bo'ladi" },
            { question: "7 + 3 = ?", answer: 10, options: [8, 9, 10, 11], explanation: "7 va 3 ni qo'shsak 10 bo'ladi" },
          ],
        },
      ],
    },
    {
      id: "subtraction2",
      title: "Ayirish 5-10",
      description: "Katta sonlarni ayirish",
      emoji: "➖➖",
      color: "from-orange-400 to-red-400",
      requiredXP: 400,
      lessons: [
        {
          id: "math_sub2_1",
          title: "10-5, 9-4",
          type: "lesson",
          icon: "🎨",
          content: [
            { question: "10 - 5 = ?", answer: 5, options: [4, 5, 6, 7], explanation: "10 dan 5 ni ayirsak 5 qoladi" },
            { question: "9 - 4 = ?", answer: 5, options: [4, 5, 6, 7], explanation: "9 dan 4 ni ayirsak 5 qoladi" },
            { question: "8 - 3 = ?", answer: 5, options: [4, 5, 6, 7], explanation: "8 dan 3 ni ayirsak 5 qoladi" },
          ],
        },
      ],
    },
    {
      id: "shapes",
      title: "Shakllar",
      description: "Geometrik shakllarni tanib oling",
      emoji: "🔷",
      color: "from-indigo-400 to-purple-400",
      requiredXP: 500,
      lessons: [
        {
          id: "math_shapes_1",
          title: "Doira va kvadrat",
          type: "lesson",
          icon: "🔵",
          content: [
            { question: "Qaysi shakl doira? 🔵 yoki 🟦", answer: 1, options: [1, 2], explanation: "Doira dumaloq shakl" },
            { question: "Kvadratning nechta burchagi bor?", answer: 4, options: [3, 4, 5, 6], explanation: "Kvadratning 4 ta burchagi bor" },
          ],
        },
      ],
    },
    {
      id: "comparison",
      title: "Taqqoslash",
      description: "Katta, kichik, teng",
      emoji: "⚖️",
      color: "from-yellow-400 to-amber-400",
      requiredXP: 600,
      lessons: [
        {
          id: "math_compare_1",
          title: "Katta va kichik",
          type: "lesson",
          icon: "🐘",
          content: [
            { question: "5 yoki 3, qaysi katta?", answer: 5, options: [3, 5], explanation: "5 son 3 dan katta" },
            { question: "7 yoki 9, qaysi kichik?", answer: 7, options: [7, 9], explanation: "7 son 9 dan kichik" },
          ],
        },
      ],
    },
  ];

  const handleLessonClick = (lesson: MathLesson, unitId: string, lessonIndex: number, unit: MathUnit) => {
    // Check if previous lesson is completed (sequential unlocking within a unit)
    if (lessonIndex > 0) {
      const previousLesson = unit.lessons[lessonIndex - 1];
      const isPreviousCompleted = completedLessons.includes(previousLesson.id);
      
      if (!isPreviousCompleted) {
        audioService.playError();
        return;
      }
    }
    
    audioService.playClick();
    
    // Navigate to lesson with content
    navigate(`/math-lesson/${unitId}/${lesson.id}`, {
      state: { lesson },
    });
  };

  const handleModuleClick = (unit: MathUnit) => {
    const isUnlocked = userXP >= unit.requiredXP;
    
    if (!isUnlocked) {
      audioService.playError();
      return;
    }
    
    audioService.playClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
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
              <span>➕</span>
              Matematika
            </h1>

            <div className="w-14" />
          </div>

          {/* Stats */}
          <div className="flex gap-4 justify-center">
            <div className="bg-blue-100 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-500" fill="currentColor" />
              <span className="font-bold text-blue-700">{userXP} XP</span>
            </div>
            <div className="bg-purple-100 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <span className="font-bold text-purple-700">{completedLessons.filter(l => l.startsWith('math_')).length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Character */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-8 flex items-center gap-4"
        >
          <CharacterMascot mood="thinking" size="sm" />
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Matematika sarguzashtingizni boshlang! 🎯
            </h2>
            <p className="text-gray-600">
              Har bir darsni o'tab, yangi bilimlar oling
            </p>
          </div>
        </motion.div>

        {/* Learning Path - Roadmap Style */}
        <div className="space-y-12 relative">
          {/* Connecting path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 -translate-x-1/2 hidden md:block" />

          {mathUnits.map((unit, unitIndex) => {
            const isUnlocked = userXP >= unit.requiredXP;
            const completedCount = unit.lessons.filter(lesson => 
              completedLessons.includes(lesson.id)
            ).length;

            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: unitIndex * 0.1 }}
                className="relative"
              >
                {/* Unit Header */}
                <div className={`bg-white rounded-3xl p-6 shadow-lg mb-6 relative z-10 ${!isUnlocked ? "opacity-60" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{unit.emoji}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {unit.title}
                        </h3>
                        <p className="text-sm text-gray-600">{unit.description}</p>
                      </div>
                    </div>
                    {!isUnlocked && (
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <Lock className="h-5 w-5 text-gray-400 inline mr-2" />
                        <span className="text-sm font-semibold text-gray-600">
                          {unit.requiredXP} XP
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{completedCount} / {unit.lessons.length} dars</span>
                      <span>{Math.round((completedCount / unit.lessons.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${unit.color} transition-all`}
                        style={{ width: `${(completedCount / unit.lessons.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Lessons Path */}
                {isUnlocked && (
                  <div className="space-y-4 relative">
                    {unit.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isPreviousCompleted = lessonIndex === 0 || completedLessons.includes(unit.lessons[lessonIndex - 1].id);
                      const isLocked = !isPreviousCompleted;
                      
                      return (
                        <motion.div
                          key={lesson.id}
                          className={`${lessonIndex % 2 === 0 ? 'md:ml-0' : 'md:ml-auto'} max-w-md relative`}
                          initial={{ opacity: 0, x: lessonIndex % 2 === 0 ? -30 : 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: unitIndex * 0.1 + lessonIndex * 0.05 }}
                        >
                          <motion.button
                            whileHover={!isLocked ? { scale: 1.05 } : {}}
                            whileTap={!isLocked ? { scale: 0.95 } : {}}
                            disabled={isLocked}
                            onClick={() => {
                              if (!isLocked) {
                                handleLessonClick(lesson, unit.id, lessonIndex, unit);
                              }
                            }}
                            className={`w-full bg-gradient-to-br ${unit.color} rounded-3xl p-6 shadow-lg transition-all relative ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'} ${isCompleted ? 'ring-4 ring-yellow-300' : ''}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-5xl">{lesson.icon}</div>
                              <div className="flex-1 text-left">
                                <div className="text-xs text-white/80 uppercase font-semibold mb-1">
                                  {lesson.type === 'lesson' ? 'Dars' : 
                                   lesson.type === 'practice' ? 'Mashq' :
                                   lesson.type === 'challenge' ? 'Sinov' : 'Test'}
                                </div>
                                <h4 className="text-lg font-bold text-white">
                                  {lesson.title}
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
                              {isLocked && (
                                <Lock className="h-5 w-5 text-white/70" />
                              )}
                            </div>
                          </motion.button>

                          {/* Connector to next lesson */}
                          {lessonIndex < unit.lessons.length - 1 && (
                            <div className="h-4 w-1 bg-gray-300 mx-auto my-2 rounded-full" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <KidsNavBar />
    </div>
  );
}