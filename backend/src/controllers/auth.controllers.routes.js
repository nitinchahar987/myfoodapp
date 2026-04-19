const User=require('../Models/user.model');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const loginController=async (req,res)=>{
  const{email,password}=req.body;
  const user=await User.findOne({email})
  if(!user){
    return res.status(400).json({message:"user does not exist"})
  }
  const isPasswordValid=await bcrypt.compare(password,user.password)
  if(!isPasswordValid){
    return res.status(400).json({message:"password is incorrect"})
  }
  const token=jwt.sign({id:user._id},process.env.JWT_secretkey)
  res.cookie("token",token)
  res.status(200).json({message:"login successful",user})
}

const signupController=async (req,res)=>{
  const{name,email,password,contactname,phone,address}=req.body;
    const isuserexist=await User.findOne({email})
    if(isuserexist){
      return res.status(400).json({message:"user already exists"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await User.create({
      name,
      email,
      password:hashedPassword,
      
      phone,
      
    })
    const token=jwt.sign({id:user._id},process.env.JWT_secretkey)
    res.cookie("token",token)

    res.status(201).json({message:"user created successfully",user})
}

const logoutController=async (req,res)=>{
  if(!req.cookies.token){
    return res.status(400).json({message:"user is not logged in"})
  }
  res.clearCookie("token")
  res.status(200).json({message:"logout successful"})
}
module.exports={signupController,loginController,logoutController}