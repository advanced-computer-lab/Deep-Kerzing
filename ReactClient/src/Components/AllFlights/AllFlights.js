import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const AllFlights = () => {
  var Flights = useSelector((store) => store.Flight);
  const [filteredFlights, setFlights] = useState(Flights);

  useEffect(() => {
    setFlights(Flights);
  }, []);

  const checkFlight = (flight, filteredArray) => {
    return (
      (typeof filteredArray == "undefined" ||
        filteredArray.departureAirport === null ||
        typeof filteredArray.departureAirport.name === "undefined" ||
        filteredArray.departureAirport.name.toLowerCase().includes(flight.from.toLowerCase()) ||
        filteredArray.departureAirport.name.length == 0) &&
      (filteredArray.arrivalAirport === null ||
        typeof filteredArray.arrivalAirport.name === "undefined" ||
        filteredArray.arrivalAirport.name.toLowerCase().includes(flight.to.toLowerCase()) ||
        filteredArray.arrivalAirport.name.length == 0)
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
        {filteredFlights.length == 0 && <h1>No Results Found</h1>}
        {filteredFlights.map((element) => (
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
          ></FlightDetails>
        ))}
      </div>
    </div>
  );
};
export default AllFlights;
