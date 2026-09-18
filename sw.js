const CACHE_NAME = 'etm-tools-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './machine.png',
  './logo-new.png'
];

// בעת התקנת האפליקציה, שמור את הקבצים במטמון
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// כשהאפליקציה מבקשת קובץ, בדוק אם הוא קיים בזיכרון האופליין לפני פנייה לאינטרנט
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // מחזיר את הקובץ מהזיכרון במידה ויש
        if (response) {
          return response; 
        }
        return fetch(event.request);
      })
  );
});

// מחיקת גרסאות ישנות של הזיכרון כדי למנוע התנגשויות
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});