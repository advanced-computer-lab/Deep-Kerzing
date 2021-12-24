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
      {check ? (
        negative ? (
          <h3>0</h3>
        ) : (
          <h3>
            Total Price to be paid: {totalPrice - selectedReservation.price}
          </h3>
        )
      ) : (
        <h3>Total Price to be paid: {totalPrice}</h3>
      )}
      <StripeContainer />
    </div>
  );
}

export default Payment;
