'use strict';

(function() {
  var MIN_MARK = 3;
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formNameInput = document.querySelector('#review-name');
  var formReviewText = document.querySelector('#review-text');
  var formNameIndicator = document.querySelector('.review-fields-name');
  var formTextIndicator = document.querySelector('.review-fields-text');
  var formSubmitButton = document.querySelector('.review-submit');


  function getMark() {
    var reviewMark = document.querySelector('[name=review-mark]:checked');
    return +reviewMark.value;
  }

  function getName() {
    formNameInput = document.querySelector('#review-name');
    //Удаляем лишние пробелы
    var name = formNameInput.value.replace(/(^\s+|\s+$)/g, '');

    if (name) {
      formNameIndicator.style.visibility = 'hidden';
    } else {
      formNameIndicator.style.visibility = 'visible';
      formSubmitButton.setAttribute('disabled', true);
    }

    return name;
  }

  function getReviewText() {
    formReviewText = document.querySelector('#review-text');
    //Удаляем лишние пробелы
    var reviewText = formReviewText.value.replace(/(^\s+|\s+$)/g, '');

    if (reviewText) {
      formTextIndicator.style.visibility = 'hidden';
      formSubmitButton.removeAttribute('disabled');
    } else {
      formTextIndicator.style.visibility = 'visible';
      formSubmitButton.setAttribute('disabled', true);
    }
  }

  //По умолчанию кнопка деактивирована
  formSubmitButton.setAttribute('disabled', true);


  formNameInput.oninput = function(evt) {
    evt.preventDefault();
    var mark = getMark();

    if (mark < MIN_MARK) {
      formReviewText.setAttribute('required', true);
    } else {
      formReviewText.removeAttribute('required');
      formSubmitButton.removeAttribute('disabled');
      formTextIndicator.style.visibility = 'hidden';
    }

    getName();

  };

  formReviewText.oninput = function(evt) {
    evt.preventDefault();
    getReviewText();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
