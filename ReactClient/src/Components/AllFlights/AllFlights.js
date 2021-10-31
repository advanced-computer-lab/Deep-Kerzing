import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";

const AllFlights = () => {
  const allFlights = [{ Departure: "Cairo" }, { Departure: "Cairo" }];

  const onDeleteHandler = (props) => {
    console.log("Called");
  };

  return (
    <div>
      <AdminSearchFlight></AdminSearchFlight>

      <div className="containerCard">
        {allFlights.map((element) => (
          <FlightDetails
            onDelete={onDeleteHandler}
            departure={element.Departure}
          ></FlightDetails>
        ))}
      </div>
    </div>
  );
};
export default AllFlights;
