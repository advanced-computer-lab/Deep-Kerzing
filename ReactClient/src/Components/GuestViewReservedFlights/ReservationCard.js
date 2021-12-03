import "../searchFlight/adminSearchFlight.css";
import { IoAirplane } from "react-icons/io5";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { AiOutlineInfoCircle } from "react-icons/ai";

import DialogTitle from "@mui/material/DialogTitle";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import SharedInfo from "./SharedInfo";
import { style } from "@mui/system";

const ReservationCard = (props) => {
  const [openDep, setOpenDep] = React.useState(false);
  const [openArr, setOpenArr] = React.useState(false);
  let count = 0;
  const handleClickOpenDep = () => {
    setOpenDep(true);
  };

  const handleCloseDep = () => {
    setOpenDep(false);
  };
  const handleClickOpenArr = () => {
    setOpenArr(true);
  };

  const handleCloseArr = () => {
    setOpenArr(false);
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
          <button className="Update" onClick={handleClickOpenDep}>
            Details
          </button>
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
          <button className="Update" onClick={handleClickOpenArr}>
            Details
          </button>
          {/*6,2*/}
        </div>

        <SharedInfo
          price={props.price}
          reservationId={props.reservationId}
          userId={props.userId}
          depDateDep={props.depDateDep}
          updateState={props.updateState}
          setLoading={props.setLoading}
        ></SharedInfo>
      </div>

      <Dialog
        open={openDep}
        onClose={handleCloseDep}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <h1>
              <AiOutlineInfoCircle />
            </h1>
            <h1> Details</h1>
          </div>

          <div>
            <h4>Number of Seats</h4>
            <h2>{props.departureSeatsCount}</h2>
            <h4>Seats</h4>
            <h2>
              {props.departureSeats.map((element) => (
                <div key={props._id}>{element}</div>
              ))}
            </h2>
            <h4>Cabin</h4>
            <h2>{props.departureCabin}</h2>
            <h4>Passengers</h4>
            <h2>
              {props.departurePassengers.map((element) => (
                <div>
                  <div>
                    <h2 key={props._id}>{element}</h2>
                  </div>
                </div>
              ))}
            </h2>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDep}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openArr}
        onClose={handleCloseArr}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <h1>
              <AiOutlineInfoCircle />
            </h1>
            <h1> Details</h1>
          </div>
          <div>
            <h4>Number of Seats</h4>
            <h2>{props.returnSeatsCount}</h2>
            <h4>Seats</h4>
            <h2>
              {props.returnSeats.map((element) => (
                <div key={props._id}>{element}</div>
              ))}
            </h2>
            <h4>Cabin</h4>
            <h2>{props.returnCabin}</h2>
            <h4>Passengers</h4>
            <h2>
              {props.returnPassengers.map((element) => (
                <div>
                  <div>
                    <h2 key={props._id}>{element}</h2>
                  </div>
                </div>
              ))}
            </h2>
          </div>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseArr}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ReservationCard;
