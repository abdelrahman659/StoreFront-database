import { Router } from "express";
import tokenMiddleware from "../middleware/authorisation";
import userRoutes from "./api/users.routes";
import productRoutes from './api/products.routes';
import orderRoutes from './api/order.routes';

const routes = Router();
// All End Points
routes.use('/user',userRoutes);
routes.use('/product', tokenMiddleware,productRoutes);
routes.use('/order', tokenMiddleware,orderRoutes);

export default routes;