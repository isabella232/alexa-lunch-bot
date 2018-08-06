"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var bodyparser = require("body-parser");
var alexa = require("./alexa");
var slack = require("./slack");
var app = express();
app.use(bodyparser.json());
app.use('/api', alexa.router);
app.use('/slack', slack.router);
app.use('/images/', express.static('images'));
app.use('/', function (_req, res) {
    res.send("<html><body><h1>Lunch Bot</h1><p>This is the api server for the Lunch Bot alexa skill.</p></body></html>");
});
app.listen(process.env.PORT, function () {
    // Success callback
    console.log("Listening at " + process.env.PORT + "/");
});
