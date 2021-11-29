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
  } = useContext(UserContext);

  const [clicked, setClicked] = useState(true);
  const handleClickOpen = (value) => {
    setClicked(!clicked);
    if (props.departureCheck && clicked) {
      setChosenDepartureFlight(value);
      console.log(chosenDepartureFlight);
    } else if (props.departureCheck) {
      setChosenDepartureFlight([]);
      console.log(chosenDepartureFlight);
    } else if (!props.departureCheck && clicked) {
      setChosenReturnFlight(value);
      console.log(chosenReturnFlight);
    } else {
      setChosenReturnFlight([]);
      console.log(chosenReturnFlight);
    }
  };

  return (
    <div onClick={(event) => handleClickOpen(props)}>
      <div className={clicked ? "flightCardChoose" : "flightCardChooseClicked"}>
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
        <h6 className="economy">Economy: {props.seatsEconomy}</h6>
        <div className="business">Business: {props.seatsBusiness}</div>
        <h6 className="depDate">Departure: {props.depDate}</h6>
        <div className="arrDate">Arrival: {props.arrDate}</div>
        <div className="TripDuration"> Trip Duration: </div>
        <div className="price"> Price: </div>
      </div>
    </div>
  );
};
export default GUViewFlights;
