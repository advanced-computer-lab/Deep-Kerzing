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

const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, authorize("user"), getMe);
router.put("/updatedetails", protect, authorize("user"), updateDetails);
router.put("/updatepassword", protect, authorize("user"), updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.get(
  "/getReservations/:userId",
  protect,
  authorize("user"),
  getAllReservations
);
// router.put('/getUsername',username)

module.exports = router;
