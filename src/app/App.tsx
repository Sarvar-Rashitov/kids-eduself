import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { useEffect } from "react";
import { pwaService } from "@/services/pwaService";
import { PWAInstallBanner, IOSInstallPrompt } from "@/app/components/PWAPrompt";

export default function App() {
  useEffect(() => {
    document.title = "EduSelf Kids - Bolalar uchun ta'lim ilovasi";

    // ── PWA Setup ──
    // 1. Inject manifest link dynamically
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/manifest.json';
      document.head.appendChild(link);
    }

    // 2. Meta tags for PWA
    const metaTags: Array<[string, string, string]> = [
      ['name', 'theme-color', '#7c3aed'],
      ['name', 'mobile-web-app-capable', 'yes'],
      ['name', 'apple-mobile-web-app-capable', 'yes'],
      ['name', 'apple-mobile-web-app-status-bar-style', 'default'],
      ['name', 'apple-mobile-web-app-title', 'EduSelf Kids'],
      ['name', 'application-name', 'EduSelf Kids'],
      ['name', 'msapplication-TileColor', '#7c3aed'],
    ];

    metaTags.forEach(([attrName, attrValue, content]) => {
      if (!document.querySelector(`meta[${attrName}="${attrValue}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // 3. Register Service Worker
    pwaService.register().then((registered) => {
      if (registered) {
        // Schedule daily reminder if enabled
        const settings = pwaService.getSettings();
        if (settings.enabled && pwaService.getNotificationPermission() === 'granted') {
          pwaService.scheduleTodayReminder(settings);
        }
      }
    });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <PWAInstallBanner />
      <IOSInstallPrompt />
    </>
  );
}
