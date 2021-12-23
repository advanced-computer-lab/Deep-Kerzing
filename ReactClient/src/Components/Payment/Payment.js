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
  } = useContext(UserContext);
  return (
    <div className="App1">
      <h1 className="stripeh">Flight Payment</h1>
      <h3>{DeparturePrice + ReturnPrice}</h3>
      <StripeContainer />
    </div>
  );
}

export default Payment;
