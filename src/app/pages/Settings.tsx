import { motion } from "motion/react";
import { ChevronLeft, Volume2, Bell, Eye, Lock, Info } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <motion.button
      onClick={onChange}
      className={`
        relative w-16 h-8 rounded-full transition-colors
        ${enabled ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-gray-300"}
      `}
    >
      <motion.div
        animate={{ x: enabled ? 32 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
      />
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/parent")}
            className="p-3 bg-gray-100 rounded-2xl"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">
            Sozlamalar
          </h1>

          <div className="w-12" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Settings Groups */}
        
        {/* Sound & Visual */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎨</span>
            Ovoz va ko'rinish
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Ovoz</p>
                  <p className="text-sm text-gray-600">Tovushlar va musiqa</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={soundEnabled} 
                onChange={() => setSoundEnabled(!soundEnabled)} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Animatsiyalar</p>
                  <p className="text-sm text-gray-600">Harakatli effektlar</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={animationsEnabled} 
                onChange={() => setAnimationsEnabled(!animationsEnabled)} 
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🔔</span>
            Bildirishnomalar
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Eslatmalar</p>
                <p className="text-sm text-gray-600">Kunlik eslatmalar</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={notificationsEnabled} 
              onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
            />
          </div>
        </div>

        {/* Child Profile */}
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-6 shadow-lg mb-6 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>👶</span>
            Foydalanuvchi
          </h3>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
              👦
            </div>
            <div>
              <p className="text-2xl font-bold">Ali</p>
              <p className="text-purple-100">5 yoshda</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-semibold"
          >
            Profilni o'zgartirish
          </motion.button>
        </div>

        {/* Safety */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🔒</span>
            Xavfsizlik
          </h3>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-gray-600" />
                <span className="font-semibold text-gray-800">Ota-ona paroli</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-gray-600" />
                <span className="font-semibold text-gray-800">Maxfiylik</span>
              </div>
              <ChevronLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </motion.button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center text-sm text-gray-500">
          <p>EduSelf Kids v1.0.0</p>
          <p className="mt-1">© 2025 - Bolalar uchun xavfsiz o'rganish</p>
        </div>
      </div>
    </div>
  );
}
