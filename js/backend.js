'use strict';
(function () {
  var CODE_200 = 200;
  var CODE_400 = 400;
  var CODE_401 = 401;
  var CODE_404 = 404;
  var CODE_500 = 500;
  var CODE_503 = 503;
  var MAX_REQUEST_TIME = 10000;

  var addErrorAndTimeoutListeners = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.timeout = MAX_REQUEST_TIME;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      addErrorAndTimeoutListeners(xhr, onError);
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
    },
    save: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      addErrorAndTimeoutListeners(xhr, onError);
      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case CODE_200:
            onLoad();
            break;
          case CODE_500:
            onError('Ошибка сервера');
            break;
          case CODE_503:
            onError('Сервер временно не работает');
            break;
          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }

      });
      xhr.open('POST', url);
      xhr.send(data);
    }
  };

})();

