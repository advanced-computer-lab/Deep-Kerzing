import { useState, useEffect } from "react";
import "./adminSearchFlight.css";
import axios from "axios";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
  FaTicketAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { PromiseProvider } from "mongoose";

const AdminSearchFlight = (props) => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [economySeats, setEconomySeats] = useState("");
  const [businessSeats, setBusinessSeats] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [collapsable, setCollapsable] = useState(false);

  // const airports =["CA"]
  const collapseHandler = () => {
    setCollapsable(!collapsable);
  };
  useEffect(() => {
    const inputs = {
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      flightNumber: flightNumber,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      economySeats: economySeats,
      businessSeats: businessSeats,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
    };
    props.onFilter(inputs);
  }, [
    departureAirport,
    arrivalAirport,
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    departureDate,
    arrivalDate,
  ]);

  return (
    <div className="containerCard">
      <div className="SearchHeader">
        {" "}
        <h1>Flight Search</h1>
        <div className="buttonHeader">
          {collapsable && (
            <button className="FiltersButton" onClick={collapseHandler}>
              <FaArrowUp />
            </button>
          )}
          {!collapsable && (
            <button className="FiltersButton" onClick={collapseHandler}>
              <FaArrowDown />
            </button>
          )}
        </div>
      </div>
      {collapsable && (
        <form>
          {/* <h1>
        </h1> */}
          <div className="searchFields">
            <div class="input-group input-group-icon">
              <input
                options
                onChange={(event) => setDepartureAirport(event.target.value)}
                // onInput={searchHandler}
                type="text"
                placeholder="Departure Airport"
                required
              />
              <div class="input-icon">
                <FaPlaneDeparture></FaPlaneDeparture>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setArrivalAirport(event.target.value)}
                type="text"
                placeholder="Arrival Airport"
              />
              <div class="input-icon">
                <FaPlaneArrival></FaPlaneArrival>
              </div>
            </div>

            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setDepartureTime(event.target.value)}
                type="text"
                placeholder="Departure Time"
                required
              />
              <div class="input-icon">
                <FaClock></FaClock>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setArrivalTime(event.target.value)}
                type="text"
                placeholder="Arrival Time"
              />
              <div class="input-icon">
                <FaClock></FaClock>
              </div>
            </div>
          </div>
          <div className="searchFields">
            {/* <label>
            &nbsp;&nbsp;&nbsp;&nbsp;Departure Date
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>

          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Arrival Date
          </label> */}
          </div>
          <div className="searchFields">
            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setDepartureDate(event.target.value)}
                type="date"
                placeholder="Departure Date"
                required
              />
              <div class="input-icon">
                <FaCalendarDay></FaCalendarDay>
              </div>
            </div>
            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setArrivalDate(event.target.value)}
                type="date"
                placeholder="Arrival Date"
              />
              <div class="input-icon">
                <FaCalendarWeek></FaCalendarWeek>
              </div>
            </div>
            {/* <div class="input-group input-group-icon">
            <input
              onChange={(event) => setEconomySeats(event.target.value)}
              type="text"
              placeholder="Economy Seats"
            />
            <div class="input-icon">
              <FaChair></FaChair>
            </div>
          </div>
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setBusinessSeats(event.target.value)}
              type="text"
              placeholder="Business Seats"
            />
            <div class="input-icon">
              <FaChair></FaChair>
            </div>
          </div> */}
            <div class="input-group input-group-icon">
              <input
                onChange={(event) => setFlightNumber(event.target.value)}
                type="text"
                placeholder="Flight Number"
              />
              <div class="input-icon">
                <FaTicketAlt></FaTicketAlt>
              </div>
            </div>
          </div>

          {/* <button className="button">Search</button> */}
        </form>
      )}
    </div>
  );
};
export default AdminSearchFlight;
