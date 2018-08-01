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
require('dotenv').config();
var express = require("express");
var bodyparser = require("body-parser");
var response_1 = require("./response");
var Intents = require("./intents");
var state_1 = require("./state");
var state = new state_1.State();
var app = express();
app.use(bodyparser.json());
var launchIntent = new Intents.LaunchIntent();
var exitIntent = new Intents.ExitIntent();
var intents = {};
intents['getidea'] = new Intents.GetIdeaIntent();
intents['addidea'] = new Intents.AddIdeaIntent();
intents['goodidea'] = new Intents.GoodIdeaIntent();
intents['badidea'] = new Intents.BadIdeaIntent();
app.post('/api', function (req, res) {
    var alexaContext = req.body.context;
    var alexaRequest = req.body.request;
    var r = new response_1.AlexaResponse();
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var intent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!(alexaRequest.type === 'LaunchRequest')) return [3 /*break*/, 2];
                        state.lastLunchSpot = null;
                        return [4 /*yield*/, launchIntent.execute(state, alexaRequest)];
                    case 1:
                        r = _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(alexaRequest.type === 'IntentRequest')) return [3 /*break*/, 6];
                        intent = intents[alexaRequest.intent.name];
                        if (!intent) return [3 /*break*/, 4];
                        return [4 /*yield*/, intent.execute(state, alexaRequest)];
                    case 3:
                        r = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        r.setSpeech("I'm not sure what to do.");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        if (!(alexaRequest.type === 'SessionEndedRequest')) return [3 /*break*/, 8];
                        return [4 /*yield*/, launchIntent.execute(state, alexaRequest)];
                    case 7:
                        r = _a.sent();
                        state.lastLunchSpot = null;
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_1 = _a.sent();
                        console.log("Error while creating response.", err_1);
                        return [3 /*break*/, 10];
                    case 10:
                        res.send(r.getData());
                        return [2 /*return*/];
                }
            });
        });
    })();
});
app.use('/images/', express.static('images'));
app.use('/', function (req, res) {
    res.send("");
});
app.listen(process.env.PORT, function () {
    // Success callback
    console.log("Listening at " + process.env.PORT + "/");
});
