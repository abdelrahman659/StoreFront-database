import db from '../database';
import Order from '../types/order.type';
import OrderProduct from '../types/orderProduct.type';


class OrderModel{
/// create Order 
    async create(o:Order):Promise<Order>{
        try{
            const dbconn = await db.connect();
            const sql = `INSERT INTO orders (user_id,status)
            VALUES($1,$2) RETURNING *`;
            const result = await dbconn.query(sql,[o.user_id,o.status]);
            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not create order: ${err}`)
        }
    }
// get All Orders
    async getAllOrders():Promise<Order[]>{
        try{
            const dbconn = await db.connect();
            const sql = 'SELECT * FROM orders';
            const result = await dbconn.query(sql);
            dbconn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not get orders: ${err}`)
        }
    }
//get one Oeder by ID
    async getOrder(id:number):Promise<Order>{
        try{
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const dbconn = await db.connect();
            const result = await dbconn.query(sql,[id]);

            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not find order ${id}: ${(err as Error).message}`)
        }
    }
// update Order by ID
    async updateOrder(o:Order):Promise<Order>{
        try{
            const dbconn = await db.connect();
            const sql = `UPDATE orders
            SET user_id=$1,status=$2 WHERE id=$3
            RETURNING *`;
            const result = await dbconn.query(sql,[
                o.user_id,
                o.status,
                o.id
            ]);
            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not update order: ${(err as Error).message}`);
        }
    }

    // Delete one by ID
async deleteOrder(id:number):Promise<Order>{
    try{
        const dbconn = await db.connect();
        const sql = `DELETE FROM orders
        WHERE id=($1) RETURNING id,user_id,status`;
        const result = await dbconn.query(sql,[id]);
        dbconn.release();
        return result.rows[0];
    }catch(err){
        throw new Error(`Could not delete order ${(err as Error).message}`)
    }
}
// Add product to Order by Add Product id th this Order
async addProductToOrder(p:OrderProduct):Promise<OrderProduct>{
    try{
        const dbconn = await db.connect();
        const sql = `INSERT INTO order_products (order_id, product_id, quantity) 
        VALUES($1, $2, $3) RETURNING *`;
        const result = await dbconn.query(sql,[
            p.order_id,
            p.product_id,
            p.quantity,
        ]);
        dbconn.release();
        return result.rows[0];
    }catch(err){
        throw new Error(`Could not add product to Order: ${err}`)
    }
}

}
export default OrderModel;