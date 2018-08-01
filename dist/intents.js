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
var lunch_spot_1 = require("./lunch-spot");
var mysql = require("mysql");
function getRandomIdea() {
    return __awaiter(this, void 0, void 0, function () {
        var options, selection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllSpots()];
                case 1:
                    options = _a.sent();
                    selection = options[Math.floor(Math.random() * options.length)];
                    return [2 /*return*/, selection];
            }
        });
    });
}
function getAllSpots() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, options;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = mysql.createConnection(process.env.JAWSDB_URL);
                    connection.connect();
                    return [4 /*yield*/, (new Promise(function (resolve, reject) {
                            connection.query('select * from lunch_spots order by lastSuggested ASC, score DESC limit 5', function (error, results) {
                                if (error)
                                    reject(error);
                                var spots = [];
                                results.forEach(function (row) {
                                    spots.push(new lunch_spot_1.LunchSpot(row));
                                });
                                resolve(spots);
                            });
                        }))];
                case 1:
                    options = _a.sent();
                    connection.end();
                    return [2 /*return*/, options];
            }
        });
    });
}
function alterScore(id, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = mysql.createConnection(process.env.JAWSDB_URL);
                    connection.connect();
                    return [4 /*yield*/, (new Promise(function (resolve, reject) {
                            connection.query('UPDATE lunch_spots SET score = score + ? WHERE id = ?', [amount, id], function (error) {
                                if (error)
                                    reject(error);
                                resolve();
                            });
                        }))];
                case 1:
                    _a.sent();
                    connection.end();
                    return [2 /*return*/];
            }
        });
    });
}
function setDate(id) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = mysql.createConnection(process.env.JAWSDB_URL);
                    connection.connect();
                    return [4 /*yield*/, (new Promise(function (resolve, reject) {
                            connection.query('UPDATE lunch_spots SET lastSuggested = NOW() where id = ?', [id], function (error) {
                                if (error)
                                    reject(error);
                                resolve();
                            });
                        }))];
                case 1:
                    _a.sent();
                    connection.end();
                    return [2 /*return*/];
            }
        });
    });
}
var LaunchIntent = /** @class */ (function () {
    function LaunchIntent() {
    }
    LaunchIntent.prototype.execute = function (state, alexaRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var r, directive;
            return __generator(this, function (_a) {
                r = new response_1.AlexaResponse();
                r.setSpeech("Hi, I can give you some lunch ideas!");
                r.setReprompt('Try, "Where should I go for lunch"');
                r.setShouldEndSession(false);
                directive = new response_1.BodyTemplate1();
                directive.setBackgroundImage(images_1.getRandomImage());
                directive.setTitle('Lunch Bot');
                directive.setPrimaryContent("Ask for a lunch idea, or add a new idea!");
                r.addDirective(directive);
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
    ExitIntent.prototype.execute = function (state, alexaRequest) {
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
            var selection, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getRandomIdea()];
                    case 1:
                        selection = _a.sent();
                        return [4 /*yield*/, setDate(selection.id)];
                    case 2:
                        _a.sent();
                        state.lastLunchSpot = selection;
                        r = new response_1.AlexaResponse();
                        r.setSpeech("How does " + selection.title + " sound?");
                        r.setShouldEndSession(false);
                        r.setReprompt("You can say \"That's a bad idea\" or \"That'll do pig\"");
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
    BadIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var r, selection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        if (!state.lastLunchSpot) return [3 /*break*/, 3];
                        alterScore(state.lastLunchSpot.id, -1);
                        return [4 /*yield*/, getRandomIdea()];
                    case 1:
                        selection = _a.sent();
                        return [4 /*yield*/, setDate(selection.id)];
                    case 2:
                        _a.sent();
                        state.lastLunchSpot = selection;
                        r.setSpeech("Ok that idea will come up less often. What about " + selection.title + "?");
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
    GoodIdeaIntent.prototype.execute = function (state) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                r = new response_1.AlexaResponse();
                if (state.lastLunchSpot) {
                    alterScore(state.lastLunchSpot.id, 1);
                    r.setSpeech("Ok that idea will come up more often!");
                    r.setShouldEndSession(true);
                }
                else {
                    r.setSpeech("I'm not sure which idea we were talking about.");
                }
                return [2 /*return*/, r];
            });
        });
    };
    return GoodIdeaIntent;
}());
exports.GoodIdeaIntent = GoodIdeaIntent;
var AddIdeaIntent = /** @class */ (function () {
    function AddIdeaIntent() {
    }
    AddIdeaIntent.prototype.execute = function (state, alexaRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var r, connection, title_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new response_1.AlexaResponse();
                        connection = mysql.createConnection(process.env.JAWSDB_URL);
                        connection.connect();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        title_1 = alexaRequest.intent.slots.spot.value;
                        return [4 /*yield*/, (new Promise(function (resolve, reject) {
                                connection.query('Insert into lunch_spots SET ?', { title: title_1 }, function (error) {
                                    if (error)
                                        reject(error);
                                    resolve();
                                });
                            }))];
                    case 2:
                        _a.sent();
                        r.setSpeech("Ok, " + title_1 + " has been added to the list!");
                        r.setShouldEndSession(false);
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        r.setSpeech("I'm pretty sure that was already on the list.");
                        r.setShouldEndSession(false);
                        return [3 /*break*/, 5];
                    case 4:
                        connection.end();
                        return [2 /*return*/, r];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AddIdeaIntent;
}());
exports.AddIdeaIntent = AddIdeaIntent;
