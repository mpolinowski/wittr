import PostsView from './views/Posts';
import ToastsView from './views/Toasts';
import idb from 'idb';

export default function IndexController(container) {
  this._container = container;
  this._postsView = new PostsView(this._container);
  this._toastsView = new ToastsView(this._container);
  this._lostConnectionToast = null;
  this._openSocket();
  this._registerServiceWorker();
}

// Register Serviceworker
IndexController.prototype._registerServiceWorker = function() {
  //Check if Browser doesn't supports serviceWorkers
  if (!navigator.serviceWorker) return;

  var indexController = this;

  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // if there is no controller, the page wasn't loaded
    // via a service worker, so they're looking at the latest version.
    // in that case, exit early
    if (!navigator.serviceWorker.controller) {
      return;
    }
    // if there is an updated worker already waiting, call
    // indexController._updateReady
    if (reg.waiting) {
      indexController._updateReady(reg.waiting);
      return;
    }
    // if there is an updated worker installing, track its
    // progress. If it becomes 'installed', called
    // indexController._updateReady
    if (reg.installing) {
      indexController._trackInstalling(reg.installing);
      return;
    }
    // otherwise, listen for new installing workers arriving.
    // if one arrives, track its progress.
    // if it becomes 'installed', call
    // indexController._updateReady
    reg.addEventListener('updatefound', function() {
      indexController._trackInstalling(reg.installing);
    });
  });

  // listen for the controlling service worker changing
  // and reload the page
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    window.location.reload();
  });
};

IndexController.prototype._trackInstalling = function(worker) {
  var indexController = this;
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      indexController._updateReady(worker);
    }
  });
};

// When new ServiceWorker is installed prompt to refresh page
IndexController.prototype._updateReady = function(worker) {
  var toast = this._toastsView.show("New version available", {
    buttons: ['refresh', 'dismiss']
  });
  // when user choose to refresh
  toast.answer.then(function(answer) {
    if (answer != 'refresh') return;
    // tell the service worker to skipWaiting (see public/js/sw/index.js SW is waiting for postMessage)
    worker.postMessage({action: 'skipWaiting'});
  });
};

// open a connection to the server for live updates
IndexController.prototype._openSocket = function() {
  var indexController = this;
  var latestPostDate = this._postsView.getLatestPostDate();

  // create a url pointing to /updates with the ws protocol
  var socketUrl = new URL('/updates', window.location);
  socketUrl.protocol = 'ws';

  if (latestPostDate) {
    socketUrl.search = 'since=' + latestPostDate.valueOf();
  }

  // this is a little hack for the settings page's tests,
  // it isn't needed for Wittr
  socketUrl.search += '&' + location.search.slice(1);

  var ws = new WebSocket(socketUrl.href);

  // add listeners
  ws.addEventListener('open', function() {
    if (indexController._lostConnectionToast) {
      indexController._lostConnectionToast.hide();
    }
  });

  ws.addEventListener('message', function(event) {
    requestAnimationFrame(function() {
      indexController._onSocketMessage(event.data);
    });
  });

  ws.addEventListener('close', function() {
    // tell the user
    if (!indexController._lostConnectionToast) {
      indexController._lostConnectionToast = indexController._toastsView.show("Unable to connect. Retrying…");
    }

    // try and reconnect in 5 seconds
    setTimeout(function() {
      indexController._openSocket();
    }, 5000);
  });
};

// called when the web socket sends message data
IndexController.prototype._onSocketMessage = function(data) {
  var messages = JSON.parse(data);
  this._postsView.addPosts(messages);
};
