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
var mysql = require("mysql");
var lunch_spot_1 = require("./lunch-spot");
// Randomly select an idea
function getRandomIdea() {
    return __awaiter(this, void 0, void 0, function () {
        var options, selection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllSpots()];
                case 1:
                    options = _a.sent();
                    selection = options[Math.floor(Math.random() * options.length)];
                    return [4 /*yield*/, setDate(selection.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, selection];
            }
        });
    });
}
exports.getRandomIdea = getRandomIdea;
// Get a list of ideas to choose from
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
exports.getAllSpots = getAllSpots;
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
exports.alterScore = alterScore;
// Set the last suggested date
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
exports.setDate = setDate;
// Remove an idea from the DB
function removeIdea(id) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = mysql.createConnection(process.env.JAWSDB_URL);
                    connection.connect();
                    return [4 /*yield*/, (new Promise(function (resolve, reject) {
                            connection.query('DELETE FROM lunch_spots where id = ?', [id], function (error) {
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
exports.removeIdea = removeIdea;
// Add an idea to the DB
function addIdea(title) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, insertedSpot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = mysql.createConnection(process.env.JAWSDB_URL);
                    connection.connect();
                    return [4 /*yield*/, (new Promise(function (resolve, reject) {
                            connection.query('Insert into lunch_spots SET ?', { title: title }, function (error, insertResult) {
                                if (error)
                                    reject(error);
                                connection.query('SELECT * FROM lunch_spots WHERE id = ?', [insertResult.insertId], function (error, queryResult) {
                                    if (error)
                                        reject(error);
                                    if (queryResult.length === 0)
                                        reject();
                                    resolve(new lunch_spot_1.LunchSpot(queryResult[0]));
                                });
                            });
                        }))];
                case 1:
                    insertedSpot = _a.sent();
                    connection.end();
                    return [2 /*return*/, insertedSpot];
            }
        });
    });
}
exports.addIdea = addIdea;
