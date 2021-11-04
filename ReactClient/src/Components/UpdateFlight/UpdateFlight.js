// import { FaUserPlus, FaUser, FaAt, FaLock, FaUnlock } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import {
  //IoIosCreate,
  FaSearch,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
  FaChair,
  FaTicketAlt,
} from "react-icons/fa";

const UpdateFlight = () => {
  const [departureAirport, setDepartureAirport] = useState("CAI");
  const [arrivalAirport, setArrivalAirport] = useState("MUC");
  const [flightNumber, setFlightNumber] = useState("A123");
  const [departureTime, setDepartureTime] = useState("09:00");
  const [arrivalTime, setArrivalTime] = useState("13:15");
  const [economySeats, setEconomySeats] = useState(250);
  const [businessSeats, setBusinessSeats] = useState(250);
  const [departureDate, setDepartureDate] = useState("2021-10-13");
  const [arrivalDate, setArrivalDate] = useState("2021-10-13");
  const createHandler = (event) => {
    event.preventDefault();
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
  };
  return (
    <div className="containerCard">
      <form onSubmit={createHandler}>
        <h1>
          <IoIosAddCircleOutline />
        </h1>
        <h1> Update Flight</h1>
        <div class="input-group input-group-icon">
          <input
            onChange={(event) => setFlightNumber(event.target.value)}
            type="text"
            defaultValue={flightNumber}
            placeholder="Flight Number"
          />
          <div class="input-icon">
            <FaTicketAlt></FaTicketAlt>
          </div>
        </div>

        <div className="searchFields">
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureTime(event.target.value)}
              type="text"
              defaultValue={departureTime}
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
              defaultValue={arrivalTime}
              placeholder="Arrival Time"
            />
            <div class="input-icon">
              <FaClock></FaClock>
            </div>
          </div>
        </div>

        <div className="searchFields">
        </div>

        <div className="searchFields">
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureDate(event.target.value)}
              type="date"
              defaultValue={departureDate}
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
              defaultValue={arrivalDate}
              placeholder="Arrival Date"
            />
            <div class="input-icon">
              <FaCalendarWeek></FaCalendarWeek>
            </div>
          </div>
        </div>

        <div className="searchFields">
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setEconomySeats(event.target.value)}
              type="text"
              defaultValue={economySeats}
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
              defaultValue={businessSeats}
              placeholder="Business Seats"
            />
            <div class="input-icon">
              <FaChair></FaChair>
            </div>
          </div>
        </div>

        <div className="searchFields">
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureAirport(event.target.value)}
              type="text"
              defaultValue={departureAirport}
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
              defaultValue={arrivalAirport}
              placeholder="Arrival Airport"
            />
            <div class="input-icon">
              <FaPlaneArrival></FaPlaneArrival>
            </div>
          </div>
        </div>
        <button className="buttonCancel">Cancel</button>
        <button className="button">Update</button>
      </form>
    </div>
  );
};
export default UpdateFlight;
