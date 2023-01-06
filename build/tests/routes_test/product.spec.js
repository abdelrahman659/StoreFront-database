"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var authorisation_1 = require("../../middleware/authorisation");
var request = (0, supertest_1.default)(server_1.default);
var token = (0, authorisation_1.createToken)(1, 'bearer');
describe('Testing Product Routes', function () {
    it('expect To get Product after Created', function () {
        var product = {
            productName: "TV",
            price: 1000
        };
        request
            .post('/api/product')
            .set('Authorization', "Bearer ".concat(token))
            .send(product)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
            id: 1,
            productName: "TV",
            price: 1000
        });
    });
    it('expect to get All Products', function () {
        request
            .get('/api/product')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            productName: "TV",
            price: 1000
        });
    });
    it('expect to get One Product', function () {
        request
            .get('/api/product/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            productName: "TV",
            price: 1000
        });
    });
    it('expect to get one Product and update', function () {
        var product = {
            productName: "TV",
            price: 1000
        };
        request
            .patch('/api/product/1')
            .set('Authorization', "Bearer ".concat(token))
            .send(product)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            productName: "TV",
            price: 1000
        });
    });
    it('expect to delete one Product', function () {
        request
            .delete('/api/product/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .then(function () {
            request.get('/api/product').expect({});
        });
    });
});
