import { Router,Request,Response, response } from "express";
import ProductModel from "../../models/products.model";
const productModel = new ProductModel();

const routes = Router();
//This is All Products Routes

routes.post('/',async(req:Request,res:Response)=>{
    try{
        const product = await productModel.create(req.body);
        res.json({
            data: {...product},
            message:'Product created successfully'
        })
    }catch(err){
        res.status(500).json({message:`Could not create Product ${err}`})
    }
});

routes.get('/',async(req:Request,res:Response)=>{
    try{
        const Products = await productModel.getAllProduct()
res.json({
    data:Products,
    message:"Products retrieved succsessfully"
})
    }catch(err){
        res.status(500).json({message:`Can not get all Products ${err}`})
    }
});

routes.get('/:id',async(req:Request,res:Response)=>{
    try{
        const product = await productModel.getOneProduct(req.params.id as unknown as number);
        response.json({
            data:product,
            message:"Product retrieved succsessfully"
        })
    }catch(err){
        res.status(500).json({
            message:`Could not get This Product data ${err} `})
    }
});

routes.patch('/:id',async(req:Request,res:Response)=>{
    try{
        const product = await productModel.updateProduct(req.body);
        res.json({
            data:product,
            message:"Product updated Successfully"
        })
    }catch(err){
        res.status(500).json({message:`Can not update this Product : ${err}`});
    }
});

routes.delete('/:id',async(req:Request,res:Response)=>{
   try{ 
    const product = await productModel.deleteProduct(req.params.id as unknown as number) ;
    res.json({
        data:product,
        message:'Product deleted successfully'
    })
}catch(err){
    res.status(500).json({message:`could not delete Product: ${err}`});
}
});

export default routes;