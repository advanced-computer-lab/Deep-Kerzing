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
  useEffect(() => {
    var KidsDeparture = 0;
    var AdultsDeparture = 0;
    for (var i = 1; i <= departureSeats; i++) {
      if (departurePassengers[i + ""][3] === "adult") {
        AdultsDeparture++;
      } else if (departurePassengers[i + ""][3] === "child") {
        KidsDeparture++;
      }
    }
    var KidsReturn = 0;
    var AdultsReturn = 0;
    for (var i = 1; i <= returnSeats; i++) {
      if (returnPassengers[i + ""][3] === "adult") {
        AdultsReturn++;
      } else if (returnPassengers[i + ""][3] === "child") {
        KidsReturn++;
      }
    }
    var totalPrice1 =
      DeparturePrice * AdultsDeparture +
      DeparturePrice * 0.5 * KidsDeparture +
      ReturnPrice * AdultsReturn +
      ReturnPrice * 0.5 * KidsReturn;

    setTotalPrice(totalPrice);
  }, []);

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
          .post("http://localhost:8000/api/reservation/reserve", inputs)
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
      <div>
        <h4>Departure Flight Details</h4>
        <p>
          <b>Flight Number:</b> {chosenDepartureFlight.flightNumber}
          <br></br>
          <b>From:</b> {chosenDepartureFlight.departure}
          <br></br>
          <b>To:</b> {chosenDepartureFlight.arrival}
          <br></br>
          <b>Departure Date:</b> {chosenDepartureFlight.depDate}
          <br></br>
          <b>Departure Time:</b> {chosenDepartureFlight.depTime}
          <br></br>
          <b>Arrival Time: </b>
          {chosenDepartureFlight.arrTime}
          <br></br>
          <b>Chosen Seats:</b> {departureChosenSeats}
          <br></br>
          <b>Cabin: </b>
          {departureCabin}
          <br></br>
          <b>Price:</b> {DeparturePrice}
        </p>
        <hr></hr>
        <h4>Return Flight Details</h4>
        <p>
          <b>Flight Number:</b> {chosenReturnFlight.flightNumber}
          <br></br>
          <b>From:</b> {chosenReturnFlight.departure}
          <br></br>
          <b>To:</b> {chosenReturnFlight.arrival}
          <br></br>
          <b>Departure Date:</b> {chosenReturnFlight.depDate}
          <br></br>
          <b>Departure Time:</b> {chosenReturnFlight.arrTime}
          <br></br>
          <b>Arrival Time: </b> {chosenReturnFlight.depTime}
          <br></br>
          <b>Chosen Seats:</b> {returnChosenSeats}
          <br></br>
          <b>Cabin: </b> {returnCabin}
          <br></br>
          <b>Price:</b> {ReturnPrice}
        </p>
        <hr></hr>
        <div>
          <h3>
            <b>Total Price:</b> {DeparturePrice + ReturnPrice}{" "}
            <button className = "button" onClick={onSubmitHandler}>Confirm</button>
          </h3>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>Your reservation is done successfully</h3>
          <p>Reservation id is : {id}</p>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Review;
