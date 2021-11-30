import { Switch, Route } from "react-router";
import UpdateFlight from "./Components/UpdateFlight/UpdateFlight";
import Layout from "./Components/layout/Layout";
import AddAdmin from "./Components/AddAdmin/AddAdmin";
import AdminCreateFlight from "./Components/AdminCreateFlight/adminCreateFlight";
import AdminFlights from "./Pages/AdminFlights/AdminFlights";
import Login from "./Pages/Login/Login";
import AdminTrackFlight from "./Components/AdminTrackFlight/adminTrackFlight";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Profile from "./Components/Profile/Profile";
import GUFlightDetails from "./Components/GUViewFlights/GUFlightDetails";
import GUAllFlights from "./Components/GUViewFlights/GUAllFlights";
import { useState, useEffect, useContext } from "react";
import AdminHomePage from "./Pages/AdminHomepage/AdminHomepage";
import { useDispatch } from "react-redux";
import { getFlights } from "./Actions/flight";
import GUChooseFlights from "./Pages/GUChooseFlights/GUChooseFlights";
import AuthContext from "./Store/auth-context";
import ProtectedRoutesAdmin from "./Components/ProtectedRoutes/ProtectedRoutesAdmin";
import ProtectedRoutesUser from "./Components/ProtectedRoutes/ProtectedRoutesUser";
import UserContext from "./Components/UserContext/UserContext";
import GuestHomepage from "./Pages/GuestHomePage/Homepage";
import ViewReservedFlights from "./Components/GuestViewReservedFlights/ViewReservedFlights";

const App = () => {
  const authCtx = useContext(AuthContext);
  const role = authCtx.role;
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const [chosenDepartureFlight, setChosenDepartureFlight] = useState([]);
  const [chosenReturnFlight, setChosenReturnFlight] = useState([]);
  const [departureCabin, setDepartureCabin] = useState("Economy");
  const [returnCabin, setReturnCabin] = useState("Economy");
  const [departureSeats, setDepartureSeats] = useState(1);
  const [returnSeats, setReturnSeats] = useState(1);
  const [departurePassengers, setDeparturePassengers] = useState([]);
  const [returnPassengers, setReturnPassengers] = useState([]);
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [departureFlight_id, setDepartureFlight_id] = useState();
  const [returnFlight_id, setReturnFlight_id] = useState();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();

  useEffect(() => {
    dispatch(getFlights());
  }, [currentId, dispatch]);

  return (
    <Switch>
      <UserContext.Provider
        value={{
          departureFlights,
          returnFlights,
          setDepartureFlights,
          setReturnFlights,
          departureCabin,
          setDepartureCabin,
          returnCabin,
          setReturnCabin,
          departureSeats,
          setDepartureSeats,
          returnSeats,
          setReturnSeats,
          chosenDepartureFlight,
          setChosenDepartureFlight,
          setChosenReturnFlight,
          chosenReturnFlight,
          setTotalPrice,
          departurePassengers,
          setDeparturePassengers,
          returnPassengers,
          setReturnPassengers,
          totalPrice,
          departureFlight_id,
          setDepartureFlight_id,
          returnFlight_id,
          setReturnFlight_id,
          departureAirport,
          setDepartureAirport,
          arrivalAirport,
          setArrivalAirport,
          departureDate,
          setDepartureDate,
          returnDate,
          setReturnDate,
          role,
        }}
      >
        <Layout user={role}>
          {!role && (
            <div>
              <Route exact path="/">
                <GuestHomepage></GuestHomepage>
              </Route>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/GUFlightDetails">
                <GUFlightDetails></GUFlightDetails>
              </Route>
              <Route exact path="/GUAllFlights">
                <GUChooseFlights></GUChooseFlights>
              </Route>
            </div>
          )}
          {role === "Admin" && (
            <div>
              <ProtectedRoutesAdmin path="/" exact>
                <AdminHomePage></AdminHomePage>
              </ProtectedRoutesAdmin>
              <ProtectedRoutesAdmin path="/admin/ViewFlights" exact>
                <AdminFlights setCurrentId={setCurrentId}></AdminFlights>
              </ProtectedRoutesAdmin>
              <ProtectedRoutesAdmin path="/admin/AddFlight" exact>
                <AdminCreateFlight></AdminCreateFlight>
              </ProtectedRoutesAdmin>
              <ProtectedRoutesAdmin path="/admin/UpdateFlight" exact>
                <UpdateFlight
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </ProtectedRoutesAdmin>
              <ProtectedRoutesAdmin path="/admin/forgetpassword" exact>
                <ForgetPassword />
              </ProtectedRoutesAdmin>
            </div>
          )}
          {role === "user" && (
            <div>
              <ProtectedRoutesUser path="/" exact>
                <GuestHomepage></GuestHomepage>
              </ProtectedRoutesUser>
              <Route exact path="/GUFlightDetails">
                <GUFlightDetails></GUFlightDetails>
              </Route>
              <Route exact path="/GUAllFlights">
                <GUChooseFlights></GUChooseFlights>
              </Route>
              <Route exact path="/Reservations">
                <ViewReservedFlights></ViewReservedFlights>
              </Route>
            </div>
          )}
        </Layout>
      </UserContext.Provider>
    </Switch>
  );
};

export default App;
