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
describe('Testing Order Routes', function () {
    it('expect to Create new Order', function () {
        var order = {
            user_id: 1,
            status: true
        };
        request
            .post('/api/order')
            .set('Authorization', "Bearer ".concat(token))
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            id: 1,
            user_id: 1,
            status: true
        });
    });
    it("expect to Add product to an Order", function () {
        var product = {
            product_id: 1,
            quantity: 10
        };
        request
            .post('/api/order/addProduct/2')
            .set('Authorization', "Bearer ".concat(token))
            .send(product)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 10
        });
    });
    it('expected to get All created Order', function () {
        request
            .get('/api/order')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: true
        });
    });
    it('expected to get one Order', function () {
        request
            .get('/api/order/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: true
        });
    });
    it('expectde to updated one Spicifec order', function () {
        var order = {
            id: 1,
            user_id: 1,
            status: true
        };
        request
            .patch('/api/order/1')
            .set('Authorization', "Bearer ".concat(token))
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: true
        });
    });
    it('expect to Deleted spicifec order', function () {
        request
            .delete('/api/order/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: true
        });
    });
});
