'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (minimum, maximum) {
      return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    },
    createSequentialArray: function (count) {
      var array = [];
      for (var i = 0; i < count; i++) {
        array[i] = i + 1;
      }
      return array;
    },
    shuffleArray: function (array) {

      // Случайно перемешаем массив
      var changeValue;
      for (var i = 0; i < array.length; i++) {
        var randomKey = this.getRandomNumber(0, array.length - 1);
        changeValue = array[i];
        array[i] = array[randomKey];
        array[randomKey] = changeValue;
      }
      return array;
    }
  };


})();
