import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true,lowercase:true},
    password:{type:String,required:true},
    isAccountVerified:{type:Boolean,default:false},
    verifyOtp:{type:String,default:""},
    verifyOtpExpireAt:{type:Date},
    resetOtp:{type:String,default:""},
    resetOtpExpireAt:{type:Date}

},{timestamps:true});

const UserModel=mongoose.models.user || mongoose.model("User",UserSchema);

export default UserModel