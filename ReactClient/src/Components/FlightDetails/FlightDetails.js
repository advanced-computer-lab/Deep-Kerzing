import "../searchFlight/adminSearchFlight.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

const FlightDetails = (props) => {
  const history = useHistory();

  const deleteHandler = () => {
    props.onDelete();
  };
  const updateHandler = () => {
    history.push("/UpdateFlight");
  };

  return (
    <div>
      <div className="flightCard">
        <div className="departureTime">
          {/*1,1*/}
          <h4>09:00</h4>
        </div>
        <div className="arrivalTime">
          {" "}
          {/*5,1*/} <h4>13:15</h4>
        </div>
        <div className="departure">
          {" "}
          <h3>CAI</h3>{" "}
        </div>
        {/*1,2*/}
        <div className="arrival">
          <h3>MUC</h3>
        </div>{" "}
        {/*5,2*/}
        <div className="flightNum">A123</div> {/*1,1*/}
        <h2 className="Icon">
          <IoAirplaneOutline></IoAirplaneOutline>
        </h2>{" "}
        {/*3,2*/}
        <h6 className="economy">Economy: 250</h6> {/*6,1*/}{" "}
        <div className="business">Business: 250</div>
        <h6 className="depDate">Departure: 13/10/2021</h6> {/*6,1*/}
        <div className="arrDate">Arrival: 13/10/2021</div> {/*6,2*/}
        <button className="Update" onClick={updateHandler}>
          Update
        </button>
        <button className="Delete" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default FlightDetails;
