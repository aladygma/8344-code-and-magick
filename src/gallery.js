'use strict';

module.exports = function() {

  var IMAGES_QTY = 10;
  var IMAGES_FIRST_NUMBER = 1;

  var photoGallery = document.querySelector('.photogallery');
  var gallery = document.querySelector('.overlay-gallery');
  var galleryCloseButton = gallery.querySelector('.overlay-gallery-close');
  var galleryControlLeft = gallery.querySelector('.overlay-gallery-control-left');
  var galleryControlRight = gallery.querySelector('.overlay-gallery-control-right');
  var galleryPreview = gallery.querySelector('.overlay-gallery-preview');
  var previewNumberCurrent = gallery.querySelector('.preview-number-current');
  var previewNumberTotal = gallery.querySelector('.preview-number-total');
  var imagesAddresses = [];
  var currentImageIndex;

  getImagesFeatures();

  photoGallery.addEventListener('click', function(evt) {
    if (evt.target.tagName === 'IMG') {
      showGallery(evt);
    }
  });

  function getImagesFeatures() {
    for (var i = IMAGES_FIRST_NUMBER; i <= IMAGES_QTY; i++) {
      var address = 'http://localhost:8080/img/screenshots/' + i + '.png';
      imagesAddresses.push(address);
    }
  }


  function showGallery(evt) {
    gallery.classList.remove('invisible');
    currentImageIndex = imagesAddresses.indexOf(evt.target.src);

    galleryControlRight.addEventListener('click', showNextImage);
    galleryControlLeft.addEventListener('click', showPreviousImage);
    galleryCloseButton.addEventListener('click', hideGallery);
    document.addEventListener('keydown', _onDocumentKeyDown);

    showGalleryImage(currentImageIndex);
  }

  function _onDocumentKeyDown(evt) {
    if (evt.keyCode === 27) {
      hideGallery();
    }
  }

  function showGalleryImage(index) {
    previewNumberTotal.innerHTML = imagesAddresses.length;
    previewNumberCurrent.innerHTML = parseInt(index, 10) + 1;

    var previewImage = new Image();
    previewImage.src = imagesAddresses[index];

    previewImage.onload = function() {
      galleryPreview.style.backgroundImage = 'url(' + previewImage.src + ')';
      galleryPreview.style.width = previewImage.width + 'px';
      galleryPreview.style.height = previewImage.height + 'px';
    };
  }

  function showNextImage() {
    if (previewNumberCurrent.innerHTML < imagesAddresses.length) {
      currentImageIndex++;
      showGalleryImage(currentImageIndex);
    }
  }

  function showPreviousImage() {
    if (previewNumberCurrent.innerHTML > 1) {
      currentImageIndex--;
      showGalleryImage(currentImageIndex);
    }
  }

  function hideGallery() {
    document.removeEventListener('keydown', _onDocumentKeyDown);
    galleryControlRight.removeEventListener('click', showNextImage);
    galleryControlLeft.removeEventListener('click', showPreviousImage);
    galleryCloseButton.removeEventListener('click', hideGallery);
    gallery.classList.add('invisible');
  }

};


