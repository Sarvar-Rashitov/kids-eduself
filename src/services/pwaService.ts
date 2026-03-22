// PWA Service - Service Worker registration + Notification management
// Supports Android and iOS (16.4+ installed PWA)

export interface NotificationSettings {
  enabled: boolean;
  time: string; // "HH:MM" format
  days: number[]; // 0=Sunday, 1=Monday, ... 6=Saturday
}

const STORAGE_KEY = 'eduself_notifications';
const NOTIFICATION_MESSAGES = [
  { title: "EduSelf Kids 🎓", body: "Bugun ham o'qish vaqti! Keling, yangi harflar o'rganamiz! 🔤" },
  { title: "EduSelf Kids ⭐", body: "Yulduzlar to'plash vaqti keldi! Matematikani o'rganamiz! 🔢" },
  { title: "EduSelf Kids 🎤", body: "Bugun gapirish mashqini qilamizmi? Keling, boshlaylik! 😊" },
  { title: "EduSelf Kids 🌟", body: "Yangi raqamlarni o'rganish vaqti! Tayyor bo'ldingizmi? 🎯" },
  { title: "EduSelf Kids 🐱", body: "Hayvonlar haqida biladigan narsalaringizni ko'rsating! 🦁" },
  { title: "EduSelf Kids 🌈", body: "Ranglarni o'rganamizmi? Bugun juda qiziqarli bo'ladi! 🎨" },
  { title: "EduSelf Kids 📚", body: "O'qish - kelajak kaliti! Bugun ham o'rganamiz! 🗝️" },
];

class PWAService {
  private swRegistration: ServiceWorkerRegistration | null = null;

  // ============ SERVICE WORKER ============

  async register(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('[PWA] Service Worker not supported');
      return false;
    }

    // Skip registration in iframe/preview environments
    if (window.self !== window.top) {
      console.log('[PWA] Skipping Service Worker in iframe environment');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      this.swRegistration = registration;
      console.log('[PWA] Service Worker registered:', registration.scope);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[PWA] New content available, refresh to update');
          }
        });
      });

      return true;
    } catch (error) {
      // Silently fail in preview/development environments
      if (error instanceof Error && error.name === 'SecurityError') {
        console.log('[PWA] Service Worker not available in this environment');
      } else {
        console.warn('[PWA] Service Worker registration failed:', error);
      }
      return false;
    }
  }

  async getRegistration(): Promise<ServiceWorkerRegistration | null> {
    if (this.swRegistration) return this.swRegistration;
    
    if ('serviceWorker' in navigator) {
      this.swRegistration = await navigator.serviceWorker.getRegistration() ?? null;
    }
    return this.swRegistration;
  }

  isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  // ============ NOTIFICATIONS ============

  isNotificationSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  getNotificationPermission(): NotificationPermission {
    if (!this.isNotificationSupported()) return 'denied';
    return Notification.permission;
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!this.isNotificationSupported()) return 'denied';
    
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return 'denied';
    }
  }

  // ============ SETTINGS ============

  getSettings(): NotificationSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    
    return {
      enabled: false,
      time: '09:00',
      days: [1, 2, 3, 4, 5, 6, 0], // All days
    };
  }

  saveSettings(settings: NotificationSettings): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  // ============ SCHEDULING ============

  async enableDailyReminders(time: string = '09:00', days: number[] = [0,1,2,3,4,5,6]): Promise<boolean> {
    const permission = await this.requestNotificationPermission();
    if (permission !== 'granted') return false;

    const settings: NotificationSettings = { enabled: true, time, days };
    this.saveSettings(settings);
    this.scheduleTodayReminder(settings);
    return true;
  }

  disableDailyReminders(): void {
    const settings = this.getSettings();
    settings.enabled = false;
    this.saveSettings(settings);
  }

  // Calculate ms until next notification time
  private getMsUntilTime(timeStr: string, days: number[]): number {
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    let target = new Date(now);
    target.setHours(hours, minutes, 0, 0);

    // If time already passed today, try tomorrow
    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    // Find next valid day
    for (let i = 0; i < 7; i++) {
      const dayOfWeek = target.getDay();
      if (days.includes(dayOfWeek)) break;
      target.setDate(target.getDate() + 1);
    }

    return target.getTime() - now.getTime();
  }

  async scheduleTodayReminder(settings?: NotificationSettings): Promise<void> {
    const s = settings ?? this.getSettings();
    if (!s.enabled) return;
    if (Notification.permission !== 'granted') return;

    const delay = this.getMsUntilTime(s.time, s.days);
    const msg = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];

    const reg = await this.getRegistration();
    if (reg?.active) {
      reg.active.postMessage({
        type: 'SCHEDULE_NOTIFICATION',
        title: msg.title,
        body: msg.body,
        delay,
      });
      console.log(`[PWA] Notification scheduled in ${Math.round(delay / 60000)} minutes`);
    }
  }

  async showImmediateNotification(title: string, body: string): Promise<void> {
    if (Notification.permission !== 'granted') return;
    
    const reg = await this.getRegistration();
    if (reg) {
      await reg.showNotification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'immediate',
        vibrate: [200, 100, 200],
      });
    } else {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }

  // Check if app was opened from notification
  checkForOpenFromNotification(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('from_notification');
  }

  // iOS PWA detection
  isIOSPWA(): boolean {
    return (
      (window.navigator as { standalone?: boolean }).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches
    );
  }

  isAndroidPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches &&
      /android/i.test(navigator.userAgent);
  }

  canInstall(): boolean {
    return !this.isIOSPWA() && !this.isAndroidPWA();
  }
}

export const pwaService = new PWAService();