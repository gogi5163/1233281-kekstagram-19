'use strict';
(function () { // 1.1 Задание констант
  var MIN_VALUE_OF_LIKES = 15;
  var MAX_VALUE_OF_LIKES = 200;
  var MIN_VALUE_OF_COMMENTS = 1;
  var MAX_VALUE_OF_COMMENTS = 5;
  var IMAGE_COUNT = 25;
  var COMMENTATOR_NAMES = ['Александр', 'Алексей', 'Григорий', 'Сергей', 'Рудольф', 'Игорь', 'Егор', 'Владимир'];
  var COMMENTATOR_MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  // Функция для создания случайного сообщения, которое состоит из одного или двух элементов массива COMMENTATOR_MESSAGES
  var createRandomMessage = function (array) {
    var message = '';
    // Находим случайным образом количество частей из которых будет состоять комментарий.
    var messagePartCount = window.util.getRandomNumber(1, 2);
    if (messagePartCount === 1) {
      message = array[window.util.getRandomNumber(0, array.length - 1)];
    } else {
      message = array[window.util.getRandomNumber(0, array.length - 1)] + ' ' + array[window.util.getRandomNumber(0, array.length - 1)];

    }
    return message;
  };
  // Функция для создания массива из сгенерированных JS объектов, которые описывают фотографии
  var createRandomPhotoObjects = function (count) {
    var array = [];
    var photoSources = window.util.shuffleArray(window.util.createSequentialArray(count));
    for (var i = 0; i < count; i++) {
      var photoObject = {};
      photoObject.url = 'photos/' + photoSources[i] + '.jpg';
      photoObject.description = 'описание фотографии';
      photoObject.likes = window.util.getRandomNumber(MIN_VALUE_OF_LIKES, MAX_VALUE_OF_LIKES);
      photoObject.comments = [];
      var countOfComments = window.util.getRandomNumber(MIN_VALUE_OF_COMMENTS, MAX_VALUE_OF_COMMENTS);
      // Заполняем комменты
      for (var j = 0; j < countOfComments; j++) {
        photoObject.comments[j] = {};
        photoObject.comments[j].avatar = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
        photoObject.comments[j].message = createRandomMessage(COMMENTATOR_MESSAGES);
        photoObject.comments[j].name = COMMENTATOR_NAMES[window.util.getRandomNumber(0, COMMENTATOR_NAMES.length - 1)];

      }
      array[i] = photoObject;
    }
    return array;
  };
  window.data = {
    pictures: createRandomPhotoObjects(IMAGE_COUNT)
  };

})();
