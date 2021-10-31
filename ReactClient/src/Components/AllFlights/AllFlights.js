import FlightDetails from "../FlightDetails/FlightDetails";
import AdminSearchFlight from "../searchFlight/adminSearchFlight";

const AllFlights =()=>{ 
    
    const onDeleteHandler=()=>{
        console.log("Called")
    }

    return (
      <div>
        <AdminSearchFlight></AdminSearchFlight>
        <div className="containerCard">
          <FlightDetails onDelete={onDeleteHandler}></FlightDetails>
          <FlightDetails onDelete={onDeleteHandler}></FlightDetails>
          <FlightDetails onDelete={onDeleteHandler}></FlightDetails>
          <FlightDetails onDelete={onDeleteHandler}></FlightDetails>
        </div>
      </div>
    );

}
export default AllFlights;