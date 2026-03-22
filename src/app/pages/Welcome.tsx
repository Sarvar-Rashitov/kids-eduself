import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { LargeButton } from "@/app/components/LargeButton";
import { useNavigate } from "react-router";
import { authService } from "@/services/authService";
import { audioService } from "@/services/audioService";

export function Welcome() {
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState("👦");
  const [isChecking, setIsChecking] = useState(true);

  const avatars = ["👦", "👧", "🧒", "👶", "🦸‍♂️", "🦸‍♀️", "🧙‍♂️", "🧙‍♀️"];

  useEffect(() => {
    // Check if user already exists
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      navigate("/home");
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🎈</div>
      </div>
    );
  }

  const handleStart = () => {
    audioService.playClick();
    const currentUser = authService.getCurrentUser();
    
    if (currentUser) {
      navigate("/home");
    } else {
      setShowRegistration(true);
    }
  };

  const handleRegister = () => {
    if (name.trim()) {
      audioService.playSuccess();
      authService.register(name, age, selectedAvatar);
      navigate("/home");
    }
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tanishamiz! 👋
          </h2>

          {/* Avatar Selection */}
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700 mb-3 text-center">
              Avatarni tanlang:
            </p>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((avatar) => (
                <motion.button
                  key={avatar}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    audioService.playClick();
                    setSelectedAvatar(avatar);
                  }}
                  className={`
                    text-6xl p-4 rounded-3xl transition-all
                    ${selectedAvatar === avatar 
                      ? "bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg scale-110" 
                      : "bg-gray-100 hover:bg-gray-200"
                    }
                  `}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Ismingiz:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ali, Zara, ..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 outline-none text-xl font-semibold text-gray-800"
              maxLength={20}
            />
          </div>

          {/* Age Slider */}
          <div className="mb-8">
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Yoshingiz: <span className="text-purple-600">{age}</span>
            </label>
            <input
              type="range"
              min="4"
              max="10"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>4</span>
              <span>10</span>
            </div>
          </div>

          {/* Register Button */}
          <LargeButton
            color="purple"
            icon="🚀"
            onClick={handleRegister}
            disabled={!name.trim()}
          >
            Boshlash!
          </LargeButton>

          <button
            onClick={() => setShowRegistration(false)}
            className="w-full mt-4 text-gray-500 underline"
          >
            Ortga
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-6">
      {/* Floating decorations */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-20 left-10 text-6xl"
      >
        🎈
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        className="absolute top-32 right-16 text-5xl"
      >
        ⭐
      </motion.div>
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
        className="absolute bottom-40 left-16 text-6xl"
      >
        🌈
      </motion.div>
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, delay: 1.5 }}
        className="absolute top-48 right-8 text-5xl"
      >
        🎨
      </motion.div>

      {/* Main Content */}
      <div className="max-w-md w-full text-center relative z-10">
        {/* Character */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="flex justify-center mb-8"
        >
          <CharacterMascot mood="excited" size="lg" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            EduSelf Kids
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Salom, kichkina do'stim! 👋
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Keling, birga o'rganamiz va o'ynamiz! 🎉
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <LargeButton
            color="purple"
            icon="🚀"
            onClick={handleStart}
          >
            Boshlaymiz!
          </LargeButton>
          
          <button
            onClick={() => {
              audioService.playClick();
              navigate("/parent");
            }}
            className="text-sm text-gray-500 underline mt-4"
          >
            Ota-ona uchun
          </button>
        </motion.div>

        {/* Fun elements */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="mt-12 text-4xl"
        >
          🌟 ✨ 🎊
        </motion.div>
      </div>
    </div>
  );
}