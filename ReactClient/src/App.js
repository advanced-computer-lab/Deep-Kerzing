import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";
import Image from "./L.png";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
      </BrowserRouter>
      <AdminSearchFlight></AdminSearchFlight>
      <img src={Image} alt="Logo" />
    </div>
  );
};

export default App;
