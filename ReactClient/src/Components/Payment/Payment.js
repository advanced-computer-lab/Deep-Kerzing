import "./Payment.css";
import UserContext from "../../Components/UserContext/UserContext";
import React, { useState, useContext } from "react";
import StripeContainer from "./StripeContainer";
import { useHistory } from "react-router-dom";
import logo2 from "../GuestNavbar/logo2.png";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as ReactBootStrap from "react-bootstrap";

function Payment() {
  const { totalPrice, selectedReservation } = useContext(UserContext);
  var check = false;
  var negative = false;
  var zero = false;

  console.log(selectedReservation, " I am the selected");
  if (selectedReservation !== undefined) {
    check = true;
    if (totalPrice - selectedReservation.price < 0) {
      negative = true;
    } else {
      if (totalPrice - selectedReservation.price === 0) {
        zero = true;
      }
    }
  }

  return (
    <div className="App1">
      {check ? (
        negative ? (
          <div>
            <h3>Refund : {(totalPrice - selectedReservation.price) * -1}</h3>
            <StripeContainer />
          </div>
        ) : zero ? (
          <div>
            <h3>0</h3>
            <StripeContainer />
          </div>
        ) : (
          <div>
            <h3>
              Total Price to be paid:{totalPrice - selectedReservation.price}
            </h3>
            <StripeContainer />
          </div>
        )
      ) : (
        <div>
          <h3>Total Price to be paid: {totalPrice}</h3>
          <StripeContainer />
        </div>
      )}
    </div>
  );
}

export default Payment;
