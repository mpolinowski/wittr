var staticCacheName = 'wittr-static-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // change the site's theme, eg swap vars in public/scss/_theme.scss
    // change cache name to wittr-static-v2 

    // open a cache named "wittr-static-v1"
    // add cache the urls from urlsToCache
    caches.open('staticCacheName').then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'http://fonts.gstatic.com/s/roboto/v15/0eC6fl06luXEYWpBSJvXCIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/Fl4y0QdOxyyTHEGMXX8kcYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/-L14Jk06m6pUHB-5mXQQnYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/I3S1wsgSg9YCurV6PUkTOYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/NYDWBdD4gIq26G5XYbHsFIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/Pru33qjShpZSmG3z6VYwnYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2', // Roboto Light
        'http://fonts.gstatic.com/s/roboto/v15/sTdaA6j0Psb920Vjv-mrzH-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/uYECMKoHcO9x1wdmbyHIm3-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/tnj4SB6DNbdaQnsM8CFqBX-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/_VYFx-s824kXq_Ul2BHqYH-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/NJ4vxlgWwWbEsv18dAhqnn-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/Ks_cVxiCiwUWVsFWFA3Bjn-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2', // Roboto Regular
        'http://fonts.gstatic.com/s/roboto/v15/77FXFjRbGzN4aCrSFhlh3oX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/isZ-wbCXNKAbnjo6_TwHToX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/UX6i4JxQDm3fVTc1CPuwqoX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/jSN2CGVDbcVyCnfJfjSdfIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/PwZc-YbIL414wB9rB1IAPYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/97uahxiqZRoncBaCEI3aW4X0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
        'http://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2' // Roboto Bold
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
    event.waitUntil (
      // remove all old caches that start with 'wittr-' but are not static cache
      caches.keys().then(function(cacheNames) {
        return Promise.all (
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('wittr-') &&
                    cacheName != staticCacheName;
          }).map(function(cacheName) {
            return cache.delete(cacheName);
          })
        );
      })
    );
});

self.addEventListener('fetch', function(event) {
  // respond with an entry from the cache if there is one.
  // if there isn't, fetch from the network
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response; // if in cache, respond with cached version
      return fetch(event.request); // otherwiese fetch from network
    })
  );
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
//         'http://fonts.gstatic.com/s/roboto/v15/0eC6fl06luXEYWpBSJvXCIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/Fl4y0QdOxyyTHEGMXX8kcYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/-L14Jk06m6pUHB-5mXQQnYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/I3S1wsgSg9YCurV6PUkTOYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/NYDWBdD4gIq26G5XYbHsFIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/Pru33qjShpZSmG3z6VYwnYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfZBw1xU1rKptJj_0jans920.woff2', // Roboto Light
//         'http://fonts.gstatic.com/s/roboto/v15/sTdaA6j0Psb920Vjv-mrzH-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/uYECMKoHcO9x1wdmbyHIm3-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/tnj4SB6DNbdaQnsM8CFqBX-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/_VYFx-s824kXq_Ul2BHqYH-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/NJ4vxlgWwWbEsv18dAhqnn-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/Ks_cVxiCiwUWVsFWFA3Bjn-_kf6ByYO6CLYdB4HQE-Y.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/oMMgfZMQthOryQo9n22dcuvvDin1pK8aKteLpeZ5c0A.woff2', // Roboto Regular
//         'http://fonts.gstatic.com/s/roboto/v15/77FXFjRbGzN4aCrSFhlh3oX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/isZ-wbCXNKAbnjo6_TwHToX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/UX6i4JxQDm3fVTc1CPuwqoX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/jSN2CGVDbcVyCnfJfjSdfIX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/PwZc-YbIL414wB9rB1IAPYX0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/97uahxiqZRoncBaCEI3aW4X0hVgzZQUfRDuZrPvH3D8.woff2', // Roboto Bold
//         'http://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2' // Roboto Bold
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
