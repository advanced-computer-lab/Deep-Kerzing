import "./Payment.css";
import UserContext from "../../Components/UserContext/UserContext";
import React, { useState, useContext } from "react";

import StripeContainer from "./StripeContainer";

function Payment() {
  const [showItem, setShowItem] = useState(false);
  const {
    departureCabin,
    returnCabin,
    departureSeats,
    returnSeats,
    chosenDepartureFlight,
    chosenReturnFlight,
    departurePassengers,
    returnPassengers,
    departureChosenSeats,
    setTotalPrice,
    DeparturePrice,
    ReturnPrice,
    totalPrice,
    returnChosenSeats,
    selectedReservation,
  } = useContext(UserContext);
  var check = false;
  var negative = false;
  if (selectedReservation !== undefined) {
    check = true;
    if (totalPrice - selectedReservation.price < 0) {
      negative = true;
    }
  }

  return (
    <div className="App1">
      <h1 className="stripeh">Flight Payment</h1>
      {check ? (
        negative ? (
          <h3>0</h3>
        ) : (
          <h3>{totalPrice - selectedReservation.price}</h3>
        )
      ) : (
        <h3>{totalPrice}</h3>
      )}
      <StripeContainer />
    </div>
  );
}

export default Payment;
