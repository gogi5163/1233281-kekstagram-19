'use strict';
(function () {
  var RANDOM_PHOTO_COUNT = 10;
  var filterSection = document.querySelector('.img-filters');
  var filterButtons = filterSection.querySelectorAll('.img-filters button');
  var activeButton;
  var onFilterClick = function (evt) {
    var target = evt.target;
    if (!target.classList.contains('img-filters__button--active')) {
      activeButton = filterSection.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      activeButton = target;
      var pictures = document.querySelectorAll('.picture');
      var dataCopy = window.gallery.data.slice();
      pictures.forEach(function (it) {
        it.remove();
      });
      window.debounce(function () {
        if (target.textContent === 'Случайные') {
          dataCopy = window.util.shuffleArray(dataCopy).slice(0, RANDOM_PHOTO_COUNT);
        }
        if (target.textContent === 'Обсуждаемые') {
          dataCopy.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        }
        window.gallery.addElements(dataCopy);

      });

    }
  };
  filterButtons.forEach(function (it) {
    it.addEventListener('click', onFilterClick);
  });


})();
