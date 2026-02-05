import { motion } from "motion/react";
import { Link } from "react-router";

interface SubjectCardProps {
  title: string;
  icon: string;
  color: string;
  path: string;
  gradient: string;
}

export function SubjectCard({ title, icon, color, path, gradient }: SubjectCardProps) {
  return (
    <Link to={path}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative overflow-hidden rounded-3xl p-6 h-40
          bg-gradient-to-br ${gradient}
          shadow-lg hover:shadow-xl transition-shadow
          cursor-pointer
        `}
      >
        {/* Background decoration */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-3">{icon}</div>
          <h3 className="text-white font-bold text-xl">{title}</h3>
        </div>
        
        {/* Sparkle decoration */}
        <div className="absolute top-4 right-4 text-white/40 text-2xl">✨</div>
      </motion.div>
    </Link>
  );
}
