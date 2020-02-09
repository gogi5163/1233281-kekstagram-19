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
  var sliderEffect = document.querySelector('.img-upload__effect-level');

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
  // флаг для регулирования добавления обработчика
  var pinFlag = true;
  // Обработчик переключения эффектов
  var onRadioClick = function (evt) {
    currentScale.setAttribute('value', '100%');
    var effect = evt.target.value;
    uploadImage.classList.remove(uploadImage.classList[0]);
    uploadImage.classList.add('effects__preview--' + effect);
    effectLevel.setAttribute('value', 100);
    onEffectSaturateChange();
    if (effect === 'none') {
      sliderEffect.classList.add('hidden');
    } else {
      sliderEffect.classList.remove('hidden');
      // Установка значений слайдера по умолчанию
      effectLevelPin.setAttribute('style', 'left: 100%;');
      effectLevelDepth.setAttribute('style', 'width: 100%;');
      effectLevel.setAttribute('value', 100);
      var maxWidthLine = effectLevelPin.offsetLeft;
      var onPinMouseDown = function (pinEvt) {
        pinFlag = false;
        movePin(pinEvt, maxWidthLine);
      };
      if (pinFlag) {
        effectLevelPin.addEventListener('mousedown', onPinMouseDown);
      }

    }
  };
  for (var i = 0; i < radioEffectButtons.length; i++) {
    radioEffectButtons[i].addEventListener('click', onRadioClick);
  }

  var effectLevelPin = sliderEffect.querySelector('.effect-level__pin');
  var effectLevel = sliderEffect.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

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
  var movePin = function (evt, maxWidth) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      var newPinPlace = effectLevelPin.offsetLeft - shift.x;
      var left = 'left: ' + Math.floor(newPinPlace) + 'px; ';
      var width = 'width: ' + Math.floor(newPinPlace) + 'px; ';
      // Значение value вычисляется из пропорции
      var value = Math.floor((100 / maxWidth) * newPinPlace);
      // ограничители слайдера
      if (newPinPlace < 0) {
        left = 'left: 0%';
        width = 'width: 0%; ';
        value = 0;

      }
      if (newPinPlace > maxWidth) {
        left = 'left: 100%';
        width = 'width: 100%; ';
        value = 100;
      }

      effectLevelPin.setAttribute('style', left);
      effectLevelDepth.setAttribute('style', width);
      effectLevel.setAttribute('value', value);
      // Мгновенное применение насыщенности
      onEffectSaturateChange();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };
  window.preview = {
    makeDefaultPreviewImage: function () {
      uploadImage.setAttribute('style', '');
      uploadImage.setAttribute('class', 'effects__preview--none');
      currentScale.setAttribute('value', '100%');
      currentFilter = 'none';
      var effectBar = document.querySelector('.img-upload__effect-level');
      if (!effectBar.classList.contains('.effects__preview--none')) {
        effectBar.classList.add('hidden');
      }
    }
  };
})();
