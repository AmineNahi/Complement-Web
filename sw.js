const CACHE_NAME = 'mon-pwa-v1';

// Liste des fichiers à mettre dans le cache
const FICHIERS_A_CACHER = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/core/EventBus.js',
  '/js/models/NavigationModel.js',
  '/js/views/NavigationView.js',
  '/js/controllers/NavController.js',
  '/js/router/Router.js',
  '/js/pages/AccueilPage.js',
  '/js/pages/DocumentationPage.js',
  '/manifest.json',
];

// Installation
self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FICHIERS_A_CACHER);
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {

  event.respondWith(
    caches.match(event.request)
      .then((fichierEnCache) => {
        if (fichierEnCache) {
          return fichierEnCache;
        }
        return fetch(event.request);
      })
  );
});