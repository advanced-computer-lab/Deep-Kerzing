import { useState } from "react";
import "../searchFlight/adminSearchFlight.css";
// import axios from "axios";
import {
  //IoIosCreate,
  // FaSearch,
  // FaPlaneDeparture,
  // FaPlaneArrival,
  // FaClock,
  // FaCalendarDay,
  // FaCalendarWeek,
  // FaChair,
  FaTicketAlt,
} from "react-icons/fa";

import { AiFillEye } from "react-icons/ai";

const AdminTrackFlight = () => {
  // const [departureAirport, setDepartureAirport] = useState("");
  // const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  // const [departureTime, setDepartureTime] = useState("");
  // const [arrivalTime, setArrivalTime] = useState("");
  // const [economySeats, setEconomySeats] = useState("");
  // const [businessSeats, setBusinessSeats] = useState("");
  // const [departureDate, setDepartureDate] = useState("");
  // const [arrivalDate, setArrivalDate] = useState("");

  const trackHandler = (event) => {
    event.preventDefault();
    const inputs = {
      //   departureAirport: departureAirport,
      //   arrivalAirport: arrivalAirport,
      flightNumber: flightNumber,
      //   departureTime: departureTime,
      //   arrivalTime: arrivalTime,
      //   economySeats: economySeats,
      //   businessSeats: businessSeats,
      //   departureDate: departureDate,
      //   arrivalDate: arrivalDate,
    };
    //console.log(inputs);
  };

  return (
    <div className="containerCard">
      <form onSubmit={trackHandler}>
        {/* <h1><div>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" 
  title="Icongeek26">Icongeek26</a>
   from <a href="https://www.flaticon.com/"
   title="Flaticon">www.flaticon.com</a></div></h1> */}

        {/* <div style="position: relative;"> */}
        <h1>
          <AiFillEye />
        </h1>
        <h1>Track Flight</h1>
        {/* </div> */}
        <div className="input-group input-group-icon">
          <input
            onChange={(event) => setFlightNumber(event.target.value)}
            type="text"
            placeholder="Flight Number"
          />
          <div className="input-icon">
            <FaTicketAlt></FaTicketAlt>
          </div>
        </div>

        {/* <div className="searchFields">
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureTime(event.target.value)}
              type="text"
              placeholder="Departure Time"
              required
            />
            <div className="input-icon">
              <FaClock></FaClock>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setArrivalTime(event.target.value)}
              type="text"
              placeholder="Arrival Time"
            />
            <div className="input-icon">
              <FaClock></FaClock>
            </div>
          </div>
        </div>



        <div className="searchFields">
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;Departure Date
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>

          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Arrival Date
          </label>
        </div>



        <div className="searchFields">
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureDate(event.target.value)}
              type="date"
              placeholder="Departure Date"
              required
            />
            <div className="input-icon">
              <FaCalendarDay></FaCalendarDay>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setArrivalDate(event.target.value)}
              type="date"
              placeholder="Arrival Date"
            />
            <div className="input-icon">
              <FaCalendarWeek></FaCalendarWeek>
            </div>
          </div>
        </div>

        <div className="searchFields">
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setEconomySeats(event.target.value)}
              type="text"
              placeholder="Economy Seats"
            />
            <div className="input-icon">
              <FaChair></FaChair>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setBusinessSeats(event.target.value)}
              type="text"
              placeholder="Business Seats"
            />
            <div className="input-icon">
              <FaChair></FaChair>
            </div>
          </div>
        </div>


        <div className="searchFields">
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureAirport(event.target.value)}
              type="text"
              placeholder="Departure Airport"
              required
            />
            <div className="input-icon">
              <FaPlaneDeparture></FaPlaneDeparture>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              onChange={(event) => setArrivalAirport(event.target.value)}
              type="text"
              placeholder="Arrival Airport"
            />
            <div className="input-icon">
              <FaPlaneArrival></FaPlaneArrival>
            </div>
          </div>
        </div>

        

       


        
        

       */}

        <button className="button">Track</button>
      </form>
    </div>
  );
};
export default AdminTrackFlight;
