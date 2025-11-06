import express from "express";
import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import Transporter from "../Config/Nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "../Config/emailTemplate.js";


export const SignUp=async(req,res)=>{
    const {name,email,password}=req.body;

if(!name || !email || !password){
    return res.status(401).json({success:false,message:"Missing Details"});
}
try {
    const isUserExist=await UserModel.findOne({email});

        if(isUserExist) return res.status(401).json({success:false,message:"User Already Exist!"});
        if (password.length<8){
            return res.status(401).json({success:false,message:"Password length must be more 8"});
        }
        
        const hashPassword=await bcrypt.hash(password,10);

        const new_user=await UserModel.create({name,email,password:hashPassword});
        new_user.save();

        const token=jwt.sign({_id:new_user._id},process.env.JWT_KEY,{expiresIn:"7d"});
        
        // cookies
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });

        const mailOption={
            from:process.env.EMAIL_SENDER,
            to:email,
            subject:"WELL COME TO MY WEB APP",
            text:`your Acccount has been created ${email}`
        }

        Transporter.sendMail(mailOption);

        

        res.status(200).json({success:true,message:"User is created",token});
} catch (error) {
    res.json({success:false,message:error.message});
}
}


export const Login=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
    return res.status(401).json({success:false,message:"Missing Details"});}

    try {
        const isUserExist=await UserModel.findOne({email});

        if(!isUserExist){
          return  res.status(401).json({success:false,message:"Email or PassWord is Wrong"});
        }

        const isMatch=await bcrypt.compare(password,isUserExist.password);

        if(!isMatch){
          return  res.status(401).json({success:false,message:"PassWord is Wrong"});
        }
        const token=jwt.sign({_id:isUserExist._id},process.env.JWT_KEY,{expiresIn:"7d"});
        
        // cookies
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });

        res.status(200).json({success:true,message:"Logged in Successfully"});

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}


export const LogOut=async(req,res)=>{
    try {

        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })
        res.json({success:true,message:"You Logout Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const sendVerifyOtp=async(req,res)=>{

    const user_id=req.user_id;

    const isUserExist=await UserModel.findById(user_id);

    if(isUserExist.isAccountVerified){
            return res.json({success:true,message:"User Already Verified"});
        }

    try {
        

        const Otp=String(Math.floor(100000+Math.random()*900000));
        isUserExist.verifyOtp=Otp;
        isUserExist.verifyOtpEpireAt=Date.now() + 24*60*60*1000;
        isUserExist.save();

        const mailOption={
            from:process.env.EMAIL_SENDER,
            to:isUserExist.email,
            subject:"YOUR VERIFY OTP",
            // text:`Your OTP is ${Otp},Verify Your Account Using OTP`}
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",Otp).replace("{{email}}",isUserExist.email)}

        await Transporter.sendMail(mailOption);

        res.json({success:true,message:"Verify Otp is Sent"})

        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
    
}

export const VerifyEmail=async(req,res)=>{
    const user_id=req.user_id;
    const {Otp}=req.body;

    if(!user_id || !Otp){
        return res.json({success:false,message:"Missing Details"});}

    try {
        const user=await UserModel.findById(user_id);

        if(!user){
           return res.json({success:false,message:"User Not Found"})
        }

        if(user.verifyOtp==="" || user.verifyOtp !== Otp){
           return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.verifyOtpEpireAt< Date.now()){
           return res.json({success:false,message:"OTP is Expired"})

        }

        user.isAccountVerified=true;
        user.verifyOtp="";
        user.verifyOtpEpireAt=0;

        await user.save();

        res.json({success:true ,message:"User Successfully Verified"})

    } catch (error) {
        res.json({success:false,message:error.message});
    }

}

export const isAuthenticated=async(req,res)=>{
 try {

    res.json({success:true,message:"User is Authenticated"});
    
 } catch (error) {
    res.json({success:false,message:error.message})
 }
}

export const sendResetOtp= async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await UserModel.findOne({email});

        if(!email ){
            return res.json({success:false,message:"Missing Details"});
        }

        if(!user){
            return res.json({success:false,message:"User Not Found"})
        }
        const Otp=String(Math.floor(Math.random()*900000 +100000));
        user.resetOtp=Otp;
        user.resetOtpEpireAt=Date() + 7*20*60*60*1000;

        await user.save();

        const mailOption={
            from:process.env.EMAIL_SENDER,
            to:user.email,
            subject:"YOUR PASSWORD RESET OTP",
            // text:`Your Password RESET-OTP is ${Otp},Reset  Your Password Account Using OTP`}
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",Otp).replace("{{email}}",user.email)
        }
        await Transporter.sendMail(mailOption);

        res.json({success:true,message:"Password reset-Otp is Sent"});

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export const resetPassword= async(req,res)=>{
    const {email,Otp,newPassword}=req.body;

    if(!email || !Otp || !newPassword){
        return res.json({success:false,message:"Missing Details"});
    }
    try {
        const user=await UserModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Does Not Found"});

        }
         if (newPassword.length<8){
            return res.status(401).json({success:false,message:"Password length must be more 8"});
        }
        if(user.resetOtp==="" || user.resetOtp !==Otp){
            return res.json({success:false,message:"InValid OTP"});
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
         }

        const hashPassword=await bcrypt.hash(newPassword,10);

        user.password=hashPassword;
        user.resetOtp="";
        user.resetOtpExpireAt=0;

        user.save();

        return res.json({success:true,message:"Password has been reset successfully"});



    } catch (error) {
        res.json({success:false,message:error.message});
    }
}