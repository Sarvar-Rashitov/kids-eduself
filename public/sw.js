// EduSelf Kids - Service Worker v1.0
// Supports: Offline caching + Push Notifications + Daily Reminders

const CACHE_NAME = 'eduself-kids-v1';
const DYNAMIC_CACHE = 'eduself-dynamic-v1';

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
];

// ========== INSTALL ==========
self.addEventListener('install', (event) => {
  console.log('[SW] Installing EduSelf Kids Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore cache errors during install
      });
    })
  );
  self.skipWaiting();
});

// ========== ACTIVATE ==========
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating EduSelf Kids Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ========== FETCH (Offline Support) ==========
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});

// ========== PUSH NOTIFICATIONS ==========
self.addEventListener('push', (event) => {
  let data = {
    title: "EduSelf Kids 🎓",
    body: "Bugun ham o'qish vaqti! Keling, yangi narsalar o'rganamiz! 🌟",
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'daily-reminder',
    requireInteraction: false,
  };

  if (event.data) {
    try {
      const pushData = event.data.json();
      data = { ...data, ...pushData };
    } catch (e) {
      data.body = event.data.text() || data.body;
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    tag: data.tag,
    requireInteraction: data.requireInteraction,
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now(),
    },
    actions: [
      { action: 'open', title: "O'qishni boshlash 📚" },
      { action: 'dismiss', title: 'Keyinroq' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ========== NOTIFICATION CLICK ==========
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  if (event.action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ========== LOCAL SCHEDULED NOTIFICATIONS ==========
// Called from main app to schedule a daily reminder
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data;
    
    setTimeout(() => {
      self.registration.showNotification(title || "EduSelf Kids 🎓", {
        body: body || "Bugun ham o'qish vaqti! 📚",
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'scheduled-reminder',
        vibrate: [200, 100, 200],
        data: { url: '/' },
        actions: [
          { action: 'open', title: "O'qishni boshlash 📚" },
          { action: 'dismiss', title: 'Keyinroq' },
        ],
      });
    }, delay || 0);
  }

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
