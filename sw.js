const CACHE_NAME = 'etm-tools-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './image_e7b35e.png'
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