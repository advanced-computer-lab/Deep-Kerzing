const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
  getAllReservations,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get("/getReservations/:userId", getAllReservations);
// router.put('/getUsername',username)

module.exports = router;
