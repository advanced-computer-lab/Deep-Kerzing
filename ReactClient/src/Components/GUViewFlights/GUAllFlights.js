import GUViewFlights from "./GUViewFlights";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
const GUAllFlights = (props) => {
  var Flights = useSelector((store) => store.Flight);
  const [filteredFlights, setFlights] = useState(Flights);

  useEffect(() => {
    setFlights(Flights);
    console.log(filteredFlights)
  }, [Flights]);

  const setid = (input) => {
    props.setCurrentId(input);
  };
  return (
    <div>
      <div className="containerCard">
        {filteredFlights.map((element) => (
          <GUViewFlights
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
            setCurrentId={setid}
            _id={element._id}
            key={element._id}
          ></GUViewFlights>
        ))}
        {filteredFlights.length === 0 && <h1>No Results Found</h1>}
      </div>
    </div>
  );
};
export default GUAllFlights;
