import { motion } from "motion/react";
import { Volume2 } from "lucide-react";

interface SoundButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function SoundButton({ onClick, disabled = false, size = "md" }: SoundButtonProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  };

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]} rounded-full
        bg-gradient-to-br from-blue-400 to-purple-400
        shadow-lg flex items-center justify-center
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"}
        relative
      `}
    >
      <Volume2 className={`${iconSizes[size]} text-white`} />
      
      {/* Sound waves animation */}
      {!disabled && (
        <>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-full bg-blue-400/30"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            className="absolute inset-0 rounded-full bg-purple-400/30"
          />
        </>
      )}
    </motion.button>
  );
}
