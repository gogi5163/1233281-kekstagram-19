'use strict';
// 1.1 Задание констант
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
// 1.2 Функция для поиска случайного значения в диапазоне
var makeRandomNumberInTheRange = function (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};
// 1.3 Функция для возврата массива с перемешенными значениями от 1 до n без повторений
var createRandomPhotos = function (count) {
  var photoUrls = [];
  for (var i = 0; i < count; i++) {
    photoUrls[i] = i + 1;
  }
  // Случайно перемешаем массив
  var changeValue;
  for (i = 0; i < photoUrls.length; i++) {
    var randomKey = makeRandomNumberInTheRange(0, photoUrls.length - 1);
    changeValue = photoUrls[i];
    photoUrls[i] = photoUrls[randomKey];
    photoUrls[randomKey] = changeValue;
  }
  return photoUrls;
};
// 1.4 Функция для создания случайного сообщения, которое состоит из одного или двух элементов массива COMMENTATOR_MESSAGES
var renderRandomMessage = function (array) {
  var message = '';
  // Находим случайным образом количество частей из которых будет состоять комментарий.
  var messagePartCount = makeRandomNumberInTheRange(1, 2);
  if (messagePartCount === 1) {
    message = array[makeRandomNumberInTheRange(0, array.length - 1)];
  } else {
    message = array[makeRandomNumberInTheRange(0, array.length - 1)] + ' ' + array[makeRandomNumberInTheRange(0, array.length - 1)];

  }
  return message;
};
// 1.5 Функция для создания массива из сгенерированных JS объектов, которые описывают фотографии
var renderRandomphotoObjects = function (count) {
  var array = [];
  var photoSources = createRandomPhotos(count);
  for (var i = 0; i < count; i++) {
    var photoObject = {};
    photoObject.url = 'photos/' + photoSources[i] + '.jpg';
    photoObject.description = 'описание фотографии';
    photoObject.likes = makeRandomNumberInTheRange(MIN_VALUE_OF_LIKES, MAX_VALUE_OF_LIKES);
    photoObject.comments = [];
    var countOfComments = makeRandomNumberInTheRange(MIN_VALUE_OF_COMMENTS, MAX_VALUE_OF_COMMENTS);
    // Заполняем комменты
    for (var j = 0; j < countOfComments; j++) {
      photoObject.comments[j] = {};
      photoObject.comments[j].avatar = 'img/avatar-' + makeRandomNumberInTheRange(1, 6) + '.svg';
      photoObject.comments[j].message = renderRandomMessage(COMMENTATOR_MESSAGES);
      photoObject.comments[j].name = COMMENTATOR_NAMES[makeRandomNumberInTheRange(0, COMMENTATOR_NAMES.length - 1)];

    }
    array[i] = photoObject;
  }
  return array;
};
var randomPhotos = renderRandomphotoObjects(IMAGE_COUNT);

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
for (var i = 0; i < randomPhotos.length; i++) {
  fragment.appendChild(renderPhotoElement(randomPhotos[i]));
}

// 3 Вставка элементов в DOM
photoElementList.appendChild(fragment);
