'use strict';

module.exports = function() {
  var browserCookies = require('browser-cookies');
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
  var reviewMarks = document.querySelectorAll('input[name=review-mark]');
  var reviewFields = document.querySelector('.review-fields');

  function getLastDateMarker() {
    var dateMarker = new Date(1987, 0, 15);
    var todayDate = new Date();

    if (dateMarker.getMonth() > todayDate.getMonth()) {
      return new Date(todayDate.getFullYear() - 1,
                      dateMarker.getMonth(),
                      dateMarker.getDate());
    } else {
      return new Date(todayDate.getFullYear(),
                      dateMarker.getMonth(),
                      dateMarker.getDate());
    }
  }

  function setFromCookies() {
    var cookiesMark = browserCookies.get('cookieMark');
    var cookiesName = browserCookies.get('cookieName');

    if (cookiesMark && cookiesName) {
      var reviewMarkId = '#review-mark-' + cookiesMark;
      var reviewMark = document.querySelector(reviewMarkId);

      reviewMark.setAttribute('checked', true);
      formNameInput.value = cookiesName;
    }
  }

  function setNewCookies(time) {
    var expiresTime = Math.round(time / 1000 / 60 / 60 / 24);

    browserCookies.set('cookieMark', getMark() + '', {expires: expiresTime});
    browserCookies.set('cookieName', getName(), {expires: expiresTime});
  }

  function getMark() {
    return Number(document.querySelector('[name=review-mark]:checked').value);
  }

  function getName() {
    formNameInput = document.querySelector('#review-name');
    //Удаляем лишние пробелы
    return formNameInput.value.replace(/\s+/g, '');
  }

  function getReviewText() {
    formReviewText = document.querySelector('#review-text');
    //Удаляем лишние пробелы
    return formReviewText.value.replace(/\s+/g, '');
  }

  function checkSubmitButton() {
    //Чтобы не делать вложенные If, каждый раз при вызове
    //функции добавляем эти классы, а потом уже идет проверка
    formNameIndicator.classList.remove('invisible');
    formTextIndicator.classList.remove('invisible');

    if(getMark() >= MIN_MARK) {
      formTextIndicator.classList.add('invisible');
    }
    if (getName() !== '') {
      formNameIndicator.classList.add('invisible');
    }
    if (getReviewText() !== '') {
      formTextIndicator.classList.add('invisible');
    }
    if (formNameIndicator.classList.contains('invisible') &&
        formTextIndicator.classList.contains('invisible')) {
      formSubmitButton.disabled = isDisabled;
      reviewFields.classList.add('invisible');
    } else {
      formSubmitButton.disabled = isEnabled;
      reviewFields.classList.remove('invisible');
    }
  }
  //Устанавливаем cookie
  setFromCookies();

  for (var i = 0; i < reviewMarks.length; i++) {
    reviewMarks[i].onchange = checkSubmitButton;
  }

  //Это чтобы при загрузке формы убрать указатель
  //для поля 'отзыв'
  if (getMark() === MIN_MARK) {
    formTextIndicator.classList.add('invisible');
  }

  formNameInput.oninput = checkSubmitButton;

  formReviewText.oninput = checkSubmitButton;

  formSubmitButton.onclick = function(evt) {
    evt.preventDefault();
    setNewCookies(getLastDateMarker());
    document.querySelector('.review-form').submit();
  };


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
};
