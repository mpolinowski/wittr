self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    'js/main.js',
    'css/main.css',
    'imgs/icon.png',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW'
  ];

  event.waitUntil(

  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status === 404) {
        return fetch('/imgs/dr-evil.gif');
      }
      return response;
    }).catch (function() {
      return new Response("You are offline!");
    })
  );
});

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
