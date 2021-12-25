import "./Payment.css";
import UserContext from "../../Components/UserContext/UserContext";
import React, { useState, useContext } from "react";
import StripeContainer from "./StripeContainer";

function Payment() {
  const { totalPrice, selectedReservation } = useContext(UserContext);
  var check = false;
  var negative = false;

  console.log(selectedReservation, " I am the selected");
  if (selectedReservation !== undefined) {
    check = true;
    if (totalPrice - selectedReservation.price < 0) {
      negative = true
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
        <h3>
          Total Price to be paid: {totalPrice}
        </h3>
      )}
      <StripeContainer />
    </div>
  );
}

export default Payment;
