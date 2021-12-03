import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory, useLocation } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Navbar from "../GuestNavbar/Navbar";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import ReservationCard from "./ReservationCard";
import AuthContext from "../../Store/auth-context";
import { useState, useEffect, useContext } from "react";
import * as ReactBootStrap from "react-bootstrap";
import logo2 from "../GuestNavbar/logo2.png";

const ViewReservedFlights = () => {
  const [userId, setUserId] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  console.log(token);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateState = async () => {
    axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        setUserId(resOne.data.data._id);
        axios
          .get(
            `http://localhost:8000/api/user/getReservations/${resOne.data.data._id}`
          )
          .then((resTwo) => {
            console.log("reservatioons");
            console.log(resTwo.data.data.reservations.reservations);
            setReservations(resTwo.data.data.reservations.reservations);
            setLoading(true);
          })
          .catch((err) => {
            console.log("cant get reservations");
          });
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });

    console.log("yesss");
  };

  useEffect(async () => {
    axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        setUserId(resOne.data.data._id);
        axios
          .get(
            `http://localhost:8000/api/user/getReservations/${resOne.data.data._id}`
          )
          .then((resTwo) => {
            console.log("reservatioons");
            console.log(resTwo.data.data.reservations.reservations);
            setReservations(resTwo.data.data.reservations.reservations);
            setLoading(true);
          })
          .catch((err) => {
            console.log("cant get reservations");
          });
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });
  }, []);

  return (
    <div>
      {/* <Navbar></Navbar> */}

      {loading ? (
        reservations.length === 0 ? (
          <div className="containerCard">
            <h1>No Reservations</h1>
          </div>
        ) : (
          <div className="containerCard">
            <h1>Your Current Reserved Flights</h1>
          </div>
        )
      ) : (
        <div className="containerCard">
          <img src={logo2} className="image" alt="Deep Kerzing" />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ReactBootStrap.Spinner animation="border" />
          </div>
        </div>
      )}

      {reservations !== null &&
        reservations.map((element) => (
          <ReservationCard
            reservationId={element._id}
            departureAirportDep={element.departureFlight_id.from}
            arrivalAirportDep={element.departureFlight_id.to}
            depDateDep={element.departureFlight_id.departureDate}
            arrDateDep={element.departureFlight_id.arrivalDate}
            depTimeDep={element.departureFlight_id.departureTime}
            arrTimeDep={element.departureFlight_id.arrivalTime}
            flightNumberDep={element.departureFlight_id.flightNumber}
            departureSeatsCount={element.departureSeatsCount}
            returnSeatsCount={element.returnSeatsCount}
            departureSeats={element.departureSeats}
            returnSeats={element.returnSeats}
            price={element.price}
            departurePassengers={element.departurePassengers}
            returnPassengers={element.returnPassengers}
            returnCabin={element.returnCabin}
            departureCabin={element.departureCabin}
            departureAirportArr={element.returnFlight_id.from}
            arrivalAirportArr={element.returnFlight_id.to}
            depDateArr={element.returnFlight_id.departureDate}
            arrDateArr={element.returnFlight_id.arrivalDate}
            depTimeArr={element.returnFlight_id.departureTime}
            arrTimeArr={element.returnFlight_id.arrivalTime}
            flightNumberArr={element.returnFlight_id.flightNumber}
            userId={userId}
            key={element._id}
            updateState={updateState}
            setLoading={setLoading}
          ></ReservationCard>
        ))}
    </div>
  );
};
export default ViewReservedFlights;
