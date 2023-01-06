import jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import config from "../config";
// Assign toke to the Token in .env file
const Token: string = config.token as string
// Create Token using package jsonwebtoken
export const createToken = (id: number, username: string): string => {
    return jwt.sign({ id, username }, Token)
}

// Handel Authentication in middelware
 const tokenMiddleware =(req:Request,res:Response,next:NextFunction)=>{
if(!req.headers.authorization){
    res.status(401).json({
        message:"Invaled Token"
    })
    return null;
}
    try {
        const Token = req.headers.authorization.split(' ')[1];

        jwt.verify(Token,
            config.token as unknown as string);
            next();

  
} catch (error) {
    res.status(401).json({
        message:`Login Error try again : ${error}`
    })
}

}

export default tokenMiddleware;