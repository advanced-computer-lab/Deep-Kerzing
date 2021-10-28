import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Navbar></Navbar>
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
