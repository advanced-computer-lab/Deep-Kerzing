const express = require("express");
const {
  getAllflights,
  createflight,
  updateflight,
  deleteflight,
} = require("../controllers/flights");
const flight = require("../models/flight");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/", advancedResults(flight), getAllflights);
router.post("/create", protect, authorize("Admin"), createflight);
router.put("/update/:id", updateflight);
router.delete("/delete/:id", protect, authorize("Admin"), deleteflight);

module.exports = router;
