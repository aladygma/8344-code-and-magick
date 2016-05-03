'use strict';
var game = require('./game');
var form = require('./form');
var reviews = require('./reviews');
var gallery = require('./gallery');

game();
form();
reviews();

gallery.getImagesFeatures(
  ['img/screenshots/1.png',
   'img/screenshots/2.png',
   'img/screenshots/3.png',
   'img/screenshots/4.png',
   'img/screenshots/5.png',
   'img/screenshots/6.png',
   'img/screenshots/7.png',
   'img/screenshots/8.png',
   'img/screenshots/9.png',
   'img/screenshots/10.png']
);
