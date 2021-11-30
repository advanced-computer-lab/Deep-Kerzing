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

const ViewReservedFlights = () => {
  const [userId, setUserId] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  console.log(token);
  const [reservations, setReservations] = useState([]);
  // const location = useLocation();

  // useEffect(async () => {
  //   console.log(location.pathname); // result: '/secondpage'
  //   console.log(location.state); // result: 'some_value'
  //   setUserId(location.state.userId);
  //   await axios
  //     .get(
  //       `http://localhost:8000/api/user/getReservations/${location.state.userId}`
  //     )
  //     .then((resTwo) => {
  //       console.log("reservatioons");
  //       console.log(resTwo.data.data.reservations.reservations);
  //       setReservations(resTwo.data.data.reservations.reservations);
  //     })
  //     .catch((err) => {
  //       console.log("cant get reservations");
  //     });
  // }, [location]);

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (resOne) => {
        setUserId(resOne.data.data._id);
        await axios
          .get(
            `http://localhost:8000/api/user/getReservations/${resOne.data.data._id}`
          )
          .then((resTwo) => {
            console.log("reservatioons");
            console.log(resTwo.data.data.reservations.reservations);
            setReservations(resTwo.data.data.reservations.reservations);
          })
          .catch((err) => {
            console.log("cant get reservations");
          });
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });
  }, [userId, reservations]);

  return (
    <div>
      {/* <Navbar></Navbar> */}

      <div className="containerCard">
        <h1>Your Current Reserved Flights</h1>
      </div>
      {reservations.map((element) => (
        <ReservationCard
          reservationId={element._id}
          departureAirportDep={element.departureFlight_id.from}
          arrivalAirportDep={element.departureFlight_id.to}
          depDateDep={element.departureFlight_id.departureDate}
          arrDateDep={element.departureFlight_id.arrivalDate}
          depTimeDep={element.departureFlight_id.departureTime}
          arrTimeDep={element.departureFlight_id.arrivalTime}
          flightNumberDep={element.departureFlight_id.flightNumber}
          seats={element.seats}
          price={element.price}
          cabin={element.cabin}
          departureAirportArr={element.returnFlight_id.from}
          arrivalAirportArr={element.returnFlight_id.to}
          depDateArr={element.returnFlight_id.departureDate}
          arrDateArr={element.returnFlight_id.arrivalDate}
          depTimeArr={element.returnFlight_id.departureTime}
          arrTimeArr={element.returnFlight_id.arrivalTime}
          flightNumberArr={element.returnFlight_id.flightNumber}
          userId={userId}
        ></ReservationCard>
      ))}
      {reservations.length === 0 && <h1>No Results Found</h1>}
    </div>
  );
};
export default ViewReservedFlights;
