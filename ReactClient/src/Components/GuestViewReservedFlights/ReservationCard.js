import "../searchFlight/adminSearchFlight.css";
import { IoAirplane } from "react-icons/io5";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import SharedInfo from "./SharedInfo";

const ReservationCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* first Flight */}
      <div className="reserveContainerCard">
        <div className="resCardOne">
          <div className="departureTime">
            {/*1,1*/}
            <h4>{props.depTimeDep}</h4>
          </div>
          <div className="arrivalTime">
            {/*5,1*/} <h4>{props.arrTimeDep}</h4>
          </div>
          <div className="departure">
            <h3>
              {props.departureAirportDep.substring(
                props.departureAirportDep.indexOf("(") + 1,
                props.departureAirportDep.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*1,2*/}
          <div className="arrival">
            <h3>
              {props.arrivalAirportDep.substring(
                props.arrivalAirportDep.indexOf("(") + 1,
                props.arrivalAirportDep.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*5,2*/}
          <div className="flightNum">{props.flightNumberDep}</div> {/*1,1*/}
          <h2 className="Icon">
            <IoAirplane></IoAirplane>
          </h2>
          {/*3,2*/}
          {/*6,1*/}
          <h6 className="depDate">Departing Date: {props.depDateDep}</h6>{" "}
          {/*6,1*/}
          <div className="arrDate">Arriving Date: {props.arrDateDep}</div>{" "}
          {/*6,2*/}
        </div>

        {/* second Flight */}

        <div className="resCardTwo">
          <div className="departureTime">
            {/*1,1*/}
            <h4>{props.depTimeArr}</h4>
          </div>
          <div className="arrivalTime">
            {/*5,1*/} <h4>{props.arrTimeArr}</h4>
          </div>
          <div className="departure">
            <h3>
              {props.departureAirportArr.substring(
                props.departureAirportArr.indexOf("(") + 1,
                props.departureAirportArr.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*1,2*/}
          <div className="arrival">
            <h3>
              {props.arrivalAirportArr.substring(
                props.arrivalAirportArr.indexOf("(") + 1,
                props.arrivalAirportArr.indexOf("(") + 4
              )}
            </h3>
          </div>
          {/*5,2*/}
          <div className="flightNum">{props.flightNumberArr}</div> {/*1,1*/}
          <h2 className="Icon">
            <IoAirplane></IoAirplane>
          </h2>
          {/*3,2*/}
          {/*6,1*/}
          <h6 className="depDate">Departing Date: {props.depDateArr}</h6>
          {/*6,1*/}
          <div className="arrDate">Arriving Date: {props.arrDateArr}</div>{" "}
          {/*6,2*/}
        </div>
        <SharedInfo
          seats={props.seats}
          price={props.price}
          cabin={props.cabin}
          reservationId={props.reservationId}
          userId={props.userId}
          depDateDep={props.depDateDep}
        ></SharedInfo>
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
  );
};
export default ReservationCard;
