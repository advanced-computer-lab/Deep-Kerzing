const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/auth');


const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/logout', logout);
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
// router.put('/getUsername',username)
// router.get('/me',protect, getMe);

module.exports = router;