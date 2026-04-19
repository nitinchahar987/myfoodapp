const mongoose= require('mongoose');
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    fooditem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FoodItem',
        required:true
    }
},{timestamps:true});
const Like=mongoose.model('Like',likeSchema);
module.exports=Like;