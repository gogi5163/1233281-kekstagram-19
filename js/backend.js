'use strict';
(function () {
  var MAX_REQUEST_TIME = 10000;
  var CODE_200 = 200;
  var CODE_400 = 400;
  var CODE_401 = 401;
  var CODE_404 = 404;

  window.backend = {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.timeout = MAX_REQUEST_TIME;

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');

      });
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case CODE_200:
            onLoad(xhr.response);
            break;
          case CODE_400:
            onError('Неверный запрос');
            break;
          case CODE_401:
            onError('Пользователь не авторизован');
            break;
          case CODE_404:
            onError('Ничего не найдено');
            break;
          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }

      });
      xhr.open('GET', url);
      xhr.send();
    }
  };

})();

