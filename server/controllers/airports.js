const ErrorResponse = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

const Airport = require("../models/airport");

exports.getAllairport = catchAsync(async (req, res, next) => {
  const l = await Airport.find({});
  res.json(l);
});


