const foodItem=require('../Models/fooditem.model')
const { uploadFile } = require('../services/storage.service');
const {v4:uuid}=require('uuid')
const Like=require('../Models/likes.model')
const createFoodItem=async (req,res)=>{
   
    
    const  fileuploadresult=await uploadFile(req.file.buffer,uuid())
   const fooditem=await foodItem.create({
    name:req.body.name,
    description:req.body.description,
    video:fileuploadresult.url,
    foodpartner:req.foodpartner._id
   })
   
     
    res.status(201).json({
        message:"Food Item created successfully",
        fooditem
    })


}
const getFoodItems=async (req,res)=>{
    const fooditems=await foodItem.find()
    res.status(200).json({message:"Food items fetched successfully",fooditems})
}

const foodItemsbyid=async (req,res)=>{
    const foodpartnerid=req.params.id
  
    const fooditems=await foodItem.find({foodpartner:foodpartnerid})
    res.status(200).json({message:"Food items fetched successfully",fooditems})
}
async function likefoodcontroller(req,res){
    const fooditemid=req.body.fooditemid
    const user=req.user
    const existinglike=await Like.findOne({user:user._id,fooditem:fooditemid})
    if(existinglike){
        await foodItem.findByIdAndUpdate(fooditemid,{$inc:{likecount:-1}})

        await Like.findOneAndDelete({user:user._id,fooditem:fooditemid})
        res.status(200).json({message:"Food item unliked successfully"})
    }
    else{
        await foodItem.findByIdAndUpdate(fooditemid,{$inc:{likecount:1}})
        const newlike=await Like.create({user:user._id,fooditem:fooditemid})
        res.status(201).json({message:"Food item liked successfully",like:newlike})
    }

}
    module.exports={createFoodItem,getFoodItems,foodItemsbyid,likefoodcontroller}