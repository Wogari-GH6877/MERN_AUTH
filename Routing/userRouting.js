import express from "express";
import authMiddleWare from "../middleWare/authMiddleWare.js";
import getUserData from "../Controller/userController.js";
const userRouter=express.Router();

 userRouter.get("/data",authMiddleWare,getUserData);

export default userRouter;