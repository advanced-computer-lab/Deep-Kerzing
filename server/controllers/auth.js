const ErrorResponse = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.register = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    console.log(name)
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    
  
   sendTokenResponse(user, 200, res);

  });


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Validate emil & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }
  
    // Check for user
    const user = await User.findOne({ email }).select('+password');
  
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    
    sendTokenResponse(user, 200, res);
    
  

  });
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  

  res.status(200).json({
    success: true,
    data: user
  });
});
  
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      role:user.role,
      token
    });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
const user = await User.findOne({ email: req.body.email });

if (!user) {
  return next(new ErrorResponse('There is no user with that email', 404));
}

// Get reset token
const resetToken = user.getResetPasswordToken();

await user.save({ validateBeforeSave: false });

// Create reset url
const resetUrl = `${req.protocol}://${req.get(
  'host'
)}/resetpassword/${resetToken}`;

const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

try {
  await sendEmail({
    email: user.email,
    subject: 'Password reset token',
    message
  });

  res.status(200).json({ success: true, data: 'Email sent' });
} catch (err) {
  console.log(err);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return next(new ErrorResponse('Email could not be sent', 500));
}

});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});