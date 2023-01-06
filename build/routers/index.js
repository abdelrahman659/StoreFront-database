"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorisation_1 = __importDefault(require("../middleware/authorisation"));
var users_routes_1 = __importDefault(require("./api/users.routes"));
var products_routes_1 = __importDefault(require("./api/products.routes"));
var order_routes_1 = __importDefault(require("./api/order.routes"));
var routes = (0, express_1.Router)();
routes.use('/user', users_routes_1.default);
routes.use('/product', authorisation_1.default, products_routes_1.default);
routes.use('/order', authorisation_1.default, order_routes_1.default);
exports.default = routes;
