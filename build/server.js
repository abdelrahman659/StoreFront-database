"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config"));
var index_1 = __importDefault(require("./routers/index"));
var app = (0, express_1.default)();
// check the port in env file if not found use port 5000
var port = config_1.default.port || 3000;
//Returns middleware 
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api', index_1.default);
app.use(function (_req, res) {
    res.status(404).json({
        message: "Read the API documentation to find the correct path"
    });
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(port));
});
exports.default = app;
