import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "EduSelf Kids - Bolalar uchun ta'lim ilovasi";
  }, []);
  
  return <RouterProvider router={router} />;
}