import OrderProduct from "./orderProduct.type";
type Order={
    id:number,
    products:OrderProduct[],
    user_id:number,
    status:string
}

export default Order;