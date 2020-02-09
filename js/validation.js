'use strict';
(function () {
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
    for (var i = 0; i < tags.length; i++) {
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
  window.validation = {
    onInputValueVerify: function (evt) {
      var target = evt.target;
      var customStringError = checkInput();
      if (customStringError) {
        target.setCustomValidity(customStringError);
      } else {
        target.setCustomValidity('');
      }
    }
  };

})();

