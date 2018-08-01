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
var mysql = require("mysql");
var LaunchIntent = /** @class */ (function () {
    function LaunchIntent() {
    }
    LaunchIntent.prototype.execute = function (httpRequest, alexaRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                console.log("create response");
                r = new response_1.AlexaResponse();
                console.log("set speech");
                r.setSpeech("Hi, I can give you some lunch ideas!");
                console.log("set end");
                r.setShouldEndSession(false);
                console.log("set reprompt");
                r.setReprompt('Try, "Where should I go for lunch"');
                console.log("response done");
                // const directive = new BodyTemplate1();
                // directive.setBackgroundImage(getRandomImage());
                // directive.setTitle('Lunch Bot');
                // r.addDirective(directive);
                return [2 /*return*/, r];
            });
        });
    };
    return LaunchIntent;
}());
exports.LaunchIntent = LaunchIntent;
var GetIdeaIntent = /** @class */ (function () {
    function GetIdeaIntent() {
    }
    GetIdeaIntent.prototype.execute = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, options, selection, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = mysql.createConnection(process.env.JAWSDB_URL);
                        connection.connect();
                        return [4 /*yield*/, (new Promise(function (resolve, reject) {
                                connection.query('SELECT * FROM lunch_spots', function (error, results, fields) {
                                    if (error)
                                        reject(error);
                                    var options = [];
                                    results.forEach(function (row) {
                                        options.push(row.title);
                                    });
                                    resolve(options);
                                });
                            }))];
                    case 1:
                        options = _a.sent();
                        connection.end();
                        selection = options[Math.floor(Math.random() * options.length)];
                        r = new response_1.AlexaResponse();
                        r.setSpeech("How does " + selection + " sound?");
                        return [2 /*return*/, r];
                }
            });
        });
    };
    return GetIdeaIntent;
}());
exports.GetIdeaIntent = GetIdeaIntent;
var AddIdeaIntent = /** @class */ (function () {
    function AddIdeaIntent() {
    }
    AddIdeaIntent.prototype.execute = function (httpRequest, alexaRequest) {
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
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        r.setSpeech("I'm pretty sure that was already on the list.");
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
var TestIntent = /** @class */ (function () {
    function TestIntent() {
    }
    TestIntent.prototype.execute = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                r = new response_1.AlexaResponse();
                r.setSpeech("Hi");
                return [2 /*return*/, r];
            });
        });
    };
    return TestIntent;
}());
exports.TestIntent = TestIntent;
