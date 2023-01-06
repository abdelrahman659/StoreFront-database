"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// show the env Vriable
console.log(process.env);
var _a = process.env, PORT = _a.PORT, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV, BCRIPT_PASSWORD = _a.BCRIPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_KEY = _a.TOKEN_KEY;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: POSTGRES_DB,
    databasetest: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRIPT_PASSWORD,
    salt: SALT_ROUNDS,
    token: TOKEN_KEY,
};
