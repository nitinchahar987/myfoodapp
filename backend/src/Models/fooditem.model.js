const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    video: { type: String, },
    description: { type: String, required: true },
    
    foodpartner: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodPartner', required: true },
    likecount:{type:Number,default:0}

  })
  const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
