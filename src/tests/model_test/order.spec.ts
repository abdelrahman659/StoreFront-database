import OrderModel from "../../models/orders.model";
import ProductModel from "../../models/products.model";
import UserModel from "../../models/users.model";
import User from "../../types/user.type";
import Product from "../../types/product.type";
import Order from "../../types/order.type";
const orderStore = new OrderModel();
const productStore = new ProductModel();
const userStore = new UserModel();


describe('Testing order Model',()=>{
    const user = {
        username:"MohamedAli",
        firstName:"Mohamed",
        lastName:"Ali",
    } as User;

    const product = {
        productName:"TV",
        price:2000

    }as Product;

    const order = {
        user_id: 1,
        status:"active"

    }as Order;

    beforeAll(async()=>{
         await userStore.create(user);
         await productStore.create(product);
    });
    afterAll(async()=>{
        await userStore.deleteUser(user.id as number);
        await productStore.deleteProduct(product.id as number);
    });

    it('expect to Create Order',async()=>{
        const addOrder = await orderStore.create(order);
        expect(addOrder.id).toEqual(1);
    });
    it('expext to return All Orders',async()=>{
        const orders = await orderStore.getAllOrders();
        expect(orders[0].id).toEqual(1);
    });
    it('expect to get spicifec Order',async()=>{
        const order = await orderStore.getOrder(1);
        expect(order.id).toEqual(1);
    });

    it('expected to update Order',async()=>{
        const order = await orderStore.updateOrder({
            id: 1,
            user_id: 1,
            status: "active" ,
            products: [{
                id: 1,
                order_id:1,
                product_id:1,
                quantity:10
            }]
        });
        expect(order.status).toEqual("active");
    });
    it('expecting to Delete one Order',async()=>{
        const order = await orderStore.deleteOrder(1);
        expect(order.id).toEqual(1);
    });
})