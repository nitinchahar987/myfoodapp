const express=require('express');
const { signupController,loginController,logoutController } = require('../controllers/auth.controllers.routes');
const router=express.Router()

router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/logout',logoutController)
module.exports=router;