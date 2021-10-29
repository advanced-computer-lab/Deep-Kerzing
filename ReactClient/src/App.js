import { BrowserRouter } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import Navbar from "./Components/GuestNavbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";

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
    </div>
  );
};

export default App;
