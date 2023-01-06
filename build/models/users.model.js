"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var config_1 = __importDefault(require("../config"));
// Hashing user Password using Salt and Pepper
var hashPassword = function (password) {
    var salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync("".concat(password).concat(config_1.default.pepper), salt);
};
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var dbconn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        sql = "INSERT INTO Users(username,firstName,lastName,password)\n            VALUES ($1,$2,$3,$4) RETURNING id,username,firstName,lastName";
                        return [4 /*yield*/, dbconn.query(sql, [
                                user.username,
                                user.firstName,
                                user.lastName,
                                hashPassword(user.password)
                            ])];
                    case 2:
                        result = _a.sent();
                        dbconn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Unable to create (".concat(user.username, "): ").concat(err_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbconn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        sql = 'SELECT id,username,firstName,lastName FROM Users';
                        return [4 /*yield*/, dbconn.query(sql)];
                    case 2:
                        result = _a.sent();
                        dbconn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Can not retrieving All users ".concat(err_2.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, dbconn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT id,username,firstName,lastName FROM Users\n            WHERE id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        return [4 /*yield*/, dbconn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        dbconn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ", ").concat(err_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.updateOneUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var dbconn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        sql = "UPDATE Users\n            SET username=$1,firstName=$2,lastName=$3,password=$4\n            WHERE id=$5\n            RETURNING id,username,firstName,lastName";
                        return [4 /*yield*/, dbconn.query(sql, [
                                user.username,
                                user.firstName,
                                user.lastName,
                                hashPassword(user.password),
                                user.id,
                            ])];
                    case 2:
                        result = _a.sent();
                        dbconn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not update user: \n            ".concat(user.username, ", ").concat(err_4.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbconn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        sql = "DELETE FROM Users\n            WHERE id=($1)\n            RETURNING id,username,firstName,lastName";
                        return [4 /*yield*/, dbconn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        dbconn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, " , ").concat(err_5.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.authUser = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var dbconn, sql, result, hashPassword_1, valid, user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbconn = _a.sent();
                        sql = 'SELECT password FROM Users WHERE username=$1';
                        return [4 /*yield*/, dbconn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        hashPassword_1 = result.rows[0].password;
                        valid = bcrypt_1.default.compareSync("".concat(password).concat(config_1.default.pepper), hashPassword_1);
                        if (!valid) return [3 /*break*/, 4];
                        return [4 /*yield*/, dbconn.query('SELECT id,username,firstName,lastName FROM Users WHERE username=($1)', [username])];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user.rows[0]];
                    case 4:
                        dbconn.release();
                        return [2 /*return*/, undefined];
                    case 5:
                        err_6 = _a.sent();
                        throw new Error("You are not Authorized : ".concat(err_6));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
