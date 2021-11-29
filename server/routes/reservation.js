const express = require("express");
const {
  reserveFlight,
  cancelFlight,
  getReservation,
} = require("../controllers/reservation");

const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/:reserveId", getReservation);
router.post("/reserve", reserveFlight);
router.delete("/cancel/:reserveId", cancelFlight);

module.exports = router;
