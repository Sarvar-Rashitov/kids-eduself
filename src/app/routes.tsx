import { createBrowserRouter } from "react-router";
import { Welcome } from "@/app/pages/Welcome";
import { Onboarding } from "@/app/pages/Onboarding";
import { Home } from "@/app/pages/Home";
import { AlphabetLearning } from "@/app/pages/AlphabetLearning";
import { NumbersLearning } from "@/app/pages/NumbersLearning";
import { SpeakingPractice } from "@/app/pages/SpeakingPractice";
import { MathLearning } from "@/app/pages/MathLearning";
import { ScienceLearning } from "@/app/pages/ScienceLearning";
import { LanguageLearning } from "@/app/pages/LanguageLearning";
import { ProgressRewards } from "@/app/pages/ProgressRewards";
import { ParentSection } from "@/app/pages/ParentSection";
import { Settings } from "@/app/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/alphabet",
    element: <AlphabetLearning />,
  },
  {
    path: "/numbers",
    element: <NumbersLearning />,
  },
  {
    path: "/speaking",
    element: <SpeakingPractice />,
  },
  {
    path: "/math",
    element: <MathLearning />,
  },
  {
    path: "/science",
    element: <ScienceLearning />,
  },
  {
    path: "/language",
    element: <LanguageLearning />,
  },
  {
    path: "/progress",
    element: <ProgressRewards />,
  },
  {
    path: "/parent",
    element: <ParentSection />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);
