import GUViewFlights from "./GUViewFlights";
const GUAllFlights = (props) => {
  const departure = props.departure;
  return (
    <div>
      <div className="containerCardChooseFlight">
        {props.Flights.map((element) => (
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
            _id={element._id}
            key={element._id}
            departureCheck={departure}
          ></GUViewFlights>
        ))}
        {props.Flights.length === 0 && <h1>No Results Found</h1>}
      </div>
    </div>
  );
};
export default GUAllFlights;
