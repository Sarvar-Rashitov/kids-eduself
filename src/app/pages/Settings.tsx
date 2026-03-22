import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Volume2, Bell, Eye, Lock, Info, Download, Smartphone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { pwaService } from "@/services/pwaService";
import { NotificationPanel } from "@/app/components/PWAPrompt";

export function Settings() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const notifSettings = pwaService.getSettings();
  const notifPermission = pwaService.getNotificationPermission();

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

  const getNotifStatus = () => {
    if (notifPermission === 'denied') return { text: 'Bloklangan', color: 'text-red-500' };
    if (!notifSettings.enabled) return { text: "O'chirilgan", color: 'text-gray-400' };
    return { text: `Yoqilgan (${notifSettings.time})`, color: 'text-green-500' };
  };

  const notifStatus = getNotifStatus();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
        {/* Header */}
        <div className="bg-white rounded-b-[3rem] shadow-lg p-6 mb-6">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate("/parent")}
              className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800">
              Sozlamalar ⚙️
            </h1>

            <div className="w-12" />
          </div>
        </div>

        <div className="max-w-md mx-auto px-6">

          {/* PWA Install Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-lg mb-6 text-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg">Ilovani o'rnating</p>
                <p className="text-purple-100 text-sm">Android va iOS uchun</p>
              </div>
            </div>
            <p className="text-purple-100 text-sm mb-4">
              📱 Qurilmangizga o'rnating — internetSiz ham ishlaydi!
            </p>

            <div className="bg-white/20 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span>🤖</span>
                <p><strong>Android:</strong> Chrome → "Boshqa menyular" → "Uy ekraniga qo'shish"</p>
              </div>
              <div className="flex items-start gap-2">
                <span>🍎</span>
                <p><strong>iOS:</strong> Safari → 📤 Share → "Add to Home Screen"</p>
              </div>
            </div>
          </motion.div>

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
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowNotifPanel(true)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Kunlik eslatmalar</p>
                  <p className={`text-sm font-medium ${notifStatus.color}`}>
                    {notifStatus.text}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-purple-500">
                <span className="text-sm font-semibold">Sozlash</span>
                <ChevronLeft className="h-5 w-5 rotate-180" />
              </div>
            </motion.button>

            <div className="mt-3 bg-blue-50 rounded-2xl p-3">
              <p className="text-xs text-blue-700">
                💡 Har kuni belgilangan vaqtda bolangizga o'qish eslatmasi yuboriladi. Android va iOS (16.4+) da ishlaydi.
              </p>
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
          <div className="text-center text-sm text-gray-500 pb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Download className="h-4 w-4" />
              <p>EduSelf Kids v2.0.0 — PWA</p>
            </div>
            <p>© 2025 - Bolalar uchun xavfsiz o'rganish</p>
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifPanel && (
          <NotificationPanel onClose={() => setShowNotifPanel(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
