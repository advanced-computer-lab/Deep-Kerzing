import { useState } from "react";
import "./adminSearchFlight.css";
import axios from "axios";

const AdminSearchFlight = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [economySeats, setEconomySeats] = useState("");
  const [businessSeats, setBusinessSeats] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  // const airports =["CA"]

  const searchHandler = (event) => {
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
    axios
      .post('', { inputs })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div>
      <form className="container" onSubmit={searchHandler}>
        <h1>Flight Search</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) =>
                      setDepartureAirport(event.target.value)
                    }
                    type="text"
                    placeholder="Departure Airport"
                    required
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
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
                    <i class="fa fa-user"></i>
                  </div>
                </div>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setDepartureDate(event.target.value)}
                    type="date"
                    placeholder="Departure Date"
                    required
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setEconomySeats(event.target.value)}
                    type="text"
                    placeholder="Economy Seats"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </td>
              <td>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setArrivalAirport(event.target.value)}
                    type="text"
                    placeholder="Arrival Airport"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setArrivalTime(event.target.value)}
                    type="text"
                    placeholder="Arrival Time"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setArrivalDate(event.target.value)}
                    type="date"
                    placeholder="Arrival Date"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setBusinessSeats(event.target.value)}
                    type="text"
                    placeholder="Business Seats"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="input-group input-group-icon">
                  <input
                    onChange={(event) => setFlightNumber(event.target.value)}
                    type="text"
                    placeholder="Flight Number"
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button className="button">Search</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};
export default AdminSearchFlight;
