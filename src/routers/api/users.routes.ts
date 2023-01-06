import { Router,Response,Request,NextFunction } from "express";
import UserModel from "../../models/users.model";
import jwt from 'jsonwebtoken';
import config from '../../config';
import tokenMiddleware from "../../middleware/authorisation";
const userModel = new UserModel();

const userRoutes = Router();
// This is All Users Routes
userRoutes.post('/',async(req:Request,res:Response)=>{
   try{ 
    const user = await userModel.create(req.body);
    const token = jwt.sign({ user }, config.token as unknown as string);
    res.json({
        data:{...user,token},
        message:'User Created successfully'
    })
}catch(err){
   res.status(500).json({message:`Could not create user ${err}`})
}
});

userRoutes.get('/',tokenMiddleware,async(req:Request,res:Response)=>{
    try{
        const users = await userModel.getAllUsers();
        res.json({data:users,
        message:'This is All Users data'})
    }catch(err){
        res.status(500).json({message:`Can not get all Users ${err}`})
    }
});

userRoutes.get('/:id',tokenMiddleware,async(req:Request,res:Response)=>{
    try{
        const user = await userModel.getOne(req.params.id as unknown as number);
        res.json({
            data:user,
            message:'User retrieved successfully',
        })
    }catch(err){
        res.status(500).json({
        message:`Could not get This User data ${err} `})
    }
});

userRoutes.patch('/authenticate/:id',async(req:Request,res:Response)=>{
    try{
        const updatedUser = await userModel.updateOneUser(req.body);
        res.json({
            data:updatedUser,
            message:'User updated successfully'
        })

    }catch(err){
        res.status(500).json({message:`Can not update this user : ${err}`});
    }
});

userRoutes.delete('/:id',async(req:Request,res:Response)=>{
    try{
        const deletedUser = await userModel.deleteUser(req.params.id as unknown as number);
        res.json({
            data:deletedUser,
            message:'User Deleted successfully',
        })
    }catch(err){
        res.status(500).json({message:`could not delete user: ${err}`});
    }
});
// To Check is this user is Authorized or not
userRoutes.post('/authenticate',async(req:Request,res:Response)=>{
    try{
        const {username,password} = req.body;
        const user = await userModel.authUser(username,password);
        const token = jwt.sign({user},config.token as unknown as string);
        if(user){
            return res.json({
                data:{...user,token},
                message:'you are Authorized user'
            })
        }
        return res.status(401).json({
            message:"Check your username and password"
        })
    }catch(err){
        res.status(500).json({
            message:`Could not get This User data ${err} `})
    }
})



export default userRoutes;