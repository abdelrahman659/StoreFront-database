"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var Token = config_1.default.token;
var createToken = function (id, username) {
    return jsonwebtoken_1.default.sign({ id: id, username: username }, Token);
};
exports.createToken = createToken;
// Handel Authentication in middelware
var tokenMiddleware = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({
            message: "Invaled Token"
        });
        return null;
    }
    try {
        var Token_1 = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(Token_1, config_1.default.token);
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "Login Error try again : ".concat(error)
        });
    }
};
exports.default = tokenMiddleware;
