'use strict';
(function () {
  var COMMENT_COUNT_STEP = 5;
  var commentLoader = document.querySelector('.comments-loader');
  window.downloadMore = {
    hideComments: function () {
      var comments = document.querySelectorAll('.social__comment');
      if (comments.length > COMMENT_COUNT_STEP) {
        window.downloadMore.currentCommentCount = COMMENT_COUNT_STEP;
        commentLoader.classList.remove('hidden');
        for (var i = COMMENT_COUNT_STEP; i < comments.length; i++) {
          comments[i].setAttribute('style', 'display:none;');
        }
      } else {
        window.downloadMore.currentCommentCount = comments.length;
      }


    },
    showComments: function () {
      var comments = document.querySelectorAll('.social__comment');
      // Сохраним количество комментариев у выбранной фотографии
      window.downloadMore.totalCommentCount = comments.length;
      var onCommentLoaderClick = function () {
        var condition;
        if ((window.downloadMore.currentCommentCount + COMMENT_COUNT_STEP) < window.downloadMore.totalCommentCount) {
          condition = window.downloadMore.currentCommentCount + COMMENT_COUNT_STEP;
        } else {
          condition = window.downloadMore.totalCommentCount;
          commentLoader.classList.add('hidden');
          commentLoader.removeEventListener('click', onCommentLoaderClick);
          comments.forEach(function (it) {
            it.removeAttribute('style');
          });
        }
        for (var i = window.downloadMore.currentCommentCount; i < condition; i++) {
          comments[i].removeAttribute('style');

        }

        window.downloadMore.currentCommentCount += COMMENT_COUNT_STEP;
      };
      commentLoader.addEventListener('click', onCommentLoaderClick);

    }

  };


})();
