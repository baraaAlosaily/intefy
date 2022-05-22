import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import {BadRequestError,unauthenticatedError} from "../errors/index.js"

const register=async(req,res)=>{
    const {name,email,password,lastName,location}=req.body;

    if(!name||!email||!password||!lastName||!location){
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExist=await User.findOne({email})
     
    if(userAlreadyExist){
        throw new BadRequestError("Email is already in use")
    }
    if(password<6){
        throw new BadRequestError("Your Password Should Be More Than 6")
    }

    const user =await User.create({name,email,password,lastName,location})
    const token= user.creatJWT();
    res.status(StatusCodes.CREATED)
    .json({user:{email:user.email,
    lastName:user.lastName,name:user.name},token,location:user.location})
}


const login=async(req,res)=>{
   const {email,password}=req.body;

   if(!email||!password){
       throw new BadRequestError("Please provide all values")
   }
   const user=await User.findOne({email}).select('+password');
   if(!user){
       throw new unauthenticatedError('Invalid Creditials');
   }
   const isPasswordCorrect=await user.comparePassword(password)

   if(!isPasswordCorrect){
     throw new unauthenticatedError('Invalid Creditials');  
   }
   const token= user.creatJWT();
   user.password=undefined
   res.status(StatusCodes.OK)
   .json({user,token,location:user.location})
}


const updateUser=async(req,res)=>{
   const {email,name,lastName,location} =req.body;

   if(!name||!email||!location||!lastName){
    throw new BadRequestError('Please provide all values')
   }

   const user = await User.findOne({_id:req.user.userId});

   user.email=email;
   user.name=name;
   user.location=location;
   user.lastName=lastName;

   await user.save();

   const token= user.creatJWT();
   res.status(StatusCodes.OK)
   .json({user,token,location:user.location})

}

export{
    register,
    login,
    updateUser
}