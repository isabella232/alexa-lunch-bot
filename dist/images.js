"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var backgroundList = [
    'cook-food-kitchen-eat-54455.jpeg',
    'pexels-photo-326281.jpeg',
    'pexels-photo-459469.jpeg',
    'pexels-photo-952356.jpeg'
];
var iconList = [
    'pexels-photo-356079.jpeg',
    'pexels-photo-355988.jpeg',
    'pexels-photo-247753.jpeg'
];
var basePath = '/images/';
function getRandomBackground() {
    var image = backgroundList[Math.floor(Math.random() * backgroundList.length)];
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
exports.getRandomBackground = getRandomBackground;
function getRandomIcon() {
    var image = iconList[Math.floor(Math.random() * iconList.length)];
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
exports.getRandomIcon = getRandomIcon;
