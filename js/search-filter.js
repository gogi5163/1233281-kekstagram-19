'use strict';
(function () {
  var filterSection = document.querySelector('.img-filters');
  var filterButtons = filterSection.querySelectorAll('button');
  var activeButton;
  var onFilterClick = function (evt) {
    var target = evt.target;
    if (!target.classList.contains('img-filters__button--active')) {
      activeButton = filterSection.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      activeButton = target;
      var pictures = document.querySelectorAll('.picture');
      pictures.forEach(function (it) {
        it.remove();
      });
      window.searchFilter = {
        dataCopy: window.gallery.data.slice()
      };
      window.debounce(target, function () {
        window.gallery.addElements(window.searchFilter.dataCopy);
      });

    }
  };
  filterButtons.forEach(function (it) {
    it.addEventListener('click', onFilterClick);
  });


})();
