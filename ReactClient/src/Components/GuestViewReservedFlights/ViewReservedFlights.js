import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Navbar from "../GuestNavbar/Navbar";
import {  MdOutlineAirplaneTicket} from "react-icons/md";
import ReservationCard from "./ReservationCard";

const ViewReservedFlights = () => {
return(

    <div >
    {/* <Navbar></Navbar> */}
    <div className="containerCard"><h1>Your Current Reserved Flights</h1></div>
  <ReservationCard></ReservationCard>
  <ReservationCard></ReservationCard>

    
    </div>
)

                                  }
export default ViewReservedFlights;