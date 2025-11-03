import express from "express";
import "dotenv/config";
import  ConnectMB from "./Config/MongoDB_config.js";
import bodyParser from "body-parser";
import userRouting from "./Routing/authRouting.js";
import userRouter from "./Routing/userRouting.js";
import cookieParser from "cookie-parser";

const app=express();

ConnectMB();

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




const Port=process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("Api is listneing");
});

app.use("/api/user",userRouter);
app.use("/api/auth",userRouting);



app.listen(Port,()=>{
    console.log(`The Server is Listening on ${Port}`)
});
