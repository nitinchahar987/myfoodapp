const FoodPartner=require('../Models/foodpartner.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const foodPartnerLogin=async (req,res)=>{
    const {email,password}=req.body;
    // Placeholder for food partner login logic
const partner=await FoodPartner.findOne({email})
if(!partner){
  return res.status(400).json({message:"food partner does not exist"})
}
const isPasswordValid=await bcrypt.compare(password,partner.password)
if(!isPasswordValid){
  return res.status(400).json({message:"password is incorrect"})
}
const token=jwt.sign({id:partner._id},process.env.JWT_secretkey)
res.cookie("token",token)
res.status(200).json({message:"login successful",partner})
}   


const foodPartnerSignup=async (req,res)=>{
    // Placeholder for food partner signup logic
    const {name,email,password,contactName,phone,address}=req.body;
    const ispartnerexists=await FoodPartner.findOne({email})
    if(ispartnerexists){
        return res.status(400).json({message:"food partner already exists"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const partner=await FoodPartner.create({
      name,
      email,
      password:hashedPassword,
      contactName,
      phone,
      address
  
    })
    const token=jwt.sign({id:partner._id},process.env.JWT_secretkey)
    res.cookie("token",token)
    res.status(201).json({message:"food partner created successfully",partner})

}
const foodPartnerlogout=async (req,res)=>{
      res.clearCookie("token")
      res.status(200).json({message:"logout successful"})
    }
    const getFoodItemsByPartnerId=async (req,res)=>{
      const partnerId=req.params.id
      const partnerdata=await FoodPartner.findById(partnerId)
      res.status(200).json({message:"food items retrieved successfully",partnerdata})
    }
module.exports={foodPartnerLogin,foodPartnerSignup,foodPartnerlogout,getFoodItemsByPartnerId}