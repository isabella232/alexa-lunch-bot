"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var AlexaResponse = /** @class */ (function () {
    function AlexaResponse() {
        this.data = {
            version: "1",
            response: {}
        };
    }
    AlexaResponse.prototype.setSpeech = function (msg) {
        this.data.response.outputSpeech = {
            type: "PlainText",
            text: msg,
            ssml: "<speak>" + msg + "</speak>"
        };
    };
    AlexaResponse.prototype.getData = function () {
        return this.data;
    };
    return AlexaResponse;
}());
exports.AlexaResponse = AlexaResponse;
