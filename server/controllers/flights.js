const ErrorResponse = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const Flight = require("../models/flight");

exports.getAllflights = catchAsync(async (req, res, next) => {
  res.json(res.advancedResults.data);
});

exports.createflight = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {
    from,
    to,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    economySeats,
    economyPrice,
    firstClassSeats,
    firstClassPrice,
    businessSeats,
    businessPrice,
    flightNumber,
  } = req.body;
  const flight = await Flight.create({
    from,
    to,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    economySeats,
    economyPrice,
    firstClassSeats,
    firstClassPrice,
    businessSeats,
    businessPrice,
    flightNumber,
  });
  res.status(200).json({
    success: true,
    data: flight,
  });
});

exports.updateflight = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Flight.findByIdAndUpdate(id, { ...req.body });
  const flight = await Flight.findById(id);
  console.log(flight);
  res.status(200).json({
    success: true,
    data: flight,
  });
});

exports.deleteflight = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const flight = await Flight.findById(id);
  await Flight.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
  });
});
