"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = require("./response");
var images_1 = require("./images");
var request = require("request");
var db = require("./database");
var LaunchIntent = /** @class */ (function () {
    function LaunchIntent() {
    }
    LaunchIntent.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r, directive;
            return __generator(this, function (_a) {
                r = new response_1.AlexaResponse();
                r.setSpeech("Hi, I can give you some lunch ideas!");
                r.setReprompt('Try, "Where should I go for lunch"');
                r.setShouldEndSession(false);
                directive = new response_1.BodyTemplate1();
                directive.setBackgroundImage(images_1.getRandomBackground());
                directive.setTitle('Lunch Bot');
                directive.setPrimaryContent("Ask for a lunch idea, or add a new idea!");
                r.addDirective(directive);
                r.setCard('Lunch Bot', "Ask for a lunch idea, or add a new idea!");
                return [2 /*return*/, r];
            });
        });
    };
    return LaunchIntent;
}());
exports.LaunchIntent = LaunchIntent;
var ExitIntent = /** @class */ (function () {
    function ExitIntent() {
    }
    ExitIntent.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                r = new response_1.AlexaResponse();
                r.setSpeech("Ok, goodbye!");
                r.setShouldEndSession(true);
                return [2 /*return*/, r];
            });
        });
    };
    return ExitIntent;
}());
exports.ExitIntent = ExitIntent;
var GetIdeaIntent = /** @class */ (function () {
    function GetIdeaIntent() {
    }
    GetIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var selection, r, directive;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.getRandomIdea()];
                    case 1:
                        selection = _a.sent();
                        state.lastLunchSpot = selection;
                        r = new response_1.AlexaResponse();
                        r.setSpeech("How does " + selection.title + " sound?");
                        r.setShouldEndSession(false);
                        r.setReprompt("You can say \"That's a bad idea\" or \"That'll do pig\"");
                        directive = new response_1.BodyTemplate2();
                        directive.setBackgroundImage(images_1.getRandomBackground());
                        directive.setImage(images_1.getRandomIcon());
                        directive.setTitle('Lunch Bot');
                        directive.setPrimaryContent("Was that a good idea?");
                        directive.setSecondaryContent("You can ask for another!");
                        r.addDirective(directive);
                        r.setCard('Lunch Bot', "Was that a good idea?\n You can ask for another!");
                        return [2 /*return*/, r];
                }
            });
        });
    };
    return GetIdeaIntent;
}());
exports.GetIdeaIntent = GetIdeaIntent;
var BadIdeaIntent = /** @class */ (function () {
    function BadIdeaIntent() {
    }
    BadIdeaIntent.prototype.getLessOftenPhrase = function () {
        var options = [
            "Ok that idea will come up less often.",
            "I'll suggest that less.",
            "I'll just put a pin in that.",
            "Well that's your opinion.",
            "I didn't think you'd hate it that much...",
            "Woah, it was just a bad lunch idea.",
            "Everyone else seems to disagree.",
            "Well all the other bots like that spot.",
            "I'm doing my best here."
        ];
        return options[Math.floor(Math.random() * options.length)];
    };
    BadIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var r, selection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        if (!state.lastLunchSpot) return [3 /*break*/, 3];
                        return [4 /*yield*/, db.alterScore(state.lastLunchSpot.id, -1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.getRandomIdea()];
                    case 2:
                        selection = _a.sent();
                        state.lastLunchSpot = selection;
                        r.setSpeech(this.getLessOftenPhrase() + " What about " + selection.title + "?");
                        r.setShouldEndSession(false);
                        return [3 /*break*/, 4];
                    case 3:
                        r.setSpeech("I'm not sure which idea we were talking about.");
                        _a.label = 4;
                    case 4: return [2 /*return*/, r];
                }
            });
        });
    };
    return BadIdeaIntent;
}());
exports.BadIdeaIntent = BadIdeaIntent;
var GoodIdeaIntent = /** @class */ (function () {
    function GoodIdeaIntent() {
    }
    GoodIdeaIntent.prototype.getMoreOftenPhrase = function () {
        var options = [
            "Ok that idea will come up more often!",
            "I'll suggest that more.",
            "Don't get too excited, it's just lunch.",
            "I'm a Lunch Bot, good ideas are kind of my thing.",
            "Woah, it was just a good lunch idea.",
            "We will do that every day then.",
            "Enjoy, goodbye.",
            "Glad I could help."
        ];
        return options[Math.floor(Math.random() * options.length)];
    };
    GoodIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        if (!state.lastLunchSpot) return [3 /*break*/, 2];
                        return [4 /*yield*/, db.alterScore(state.lastLunchSpot.id, 1)];
                    case 1:
                        _a.sent();
                        if (process.env.SLACK_HOOK) {
                            request({
                                url: process.env.SLACK_HOOK,
                                method: 'POST',
                                json: true,
                                body: {
                                    text: "@here A lunch group is going to " + state.lastLunchSpot.title + ", probably."
                                }
                            });
                        }
                        r.setSpeech(this.getMoreOftenPhrase());
                        r.setShouldEndSession(true);
                        return [3 /*break*/, 3];
                    case 2:
                        r.setSpeech("I'm not sure which idea we were talking about.");
                        _a.label = 3;
                    case 3: return [2 /*return*/, r];
                }
            });
        });
    };
    return GoodIdeaIntent;
}());
exports.GoodIdeaIntent = GoodIdeaIntent;
var AddIdeaIntent = /** @class */ (function () {
    function AddIdeaIntent() {
    }
    AddIdeaIntent.prototype.getAddedPhrase = function (title) {
        var options = [
            "I added " + title + " to the list.",
            "Ok, " + title + " has been added to the list!",
            title + " was added.",
            "I'll make sure everyone goes to " + title + "!",
            title + " is an excellent idea!"
        ];
        return options[Math.floor(Math.random() * options.length)];
    };
    AddIdeaIntent.prototype.execute = function (state, alexaRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var r, title, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        title = alexaRequest.intent.slots.spot.value;
                        _a = state;
                        return [4 /*yield*/, db.addIdea(title)];
                    case 2:
                        _a.lastLunchSpot = _b.sent();
                        r.setSpeech(this.getAddedPhrase(title));
                        r.setShouldEndSession(false);
                        r.setReprompt("You can ask for an idea, or add another lunch spot!");
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        r.setSpeech("I'm pretty sure that was already on the list.");
                        r.setShouldEndSession(false);
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, r];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AddIdeaIntent;
}());
exports.AddIdeaIntent = AddIdeaIntent;
var RemoveLastIdeaIntent = /** @class */ (function () {
    function RemoveLastIdeaIntent() {
    }
    RemoveLastIdeaIntent.prototype.getRemovedPhrase = function (title) {
        var options = [
            "I removed " + title + ".",
            title + " was deleted.",
            "You're right " + title + " was a terrible idea.",
            title + " was never going to work out anyway."
        ];
        return options[Math.floor(Math.random() * options.length)];
    };
    RemoveLastIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var r, title;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        if (!state.lastLunchSpot) return [3 /*break*/, 2];
                        return [4 /*yield*/, db.removeIdea(state.lastLunchSpot.id)];
                    case 1:
                        _a.sent();
                        title = state.lastLunchSpot.title;
                        state.lastLunchSpot = null;
                        r.setSpeech(this.getRemovedPhrase(title));
                        r.setShouldEndSession(true);
                        return [3 /*break*/, 3];
                    case 2:
                        r.setSpeech("I'm not sure which idea we were talking about.");
                        _a.label = 3;
                    case 3: return [2 /*return*/, r];
                }
            });
        });
    };
    return RemoveLastIdeaIntent;
}());
exports.RemoveLastIdeaIntent = RemoveLastIdeaIntent;
