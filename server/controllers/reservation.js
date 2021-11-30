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
  const { departureFlight_id, returnFlight_id, user_id, departureCabin, returnCabin,departureSeats,returnSeats, price,departurePassengers,returnPassengers,returnSeatsCount,departureSeatsCount} =
    req.body;
  let userReserve = await User.findById(user_id);
  let departureFlight = await Flight.findById(departureFlight_id);
  let returnFlight = await Flight.findById(returnFlight_id);
  const reservation = await Reserve.create({
    departureFlight_id: departureFlight_id,
    returnFlight_id: returnFlight_id,
    user_id: user_id,
    departureCabin: departureCabin,
    returnCabin: returnCabin,
    departureSeats:departureSeats,
    returnSeats:returnSeats,
    returnSeatsCount:returnSeatsCount,
    departureSeatsCount:departureSeatsCount,
    departurePassengers:departurePassengers,
    returnPassengers:returnPassengers,
    price: price,

  });

  if(departureCabin.toLowerCase()==="economy"){
    departureFlight.economySeats-=departureSeatsCount;
  }
  else if(departureCabin.toLowerCase()==="firstclass"){
    departureFlight.firstClassSeats-=departureSeatsCount;
  }
  else if(departureCabin.toLowerCase()==="business"){ 
    departureFlight.businessSeats-=departureSeatsCount;
  }

  if(returnCabin.toLowerCase()==="economy"){
    returnFlight.economySeats-=returnSeatsCount;
  }
  else if(returnCabin.toLowerCase()==="firstclass"){
    returnFlight.firstClassSeats-=returnSeatsCount;
  }
  else if(returnCabin.toLowerCase()==="business"){
    returnFlight.businessSeats-=returnSeatsCount;
  }



  userReserve.reservations.push(reservation);
  await userReserve.save();
  await departureFlight.save();
  await returnFlight.save();
  await res.status(200).json({
    success: true,
    data: reservation,
  });
});

exports.cancelFlight = catchAsync(async (req, res, next) => {
  const { reserveId } = req.params;
  const reservation = await Reserve.findById(reserveId).populate("user_id");
  let departureFlight = await Flight.findById(reservation.departureFlight_id);
  let returnFlight = await Flight.findById(reservation.returnFlight_id);

  const user = reservation.user_id._id;
  const userEmail = reservation.user_id.email;

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

  if(reservation.departureCabin.toLowerCase()==="economy"){
    departureFlight.economySeats+=reservation.departureSeatsCount;
  }
  else if(reservation.departureCabin.toLowerCase()==="firstclass"){
    departureFlight.firstClassSeats+=reservation.departureSeatsCount;
  }
  else if(reservation.departureCabin.toLowerCase()==="business"){ 
    departureFlight.businessSeats+=reservation.departureSeatsCount;
  }

  if(reservation.returnCabin.toLowerCase()==="economy"){
    returnFlight.economySeats+=reservation.returnSeatsCount;
  }
  else if(reservation.returnCabin.toLowerCase()==="firstclass"){
    returnFlight.firstClassSeats+=reservation.returnSeatsCount;
  }
  else if(reservation.returnCabin.toLowerCase()==="business"){
    returnFlight.businessSeats+=reservation.returnSeatsCount;
  }


  await User.findByIdAndUpdate(user, { $pull: { reservations: reserveId } });
  await Reserve.findByIdAndDelete(reserveId);
  await departureFlight.save();
  await returnFlight.save();
  res.status(200).json({
    success: true,
  });
});
