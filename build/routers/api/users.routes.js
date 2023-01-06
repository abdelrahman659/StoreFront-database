"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = require("express");
var users_model_1 = __importDefault(require("../../models/users.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config"));
var authorisation_1 = __importDefault(require("../../middleware/authorisation"));
var userModel = new users_model_1.default();
var userRoutes = (0, express_1.Router)();
userRoutes.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.create(req.body)];
            case 1:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token);
                res.json({
                    data: __assign(__assign({}, user), { token: token }),
                    message: 'User Created successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ message: "Could not create user ".concat(err_1) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.get('/', authorisation_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.getAllUsers()];
            case 1:
                users = _a.sent();
                res.json({ data: users,
                    message: 'This is All Users data' });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ message: "Can not get all Users ".concat(err_2) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.get('/:id', authorisation_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.getOne(req.params.id)];
            case 1:
                user = _a.sent();
                res.json({
                    data: user,
                    message: 'User retrieved successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json({
                    message: "Could not get This User data ".concat(err_3, " ")
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.patch('/authenticate/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.updateOneUser(req.body)];
            case 1:
                updatedUser = _a.sent();
                res.json({
                    data: updatedUser,
                    message: 'User updated successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ message: "Can not update this user : ".concat(err_4) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel.deleteUser(req.params.id)];
            case 1:
                deletedUser = _a.sent();
                res.json({
                    data: deletedUser,
                    message: 'User Deleted successfully',
                });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json({ message: "could not delete user: ".concat(err_5) });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
userRoutes.post('/authenticate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, token, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, userModel.authUser(username, password)];
            case 1:
                user = _b.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token);
                if (user) {
                    return [2 /*return*/, res.json({
                            data: __assign(__assign({}, user), { token: token }),
                            message: 'you are Authorized user'
                        })];
                }
                return [2 /*return*/, res.status(401).json({
                        message: "Check your username and password"
                    })];
            case 2:
                err_6 = _b.sent();
                res.status(500).json({
                    message: "Could not get This User data ".concat(err_6, " ")
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = userRoutes;
