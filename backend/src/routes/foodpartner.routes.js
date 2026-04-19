const express = require('express');
const router = express.Router();
const {foodPartnerLogin,foodPartnerSignup,foodPartnerlogout,getFoodItemsByPartnerId}= require('../controllers/foodpartner.controllers');

router.post('/partner/login', foodPartnerLogin);
router.post('/partner/signup', foodPartnerSignup);
router.get('/partner/logout', foodPartnerlogout)
router.get('/partner/:id',getFoodItemsByPartnerId) 
module.exports = router;
