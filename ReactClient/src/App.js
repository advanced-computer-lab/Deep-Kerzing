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
import HomePage from "./Pages/GuestHomePage/Homepage";
import UserContext from "./Components/UserContext/UserContext";
import GuestHomepage from "./Pages/GuestHomePage/Homepage";
import ViewReservedFlights from "./Components/GuestViewReservedFlights/ViewReservedFlights";
import UserHomePage from "./Pages/UserHomepage/UserHomepage";

const App = () => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isLoggedIn;
  const role = authCtx.role;
  console.log("this is" + role);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const [chosenDepartureFlight, setChosenDepartureFlight] = useState([]);
  const [chosenReturnFlight, setChosenReturnFlight] = useState([]);
  const [cabinChosen, setCabinChosen] = useState("Economy");
  const [numberofseats, setNumSeats] = useState(1);
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getFlights());
  }, [currentId, dispatch]);

  return (
    <Layout user={role}>
      <UserContext.Provider
        value={{
          departureFlights,
          returnFlights,
          setDepartureFlights,
          setReturnFlights,
          setNumSeats,
          setCabinChosen,
          cabinChosen,
          numberofseats,
          chosenDepartureFlight,
          setChosenDepartureFlight,
          setChosenReturnFlight,
          chosenReturnFlight,
          setTotalPrice,
          totalPrice,
        }}
      >
        <Switch>
          {!isAuthenticated && (
            <Route exact path="/">
              <GuestHomepage></GuestHomepage>
            </Route>
          )}
          {!isAuthenticated && (
            <Route exact path="/login">
              <Login></Login>
            </Route>
          )}
          {!isAuthenticated && (
            <Route exact path="/GUFlightDetails">
              <GUFlightDetails></GUFlightDetails>
            </Route>
          )}
          {!isAuthenticated && (
            <Route exact path="/GUAllFlights">
              <GUChooseFlights></GUChooseFlights>
            </Route>
          )}
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
              <ViewReservedFlights></ViewReservedFlights>
            </Route>
          )}
          {/* {isAuthenticated && role === "user" && (
            <Route path="/user" exact>
              <UserHomePage></UserHomePage>
            </Route>
          )} */}
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
