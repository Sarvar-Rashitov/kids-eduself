interface CharacterMascotProps {
  mood?: "happy" | "excited" | "thinking" | "celebrating";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function CharacterMascot({ mood = "happy", size = "md", animate = true }: CharacterMascotProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  const expressions = {
    happy: { eyes: "😊", emoji: "🎨" },
    excited: { eyes: "✨", emoji: "🎉" },
    thinking: { eyes: "🤔", emoji: "💭" },
    celebrating: { eyes: "🎊", emoji: "🏆" },
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${animate ? "animate-bounce-soft" : ""}`}>
      {/* Character Base */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 shadow-lg">
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm" />
      </div>
      
      {/* Face */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl transform scale-125">
          {expressions[mood].emoji}
        </div>
      </div>
      
      {/* Sparkles */}
      {animate && (
        <>
          <div className="absolute -top-1 -right-1 text-yellow-400 text-xl animate-pulse">✨</div>
          <div className="absolute -bottom-1 -left-1 text-pink-400 text-lg animate-pulse" style={{ animationDelay: "0.5s" }}>⭐</div>
        </>
      )}
    </div>
  );
}
