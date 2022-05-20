import { unauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new unauthenticatedError('Authentication Invalid')
    }
    const token=authHeader.split(' ')[1]

    try {
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        req.user={userId:payload.userId}
        next();
    } catch (error) {
        throw new unauthenticatedError('Authentication Invalid')
    }

}

export default auth;