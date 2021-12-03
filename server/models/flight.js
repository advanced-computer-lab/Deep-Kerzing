const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  economySeats: {
    type: Number,
    required: true,
  },
  economyPrice: {
    type: Number,
    required: true,
  },
  firstClassSeats: {
    type: Number,
    required: true,
  },
  firstClassPrice: {
    type: Number,
    required: true,
  },
  businessSeats: {
    type: Number,
    required: true,
  },
  businessPrice: {
    type: Number,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
  reservedSeats: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Flight", FlightSchema);
