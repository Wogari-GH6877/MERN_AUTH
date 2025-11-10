import UserModel from "../Models/UserModel.js";
const getUserData=async(req,res)=>{
const user_id=req.user_id;

if(!user_id){
    return res.json({success:false,message:"User Does not Found"})
}

try {
    const user =await UserModel.findById(user_id);

    if(!user){
        return res.status(401).json({success:false,message:"User Does not Found on Database"});
    }

    res.json({success:true,
        userData:{name:user.name,
        isAccountVerified:user.isAccountVerified}});

    
} catch (error) {
        res.status(500).json({success:false,message:error.message});
}
}

export default getUserData;