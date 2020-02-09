'use strict';
(function () {
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
  for (var i = 0; i < radioEffectButtons.length; i++) {
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
    }
    if (uploadImage.classList.contains('effects__preview--sepia')) {
      currentFilter = 'sepia';
      currentSaturationFilter = currentEffectLevelValue / 100;
    }
    if (uploadImage.classList.contains('effects__preview--marvin')) {
      currentFilter = 'invert';
      currentSaturationFilter = currentEffectLevelValue + '%';
    }
    if (uploadImage.classList.contains('effects__preview--phobos')) {
      currentFilter = 'blur';
      currentSaturationFilter = currentEffectLevelValue * 0.03 + 'px';
    }
    if (uploadImage.classList.contains('effects__preview--heat')) {
      currentFilter = 'brightness';
      currentSaturationFilter = 1 + currentEffectLevelValue * 0.02;
    }
    if (uploadImage.classList.contains('effects__preview--none')) {
      currentFilter = 'none';
    }
    uploadImage.setAttribute('style', getPreviewStyle());
  };
  effectLevelPin.addEventListener('mouseup', onEffectSaturateChange);

})();
