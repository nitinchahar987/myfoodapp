const express = require('express');

const { authfoodpartnerMiddleware,authuserMiddleware } = require('../middlewares/AUTH.middleware');
const { createFoodItem,getFoodItems,foodItemsbyid,likefoodcontroller} = require('../controllers/fooditem.controller');
const multer = require('multer');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
 
router.post('/',authfoodpartnerMiddleware,upload.single('video'),createFoodItem);
router.get('/',authuserMiddleware,getFoodItems)
router.get('/food-partneritems/:id',authuserMiddleware,foodItemsbyid)
router.post('/like',authuserMiddleware,likefoodcontroller)


module.exports = router;