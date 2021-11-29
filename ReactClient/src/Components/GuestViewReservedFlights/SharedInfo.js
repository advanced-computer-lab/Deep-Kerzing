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



const SharedInfo = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

    
    const handleClose = () => {
         setOpen(false);
               };




    return(


        <div >

            <div className="sharedInfo">
                <div><h3>Price:$400</h3></div>
                <div><h3>Class:economy</h3></div>
                <div><button className="reserveDelete"  onClick={handleClickOpen} >Delete Reservation</button></div>
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
        </div>    
        )

}
export default SharedInfo;