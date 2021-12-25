const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const ErrorResponse = require("../utils/ExpressError");
const User = require("../models/User");

// Protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log(...roles);
    console.log(req.user.role);
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
