"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
;
// Basic Class to represent display interface BodyTemplate1
var BodyTemplate1 = /** @class */ (function () {
    function BodyTemplate1() {
        this.data = {
            type: "Display.RenderTemplate",
            token: "aToken",
            template: {
                type: "BodyTemplate1",
                backButton: "HIDDEN",
                textContent: {},
                title: "",
                backgroundImage: {}
            }
        };
    }
    BodyTemplate1.prototype.setBackgroundImage = function (url) {
        this.data.template.backgroundImage = {
            sources: [{
                    url: url.toString()
                }]
        };
    };
    BodyTemplate1.prototype.setTitle = function (title) {
        this.data.template.title = title;
    };
    BodyTemplate1.prototype.setPrimaryContent = function (msg) {
        this.data.template.textContent.primaryText = {
            text: msg,
            type: "PlainText"
        };
    };
    BodyTemplate1.prototype.setSecondaryContent = function (msg) {
        this.data.template.textContent.secondaryText = {
            text: msg,
            type: "PlainText"
        };
    };
    BodyTemplate1.prototype.setTertiaryContent = function (msg) {
        this.data.template.textContent.tertiaryText = {
            text: msg,
            type: "PlainText"
        };
    };
    BodyTemplate1.prototype.getData = function () {
        return this.data;
    };
    return BodyTemplate1;
}());
exports.BodyTemplate1 = BodyTemplate1;
var AlexaResponse = /** @class */ (function () {
    function AlexaResponse() {
        this.data = {
            version: "1.0",
            response: {
                directives: []
            }
        };
    }
    // Should alexa end the skill after this response? Default is true
    AlexaResponse.prototype.setShouldEndSession = function (shouldEnd) {
        this.data.response.shouldEndSession = shouldEnd;
    };
    // If the user makes a follow up statement that doesn't match anything in our skill Alexa will say the "reprompt"
    AlexaResponse.prototype.setReprompt = function (msg) {
        this.data.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: msg
            }
        };
    };
    // What should Alexa say, SSML not currently supported by this skill
    AlexaResponse.prototype.setSpeech = function (msg) {
        this.data.response.outputSpeech = {
            type: "PlainText",
            text: msg
        };
    };
    AlexaResponse.prototype.addDirective = function (directive) {
        this.data.response.directives.push(directive.getData());
    };
    AlexaResponse.prototype.getData = function () {
        return this.data;
    };
    return AlexaResponse;
}());
exports.AlexaResponse = AlexaResponse;
