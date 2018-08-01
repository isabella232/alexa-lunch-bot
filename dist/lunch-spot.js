"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LunchSpot = /** @class */ (function () {
    function LunchSpot(row) {
        this.id = parseInt(row['id']);
        this.title = row['title'];
        this.score = parseInt(row['score']);
        this.lastSuggsted = new Date(row['lastSuggsted']);
    }
    return LunchSpot;
}());
exports.LunchSpot = LunchSpot;
