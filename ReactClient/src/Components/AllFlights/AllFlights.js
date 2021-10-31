import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";
import { useSelector } from 'react-redux';

const AllFlights = () => {
  //const allFlights = [{ Departure: "Cairo" }, { Departure: "Cairo" }];
  const Flights = useSelector((state) => state.Flight);

  console.log(Flights)

  const onDeleteHandler = (props) => {
    console.log("Called");
  };

  return (
    <div>
      <AdminSearchFlight></AdminSearchFlight>

      <div className="containerCard">
        {Flights.map((element) => (
          <FlightDetails
            onDelete={onDeleteHandler}
            departure={element.from}
          ></FlightDetails>
        ))}
      </div>
    </div>
  );
};
export default AllFlights;
