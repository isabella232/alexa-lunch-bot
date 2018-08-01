"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var AlexaResponse = /** @class */ (function () {
    function AlexaResponse() {
        this.data = {
            version: "1.0",
            response: {},
        };
    }
    AlexaResponse.prototype.setSpeech = function (msg) {
        this.data.response.outputSpeech = {
            type: "PlainText",
            text: msg,
            ssml: "<speak>" + msg + "</speak>"
        };
    };
    AlexaResponse.prototype.addDirective = function () {
        this.data.response.card = {
            "type": "Standard",
            "title": "Title of the card",
            "content": "Content of a simple card",
            "text": "Text content for a standard card"
        };
        this.data.response.directives = this.data.response.directives || [];
        this.data.response.directives.push({
            "type": "Display.RenderTemplate",
            "template": {
                "type": "BodyTemplate2",
                "backButton": "VISIBLE",
                "backgroundImage": {
                    "contentDescription": "Textured grey background",
                    "sources": [
                        {
                            "url": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"
                        }
                    ]
                },
                "title": "My Favorite Car",
                "image": {
                    "contentDescription": "My favorite car",
                    "sources": [
                        {
                            "url": "https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "text": "See my favorite car",
                        "type": "PlainText"
                    },
                    "secondaryText": {
                        "text": "Custom-painted",
                        "type": "PlainText"
                    },
                    "tertiaryText": {
                        "text": "By me!",
                        "type": "PlainText"
                    }
                }
            }
        });
    };
    AlexaResponse.prototype.getData = function () {
        return this.data;
    };
    return AlexaResponse;
}());
exports.AlexaResponse = AlexaResponse;
