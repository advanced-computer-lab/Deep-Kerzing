const ErrorResponse = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const Flight = require('../models/flight');

exports.getAllflights = catchAsync(async (req, res, next) => {
    const l=await Flight.find({})
    res.json(l)
});



