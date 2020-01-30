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
var getRandomNumber = function (minimum, maximum) {
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
    var randomKey = getRandomNumber(0, photoUrls.length - 1);
    changeValue = photoUrls[i];
    photoUrls[i] = photoUrls[randomKey];
    photoUrls[randomKey] = changeValue;
  }
  return photoUrls;
};
// 1.4 Функция для создания случайного сообщения, которое состоит из одного или двух элементов массива COMMENTATOR_MESSAGES
var createRandomMessage = function (array) {
  var message = '';
  // Находим случайным образом количество частей из которых будет состоять комментарий.
  var messagePartCount = getRandomNumber(1, 2);
  if (messagePartCount === 1) {
    message = array[getRandomNumber(0, array.length - 1)];
  } else {
    message = array[getRandomNumber(0, array.length - 1)] + ' ' + array[getRandomNumber(0, array.length - 1)];

  }
  return message;
};
// 1.5 Функция для создания массива из сгенерированных JS объектов, которые описывают фотографии
var createRandomPhotoObjects = function (count) {
  var array = [];
  var photoSources = createRandomPhotos(count);
  for (var i = 0; i < count; i++) {
    var photoObject = {};
    photoObject.url = 'photos/' + photoSources[i] + '.jpg';
    photoObject.description = 'описание фотографии';
    photoObject.likes = getRandomNumber(MIN_VALUE_OF_LIKES, MAX_VALUE_OF_LIKES);
    photoObject.comments = [];
    var countOfComments = getRandomNumber(MIN_VALUE_OF_COMMENTS, MAX_VALUE_OF_COMMENTS);
    // Заполняем комменты
    for (var j = 0; j < countOfComments; j++) {
      photoObject.comments[j] = {};
      photoObject.comments[j].avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
      photoObject.comments[j].message = createRandomMessage(COMMENTATOR_MESSAGES);
      photoObject.comments[j].name = COMMENTATOR_NAMES[getRandomNumber(0, COMMENTATOR_NAMES.length - 1)];

    }
    array[i] = photoObject;
  }
  return array;
};
var randomPhotos = createRandomPhotoObjects(IMAGE_COUNT);

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

// 4 Показываем .big-picture, и заполняем его информацией из массива с данными
document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture__img img').setAttribute('src', randomPhotos[0].url);
document.querySelector('.likes-count').textContent = randomPhotos[0].likes;
document.querySelector('.comments-count').textContent = randomPhotos[0].comments.length;
document.querySelector('.social__caption').textContent = randomPhotos[0].description;
// 4.1 Задаем шаблон комментария
var commentElementTemplate = document.querySelector('.social__comment');
// 4.2 Переопределяем и наполняем фрагмент данными из массива
fragment = document.createDocumentFragment();
for (i = 0; i < randomPhotos[0].comments.length; i++) {
  var commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').setAttribute('src', randomPhotos[0].comments[i].avatar);
  commentElement.querySelector('.social__picture').setAttribute('alt', randomPhotos[0].comments[i].name);
  commentElement.querySelector('.social__text').textContent = randomPhotos[0].comments[i].message;
  fragment.appendChild(commentElement);
}
// 4.3 Ищем дефолтные комментарии и удаляем их из DOM
var commentsCollection = document.querySelectorAll('.social__comments');
var allDefaultComments = document.querySelectorAll('.social__comment');
for (i = 0; i < allDefaultComments.length; i++) {
  commentsCollection[0].removeChild(allDefaultComments[i]);

}
// 4.4 Добавляем сгенерированные комментарии в DOM
document.querySelector('.social__comments').appendChild(fragment);

// 5 Прячем блоки счётчика комментариев и загрузки новых комментариев
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

// 6 Добавляем body класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
document.querySelector('body').classList.add('modal-open');
