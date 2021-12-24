import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import * as React from "react";
import { useState, useContext } from "react";
import UserContext from "../UserContext/UserContext";
const GUViewFlights = (props) => {
  const history = useHistory();
  const {
    setChosenDepartureFlight,
    setChosenReturnFlight,
    chosenReturnFlight,
    chosenDepartureFlight,
    selected,
    DeparturePrice,
    setDeparturePrice,
    departureCabin,
    returnCabin,
    setReturnPrice,
    setSelected,
  } = useContext(UserContext);

  const handleClickOpen = (value) => {
    setSelected(props._id);
    if (props.departureCheck) {
      console.log(value);
      setChosenDepartureFlight(value);
      console.log(departureCabin);
      if (departureCabin === "Economy") {
        setDeparturePrice(value.economyPrice);
      } else if (departureCabin === "First") {
        setDeparturePrice(value.firstClassPrice);
      } else if (departureCabin === "Business") {
        setDeparturePrice(value.businessPrice);
      }
      console.log(value);
      console.log("Price", DeparturePrice);
    } else {
      setChosenReturnFlight(value);
      if (returnCabin === "Economy") {
        setReturnPrice(value.economyPrice);
      } else if (returnCabin === "First") {
        setReturnPrice(value.firstClassPrice);
      } else if (returnCabin === "Business") {
        setReturnPrice(value.businessPrice);
      }
    }
  };

  return (
    <div onClick={() => handleClickOpen(props)}>
      <div
        className={
          props._id === selected ||
          props._id === chosenDepartureFlight._id ||
          props._id === chosenReturnFlight._id
            ? "flightCardChooseClicked"
            : "flightCardChoose"
        }
      >
        <div className="departureTime">
          <h4>{props.departureTime}</h4>
        </div>
        <div className="arrivalTime">
          <h4>{props.arrivalTime}</h4>
        </div>
        <div className="departure">
          <h3>
            {props.from.substring(
              props.from.indexOf("(") + 1,
              props.from.indexOf("(") + 4
            )}
          </h3>
        </div>

        <div className="arrival">
          <h3>
            {props.to.substring(
              props.to.indexOf("(") + 1,
              props.to.indexOf("(") + 4
            )}
          </h3>
        </div>
        <div className="flightNum">{props.flightNumber}</div>
        <h2 className="Icon">
          <IoAirplaneOutline></IoAirplaneOutline>
        </h2>
        <h6 className="economy">Economy: ${props.economyPrice}</h6>
        <div className="business">Business: ${props.businessPrice}</div>
        <h6 className="depDate">Departure: {props.departureDate}</h6>
        <div className="arrDate">Arrival: {props.arrivalDate}</div>
        <div className="TripDuration"> First: ${props.firstClassPrice} </div>
      </div>
    </div>
  );
};
export default GUViewFlights;
