'use strict';
(function () {
  var SOURCE_DATA = 'https://js.dump.academy/kekstagram/data';
  var onSuccess = function (data) {
    // Находим блок, в который будем добавлять элементы фотографий
    var photoElementList = document.querySelector('.pictures');
    // Находим шаблон элемента фотографии
    var photoElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
    // Функция для рендера одного элемента фотографии
    var renderPhotoElement = function (photo) {
      var photoElement = photoElementTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      return photoElement;
    };
    // Создаем и наполняем фрагмент сгенерированными элементами фотографий
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPhotoElement(data[i]));
    }
    // Вставка элементов в DOM
    photoElementList.appendChild(fragment);
    // Включение полноэкранного режима
    window.bigPicture.enable(data);

  };

  var onError = function (errorMessage) {
    // Находим шаблон ошибки и клонируем его
    var errorTemplate = document.querySelector('#error').content;
    var errorElement = errorTemplate.cloneNode(true);
    // Вносим в клонированный шаблон текст ошибки
    errorElement.querySelector('h2').textContent = errorMessage;
    errorElement.querySelector('h2').setAttribute('style', 'line-height: 32px;');
    var errorButton = errorElement.querySelector('button');
    errorButton.textContent = 'Закрыть окно';
    // Добавим ошибку в DOM
    var main = document.querySelector('main');
    main.appendChild(errorElement);
    // Добавим обработчик на закрытие окна ошибки
    errorButton.addEventListener('click', function () {
      main.removeChild(main.querySelector('.error'));
    });

  };

  window.backend.load(SOURCE_DATA, onSuccess, onError);

})();
