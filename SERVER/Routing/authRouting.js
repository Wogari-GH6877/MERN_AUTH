import express from "express";
import { SignUp,Login, LogOut,sendVerifyOtp, VerifyEmail, isAuthenticated, sendResetOtp,resetPassword } from "../Controller/authController.js";
import authMiddleWare from "../middleWare/authMiddleWare.js";

const authRouting=express.Router();

authRouting.post("/register",SignUp);
authRouting.post("/login",Login);
authRouting.post("/logout",LogOut);
authRouting.post("/send-verify-otp",authMiddleWare,sendVerifyOtp);
authRouting.post("/verify-email",authMiddleWare,VerifyEmail);
authRouting.get("/is-auth",authMiddleWare,isAuthenticated);
authRouting.post("/send-reset-otp",sendResetOtp);
authRouting.post("/reset-password",resetPassword);




export default authRouting;