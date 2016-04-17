/* global reviews */
'use strict';

var IMAGE_TIMEOUT_TIME = 10000;

var reviewTemplate = document.querySelector('#review-template');
var reviewContainer = document.querySelector('.reviews-list');
var elementToClone;

document.querySelector('.reviews-filter').classList.add('invisible');

if('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}

function getReviewElement(data, container) {
  var reviewElement = elementToClone.cloneNode(true);
  var reviewAuthor = reviewElement.querySelector('.review-author');
  var authorAvatar = new Image();
  var imageLoadTimeout;

  authorAvatar.onload = function(evt) {
    clearTimeout(imageLoadTimeout);
    reviewAuthor.src = evt.target.src;
  };

  authorAvatar.onerror = function() {
    reviewAuthor.classList.add('review-load-failure');
  };

  imageLoadTimeout = setTimeout(function() {
    reviewAuthor.src = '';
    reviewAuthor.classList.add('review-load-failure');
  }, IMAGE_TIMEOUT_TIME);

  authorAvatar.src = data.author.picture;
  reviewElement.querySelector('.review-text').textContent = data.description;
  container.appendChild(reviewElement);

  return reviewElement;
}

reviews.forEach(function(review) {
  getReviewElement(review, reviewContainer);
});