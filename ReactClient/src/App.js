import { BrowserRouter } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import Navbar from "./Components/GuestNavbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";
import AdminCreateFlight from "./Components/AdminCreateFlight/adminCreateFlight";
import AdminTrackFlight from "./Components/AdminTrackFlight/adminTrackFlight";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          {true? <AdminNavbar/>:<Navbar/>}
        </BrowserRouter>
      </div>
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
