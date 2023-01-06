import { Router,Request,Response, response } from "express";
import OrderModel from "../../models/orders.model";
const orderModel= new OrderModel();

const routes = Router();
// This is All Orders Routes
routes.post('/',async(req:Request,res:Response)=>{
   try{ const order = await orderModel.create(req.body);
    res.json({
        data: {...order},
        message:'Order created successfully'
    })
}catch(err){
    res.status(500).json({message:`Could not create Order ${err}`})
}
});

routes.get('/',async(req:Request,res:Response)=>{
    try{
        const orders = await orderModel.getAllOrders();
        res.status(200).json({data:orders,
            message:"Orders retrieved succsessfully"})
    }catch(err){
        res.status(500).json({message:`Can not get all Orders ${err}`})
    }
});

routes.get('/:id',async(req:Request,res:Response)=>{
    try{
        const order = await orderModel.getOrder(req.params.id as unknown as number);
        res.status(200).json({data:order,
            message:"Order retrieved succsessfully"})
    }catch(err){
        res.status(500).json({
            message:`Could not get This Product data ${err} `})
    }
});
// use this to Add Product to an Order using ID
routes.post('/addProduct/:id',async(req:Request,res:Response)=>{
    try{
        const order_id = parseInt(req.params.id as unknown as string);
        const product_id = parseInt(req.body.product_id as string);
        const quantity = parseInt(req.body.quantity as string);

        const addProductToOrder = await orderModel.addProductToOrder({
            order_id,
            product_id,
            quantity
        });
        res.status(200).json({data:addProductToOrder,
            message:"Prodect added succsessfully"})
    }catch(err){
        res.status(500).json({
            message:`Could not add product to Order: ${err}`
        })
    }
});

routes.patch('/:id',async(req:Request,res:Response)=>{
    try{
        const order = await orderModel.updateOrder(req.body);
        res.json({
            data:order,
            message:"order updated Successfully"
        })
    }catch(err){
        res.status(500).json({message:`Can not update this order : ${err}`});
    }
});

routes.delete('/:id',async(req:Request,res:Response)=>{
  try{  const order = await orderModel.deleteOrder(req.params.id as unknown as number) ;
    res.json({
        data:order,
        message:'Order deleted successfully'
    })
}catch(err){
    res.status(500).json({message:`could not delete Order: ${err}`});
}
})

export default routes;