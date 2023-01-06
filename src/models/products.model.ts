import db from '../database';
import Product from '../types/product.type';

class ProductModel{
    // Create Product and insert to products Table
    async create(p:Product):Promise<Product>{
        try{

            const dbconn = await db.connect();
            const sql = `INSERT INTO products (productName,price)VALUES($1,$2)
            RETURNING *`;
            const result = await dbconn.query(sql,[
                p.productName,
                p.price
            ]);

dbconn.release();
return result.rows[0]

        }catch(err){
            throw new Error(`Unable to create (${p.productName}}): ${(err as Error).message}`)
        }
    }
// Get All Products From  Products table
    async getAllProduct():Promise<Product[]>{
        try{
            const dbconn = await db.connect();
            const sql = 'SELECT * FROM products';
            const result  = await dbconn.query(sql);
            dbconn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not find product ${err}`)
        }
    }
// get One product by ID 
    async getOneProduct(id:number):Promise<Product>{
        try{
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const dbconn = await db.connect();
            const result = await dbconn.query(sql,[id]);
            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not find product ${id}: ${(err as Error).message}`)
        }
    }
// Update one Product by ID
    async updateProduct(p:Product):Promise<Product>{
        try{
            const dbconn = await db.connect();
            const sql = `UPDATE products
            SET productName=$1,price=$2 WHERE id=$3
            RETURNING id,productName,price`;
            const result = await dbconn.query(sql,[
                p.productName,
                p.price,
                p.id
            ]);
            dbconn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not update product ${p.productName}: ${(err as Error).message}`)
        }
    }
// Delete one product by ID
    async deleteProduct(id:number):Promise<Product>{
        try{
            const dbconn = await db.connect();
            const sql = `DELETE FROM products
            WHERE id=($1) RETURNING id,productName,price`;
            const result = await dbconn.query(sql,[id]);
            dbconn.release();
            return result.rows[0];

        }catch(err){
            throw new Error(`Could not delete product ${(err as Error).message}`)
        }
    }
}

export default ProductModel;