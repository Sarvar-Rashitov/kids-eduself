import { createBrowserRouter, Navigate } from "react-router";
import { Welcome } from "@/app/pages/Welcome";
import { Onboarding } from "@/app/pages/Onboarding";
import { Home } from "@/app/pages/Home";
import { AlphabetLearning } from "@/app/pages/AlphabetLearning";
import { AlphabetLearningUpdated } from "@/app/pages/AlphabetLearningUpdated";
import { AlphabetSelection } from "@/app/pages/AlphabetSelection";
import { NumbersLearning } from "@/app/pages/NumbersLearning";
import { NumbersLearningUpdated } from "@/app/pages/NumbersLearningUpdated";
import { NumbersSelection } from "@/app/pages/NumbersSelection";
import { SpeakingPractice } from "@/app/pages/SpeakingPractice";
import { SpeakingPracticeUpdated } from "@/app/pages/SpeakingPracticeUpdated";
import { SpeakingSelection } from "@/app/pages/SpeakingSelection";
import { MathLearning } from "@/app/pages/MathLearning";
import { MathLearningNew } from "@/app/pages/MathLearningNew";
import { MathLesson } from "@/app/pages/MathLesson";
import { ScienceLearning } from "@/app/pages/ScienceLearning";
import { PhysicsLearning } from "@/app/pages/PhysicsLearning";
import { LanguageLearning } from "@/app/pages/LanguageLearning";
import { LanguageLearningNew } from "@/app/pages/LanguageLearningNew";
import { LanguageLesson } from "@/app/pages/LanguageLesson";
import { ProgressRewards } from "@/app/pages/ProgressRewards";
import { ParentSection } from "@/app/pages/ParentSection";
import { Settings } from "@/app/pages/Settings";
import { Games } from "@/app/pages/Games";
import { GamesWithLevels } from "@/app/pages/GamesWithLevels";
import { Videos } from "@/app/pages/Videos";
import { GameLevel } from "@/app/pages/GameLevel";
import { PhysicsLesson } from "@/app/pages/PhysicsLesson";

// Error Boundary Component
function ErrorBoundary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Nimadir xato ketdi</h2>
        <p className="text-gray-600 mb-6">Kechirasiz, sahifa topilmadi</p>
        <a
          href="/home"
          className="bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold py-3 px-8 rounded-2xl hover:scale-105 transition-transform inline-block"
        >
          Bosh sahifaga qaytish
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/alphabet",
    element: <AlphabetSelection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/alphabet/:language",
    element: <AlphabetLearningUpdated />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/numbers",
    element: <NumbersSelection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/numbers/:language",
    element: <NumbersLearningUpdated />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/speaking",
    element: <SpeakingSelection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/speaking/:language",
    element: <SpeakingPracticeUpdated />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/math",
    element: <MathLearning />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/math-new",
    element: <MathLearningNew />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/math-lesson/:unitId/:lessonId",
    element: <MathLesson />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/science",
    element: <PhysicsLearning />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/language",
    element: <LanguageLearningNew />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/languages",
    element: <LanguageLearningNew />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/language-lesson/:unitId/:lessonId",
    element: <LanguageLesson />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/videos",
    element: <Videos />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/progress",
    element: <ProgressRewards />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/parent",
    element: <ParentSection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/games",
    element: <GamesWithLevels />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/game-level",
    element: <GameLevel />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/physics-lesson",
    element: <PhysicsLesson />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
]);