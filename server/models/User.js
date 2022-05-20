import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide a valid email'
        },
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        select:false
    },
    lastName:{
        type:String,
        required:[true,'Please provide lastName'],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    location:{
        type:String,
        maxlength:10,
        required:[true,'Please provide city'],
        enum:['Amman','Irbid'],
        default:'Amman',

    }
})

UserSchema.pre('save',async function() {
    if(!this.isModified('password'))return;
    const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt)
}); 

UserSchema.methods.creatJWT=function () {
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch
}


export default mongoose.model('Users',UserSchema);