"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var imageList = [
    'appetizer-dark-delicious-326279.jpg',
    'basil-delicious-food-459469.jpg',
    'carrots-food-fresh-616404.jpg',
    'dish-egg-food-54455.jpg'
];
var basePath = '/images/';
function getRandomImage(hostName) {
    var image = imageList[Math.floor(Math.random() * imageList.length)];
    return new url_1.URL("" + hostName + basePath + image);
}
exports.getRandomImage = getRandomImage;
