import UserContext from "../../Components/UserContext/UserContext";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/auth-context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import { useHistory } from "react-router-dom";
import Payment from "../../Components/Payment/Payment";
import axios from "axios";

const Review = () => {
  const authCtx = useContext(AuthContext);
  const [id, setId] = useState("");

  const token = authCtx.token;
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
  var totalPrice1 = 0;

  console.log(chosenDepartureFlight);
  var KidsDeparture = 0;
  var AdultsDeparture = 0;
  for (var i = 1; i <= departureSeats; i++) {
    if (departurePassengers[i + ""][3] === "adult") {
      AdultsDeparture++;
    } else if (departurePassengers[i + ""][3] === "child") {
      KidsDeparture++;
    }
  }
  console.log(AdultsDeparture);
  console.log(KidsDeparture);
  var KidsReturn = 0;
  var AdultsReturn = 0;
  for (var i = 1; i <= returnSeats; i++) {
    if (returnPassengers[i + ""][3] === "adult") {
      AdultsReturn++;
    } else if (returnPassengers[i + ""][3] === "child") {
      KidsReturn++;
    }
  }
  console.log(AdultsReturn);
  console.log(KidsReturn);
  totalPrice1 =
    DeparturePrice * AdultsDeparture +
    DeparturePrice * 0.5 * KidsDeparture +
    ReturnPrice * AdultsReturn +
    ReturnPrice * 0.5 * KidsReturn;
  setTotalPrice(totalPrice1);
  console.log(totalPrice1);

  console.log(totalPrice);

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  const onSubmitHandler = () => {
    var departurePass = [];
    for (const [key, value] of Object.entries(departurePassengers)) {
      departurePass = [...departurePass, ...value];
    }
    console.log(departurePass);
    var returnPass = [];
    for (const [key, value] of Object.entries(returnPassengers)) {
      returnPass = [...returnPass, ...value];
    }
    axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        console.log(resOne);
        console.log(totalPrice, "total Price");
        console.log(DeparturePrice + ReturnPrice, "Total Price 2");
        const inputs = {
          departureFlight_id: chosenDepartureFlight._id,
          returnFlight_id: chosenReturnFlight._id,
          user_id: resOne.data.data._id,
          departureSeatsCount: departureSeats,
          returnSeatsCount: returnSeats,
          departureCabin: departureCabin,
          returnCabin: returnCabin,
          departureSeats: departureChosenSeats,
          returnSeats: returnChosenSeats,
          price: totalPrice,
          departurePassengers: departurePass,
          returnPassengers: returnPass,
        };
        axios
          .post("http://localhost:8000/api/reservation/reserve", inputs, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setId(res.data.data._id);
            setOpen(true);
          })
          .catch((err) => {
            console.log("Error from ShowuserList");
          });
      });
  };
  return (
    <div>
      <h1>{"Flight Review & Payment"}</h1>
      <hr></hr>
      <div className="Review">
        <div className="left">
          <h4>Departure Flight Details</h4>
          <p>
            <b>Flight Number:</b> {chosenDepartureFlight.flightNumber}
            <br></br>
            <b>From:</b> {chosenDepartureFlight.from}
            <br></br>
            <b>To:</b> {chosenDepartureFlight.to}
            <br></br>
            <b>Departure Date:</b> {chosenDepartureFlight.departureDate}
            <br></br>
            <b>Departure Time:</b> {chosenDepartureFlight.departureTime}
            <br></br>
            <b>Arrival Time: </b>
            {chosenDepartureFlight.arrivalTime}
            <br></br>
            <b>Chosen Seats:</b> {departureChosenSeats}
            <br></br>
            <b>Cabin: </b>
            {departureCabin}
            <br></br>
            <b>Price:</b> {DeparturePrice}
          </p>
        </div>
        <div className="right">
          <h4>Return Flight Details</h4>
          <p>
            <b>Flight Number:</b> {chosenReturnFlight.flightNumber}
            <br></br>
            <b>From:</b> {chosenReturnFlight.from}
            <br></br>
            <b>To:</b> {chosenReturnFlight.to}
            <br></br>
            <b>Departure Date:</b> {chosenReturnFlight.departureDate}
            <br></br>
            <b>Departure Time:</b> {chosenReturnFlight.arrivalTime}
            <br></br>
            <b>Arrival Time: </b> {chosenReturnFlight.departureTime}
            <br></br>
            <b>Chosen Seats:</b> {returnChosenSeats}
            <br></br>
            <b>Cabin: </b> {returnCabin}
            <br></br>
            <b>Price:</b> {ReturnPrice}
          </p>
        </div>
      </div>
      <hr></hr>
      <Payment></Payment>
    </div>
  );
};
export default Review;
