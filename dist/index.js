"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var response_1 = require("./response");
var connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect();
connection.query('SELECT * FROM lunch_spots', function (error, results, fields) {
    if (error)
        throw error;
    results.forEach(function (row) {
        console.log(row.title);
    });
});
connection.end();
//insert into lunch_spots (title) values ("Test");
var app = express();
var port = parseInt(process.env.PORT);
app.use(bodyparser.json());
app.post('/api', function (req, res) {
    var context = req.body.context;
    var request = req.body.request;
    var r = new response_1.AlexaResponse();
    if (request.type === 'LaunchRequest') {
        r.setSpeech("Heroku test");
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
