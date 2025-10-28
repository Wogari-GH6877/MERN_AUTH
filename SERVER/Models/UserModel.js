import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true,lowercase:true},
    password:{type:String,required:true},
    isAcountVerified:{type:Boolean,default:false},
    verifyOtp:{type:String,default:""},
    verifyOtpEpireAt:{type:Date},
    resetOtp:{type:String,default:""},
    resetOtpEpireAt:{type:Data}

},{timestamps:true});

const userModel=mongoose.models.user || mongoose.model("User",UserSchema);

export default userModel