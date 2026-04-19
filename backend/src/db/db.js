 const mongoose=require('mongoose');

 function connectDB(){
    mongoose.connect('mongodb://localhost:27017/zomato-clone')
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log("DB connection failed",err)
    })
 }
    module.exports=connectDB;
