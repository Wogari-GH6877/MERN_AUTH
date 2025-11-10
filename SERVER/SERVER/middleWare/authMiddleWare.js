import jwt from "jsonwebtoken";

const authMiddleWare=async(req,res,next)=>{
    const {token}=req.cookies;
    if (!token) return res.status(401).json({ success: false, message: "User Not Authorized: Login First" });
    if (!process.env.JWT_KEY) return res.status(500).json({ success: false, message: "JWT secret key not defined" });


    try {

        const decode=jwt.verify(token,process.env.JWT_KEY);

        if(decode && decode._id){
            req.user_id=decode._id;

            next();
        }
    } catch (error) {
        res.status(401).json({success:false,message:"User Not Authorized"});
    }

    
    
    
}

export default authMiddleWare;