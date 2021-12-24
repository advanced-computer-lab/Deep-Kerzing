import GUViewFlights from "./GUViewFlights";
import { useContext, useState } from "react";
import UserContext from "../UserContext/UserContext";

const GUAllFlights = (props) => {
  const departure = props.departure;
  const [selected, setSelected] = useState();
  const {
    chosenDepartureFlight,
    setChosenDepartureFlight,
    setChosenReturnFlight,
    chosenReturnFlight,
    DeparturePrice,
    setDeparturePrice,
    departureCabin,
    returnCabin,
    ReturnPrice,
    setReturnPrice,
    selectedReservation,
  } = useContext(UserContext);
  console.log(chosenReturnFlight);
  console.log(chosenDepartureFlight);
  return (
    <div>
      <UserContext.Provider
        value={{
          selected,
          setSelected,
          setChosenDepartureFlight,
          setChosenReturnFlight,
          chosenReturnFlight,
          chosenDepartureFlight,
          DeparturePrice,
          setDeparturePrice,
          ReturnPrice,
          setReturnPrice,
          departureCabin,
          returnCabin,
          selectedReservation,
        }}
      >
        <div className="containerCardChooseFlight">
          {props.Flights.map((element) => (
            <GUViewFlights
              from={element.from}
              to={element.to}
              departureDate={element.departureDate}
              arrivalDate={element.arrivalDate}
              departureTime={element.departureTime}
              arrivalTime={element.arrivalTime}
              economySeats={element.economySeats}
              businessSeats={element.businessSeats}
              fisrtClassSeats={element.fisrtClassSeats}
              economyPrice={element.economyPrice}
              businessPrice={element.businessPrice}
              firstClassPrice={element.firstClassPrice}
              flightNumber={element.flightNumber}
              _id={element._id}
              key={element._id}
              departureCheck={departure}
            ></GUViewFlights>
          ))}
          {props.Flights.length === 0 && <h1>No Results Found</h1>}
        </div>
      </UserContext.Provider>
    </div>
  );
};
export default GUAllFlights;
