import ProductModel from "../../models/products.model";

const productStore = new ProductModel();

describe(' Testing Product Model',()=>{
    it('expect to Create Product',async()=>{
        const Product = await productStore.create({
            productName:"TV",
            price: 2000
        });
        expect(Product).toEqual({
            id:1,
            productName:"TV",
            price:2000
        })
    });

    it('expected to get All products',async()=>{
        const products = await productStore.getAllProduct();

        expect(products).toEqual([
            {
            id:1,
            productName:"TV",
            price:2000
            }
        ])
    });

    it('expect to return spicifec Product',async()=>{
        const product = await productStore.getOneProduct(1);
        
        expect(product).toEqual({
            id:1,
            productName:"TV",
            price:2000
        })
    });

    it('expect to update spicifec product',async()=>{
        const product  = await productStore.updateProduct({
            id:1,
            productName:"TV",
            price:2000
        })
        expect(product).toEqual({
            id:1,
            productName:"TV",
            price:2000
        })
    });

    it('expect to delete spicifec product',async()=>{
        //delete product using id 
        await productStore.deleteProduct(1);
        // get All product After deleteing this product
        const products = await productStore.getAllProduct();
        expect(products).toEqual([]);
    })
})