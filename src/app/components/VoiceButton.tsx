import { motion } from "motion/react";
import { Mic } from "lucide-react";
import { useState } from "react";

interface VoiceButtonProps {
  onStart?: () => void;
  onStop?: () => void;
  isListening?: boolean;
  onClick?: () => void; // Add onClick support
}

export function VoiceButton({ onStart, onStop, isListening = false, onClick }: VoiceButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    if (onClick) {
      onClick();
    } else {
      onStart?.();
    }
  };

  const handleRelease = () => {
    setIsPressed(false);
    if (!onClick) {
      onStop?.();
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Instruction text */}
      <motion.p
        animate={{ scale: isListening ? [1, 1.05, 1] : 1 }}
        transition={{ repeat: isListening ? Infinity : 0, duration: 1 }}
        className="text-lg font-bold text-gray-700"
      >
        {isListening ? "🎤 Eshitmoqdaman..." : "👆 Bosib gapiring"}
      </motion.p>

      {/* Microphone Button */}
      <motion.button
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-32 h-32 rounded-full
          bg-gradient-to-br from-red-400 to-pink-500
          shadow-2xl flex items-center justify-center
          transition-all duration-200
          ${isListening ? "shadow-red-400/50 animate-pulse-grow" : ""}
        `}
      >
        {/* Outer glow when listening */}
        {isListening && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-red-400/30"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="absolute inset-0 rounded-full bg-pink-400/30"
            />
          </>
        )}

        {/* Icon */}
        <Mic className="w-16 h-16 text-white relative z-10" />
      </motion.button>

      {/* Visual feedback waves */}
      {isListening && (
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
              className="w-2 h-12 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}