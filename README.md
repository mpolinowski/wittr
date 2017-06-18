# Wittr

This is a silly little demo app for an offline-first course.


1. [Installation](#1-Installation)
2. [Start App in Node](#2-Start-App-in-Node)
3. [Troubleshooting](#3-Troubleshooting)
4. [Create Serviceworker](#4-Create-Serviceworker)


### 1 Installation
___

Dependencies:

* [Node.js](https://nodejs.org/en/) v0.12.7 or above

Then check out the project and run:

```sh
npm install
```

### 2 Start App in Node
___

```sh
npm run serve
```

You should now have the app server at [localhost:8888](http://localhost:8888) and the config server at [localhost:8889](http://localhost:8888).

You can also configure the ports:

```sh
npm run serve -- --server-port=8000 --config-server-port=8001
```

### 3 Troubleshooting
___

- Errors while executing `npm run serve`
  - The first thing to try is to upgrade to latest version of node
  - If latest version also produces errors, try installing v4.5.0
    - An easy for that would be to use `nvm` as discussed [here](http://stackoverflow.com/a/7718438/1585523)

- Change gulp-sass Version for Win10 installation. You can do that in the package.json file in the wittr root directory:

    ```
    "devDependencies": {
        "gulp-sass": "^3.1.0",
      }
      ```

Do this before running "npm install" - also make sure that you have Python 2.7 installed. Otherwise the installation will fail.


### 4 Create Serviceworker
___

Go to wittr/public/js/sw/index.js and add the following lines:

```
self.addEventListener('fetch', function(event) {
  console.log(event.request);
});
```

### 5 Register Serviceworker
___

Go to wittr/public/js/main/indexController.js and add the following lines:

```
export default function IndexController(container) {
  this._registerServiceWorker();
}
```
and
```
// Register Serviceworker
IndexController.prototype._registerServiceWorker = function() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Service Worker registered...');
  }).catch(function() {
    console.log('Service Worker Registration failed...');
  });
};
```
