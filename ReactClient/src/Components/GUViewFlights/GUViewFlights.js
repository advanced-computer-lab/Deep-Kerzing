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
    ReturnPrice,
    departureCabin,
    returnCabin,
    setReturnPrice,
    setSelected,
  } = useContext(UserContext);

  const handleClickOpen = (value) => {
    setSelected(props._id);
    if (props.departureCheck) {
      setChosenDepartureFlight(value);
      console.log(departureCabin)
      if(departureCabin === "Economy"){
        setDeparturePrice(value.priceEconomy);
      }
      else if (departureCabin === "First"){
        setDeparturePrice(value.priceFirst)
      }
      else if (departureCabin === "Business"){
        setDeparturePrice(value.priceBusiness)
      }
      console.log(value)
      console.log("Price",DeparturePrice)
    } else {
      setChosenReturnFlight(value);
      if (returnCabin === "Economy") {
        setReturnPrice(value.priceEconomy);
      } else if (returnCabin === "First") {
        setReturnPrice(value.priceFirst);
      } else if (returnCabin === "Business") {
        setReturnPrice(value.priceBusiness);
      }
    }
  };
  console.log(chosenReturnFlight);

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
          <h4>{props.depTime}</h4>
        </div>
        <div className="arrivalTime">
          <h4>{props.arrTime}</h4>
        </div>
        <div className="departure">
          <h3>
            {props.departure.substring(
              props.departure.indexOf("(") + 1,
              props.departure.indexOf("(") + 4
            )}
          </h3>
        </div>

        <div className="arrival">
          <h3>
            {props.arrival.substring(
              props.arrival.indexOf("(") + 1,
              props.arrival.indexOf("(") + 4
            )}
          </h3>
        </div>
        <div className="flightNum">{props.flightNumber}</div>
        <h2 className="Icon">
          <IoAirplaneOutline></IoAirplaneOutline>
        </h2>
        <h6 className="economy">Economy: ${props.priceEconomy}</h6>
        <div className="business">Business: ${props.priceBusiness}</div>
        <h6 className="depDate">Departure: {props.depDate}</h6>
        <div className="arrDate">Arrival: {props.arrDate}</div>
        <div className="TripDuration"> First: ${props.priceFirst} </div>
      </div>
    </div>
  );
};
export default GUViewFlights;
