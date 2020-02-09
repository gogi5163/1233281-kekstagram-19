'use strict';
(function () {

  var sliderEffect = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = sliderEffect.querySelector('.effect-level__pin');
  var effectLevel = sliderEffect.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  // дефолт
  var maxWidthLine;
  var coordCorrection;
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (coordCorrection === undefined){
    	pinWidth = effectLevelPin.offsetWidth;
      	coordCorrection = pinWidth / 2
    }
    console.log(coordCorrection);
    var startCoords = {
      x: evt.clientX 
    };
    var isDragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX 
      };
      if (maxWidthLine === undefined) {
        maxWidthLine = effectLevelPin.offsetLeft;
      }
      
      
      
    
      var gogi = (100 / maxWidthLine) * (effectLevelPin.offsetLeft - shift.x);

      var left = 'left: ' + (effectLevelPin.offsetLeft - shift.x ) + 'px; ';
      var width = 'width: ' + (effectLevelPin.offsetLeft - shift.x) + 'px; ';
      var value = gogi;

      if (gogi < 0) {
        left = 'left: 0%';
        var width = 'width: 0%; ';
        var value = 0;

      }
      if (gogi > 100) {
      	left = 'left: 100%';
        var width = 'width: 100%; ';
        var value = 100;
      }

      effectLevelPin.setAttribute('style', left);
      effectLevelDepth.setAttribute('style', width);
      effectLevel.setAttribute('value', value);

      onEffectSaturateChange();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });





})();


