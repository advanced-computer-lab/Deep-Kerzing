const express = require('express');
const {
    getAllairport
} = require('../controllers/airports');

const { protect,authorize} = require('../middleware/auth');
const router = express.Router();

router.get('/',getAllairport);



module.exports = router;

