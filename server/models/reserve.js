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
  departureCabin: {
    type: String,
    required: true,
  },
  returnCabin: {
    type: String,
    required: true,
  },

  departureSeats: [{
    type: String,
    required: true,
  }],
  departureSeatsCount: {
    type: Number,
    required: true,
  },
  returnSeats: [{
    type: String,
    required: true,
  }],
  returnSeatsCount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  departurePassengers: [
    {
      type:String ,
      required: true,
    },
  ],
  returnPassengers: [
    {
      type:String ,
      required: true,
    },
  
  ],
});

module.exports = mongoose.model("Reserve", ReserveSchema);
