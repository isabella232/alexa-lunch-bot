"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var bodyparser = require("body-parser");
var response_1 = require("./response");
var intents_1 = require("./intents");
//insert into lunch_spots (title) values ("Test");
var app = express();
var port = parseInt(process.env.PORT);
app.use(bodyparser.json());
var intents = {};
var getidea = new intents_1.GetIdeaIntent();
intents[getidea.key] = getidea;
app.post('/api', function (req, res) {
    var context = req.body.context;
    var request = req.body.request;
    var r = new response_1.AlexaResponse();
    if (request.type === 'LaunchRequest') {
        r.setSpeech("Heroku test");
    }
    else if (request.type === 'IntentRequest') {
        r = intents[request.intent.name].execute(request);
    }
    res.send(r.getData());
});
app.use('/', function (req, res) {
    res.send("Hello world");
});
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
