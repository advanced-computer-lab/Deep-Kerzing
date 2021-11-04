import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const FlightDetails = (props) => {
  const history = useHistory();
  const deleteHandler = () => {
    props.onDelete(props);
  };
  const updateHandler = () => {
    history.push("/UpdateFlight");
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
        <button className="Update" onClick={updateHandler}>
          Update
        </button>
        <Popup
          trigger={
            <button className="Delete" onClick={deleteHandler}>
              Delete
            </button>
          }
          position="top center"
        >
          {(close) => (
            <div>
              Content here
              <a className="close" onClick={close}>
                &times;
              </a>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};
export default FlightDetails;
