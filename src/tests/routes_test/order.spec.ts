import supertest from "supertest";
import app from "../../server";
import { createToken } from "../../middleware/authorisation";
import Order from "../../types/order.type";

const request = supertest(app);
const token : string = createToken(1,'bearer');

describe('Testing Order Routes',()=>{
    it('expect to Create new Order',()=>{
        const order = {
            user_id:1,
            status:"active"
        }as Order;
        request
            .post('/api/order')
            .set('Authorization', `Bearer ${token}`)
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: "active"
            })
    });

    it("expect to Add product to an Order",()=>{
        const product = {
            product_id:1,
            quantity:10
        }
        request
            .post('/api/order/addProduct/2')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                order_id: 1,
                product_id:1,
                quantity:10
            })
    });

    it('expected to get All created Order',()=>{
        request
            .get('/api/order')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id: 1,
                status: "active"
            })
    });

    it('expected to get one Order',()=>{
        request
            .get('/api/order/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id:1,
                status: "active"
            })
    })

    it('expectde to updated one Spicifec order',()=>{
        const order = {
            id: 1,
            user_id:1,
            status: "active"
        }as Order;
        request
            .patch('/api/order/1')
            .set('Authorization', `Bearer ${token}`)
            .send(order)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
                id: 1,
                user_id:1,
                status: "active"
            })
    });

    it('expect to Deleted spicifec order',()=>{
        request
        .delete('/api/order/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect({
            id: 1,
            user_id:1,
            status: "complete"
        })
    })

})