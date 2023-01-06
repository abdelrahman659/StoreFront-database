import supertest from "supertest";
import app from "../../server";
import { createToken } from "../../middleware/authorisation";
import Product from "../../types/product.type";

const request = supertest(app);
const token : string = createToken(1,'bearer');


describe('Testing Product Routes',()=>{
    it('expect To get Product after Created',()=>{
        const product={
            productName:"TV",
            price:1000

        } as Product;
        request
        .post('/api/product')
        .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                productName:"TV",
                price:1000
            });
    });

    it('expect to get All Products',()=>{
        request
        .get('/api/product')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
            id: 1,
            productName:"TV",
            price:1000
        })
    });

    it('expect to get One Product',()=>{
        request
            .get('/api/product/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                productName:"TV",
                price:1000
            })
    });
    it('expect to get one Product and update',()=>{
        const product={
            productName:"TV",
            price:1000
        }as Product;
        request
            .patch('/api/product/1')
            .set('Authorization', `Bearer ${token}`)
            .send(product)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
                id: 1,
                productName:"TV",
                price:1000
            })
    });
    it('expect to delete one Product',()=>{
        request
            .delete('/api/product/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/product').expect({})
            })
    })
})