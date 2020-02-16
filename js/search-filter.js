'use strict';
(function () {
  var RANDOM_PHOTO_COUNT = 10;
  var photoElementList = document.querySelector('.pictures');
  var filterSection = document.querySelector('.img-filters');
  filterSection.classList.remove('img-filters--inactive');
  var filterButtons = filterSection.querySelectorAll('button');
  var activeButton;
  var onFilterClick = function (evt) {
    var target = evt.target;
    activeButton = filterSection.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    activeButton = target;
    var dataCopy = window.gallery.data.slice();
    while (photoElementList.firstChild) {
      photoElementList.firstChild.remove();
    }

    if (target.textContent === 'Случайные') {
      dataCopy = window.util.shuffleArray(dataCopy).slice(0, RANDOM_PHOTO_COUNT);
    }
    if (target.textContent === 'Обсуждаемые') {
      dataCopy.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });


    }
    window.debounce(function () {
      window.gallery.addElements(dataCopy);
    });


  };
  filterButtons.forEach(function (it) {
    it.addEventListener('click', onFilterClick);
  });


})();
