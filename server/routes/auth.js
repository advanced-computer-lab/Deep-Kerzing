const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
  getAllReservations,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get("/getReservations/:userId", getAllReservations);
// router.put('/getUsername',username)
router.get("/me", protect, getMe);

module.exports = router;
