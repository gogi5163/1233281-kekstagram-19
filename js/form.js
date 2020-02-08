'use strict';
(function () { // Загрузка изображения и показ формы редактирования
  var upload = document.querySelector('#upload-file');
  var cancel = document.querySelector('#upload-cancel');
  var form = document.querySelector('#upload-select-image');
  var editForm = document.querySelector('.img-upload__overlay');
  var inputHashTag = document.querySelector('.text__hashtags');
  var textareaComment = document.querySelector('.text__description');

  var openPopup = function () {
    editForm.classList.remove('hidden');
    inputHashTag.addEventListener('input', window.validation.onInputValueVerify);

  };
  var closePopup = function () {
    editForm.classList.add('hidden');
    inputHashTag.removeEventListener('input', window.validation.onInputValueVerify);
    form.reset();
    inputHashTag.setCustomValidity('');
  };
  var closePopupOrBlurElement = function () {
    if (document.activeElement !== inputHashTag && document.activeElement !== textareaComment) {
      closePopup();
    } else {
      document.activeElement.blur();
    }
  };
  var onEscapePress = function (evt) {
    window.util.isEscEvent(evt, closePopupOrBlurElement);
  };
  upload.addEventListener('change', function () {
    openPopup();
    document.addEventListener('keydown', onEscapePress);
  });
  cancel.addEventListener('click', function () {
    closePopup();
    document.removeEventListener('keydown', onEscapePress);
  });

})();
