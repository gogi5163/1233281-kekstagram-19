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

// Загрузка изображения и показ формы редактирования
var upload = document.querySelector('#upload-file');
var cancel = document.querySelector('#upload-cancel');
var form = document.querySelector('#upload-select-image');
var editForm = document.querySelector('.img-upload__overlay');

var openPopup = function () {
  editForm.classList.remove('hidden');
  inputHashTag.addEventListener('input', onTest);

};
var closePopup = function () {
  editForm.classList.add('hidden');
  inputHashTag.removeEventListener('input', onTest);
  form.reset();
  inputHashTag.setCustomValidity('');
  

};
var onEscapePress = function (evt) {
  if (evt.key === 'Escape') {
    if (document.activeElement !== inputHashTag) {
      closePopup();
      
    } else {
      inputHashTag.blur();
    }
  }
};
upload.addEventListener('change', function () {
  openPopup();
  document.addEventListener('keydown', onEscapePress);
});
cancel.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onEscapePress);
});
// Применение эффекта для изображения и редактирование размера изображения
var MAX_SCALE = 100;
var MIN_SCALE = 25;
var buttonControlSmaller = document.querySelector('.scale__control--smaller');
var buttonControlBigger = document.querySelector('.scale__control--bigger');
var uploadImage = document.querySelector('.img-upload__preview img');
// глобальные переменные для генерации и применения кооректного атрибута style
var currentScale = document.querySelector('.scale__control--value');
var currentFilter = 'none';
var currentSaturationFilter = 'none';
// Увеличение масштаба изображения
var onPreviewIncrease = function () {
  var scale = parseInt(currentScale.getAttribute('value'), 10);
  if (scale < MAX_SCALE) {
    var newScale = scale + 25 + '%';
    currentScale.setAttribute('value', newScale);
    uploadImage.setAttribute('style', getPreviewStyle());
  }
};
// Уменьшение масштаба изображения
var onPreviewDecrease = function () {
  var scale = parseInt(currentScale.getAttribute('value'), 10);
  if (scale > MIN_SCALE) {
    var newScale = scale - 25 + '%';
    currentScale.setAttribute('value', newScale);
    uploadImage.setAttribute('style', getPreviewStyle());
  }
};
buttonControlSmaller.addEventListener('click', onPreviewDecrease);
buttonControlBigger.addEventListener('click', onPreviewIncrease);
// Функция для получения атрибута style в зав-ти от выбранных фильтров и насыщенности
var getPreviewStyle = function () {
  var fractionalValue = parseInt(currentScale.getAttribute('value'), 10) / 100;
  return 'transform: scale(' + fractionalValue + ');' + 'filter: ' + currentFilter +
  '(' + currentSaturationFilter + ');';
};
var radioEffectButtons = document.querySelectorAll('.effects__radio');
// Обработчик переключения эффектов
var onRadioClick = function (evt) {
  currentScale.setAttribute('value', '100%');
  var effect = evt.target.value;
  uploadImage.classList.remove(uploadImage.classList[0]);
  uploadImage.classList.add('effects__preview--' + effect);
  onEffectSaturateChange();
  if (effect === 'none') {
    sliderEffect.classList.add('hidden');
  } else {
    sliderEffect.classList.remove('hidden');
  }
};
for (i = 0; i < radioEffectButtons.length; i++) {
  radioEffectButtons[i].addEventListener('click', onRadioClick);
}
var sliderEffect = document.querySelector('.img-upload__effect-level');
var effectLevelPin = sliderEffect.querySelector('.effect-level__pin');
var effectLevel = sliderEffect.querySelector('.effect-level__value');
// Рассчет и применения текущей насыщенности фильтра в зависимости от значения value у  effectLevel
var onEffectSaturateChange = function () {
  var currentEffectLevelValue = effectLevel.getAttribute('value');
  if (uploadImage.classList.contains('effects__preview--chrome')) {
    currentFilter = 'grayscale';
    currentSaturationFilter = currentEffectLevelValue / 100;
    uploadImage.setAttribute('style', getPreviewStyle());
  }
  if (uploadImage.classList.contains('effects__preview--sepia')) {
    currentFilter = 'sepia';
    currentSaturationFilter = currentEffectLevelValue / 100;
    uploadImage.setAttribute('style', getPreviewStyle());
  }
  if (uploadImage.classList.contains('effects__preview--marvin')) {
    currentFilter = 'invert';
    currentSaturationFilter = currentEffectLevelValue + '%';
    uploadImage.setAttribute('style', getPreviewStyle());
  }
  if (uploadImage.classList.contains('effects__preview--phobos')) {
    currentFilter = 'blur';
    currentSaturationFilter = currentEffectLevelValue * 0.03 + 'px';
    uploadImage.setAttribute('style', getPreviewStyle());
  }
  if (uploadImage.classList.contains('effects__preview--heat')) {
    currentFilter = 'brightness';
    currentSaturationFilter = 1 + currentEffectLevelValue * 0.02;
    uploadImage.setAttribute('style', getPreviewStyle());
  }
  if (uploadImage.classList.contains('effects__preview--none')) {
    uploadImage.setAttribute('style', 'filter: none');
  }
};
effectLevelPin.addEventListener('mouseup', onEffectSaturateChange);
// Валидация хештегов
var MIN_LENGTH_TAG = 2;
var MAX_LENGTH_TAG = 20;
var MAX_TAG_COUNT = 5;
var inputHashTag = document.querySelector('.text__hashtags');
// Преобразование строки в массив, где разделителем является 1 или более раздельных символов подряд
var splitString = function () {
  var tagString = inputHashTag.value;
  return tagString.split(/\s+/);
};
// Хештег должен начинаться с решетки
var checkValidFirstCharacter = function (hashTag) {
  var error = false;
  var symbolsArray = hashTag.split('');
  if (symbolsArray[0] !== '#') {
    error = true;
  }
  return error;
};
var checkValidCharacters = function (hashTag) {
  var regex = /^[#]{1}[0-9A-Za-zа-яА-ЯёЁ]*$/;
  var error = false;
  var matches = hashTag.match(regex);
  if (matches === null && hashTag !== '') {
    error = true;
  }
  return error;
};
var checkMinLength = function (hashTag) {
  var error = false;
  if (hashTag.length < MIN_LENGTH_TAG && hashTag !== '') {
    error = true;
  }
  return error;
};
var checkMaxLength = function (hashTag) {
  var error = false;
  if (hashTag.length > MAX_LENGTH_TAG) {
    error = true;
  }
  return error;
};
var checkCopies = function (array, index) {
  var error = false;
  for (var j = index + 1; j < array.length; j++) {
    if (array[index].toLowerCase() === array[j].toLowerCase() && array[index] !== '') {
      error = true;
    }
  }
  return error;
};
var checkCountTags = function (hashtag, index) {
  var error = false;
  if (index > MAX_TAG_COUNT - 1 && hashtag !== '') {
    error = true;
  }
  return error;
};
var checkInput = function () {
  var tags = splitString();
  var stringError = '';
  for (i = 0; i < tags.length; i++) {
    // хештеги необязательны
    if (tags.length === 1 && tags[0] === '') {
      break;
    }
    if (checkValidFirstCharacter(tags[0])) {
      stringError = 'хэш-тег начинается с символа # (решётка). хэш-теги разделяются пробелами';
      break;
    }
    if (checkValidCharacters(tags[i])) {
      stringError = 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.';
      break;
    }
    if (checkMinLength(tags[i])) {
      stringError = 'хеш-тег не может состоять только из одной решётки';
      break;
    }
    if (checkMaxLength(tags[i])) {
      stringError = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
      break;
    }
    if (checkCopies(tags, i)) {
      stringError = 'один и тот же хэш-тег не может быть использован дважды';
      break;
    }
    if (checkCountTags(tags[i], i)) {
      stringError = 'нельзя указать больше пяти хэш-тегов';
      break;
    }
  }
  return stringError;
};
var onTest = function (evt) {
  var target = evt.target;
  var customStringError = checkInput();
  if (customStringError) {
    target.setCustomValidity(customStringError);
  } else {
    target.setCustomValidity('');
  }
}

