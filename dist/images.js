"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var imageList = [
    'cook-food-kitchen-eat-54455.jpeg',
    'pexels-photo-326281.jpeg',
    'pexels-photo-459469.jpeg',
    'pexels-photo-952356.jpeg'
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
