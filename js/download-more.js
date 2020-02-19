'use strict';
(function () {
  var COMMENT_COUNT_STEP = 5;
  var commentLoader = document.querySelector('.comments-loader');
  var countCurrentComments;
  var countTotalComments;
  var onCommentLoaderClick = function () {
    var comments = document.querySelectorAll('.social__comment');
    var countDisplayComments;
    if ((countCurrentComments + COMMENT_COUNT_STEP) < countTotalComments) {
      countDisplayComments = countCurrentComments + COMMENT_COUNT_STEP;
    } else {
      countDisplayComments = countTotalComments;
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', onCommentLoaderClick);
    }
    for (var i = countCurrentComments; i < countDisplayComments; i++) {
      comments[i].removeAttribute('style');

    }
    countCurrentComments = countDisplayComments;
    document.querySelector('.social__comment-count').textContent = countCurrentComments + ' из ' + countTotalComments + ' комментариев';
  };
  window.downloadMore = {
    hideComments: function () {
      var comments = document.querySelectorAll('.social__comment');
      countTotalComments = comments.length;
      if (comments.length > COMMENT_COUNT_STEP) {
        countCurrentComments = COMMENT_COUNT_STEP;
        commentLoader.classList.remove('hidden');
        for (var i = COMMENT_COUNT_STEP; i < comments.length; i++) {
          comments[i].setAttribute('style', 'display:none;');
        }
      } else {
        countCurrentComments = comments.length;
      }
      commentLoader.removeEventListener('click', onCommentLoaderClick);
      document.querySelector('.social__comment-count').textContent = countCurrentComments + ' из ' + countTotalComments + ' комментариев';
    },
    showComments: function () {
      commentLoader.addEventListener('click', onCommentLoaderClick);

    }

  };


})();
