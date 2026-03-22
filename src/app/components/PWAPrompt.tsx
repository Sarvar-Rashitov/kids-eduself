import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, Download, Bell, BellOff, Clock, CheckCircle2 } from "lucide-react";
import { pwaService, type NotificationSettings } from "@/services/pwaService";

// ==========================================
// Install Prompt (Android / Desktop)
// ==========================================

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed or dismissed
    if (localStorage.getItem('pwa_install_dismissed')) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setInstalled(true);
      setTimeout(() => setShowBanner(false), 2000);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_install_dismissed', '1');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-5 border-2 border-purple-100">
            {installed ? (
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
                <p className="font-bold text-lg">O'rnatildi! Rahmat 🎉</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl">
                      🎓
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">EduSelf Kids</p>
                      <p className="text-sm text-gray-500">Ilovani o'rnating</p>
                    </div>
                  </div>
                  <button onClick={handleDismiss} className="p-1 text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  📱 Qurilmangizga o'rnatib, internetSiz ham foydalaning!
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleInstall}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-sm"
                  >
                    <Download className="h-4 w-4" />
                    O'rnatish
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm"
                  >
                    Keyinroq
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// iOS Install Instructions
// ==========================================

export function IOSInstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
    const dismissed = localStorage.getItem('ios_install_dismissed');
    
    if (isIOS && !isStandalone && !dismissed) {
      // Show after 3 seconds
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-5 border-2 border-blue-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📱</div>
              <div>
                <p className="font-bold text-gray-800">iPhone/iPad ga o'rnating</p>
                <p className="text-xs text-gray-500">iOS 16.4+ talab qilinadi</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.setItem('ios_install_dismissed', '1');
                setShow(false);
              }}
              className="p-1 text-gray-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
              <span className="text-xl">1️⃣</span>
              <p>Safari brauzeri pastidagi <strong>Share (📤)</strong> tugmasini bosing</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
              <span className="text-xl">2️⃣</span>
              <p><strong>"Add to Home Screen"</strong> ni tanlang</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
              <span className="text-xl">3️⃣</span>
              <p><strong>"Add"</strong> tugmasini bosing ✅</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ==========================================
// Notification Settings Panel
// ==========================================

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [settings, setSettings] = useState<NotificationSettings>(pwaService.getSettings());
  const [permission, setPermission] = useState(pwaService.getNotificationPermission());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const DAY_NAMES = ['Yak', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'];

  const toggleDay = (day: number) => {
    const days = settings.days.includes(day)
      ? settings.days.filter(d => d !== day)
      : [...settings.days, day];
    setSettings(s => ({ ...s, days }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    if (settings.enabled) {
      const ok = await pwaService.enableDailyReminders(settings.time, settings.days);
      setPermission(pwaService.getNotificationPermission());
      if (!ok) {
        setSettings(s => ({ ...s, enabled: false }));
        setSaving(false);
        return;
      }
    } else {
      pwaService.disableDailyReminders();
    }
    
    pwaService.saveSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1500);
  };

  const handleTestNotification = async () => {
    await pwaService.showImmediateNotification(
      "EduSelf Kids 🎓",
      "Test bildirishnoma! O'qish vaqti keldi! 📚"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        className="bg-white rounded-t-[3rem] w-full max-w-md p-6 max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="h-6 w-6 text-purple-500" />
            Eslatmalar
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-2xl">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Permission status */}
        {permission === 'denied' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
            <p className="text-sm text-red-700 font-semibold">
              ⚠️ Bildirishnomalar bloklangan. Brauzer sozlamalaridan ruxsat bering.
            </p>
          </div>
        )}

        {permission === 'default' && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
            <p className="text-sm text-blue-700">
              💡 "Saqlash" tugmasini bosganda ruxsat so'ralamiz.
            </p>
          </div>
        )}

        {/* Enable Toggle */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
          <div>
            <p className="font-bold text-gray-800">Kunlik eslatmalar</p>
            <p className="text-sm text-gray-500">Har kuni o'qishni eslatib turadi</p>
          </div>
          <button
            onClick={() => setSettings(s => ({ ...s, enabled: !s.enabled }))}
            className={`w-14 h-7 rounded-full transition-all relative ${
              settings.enabled ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          >
            <motion.div
              animate={{ x: settings.enabled ? 28 : 4 }}
              className="w-5 h-5 bg-white rounded-full absolute top-1"
            />
          </button>
        </div>

        {settings.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Time picker */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <p className="font-bold text-gray-800">Eslatma vaqti</p>
              </div>
              <input
                type="time"
                value={settings.time}
                onChange={(e) => setSettings(s => ({ ...s, time: e.target.value }))}
                className="w-full text-2xl font-bold text-gray-800 bg-white rounded-xl px-4 py-2 border-2 border-purple-200 text-center"
              />
            </div>

            {/* Days picker */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="font-bold text-gray-800 mb-3">Qaysi kunlari?</p>
              <div className="flex gap-2 justify-between">
                {DAY_NAMES.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => toggleDay(i)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      settings.days.includes(i)
                        ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white'
                        : 'bg-white text-gray-600 border-2 border-gray-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Test notification */}
            {permission === 'granted' && (
              <button
                onClick={handleTestNotification}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold text-sm"
              >
                🔔 Test bildirishnoma yuborish
              </button>
            )}
          </motion.div>
        )}

        {/* Not enabled info */}
        {!settings.enabled && (
          <div className="text-center py-4 text-gray-500">
            <BellOff className="h-10 w-10 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Eslatmalar o'chirilgan</p>
          </div>
        )}

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving || saved}
          className={`w-full py-4 rounded-3xl font-bold text-white text-lg mt-6 transition-all ${
            saved
              ? 'bg-green-400'
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}
        >
          {saving ? '⏳ Saqlanmoqda...' : saved ? '✅ Saqlandi!' : 'Saqlash'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
