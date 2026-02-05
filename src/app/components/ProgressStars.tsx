import { motion } from "motion/react";

interface ProgressStarsProps {
  earned: number;
  total: number;
  size?: "sm" | "md" | "lg";
}

export function ProgressStars({ earned, total, size = "md" }: ProgressStarsProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className={sizeClasses[size]}
        >
          {index < earned ? (
            <span className="inline-block animate-pulse-grow">⭐</span>
          ) : (
            <span className="opacity-30">⭐</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
