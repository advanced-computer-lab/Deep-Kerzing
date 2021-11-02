import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const AllFlights = () => {
  //const allFlights = [{ Departure: "Cairo" }, { Departure: "Cairo" }];
  var Flights = useSelector((store) => store.Flight);
  const [filteredFlights, setFlights] = useState(Flights);

  useEffect(() => {
    setFlights(Flights);
  }, []);

  const checkFlight = (flight, filteredArray) => {
    return (
      ((flight.from).toLowerCase().includes(filteredArray.departureAirport.toLowerCase()) || filteredArray.departureAirport.length == 0) &&
      ((flight.to).toLowerCase().includes(filteredArray.arrivalAirport.toLowerCase()) || filteredArray.arrivalAirport.length == 0)
    );
  };

  const Filter = (filteredArray) => {
    var FlightsArray = Object.values(Flights);
    console.log(FlightsArray);
    FlightsArray = FlightsArray.filter((flight) => {
      return checkFlight(flight,filteredArray);
      // flight.from == filteredArray.departureAirport;
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
        {filteredFlights.map((element) => (
          <FlightDetails
            onDelete={onDeleteHandler}
            departure={element.from}
            arrival ={element.to}
          ></FlightDetails>
        ))}
      </div>
    </div>
  );
};
export default AllFlights;
