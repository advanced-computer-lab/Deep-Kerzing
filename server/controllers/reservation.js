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
  const {
    departureFlight_id,
    returnFlight_id,
    user_id,
    departureCabin,
    returnCabin,
    departureSeats,
    returnSeats,
    price,
    departurePassengers,
    returnPassengers,
    returnSeatsCount,
    departureSeatsCount,
  } = req.body;
  let userReserve = await User.findById(user_id);
  let departureFlight = await Flight.findById(departureFlight_id);
  let returnFlight = await Flight.findById(returnFlight_id);
  const reservation = await Reserve.create({
    departureFlight_id: departureFlight_id,
    returnFlight_id: returnFlight_id,
    user_id: user_id,
    departureCabin: departureCabin,
    returnCabin: returnCabin,
    departureSeats: departureSeats,
    returnSeats: returnSeats,
    returnSeatsCount: returnSeatsCount,
    departureSeatsCount: departureSeatsCount,
    departurePassengers: departurePassengers,
    returnPassengers: returnPassengers,
    price: price,
  });

  if (departureCabin.toLowerCase() === "economy") {
    console.log(departureFlight.economySeats);
    departureFlight.economySeats -= departureSeatsCount;
    console.log(departureFlight.economySeats);
    for (let flight of departureSeats) {
      departureFlight.reservedSeats.push(flight);
    }
  } else if (departureCabin.toLowerCase() === "firstclass") {
    departureFlight.firstClassSeats -= departureSeatsCount;
    for (let flight of departureSeats) {
      departureFlight.reservedSeats.push(flight);
    }
  } else if (departureCabin.toLowerCase() === "business") {
    departureFlight.businessSeats -= departureSeatsCount;
    for (let flight of departureSeats) {
      departureFlight.reservedSeats.push(flight);
    }
  }

  if (returnCabin.toLowerCase() === "economy") {
    returnFlight.economySeats -= returnSeatsCount;
    for (let flight of returnSeats) {
      returnFlight.reservedSeats.push(flight);
    }
  } else if (returnCabin.toLowerCase() === "firstclass") {
    returnFlight.firstClassSeats -= returnSeatsCount;
    for (let flight of returnSeats) {
      returnFlight.reservedSeats.push(flight);
    }
  } else if (returnCabin.toLowerCase() === "business") {
    returnFlight.businessSeats -= returnSeatsCount;
    for (let flight of returnSeats) {
      returnFlight.reservedSeats.push(flight);
    }
  }

  userReserve.reservations.push(reservation);
  await userReserve.save();
  await departureFlight.save();
  await returnFlight.save();
  await res.status(200).json({
    success: true,
    data: reservation,
  });

  const user = userReserve._id;
  const userEmail = userReserve.email;

  if (!userEmail) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  const message = `We are sending this email to confirm the reservation ${reservation._id} . Details : ${reservation} `;

  try {
    await sendEmail({
      email: userEmail,
      subject: "Reservation Confirmation",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse("Email could not be sent", 500));
  }
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

  if (reservation.departureCabin.toLowerCase() === "economy") {
    console.log(departureFlight.economySeats);
    departureFlight.economySeats += reservation.departureSeatsCount;
    console.log(departureFlight.economySeats);
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.departureCabin.toLowerCase() === "firstclass") {
    departureFlight.firstClassSeats += reservation.departureSeatsCount;
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.departureCabin.toLowerCase() === "business") {
    departureFlight.businessSeats += reservation.departureSeatsCount;
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  }

  if (reservation.returnCabin.toLowerCase() === "economy") {
    console.log(returnFlight.economySeats);
    returnFlight.economySeats += reservation.returnSeatsCount;
    console.log(returnFlight.economySeats);
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.returnCabin.toLowerCase() === "firstclass") {
    returnFlight.firstClassSeats += reservation.returnSeatsCount;
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.returnCabin.toLowerCase() === "business") {
    returnFlight.businessSeats += reservation.returnSeatsCount;
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  }

  await User.findByIdAndUpdate(user, { $pull: { reservations: reserveId } });
  await Reserve.findByIdAndDelete(reserveId);
  await departureFlight.save();
  await returnFlight.save();
});

exports.sendReservation = catchAsync(async (req, res, next) => {
  const { reserveId } = req.params;
  const reservation = await Reserve.findById(reserveId)
    .populate("user_id")
    .populate("departureFlight_id")
    .populate("returnFlight_id");

  const user = reservation.user_id._id;
  const userEmail = reservation.user_id.email;

  if (!userEmail) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  const message = `${reservation}`;

  try {
    await sendEmail({
      email: userEmail,
      subject: "Reservation Details",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.refundEmail = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  console.log(req);
  const user = await User.findById(userId);
  const userEmail = user.email;

  if (!userEmail) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  const message = `Due to the reservation update , we would like to inform you the ${req.body.refund} will be refunded within 2-3 days.`;

  try {
    await sendEmail({
      email: userEmail,
      subject: "Refund Email",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (err) {
    console.log(err);

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.updateReservation = catchAsync(async (req, res, next) => {
  const { reserveId } = req.params;
  const reservation = await Reserve.findById(reserveId).populate("user_id");
  let departureFlight = await Flight.findById(reservation.departureFlight_id);
  let returnFlight = await Flight.findById(reservation.returnFlight_id);

  const user = reservation.user_id._id;

  if (reservation.departureCabin.toLowerCase() === "economy") {
    console.log(departureFlight.economySeats);
    departureFlight.economySeats += reservation.departureSeatsCount;
    console.log(departureFlight.economySeats);
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.departureCabin.toLowerCase() === "firstclass") {
    departureFlight.firstClassSeats += reservation.departureSeatsCount;
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.departureCabin.toLowerCase() === "business") {
    departureFlight.businessSeats += reservation.departureSeatsCount;
    for (let flight of reservation.departureSeats) {
      departureFlight.reservedSeats.pull(flight);
    }
  }

  if (reservation.returnCabin.toLowerCase() === "economy") {
    console.log(returnFlight.economySeats);
    returnFlight.economySeats += reservation.returnSeatsCount;
    console.log(returnFlight.economySeats);
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.returnCabin.toLowerCase() === "firstclass") {
    returnFlight.firstClassSeats += reservation.returnSeatsCount;
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  } else if (reservation.returnCabin.toLowerCase() === "business") {
    returnFlight.businessSeats += reservation.returnSeatsCount;
    for (let flight of reservation.returnSeats) {
      returnFlight.reservedSeats.pull(flight);
    }
  }

  await User.findByIdAndUpdate(user, { $pull: { reservations: reserveId } });
  await Reserve.findByIdAndDelete(reserveId);
  await departureFlight.save();
  await returnFlight.save();
});
