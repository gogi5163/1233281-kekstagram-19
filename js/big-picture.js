'use strict';
(function () {
  // Полноэкранный режим
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = document.querySelector('#picture-cancel');
  var switchOffTabNavigation = function (collection) {
  // убираю возможность навигации по табу у ссылок на фоне, чтобы нажатие таба давало фокус сразу на нужный элемент.
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('tabindex', '-1');
    }
  };
  var switchOnTabNavigation = function (collection) {
  // добавляю возможность навигации по табу у ссылок
    for (var i = 0; i < collection.length; i++) {
      collection[i].setAttribute('tabindex', '0');
    }
  };
  var searchPictureData = function (src) {
    for (var i = 0; i < window.data.pictures.length; i++) {
    // по атрибуту src элемента, по которому произошел клик найдем объект с данными
      if (window.data.pictures[i].url === src) {
        var pictureData = window.data.pictures[i];
        break;
      }
    }
    return pictureData;
  };
  var onThumbnailClick = function (evt) {
    var element = evt.currentTarget.children[0];
    openBigPicture(element);
  };
  var onPictureCancelClick = function () {
    closeBigPicture();
  };
  var onPictureEscapePress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    switchOnTabNavigation(links);
    pictureCancel.removeEventListener('click', onPictureCancelClick);
    document.removeEventListener('keydown', onPictureEscapePress);
    body.classList.remove('modal-open');
  };
  var openBigPicture = function (element) {
    switchOffTabNavigation(links);
    var src = element.getAttribute('src');
    var pictureData = searchPictureData(src);
    // Показываем .big-picture, и заполняем его информацией из найденного соответсвующего объекта с данными
    document.querySelector('.big-picture__img img').setAttribute('src', pictureData.url);
    document.querySelector('.likes-count').textContent = pictureData.likes;
    document.querySelector('.comments-count').textContent = pictureData.comments.length;
    document.querySelector('.social__caption').textContent = pictureData.description;
    // Задаем шаблон комментария
    var commentElementTemplate = document.querySelector('.social__comment');
    // Переопределяем и наполняем фрагмент данными из массива
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictureData.comments.length; i++) {
      var commentElement = commentElementTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').setAttribute('src', pictureData.comments[i].avatar);
      commentElement.querySelector('.social__picture').setAttribute('alt', pictureData.comments[i].name);
      commentElement.querySelector('.social__text').textContent = pictureData.comments[i].message;
      fragment.appendChild(commentElement);
    }
    // Ищем дефолтные комментарии и удаляем их из DOM
    var commentsCollection = document.querySelectorAll('.social__comments');
    var allDefaultComments = document.querySelectorAll('.social__comment');
    for (var j = 0; j < allDefaultComments.length; j++) {
      commentsCollection[0].removeChild(allDefaultComments[j]);
    }
    // Добавляем сгенерированные комментарии в DOM
    document.querySelector('.social__comments').appendChild(fragment);
    // Прячем блоки счётчика комментариев и загрузки новых комментариев
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    // Добавляем body класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    pictureCancel.addEventListener('click', onPictureCancelClick);
    document.addEventListener('keydown', onPictureEscapePress);
  };

  var links = document.querySelectorAll('a.picture');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', onThumbnailClick);
  }

})();
