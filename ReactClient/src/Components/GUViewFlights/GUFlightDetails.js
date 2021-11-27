import "../searchFlight/adminSearchFlight.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlaneDeparture, FaPlaneArrival, FaTicketAlt } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useHistory } from "react-router-dom";

const GUFlightDetails = (props) => {
  const history = useHistory();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/airport")
  //     .then((res) => {
  //       setAirport(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error from Airport Api");
  //     });
  // }, []);


  // const flight = useSelector((state) =>
  //   currentId ? state.Flight.find((message) => message._id === currentId) : null
  // );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (flight) {
  //     console.log(flight);
  //     setDepartureAirport(flight.from);
  //     setArrivalAirport(flight.to);
  //     setFlightNumber(flight.flightNumber);
  //     setDepartureTime(flight.departureTime);
  //     setArrivalTime(flight.arrivalTime);
  //     setEconomySeats(flight.economySeats);
  //     setBusinessSeats(flight.businessSeats);
  //     setDepartureDate(flight.departureDate);
  //     setArrivalDate(flight.arrivalDate);
  //     setFirstClassSeats(flight.firstClassSeats);
  //     setFirstClassPrice(flight.firstClassPrice);
  //     setBusinessPrice(flight.businessPrice);
  //     setEconomyPrice(flight.economyPrice);
  //   }
  //   console.log(departureAirport);
  // }, [flight]);

  return (
    <div id="createFlightCard" className="containerCard">
      <h1>
        <FaPlaneDeparture></FaPlaneDeparture>
      </h1>
      <h1> Flight Details</h1>

      <div className="searchFields">
        <div className="input-group input-group-icon">
          <TextField
            value={props.flightNumber}
            variant="outlined"
            fullWidth={true}
            InputProps={{
              shrink: "true",
              startAdornment: (
                <InputAdornment position="start">
                  <FaTicketAlt />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="searchFields">
        {/* Departure Airport */}
        <div className="input-group input-group-icon">
          <TextField
            value={props.departureAirport}
            variant="outlined"
            fullWidth={true}
            InputProps={{
              shrink: "true",
              startAdornment: (
                <InputAdornment position="start">
                  <FaPlaneDeparture />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="input-group input-group-icon">
          <TextField
            value={props.arrivalAirport}
            variant="outlined"
            fullWidth={true}
            InputProps={{
              shrink: "true",
              startAdornment: (
                <InputAdornment position="start">
                  <FaPlaneArrival />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <div className="searchFields">
        <div className="textField">
          <TextField
            placeholder={props.departureTime}
            fullWidth={true}
            required={true}
            label="Departure Time"
            value={props.departureTime}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div className="textField">
          <TextField
            fullWidth={true}
            required={true}
            label="Arrival Time"
            value={props.arrivalTime}
            variant="standard"
          />
        </div>

        <div className="textField">
          <TextField
            value={props.departureDate}
            fullWidth={true}
            required={true}
            label="Departure Date"
            variant="standard"
          />
        </div>

        <div className="textField">
          <TextField
            value={props.arrivalDate}
            fullWidth={true}
            required={true}
            label="Arrival Date"
            variant="standard"
          />
        </div>

        <div></div>
      </div>

      <div className="searchFields">
        <div className="input-group input-group-icon">
          <TextField
            value="4h"
            fullWidth={true}
            required={true}
            label="Trip Duration"
            variant="standard"
          />
        </div>

        <div className="input-group input-group-icon">
          <TextField
            value="Business Class"
            fullWidth={true}
            required={true}
            label="Cabin Class"
            variant="standard"
          />
        </div>
        <div className="input-group input-group-icon">
          <TextField
            value="3"
            fullWidth={true}
            label="Package Allowance"
            variant="standard"
          />
        </div>
      </div>

      <button
        className="buttonCancel"
        onClick={() => {
          history.push("/GUAllFlights");
        }}
      >
        Cancel
      </button>
      <button className="button">Reserve</button>
    </div>
  );
};
export default GUFlightDetails;
