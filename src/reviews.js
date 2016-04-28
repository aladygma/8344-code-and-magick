'use strict';

module.exports = function() {
  var FILTERS = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };

  var REQUEST_URL = '//o0.github.io/assets/json/reviews.json';
  var REQUEST_TIMEOUT = 10000;
  var DEFAULT_FILTER = 'reviews-all';
  var IMAGE_TIMEOUT_TIME = 10000;
  var BAD_RATING = 2;
  var GOOD_RATING = 3;
  var PAGE_SIZE = 3;
  //Миллисекунд в 2 неделях
  var RECENT_REVIEWS_TIME = 1000 * 3600 * 24;

  var showMoreReviews = document.querySelector('.reviews-controls-more');
  var templateTag = document.querySelector('#review-template');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsSection = document.querySelector('.reviews');
  var reviewsErrorClass = 'reviews-load-failure';
  var pageNumber = 0;
  var cloneElement;
  var rawData = [];
  var currentFilteredReviews = [];

  if ('content' in templateTag) {
    cloneElement = templateTag.content.querySelector('.review');
  } else {
    cloneElement = templateTag.querySelector('.review');
  }

  reviewsFilter.classList.add('invisible');
  //Здесь я устанавливаю прелоадер
  reviewsSection.classList.add('reviews-list-loading');

  var xhr = new XMLHttpRequest();

  xhr.onload = function(evt) {
    reviewsFilter.classList.remove('invisible');
    //Выключаю прелоадер
    reviewsSection.classList.remove('reviews-list-loading');
    cloneElement.querySelector('.review-rating').classList.add('invisible');

    //Вывод отзывов по умолчанию
    rawData = JSON.parse(evt.target.response);
    currentFilteredReviews = getFilteredReviews(rawData, DEFAULT_FILTER);
    renderReviews(currentFilteredReviews);
  };

  xhr.onerror = function() {
    reviewsSection.classList.add(reviewsErrorClass);
  };

  xhr.timeout = REQUEST_TIMEOUT;
  xhr.ontimeout = function() {
    reviewsSection.classList.add(reviewsErrorClass);
  };

  xhr.open('GET', REQUEST_URL);
  xhr.send();

  //Установка обработчика на кнопку 'Еще отзывы'
  showMoreReviews.addEventListener('click', function() {
    renderReviews(currentFilteredReviews);
  } );

  //Установка обработчика на кнопки фильтров
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.name === 'reviews') {
      pageNumber = 0;
      currentFilteredReviews = getFilteredReviews(rawData, evt.target.id);
      renderReviews(currentFilteredReviews);
    }

  });

  function getFilteredReviews(data, filterType) {
    var unfilteredReviews = data.slice(0);
    var filteredReviews = [];

    switch (filterType) {
      case FILTERS.ALL:
        filteredReviews = unfilteredReviews;
        return filteredReviews;

      case FILTERS.RECENT:
        var currentDate = new Date();

        filteredReviews = unfilteredReviews.filter( function(review) {
          return (currentDate - Date.parse(review.date)) < RECENT_REVIEWS_TIME;
        } );

        filteredReviews.sort( function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        } );

        return filteredReviews;

      case FILTERS.GOOD:
        filteredReviews = unfilteredReviews.filter( function(review) {
          return review.rating >= GOOD_RATING;
        } );

        filteredReviews.sort( function(a, b) {
          return a.rating - b.rating;
        } );

        return filteredReviews;

      case FILTERS.BAD:
        filteredReviews = unfilteredReviews.filter( function(review) {
          return review.rating <= BAD_RATING;
        } );

        filteredReviews.sort( function(a, b) {
          return b.rating - a.rating;
        } );

        return filteredReviews;

      case FILTERS.POPULAR:
        filteredReviews = unfilteredReviews.sort( function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        } );

        return filteredReviews;

      default:
        filteredReviews = unfilteredReviews;
        return filteredReviews;
    }
  }

  function getOneReview(review) {
    var reviewContainer = cloneElement.cloneNode(true);
    var reviewAuthor = reviewContainer.querySelector('.review-author');
    var authorAvatar = new Image();

    authorAvatar.onload = function(evt) {
      reviewAuthor.src = evt.target.src;
      reviewAuthor.width = 124;
      reviewAuthor.height = 124;
      clearTimeout(imageLoadTimeout);
    };

    authorAvatar.onerror = function() {
      reviewContainer.classList.add('review-load-failure');
    };

    authorAvatar.src = review.author.picture;

    var imageLoadTimeout = setTimeout( function() {
      reviewAuthor.src = '';
      reviewAuthor.classList.add('review-load-failure');
    }, IMAGE_TIMEOUT_TIME );

    reviewContainer.querySelector('.review-text').textContent = review. description;
    reviewsList.appendChild(reviewContainer);
  }

  function renderReviews(filteredReviews) {
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;

    if (!pageNumber) {
      reviewsList.innerHTML = '';
    }

    filteredReviews.slice(from, to).forEach( function(review) {
      getOneReview(review);
    } );

    pageNumber++;

    if ( isNextPageAvailable() ) {
      showMoreReviews.classList.remove('invisible');
    } else {
      showMoreReviews.classList.add('invisible');
    }
  }

  function isNextPageAvailable() {
    return currentFilteredReviews.length - (PAGE_SIZE * pageNumber) > 0;
  }
};
