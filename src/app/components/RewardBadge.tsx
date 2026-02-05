import { motion } from "motion/react";

interface RewardBadgeProps {
  icon: string;
  title: string;
  earned?: boolean;
  onClick?: () => void;
}

export function RewardBadge({ icon, title, earned = false, onClick }: RewardBadgeProps) {
  return (
    <motion.button
      whileHover={{ scale: earned ? 1.1 : 1 }}
      whileTap={{ scale: earned ? 0.95 : 1 }}
      onClick={earned ? onClick : undefined}
      className={`
        relative flex flex-col items-center gap-2 p-4 rounded-3xl
        ${earned ? "cursor-pointer" : "cursor-default"}
        transition-all
      `}
    >
      {/* Badge Circle */}
      <div
        className={`
          w-20 h-20 rounded-full flex items-center justify-center text-4xl
          ${
            earned
              ? "bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-yellow-400/50"
              : "bg-gray-200 opacity-40"
          }
          relative
        `}
      >
        {icon}
        
        {/* Sparkles for earned badges */}
        {earned && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute -top-1 -right-1 text-yellow-300 text-xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute -bottom-1 -left-1 text-orange-300 text-lg"
            >
              ⭐
            </motion.div>
          </>
        )}
      </div>

      {/* Title */}
      <p className={`text-xs font-bold text-center ${earned ? "text-gray-800" : "text-gray-400"}`}>
        {title}
      </p>

      {/* Lock icon for unearned */}
      {!earned && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🔒</span>
        </div>
      )}
    </motion.button>
  );
}
