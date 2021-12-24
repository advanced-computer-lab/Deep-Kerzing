const express = require("express");
const {
  reserveFlight,
  cancelFlight,
  getReservation,
  sendReservation,
  updateReservation,
  refundEmail,
} = require("../controllers/reservation");

const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/:reserveId", getReservation);
router.post("/reserve", reserveFlight);
router.delete("/cancel/:reserveId", cancelFlight);
router.get("/send/:reserveId", sendReservation);
router.delete("/update/:reserveId", updateReservation);
router.post("/reserve/:userId", refundEmail);

module.exports = router;
