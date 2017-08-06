var staticCacheName = 'wittr-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // change the site's theme, eg swap vars in public/scss/_theme.scss
    // change cache name to wittr-static-v2

    // open a cache named wittr-static-v1
    // add cache the urls from urlsToCache
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
      // remove all old caches that start with 'wittr-' but are not static cache
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // respond with an entry from the cache if there is one.
  // if there isn't, fetch from the network
  var requestUrl = new URL(event.request.url);
  // if user asks for root page serve /skeleton from cache
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request); // if in cache, respond with cached version, otherwiese fetch from network
    })
  );
});

// listen for the "message" event, and call
// skipWaiting if you get the appropriate message
self.addEventListener('message', function(event) {
  if (event.data.action == 'skipWaiting') {
    self.skipWaiting();
  }
});


// write app data to cache1 and respond with cached data first before fetching from network
//
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     // open a cache named "wittr-static-v1"
//     // Add cache the urls from urlsToCache
//     caches.open('witter-static-v1').then(function(cache) {
//       return cache.addAll([
//         '/',
//         'js/main.js',
//         'css/main.css',
//         'imgs/icon.png',
//         'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
//         'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
//       ]);
//     })
//   );
// });
//
// self.addEventListener('fetch', function(event) {
//   // respond with an entry from the cache if there is one.
//   // If there isn't, fetch from the network
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) return response; // if in cache, respond with cached version
//       return fetch(event.request); // otherwiese fetch from network
//     })
//   );
// });


// Only catch 404 and offlineEvents and send status or static files to user
//
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).then(function(response) {
//       if (response.status === 404) {
//         return fetch('/imgs/dr-evil.gif');
//       }
//       return response;
//     }).catch (function() {
//       return new Response("You are offline!");
//     })
//   );
// });


// Only catch 404 and offlineEvents and send status to user
//
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).then(function(response) {
//       if (response.status == 404) {
//         return new Response("Whoops, not found");
//       }
//       return response;
//     }).catch (function() {
//       return new Response("You are offline!");
//     })
//   );
// });


// Catch all Request for JPG files and send dr-evil.gif instead
//
// self.addEventListener('fetch', function(event) {
//   if (event.request.url.endsWith('.jpg'))
//   event.respondWith(
//     fetch('/imgs/dr-evil.gif')
//   );
// });


// Hijack all requests and send HTML Hello World
//
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     new Response('<div class="i-am-a-winner">Hello World</div>', {
//       headers: {'Content-Type': 'text/html'}
//     })
//   );
// });
