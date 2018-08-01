"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./response");
var mysql = require("mysql");
var connection = mysql.createConnection(process.env.JAWSDB_URL);
var GetIdeaIntent = /** @class */ (function () {
    function GetIdeaIntent() {
        this.key = 'getidea';
    }
    GetIdeaIntent.prototype.execute = function (handlerInput) {
        connection.connect();
        var options = [];
        connection.query('SELECT * FROM lunch_spots', function (error, results, fields) {
            if (error)
                throw error;
            results.forEach(function (row) {
                options.push(row.title);
            });
        });
        connection.end();
        var selection = options[Math.floor(Math.random() * options.length)];
        var r = new response_1.AlexaResponse();
        r.setSpeech("How does " + selection + " sound?");
        return r;
    };
    return GetIdeaIntent;
}());
exports.GetIdeaIntent = GetIdeaIntent;
