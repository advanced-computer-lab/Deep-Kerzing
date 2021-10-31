const express = require('express');
const {
    getAllflights 
} = require('../controllers/flights');


const { protect,authorize} = require('../middleware/auth');
const router = express.Router();


router.get('/',protect,authorize('Admin'),getAllflights);
module.exports = router;