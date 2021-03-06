import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AuthContext from "../../Store/auth-context";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import logo2 from "../GuestNavbar/logo2.png";
import { useState, useEffect, useContext } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const FlightDetails = (props) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const deleteHandler = () => {
    axios
      .delete("http://localhost:8000/api/flights/delete/" + props._id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error in delete");
      });
    setOpen(false);
    window.location.reload(false);
    history.push("/admin/ViewFlights");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flightCard">
        <div className="departureTime">
          {/*1,1*/}
          <h4>{props.depTime}</h4>
        </div>
        <div className="arrivalTime">
          {/*5,1*/} <h4>{props.arrTime}</h4>
        </div>
        <div className="departure">
          <h3>
            {props.departure.substring(
              props.departure.indexOf("(") + 1,
              props.departure.indexOf("(") + 4
            )}
          </h3>
        </div>
        {/*1,2*/}
        <div className="arrival">
          <h3>
            {props.arrival.substring(
              props.arrival.indexOf("(") + 1,
              props.arrival.indexOf("(") + 4
            )}
          </h3>
        </div>
        {/*5,2*/}
        <div className="flightNum">{props.flightNumber}</div> {/*1,1*/}
        <h2 className="Icon">
          <IoAirplaneOutline></IoAirplaneOutline>
        </h2>
        {/*3,2*/}
        <h6 className="economy">
          Economy: {props.seatsEconomy}
        </h6> {/*6,1*/}{" "}
        <div className="business">Business: {props.seatsBusiness}</div>
        <h6 className="depDate">Departure: {props.depDate}</h6> {/*6,1*/}
        <div className="arrDate">Arrival: {props.arrDate}</div> {/*6,2*/}
        <button
          className="Update"
          onClick={() => {
            props.setCurrentId(props._id);
            history.push("/admin/UpdateFlight");
          }}
        >
          Update
        </button>
        <button className="Delete" onClick={handleClickOpen}>
          Delete
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <img src={logo2} className="image" alt="Deep Kerzing" />
          </div>
          <div>
            <p>{"Delete Flight"} </p>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>{"Are you sure you want to delete ?"}</h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteHandler}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FlightDetails;
