'use strict';
(function () {
  var RANDOM_PHOTO_COUNT = 10;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (target, cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    if (target.textContent === 'Случайные') {
      window.searchFilter.dataCopy = window.util.shuffleArray(window.searchFilter.dataCopy).slice(0, RANDOM_PHOTO_COUNT);
    }
    if (target.textContent === 'Обсуждаемые') {
      window.searchFilter.dataCopy.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
