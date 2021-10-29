import { BrowserRouter } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import Navbar from "./Components/GuestNavbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";
import AdminCreateFlight from "./Components/AdminCreateFlight/adminCreateFlight";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          {false? <AdminNavbar/>:<Navbar/>}
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
    </div>
  );
};

export default App;
