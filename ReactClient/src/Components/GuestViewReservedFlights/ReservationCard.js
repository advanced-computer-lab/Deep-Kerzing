import "../searchFlight/adminSearchFlight.css";
import { IoAirplane } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../GuestNavbar/Navbar";
import {  MdOutlineAirplaneTicket} from "react-icons/md";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import SharedInfo from "./SharedInfo";

const ReservationCard = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

    
    const handleClose = () => {
         setOpen(false);
               };
return(


    <div >

        {/* first Flight */}
        <div className="reserveContainerCard">
        <div className="resCardOne">
        <div className="departureTime">
          {/*1,1*/}
          <h4>depTime</h4>
        </div>
        <div className="arrivalTime">
          {/*5,1*/} <h4>arrivalTime</h4>
        </div>
        <div className="departure">
          <h3>
            {/* {props.departure.substring(
              props.departure.indexOf("(") + 1,
              props.departure.indexOf("(") + 4
            )} */}
            cai
          </h3>
        </div>
        {/*1,2*/}
        <div className="arrival">
          <h3>
            {/* {props.arrival.substring(
              props.arrival.indexOf("(") + 1,
              props.arrival.indexOf("(") + 4
            )} */}
            ams
          </h3>
        </div>
        {/*5,2*/}
        <div className="flightNum">Flight Number</div> {/*1,1*/}
        <h2 className="Icon">
          <IoAirplane></IoAirplane>
        </h2>
        {/*3,2*/}
        {/* <h6 className="economy">
          Class: "Economy"
        </h6>  */}
        {/*6,1*/}{" "}
        {/* <div className="business">Trip Duration:60</div> */}
        <h6 className="depDate">Departing Date: 11/11/2021</h6> {/*6,1*/}
        <div className="arrDate">Returning Date: 25/11/2021</div> {/*6,2*/}
        {/* <div className="Price"><h3>Total Price:$400</h3></div> */}
        {/* <button className="Delete" onClick={handleClickOpen} >
          Cancel Reservation
        </button>    */}
      
        </div>

        {/* second Flight */}
        
        <div className="resCardTwo">
        <div className="departureTime">
          {/*1,1*/}
          <h4>depTime</h4>
        </div>
        <div className="arrivalTime">
          {/*5,1*/} <h4>arrivalTime</h4>
        </div>
        <div className="departure">
          <h3>
            {/* {props.departure.substring(
              props.departure.indexOf("(") + 1,
              props.departure.indexOf("(") + 4
            )} */}
            ams
          </h3>
        </div>
        {/*1,2*/}
        <div className="arrival">
          <h3>
            {/* {props.arrival.substring(
              props.arrival.indexOf("(") + 1,
              props.arrival.indexOf("(") + 4
            )} */}
            cai
          </h3>
        </div>
        {/*5,2*/}
        <div className="flightNum">Flight Number</div> {/*1,1*/}
        <h2 className="Icon">
          <IoAirplane></IoAirplane>
        </h2>
        {/*3,2*/}
      {/*6,1*/}{" "}
        {/* <div className="business">Trip Duration:60</div> */}
        <h6 className="depDate">Departing Date: 11/11/2021</h6> {/*6,1*/}
        <div className="arrDate">Returning Date: 25/11/2021</div> {/*6,2*/}
        {/* <div className="Price"><h3>Total Price:$400</h3></div> */}
        {/* <button className="Delete" onClick={handleClickOpen} >
          Cancel Reservation
        </button>    */}
      </div>
      <SharedInfo></SharedInfo>
        </div>
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure,You Want To Cancel Your Reservation ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button onClick={handleClose}>NO</Button>
          
        </DialogActions>
      </Dialog>

    </div>)}
export default ReservationCard;