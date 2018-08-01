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
function getRandomImage() {
    var image = imageList[Math.floor(Math.random() * imageList.length)];
    var urlString = "" + process.env.HOST + basePath + image;
    try {
        var url = new url_1.URL(urlString);
        return url;
    }
    catch (err) {
        console.log("Error building image url: " + urlString);
    }
    return null;
}
exports.getRandomImage = getRandomImage;
