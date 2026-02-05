import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LargeButton } from "@/app/components/LargeButton";
import { CharacterMascot } from "@/app/components/CharacterMascot";
import { authService } from "@/services/authService";
import { audioService } from "@/services/audioService";

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(5);
  const [selectedAvatar, setSelectedAvatar] = useState('👦');

  const avatars = ['👦', '👧', '🧒', '👶', '🐻', '🐱', '🐶', '🦊', '🐼', '🦁'];

  const handleComplete = () => {
    if (name && age) {
      authService.register(name, age, selectedAvatar);
      audioService.playReward();
      navigate('/home');
    }
  };

  // Step 1: Welcome
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center"
        >
          <CharacterMascot mood="excited" size="lg" animate />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mt-8 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Xush kelibsiz! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-700 mb-8"
          >
            Keling, tanishamiz!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full max-w-sm"
          >
            <LargeButton
              color="purple"
              icon="🚀"
              onClick={() => {
                audioService.playClick();
                setStep(1);
              }}
            >
              Boshlaymiz!
            </LargeButton>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Step 2: Name input
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-green-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4 mb-8"
          >
            <CharacterMascot mood="happy" size="sm" />
            <div className="bg-white rounded-3xl p-4 shadow-lg flex-1">
              <p className="text-xl font-semibold text-gray-800">
                Ismingiz nima? 😊
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingizni kiriting..."
              className="w-full text-3xl font-bold text-center p-4 rounded-2xl border-4 border-purple-200 focus:border-purple-400 outline-none bg-purple-50"
              autoFocus
            />
          </motion.div>

          <div className="space-y-4">
            <LargeButton
              color="green"
              icon="✅"
              onClick={() => {
                if (name) {
                  audioService.playSuccess();
                  setStep(2);
                }
              }}
              disabled={!name}
            >
              Keyingisi
            </LargeButton>
            
            <button
              onClick={() => setStep(0)}
              className="w-full text-gray-600 font-semibold py-3"
            >
              ← Orqaga
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Age selection
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4 mb-8"
          >
            <CharacterMascot mood="thinking" size="sm" />
            <div className="bg-white rounded-3xl p-4 shadow-lg flex-1">
              <p className="text-xl font-semibold text-gray-800">
                Necha yoshdasiz, {name}? 🎂
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
          >
            <div className="text-center mb-6">
              <div className="text-8xl font-bold text-purple-600 mb-4">
                {age}
              </div>
              <p className="text-2xl text-gray-700">yoshda</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {[3, 4, 5, 6, 7, 8, 9, 10].map((ageOption) => (
                <motion.button
                  key={ageOption}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    audioService.playClick();
                    setAge(ageOption);
                  }}
                  className={`
                    py-4 rounded-2xl font-bold text-2xl transition-all
                    ${age === ageOption
                      ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {ageOption}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <LargeButton
              color="green"
              icon="✅"
              onClick={() => {
                audioService.playSuccess();
                setStep(3);
              }}
            >
              Keyingisi
            </LargeButton>
            
            <button
              onClick={() => setStep(1)}
              className="w-full text-gray-600 font-semibold py-3"
            >
              ← Orqaga
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Avatar selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <CharacterMascot mood="excited" size="sm" />
          <div className="bg-white rounded-3xl p-4 shadow-lg flex-1">
            <p className="text-xl font-semibold text-gray-800">
              Avatarni tanlang! 🎨
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
        >
          {/* Selected Avatar Preview */}
          <div className="text-center mb-6">
            <motion.div
              key={selectedAvatar}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-9xl mb-4"
            >
              {selectedAvatar}
            </motion.div>
            <p className="text-2xl font-bold text-gray-800">{name}</p>
          </div>

          {/* Avatar Grid */}
          <div className="grid grid-cols-5 gap-3">
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
                  py-4 rounded-2xl text-4xl transition-all
                  ${selectedAvatar === avatar
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 scale-110 shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          <LargeButton
            color="purple"
            icon="🎉"
            onClick={handleComplete}
          >
            Tayyor!
          </LargeButton>
          
          <button
            onClick={() => setStep(2)}
            className="w-full text-gray-600 font-semibold py-3"
          >
            ← Orqaga
          </button>
        </div>
      </div>
    </div>
  );
}
