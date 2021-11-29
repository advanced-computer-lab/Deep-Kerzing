const ErrorResponse = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const Flight = require("../models/flight");
const Reserve = require("../models/reserve");
const sendEmail = require("../utils/sendEmail");

exports.getReservation = catchAsync(async (req, res, next) => {
  const { reserveId } = req.params;
  const reservation = await Reserve.findById(reserveId)
    .populate("user_id")
    .populate("departureFlight_id")
    .populate("returnFlight_id")
    .populate("price");

  res.status(200).json({
    success: true,
    data: {
      reservation,
    },
  });
});

exports.reserveFlight = catchAsync(async (req, res, next) => {
  const { departureFlight_id, returnFlight_id, user_id, cabin, seats, price } =
    req.body;

  let userReserve = await User.findById(user_id);

  const reservation = await Reserve.create({
    departureFlight_id: departureFlight_id,
    returnFlight_id: returnFlight_id,
    user_id: user_id,
    cabin: cabin,
    seats: seats,
    price: price,
  });

  userReserve.reservations.push(reservation);
  await userReserve.save();
  await res.status(200).json({
    success: true,
    data: reservation,
  });
});

exports.cancelFlight = catchAsync(async (req, res, next) => {
  const { reserveId } = req.params;
  const reservation = await Reserve.findById(reserveId).populate("user_id");
  const user = reservation.user_id._id;
  const userEmail = reservation.user_id.email;
  console.log(userEmail);

  if (!userEmail) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  const message = `We are sending this email to confirm the reservation cancellation and ${reservation.price} refunded`;

  try {
    await sendEmail({
      email: userEmail,
      subject: "Reservation Cancellation",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  await User.findByIdAndUpdate(user, { $pull: { reservations: reserveId } });
  await Reserve.findByIdAndDelete(reserveId);
  res.status(200).json({
    success: true,
  });
});
