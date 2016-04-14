'use strict';

(function() {
  var MIN_MARK = 3;
  var isDisabled = false;
  var isEnabled = true;
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formNameInput = document.querySelector('#review-name');
  var formReviewText = document.querySelector('#review-text');
  var formNameIndicator = document.querySelector('.review-fields-name');
  var formTextIndicator = document.querySelector('.review-fields-text');
  var formSubmitButton = document.querySelector('.review-submit');


  function getMark() {
    return Number(document.querySelector('[name=review-mark]:checked').value);
  }

  function getName() {
    formNameInput = document.querySelector('#review-name');
    //Удаляем лишние пробелы
    var name = formNameInput.value.replace(/\s+/g, '');

    if (name) {
      formNameIndicator.classList.add('invisible');
    } else {
      formNameIndicator.classList.remove('invisible');
      formSubmitButton.disabled = isDisabled;
    }

    return name;
  }

  function getReviewText() {
    formReviewText = document.querySelector('#review-text');
    //Удаляем лишние пробелы
    var reviewText = formReviewText.value.replace(/\s+/g, '');

    if (reviewText) {
      formTextIndicator.classList.add('invisible');
      formSubmitButton.disabled = isDisabled;
    } else {
      formTextIndicator.classList.remove('invisible');
      formSubmitButton.disabled = isEnabled;
    }
  }


  formNameInput.oninput = function() {

    formNameIndicator.classList.add('invisible');

    if(getMark() >= MIN_MARK) {
      formReviewText.required = isDisabled;
      formSubmitButton.disabled = isDisabled;
      formTextIndicator.classList.add('invisible');
    } else {
      formTextIndicator.classList.remove('invisible');
      formSubmitButton.disabled = isEnabled;
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
