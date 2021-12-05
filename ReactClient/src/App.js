import { Switch, Route, Redirect } from "react-router";
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
import UserHomePage from "./Pages/UserHomepage/UserHomepage";
import Review from "./Pages/GUChooseFlights/Review";
import UserProfile from "./Components/Profile/UserProfile";
import UpdateProfile from "./Components/Profile/UpdateProfile";
import UpdatePassword from "./Components/Profile/UpdatePassword";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isLoggedIn;
  const role = authCtx.role;
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [chosenDepartureFlight, setChosenDepartureFlight] = useState([]);
  const [chosenReturnFlight, setChosenReturnFlight] = useState([]);
  const [departureCabin, setDepartureCabin] = useState("Economy");
  const [returnCabin, setReturnCabin] = useState("Economy");
  const [departureSeats, setDepartureSeats] = useState(1);
  const [returnSeats, setReturnSeats] = useState(1);
  const [departurePassengers, setDeparturePassengers] = useState({});
  const [returnPassengers, setReturnPassengers] = useState({});
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [DeparturePrice, setDeparturePrice] = useState(0);
  const [ReturnPrice, setReturnPrice] = useState(0);

  const [departureFlight_id, setDepartureFlight_id] = useState();
  const [returnFlight_id, setReturnFlight_id] = useState();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [departureChosenSeats, setdepartureChosenSeats] = useState([]);
  const [returnChosenSeats, setReturnChosenSeats] = useState([]);
  const [DepSeatsValid, setDepSeatsValid] = useState(false);
  const [RetSeatsValid, setRetSeatsValid] = useState(false);
  const [DepartureForm, setDepartureForm] = useState(false);
  const [ReturnForm, setReturnForm] = useState(false);
  const [departurePassengersValid, setdeparturePassengersValid] =
    useState(true);
  const [returnPassengersValid, setreturnPassengersValid] = useState(false);
  useEffect(() => {
    dispatch(getFlights());
  }, [currentId, dispatch, role]);

  const reset = () => {
    setChosenDepartureFlight([]);
    setChosenReturnFlight([]);
    setDepartureCabin("Economy");
    setReturnCabin("Economy");
    setDepartureSeats(1);
    setReturnSeats(1);
    setDeparturePassengers({});
    setReturnPassengers({});
    setDepartureFlights([]);
    setReturnFlights([]);
    setTotalPrice(0);
    setDeparturePrice(0);
    setReturnPrice(0);
    setDepartureFlight_id();
    setReturnFlight_id();
    setDepartureAirport("");
    setArrivalAirport("");
    setDepartureDate();
    setReturnDate();
    setdepartureChosenSeats([]);
    setReturnChosenSeats([]);
    setDepSeatsValid(false);
    setRetSeatsValid(false);
    setDepartureForm(false);
    setReturnForm(false);
    setdeparturePassengersValid(true);
    setreturnPassengersValid(false);
  };
  return (
    <Layout user={role}>
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
          DeparturePrice,
          setDeparturePrice,
          ReturnPrice,
          setReturnPrice,
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
          departureChosenSeats,
          setdepartureChosenSeats,
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
          returnChosenSeats,
          RetSeatsValid,
          setDepSeatsValid,
          setRetSeatsValid,
          setReturnChosenSeats,
          DepSeatsValid,
          DepartureForm,
          setDepartureForm,
          ReturnForm,
          setReturnForm,
          setdeparturePassengersValid,
          setreturnPassengersValid,
          departurePassengersValid,
          returnPassengersValid,
          role,
        }}
      >
        <Switch>
          {!isAuthenticated && (
            <Route exact path="/">
              <GuestHomepage reset={reset}></GuestHomepage>
            </Route>
          )}
          {!isAuthenticated && (
            <Route exact path="/login">
              <Login checker={false}></Login>
            </Route>
          )}
          {!isAuthenticated && (
            <Route exact path="/GUFlightDetails">
              <GUFlightDetails></GUFlightDetails>
            </Route>
          )}

          <Route exact path="/GUAllFlights">
            <GUChooseFlights></GUChooseFlights>
          </Route>

          {/* {!isAuthenticated && (
            <Route exact path="/Confirmation">
              <Review></Review>
            </Route>
          )} */}
          {isAuthenticated && role === "Admin" && (
            <Route path="/" exact>
              <AdminHomePage></AdminHomePage>
            </Route>
          )}
          {isAuthenticated && role === "Admin" && (
            <Route path="/admin/ViewFlights" exact>
              <AdminFlights setCurrentId={setCurrentId}></AdminFlights>
            </Route>
          )}
          {isAuthenticated && role === "Admin" && (
            <Route path="/admin/AddFlight" exact>
              <AdminCreateFlight></AdminCreateFlight>
            </Route>
          )}
          {isAuthenticated && role === "Admin" && (
            <Route path="/admin/UpdateFlight" exact>
              <UpdateFlight currentId={currentId} setCurrentId={setCurrentId} />
            </Route>
          )}
          {isAuthenticated && role === "Admin" && (
            <Route path="/admin/forgetpassword" exact>
              <ForgetPassword />
            </Route>
          )}

          {isAuthenticated && role === "user" && (
            <Route path="/" exact>
              <GuestHomepage reset={reset}></GuestHomepage>
            </Route>
          )}
          {isAuthenticated && role === "user" && (
            <Route path="/ViewReservations" exact>
              <ViewReservedFlights></ViewReservedFlights>
            </Route>
          )}
          {isAuthenticated && role === "user" && (
            <Route path="/user" exact>
              <UserProfile></UserProfile>
            </Route>
          )}
          {isAuthenticated && role === "user" && (
            <Route path="/user/UpdateProfile" exact>
              <UpdateProfile></UpdateProfile>
            </Route>
          )}

          {isAuthenticated && role === "user" && (
            <Route path="/user/UpdatePassword" exact>
              <UpdatePassword></UpdatePassword>
            </Route>
          )}

          {isAuthenticated && role === "user" && (
            <Route exact path="/GUFlightDetails">
              <GUFlightDetails></GUFlightDetails>
            </Route>
          )}
          {isAuthenticated && role === "user" && (
            <Route exact path="/GUAllFlights">
              <GUChooseFlights></GUChooseFlights>
            </Route>
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Layout>
  );
};

export default App;
