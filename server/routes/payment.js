const express = require("express");
const { payment } = require("../controllers/payment");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("user"), payment);

module.exports = router;
