import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import  ConnectMB from "./Config/MongoDB_config.js";
import bodyParser from "body-parser";
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



ConnectMB();

const Port=process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("Api is listneing");
});

app.post("/login",(req,res)=>{
    const {name,email,password}=req.body;

    res.send("good");
})

app.listen(Port,()=>{
    console.log(`The Server is Listening on ${Port}`)
});
