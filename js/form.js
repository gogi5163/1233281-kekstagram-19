'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  var FORM_SAVE_SOURCE = 'https://js.dump.academy/kekstagram';
  var upload = document.querySelector('#upload-file');
  var cancel = document.querySelector('#upload-cancel');
  var form = document.querySelector('#upload-select-image');
  var editForm = document.querySelector('.img-upload__overlay');
  var inputHashTag = document.querySelector('.text__hashtags');
  var textareaComment = document.querySelector('.text__description');
  var main = document.querySelector('main');


  var openPopup = function () {
    editForm.classList.remove('hidden');
    inputHashTag.addEventListener('input', window.validation.onInputValueVerify);
  };
  var closePopup = function () {
    editForm.classList.add('hidden');
    inputHashTag.removeEventListener('input', window.validation.onInputValueVerify);
    form.reset();
    inputHashTag.setCustomValidity('');
    window.preview.makeDefaultPreviewImage();
  };
  var closePopupOrBlurElement = function () {
    if (document.activeElement !== inputHashTag && document.activeElement !== textareaComment) {
      closePopup();
    } else {
      document.activeElement.blur();
    }
    // Закрытие окна успешной загрузки изображения
    if (main.querySelector('.success') !== null) {
      main.querySelector('.success').remove();
    }
    if (main.querySelector('.error') !== null) {
      main.querySelector('.error').remove();
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
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    var closeMessage = function (isError) {
      var classPettern = (isError) ? '.error' : '.success';
      var button = document.querySelector(classPettern + '__button');

      var onSuccessButtonClick = function () {
        main.querySelector(classPettern).remove();
        button.removeEventListener('click', onSuccessButtonClick);
      };
      button.addEventListener('click', onSuccessButtonClick);
      main.querySelector(classPettern).addEventListener('click', function (clickEvt) {
        var target = clickEvt.target;
        if (target !== main.querySelector(classPettern + '__inner') && target !== main.querySelector(classPettern + '__title')) {
          if (main.querySelector(classPettern) !== null) {
            main.querySelector(classPettern).remove();
          }
        }

      });
    };

    var onSuccess = function () {
      var successMessageTemplate = document.querySelector('#success').content;
      // Клонируем шаблон
      var successMessageElement = successMessageTemplate.cloneNode(true);
      // Будем добавлять сообщение в main
      main.appendChild(successMessageElement);
      closePopup();
      closeMessage(false);
    };
    var onError = function (errorMessage) {
      var errorMessageTemplate = document.querySelector('#error').content;
      // Клонируем шаблон
      var errorElement = errorMessageTemplate.cloneNode(true);
      // Будем добавлять сообщение в main
      errorElement.querySelector('h2').textContent = errorMessage;
      errorElement.querySelector('h2').setAttribute('style', 'line-height: 32px;');
      main.appendChild(errorElement);
      closePopup();
      // Кнопка
      closeMessage(true);

    };
    window.backend.save(FORM_SAVE_SOURCE, data, onSuccess, onError);
  });


})();
