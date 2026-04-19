const foodPartner=require('../Models/foodpartner.model')
const usermodel=require('../Models/user.model') 
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const authfoodpartnerMiddleware=async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"unauthorized access"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_secretkey)
        const foodpartner=await foodPartner.findById(decoded.id)
        req.foodpartner=foodpartner
        next()
    }catch(err){
        return res.status(401).json({message:"invalid token",err})
    }
}
const authuserMiddleware=async (req,res,next)=>{
    const token=req.cookies.token; 

    if(!token){
        return res.status(401).json({message:"unauthorized access"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_secretkey)
        const user =await usermodel.findById(decoded.id)
        req.user=user
        next()
    }catch(err){
        return res.status(401).json({message:"invalid token",err})
    }
    


}


module.exports={authfoodpartnerMiddleware,authuserMiddleware}