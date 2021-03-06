import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import logo2 from "../GuestNavbar/logo2.png";

const AllFlights = (props) => {
  var Flights = useSelector((store) => store.Flight);
  const [filteredFlights, setFlights] = useState(Flights);

  useEffect(() => {
    setFlights(Flights);
  }, [Flights]);

  const checkFlight = (flight, filteredArray) => {
    return (
      (typeof filteredArray === "undefined" ||
        filteredArray.departureAirport === null ||
        typeof filteredArray.departureAirport.name === "undefined" ||
        filteredArray.departureAirport.name
          .toLowerCase()
          .includes(flight.from.toLowerCase()) ||
        filteredArray.departureAirport.name.length === 0) &&
      (filteredArray.arrivalAirport === null ||
        typeof filteredArray.arrivalAirport.name === "undefined" ||
        filteredArray.arrivalAirport.name
          .toLowerCase()
          .includes(flight.to.toLowerCase()) ||
        filteredArray.arrivalAirport.name.length === 0) &&
      (filteredArray.flightNumber === "" ||
        flight.flightNumber
          .toLowerCase()
          .includes(filteredArray.flightNumber.toLowerCase())) &&
      (filteredArray.departureTime === "" ||
        flight.departureTime === filteredArray.departureTime) &&
      (filteredArray.arrivalTime === "" ||
        flight.arrivalTime === filteredArray.arrivalTime) &&
      (filteredArray.arrivalDate === "" ||
        flight.arrivalDate === filteredArray.arrivalDate) &&
      (filteredArray.departureDate === "" ||
        flight.departureDate === filteredArray.departureDate)
    );
  };

  const Filter = (filteredArray = {}) => {
    var FlightsArray = Object.values(Flights);
    FlightsArray = FlightsArray.filter((flight) => {
      return checkFlight(flight, filteredArray);
    });

    setFlights(FlightsArray);
  };

  const onDeleteHandler = () => {
    console.log("Called");
  };

  return (
    <div>
      <AdminSearchFlight onFilter={Filter}></AdminSearchFlight>

      <div className="containerCard">
        {filteredFlights !== null &&
          filteredFlights.map((element) => (
            <FlightDetails
              onDelete={onDeleteHandler}
              departure={element.from}
              arrival={element.to}
              depDate={element.departureDate}
              arrDate={element.arrivalDate}
              depTime={element.departureTime}
              arrTime={element.arrivalTime}
              seatsEconomy={element.economySeats}
              seatsBusiness={element.businessSeats}
              seatsFirst={element.fisrtClassSeats}
              priceEconomy={element.economyPrice}
              priceBusiness={element.businessPrice}
              priceFirst={element.firstClassPrice}
              flightNumber={element.flightNumber}
              setCurrentId={props.setCurrentId}
              _id={element._id}
              key={element._id}
            ></FlightDetails>
          ))}
        {filteredFlights.length === 0 && <h1>No Results Found</h1>}
      </div>
    </div>
  );
};
export default AllFlights;
