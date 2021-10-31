import { useState } from "react";
import "../searchFlight/adminSearchFlight.css";
import axios from "axios";
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

  import { IoIosAddCircleOutline } from "react-icons/io";


const AdminCreateFlight=()=>{

    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [economySeats, setEconomySeats] = useState("");
    const [businessSeats, setBusinessSeats] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");

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
       // console.log(inputs);
    }

return(
    <div className="containerCard">
       <form onSubmit={createHandler}>

        <h1><IoIosAddCircleOutline/></h1>
        <h1>  Create Flight</h1>
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


        <div className="searchFields">
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
        </div>

        <div className="searchFields">
          <div class="input-group input-group-icon">
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
          </div>
        </div>


        <div className="searchFields">
          <div class="input-group input-group-icon">
            <input
              onChange={(event) => setDepartureAirport(event.target.value)}
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
        </div>

        

       


        
        

      

        <button className="button">Create</button>
      </form> 
    </div>
)

}
export default AdminCreateFlight;