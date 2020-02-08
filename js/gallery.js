'use strict';
(function () {
  // 2.1 Находим блок, в который будем добавлять элементы фотографий
  var photoElementList = document.querySelector('.pictures');
  // 2.2 Находим шаблон элемента фотографии
  var photoElementTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // 2.3 Функция для рендера одного элемента фотографии
  var renderPhotoElement = function (photo) {
    var photoElement = photoElementTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };
  // 2.4 Создаем и наполняем фрагмент сгенерированными элементами фотографий
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.pictures.length; i++) {
    fragment.appendChild(renderPhotoElement(window.data.pictures[i]));
  }

  // 3 Вставка элементов в DOM
  photoElementList.appendChild(fragment);

})();
