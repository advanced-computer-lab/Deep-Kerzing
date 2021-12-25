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

router.get("/:reserveId", protect, authorize("user"), getReservation);
router.post("/reserve", protect, authorize("user"), reserveFlight);
router.delete("/cancel/:reserveId", protect, authorize("user"), cancelFlight);
router.get("/send/:reserveId", protect, authorize("user"), sendReservation);
router.delete(
  "/update/:reserveId",
  protect,
  authorize("user"),
  updateReservation
);
router.post("/reserve/:userId", protect, authorize("user"), refundEmail);

module.exports = router;
