import { motion } from "motion/react";

interface LargeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: "blue" | "purple" | "green" | "orange" | "pink" | "yellow";
  icon?: string;
  size?: "md" | "lg";
  disabled?: boolean;
}

export function LargeButton({ 
  children, 
  onClick, 
  color = "blue", 
  icon,
  size = "lg",
  disabled = false 
}: LargeButtonProps) {
  const colorClasses = {
    blue: "from-blue-400 to-cyan-400 shadow-blue-300",
    purple: "from-purple-400 to-pink-400 shadow-purple-300",
    green: "from-green-400 to-emerald-400 shadow-green-300",
    orange: "from-orange-400 to-yellow-400 shadow-orange-300",
    pink: "from-pink-400 to-rose-400 shadow-pink-300",
    yellow: "from-yellow-400 to-amber-400 shadow-yellow-300",
  };

  const sizeClasses = {
    md: "py-4 px-6 text-lg",
    lg: "py-6 px-8 text-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative w-full rounded-3xl bg-gradient-to-br ${colorClasses[color]}
        text-white font-bold shadow-lg ${sizeClasses[size]}
        flex items-center justify-center gap-3
        transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl active:shadow-md"}
      `}
    >
      {icon && <span className="text-3xl">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
