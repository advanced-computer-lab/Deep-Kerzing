const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Flight = require("../models/flight");
const catchAsync = require("../utils/catchAsync");

const ReserveSchema = new Schema({
  departureFlight_id: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  returnFlight_id: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cabin: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Reserve", ReserveSchema);
