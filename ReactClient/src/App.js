import { BrowserRouter } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import Navbar from "./Components/GuestNavbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";
import AdminCreateFlight from "./Components/AdminCreateFlight/adminCreateFlight";
import AdminTrackFlight from "./Components/AdminTrackFlight/adminTrackFlight";
import FlightDetails from "./Components/FlightDetails/FlightDetails";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          {false? <AdminNavbar/>:<Navbar/>}
        </BrowserRouter>
      </div>
      <FlightDetails/>
      <div>
        <AdminSearchFlight></AdminSearchFlight>
      </div>
      <div>
        <AdminSearchFlight></AdminSearchFlight>
        <AdminSearchFlight></AdminSearchFlight>
      </div>
      <div>
        <AdminCreateFlight></AdminCreateFlight>
      </div>
      <div>
        <AdminTrackFlight></AdminTrackFlight>
      </div>
    </div>

  );
};

export default App;
