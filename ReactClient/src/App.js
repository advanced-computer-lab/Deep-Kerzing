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
import { useState, useEffect ,useContext} from "react";
import AdminHomePage from "./Pages/AdminHomepage/AdminHomepage";
import { useDispatch } from "react-redux";
import { getFlights } from "./Actions/flight";
import GuestHomepage from "./Pages/GuestHomePage/Homepage";
import GUAllFlights from "./Components/GUViewFlights/GUAllFlights";
import GUFlightDetails from "./Components/GUViewFlights/GUFlightDetails";



import AuthContext from './Store/auth-context';

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const [TypeOfUser, setTypeOfUser] = useState("Guest");
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getFlights());

    console.log(token);
  }, [currentId, dispatch]);

  
  if(!authCtx.isLoggedIn ) {
      return <Layout user={authCtx.role}> <Login/> </Layout>
  }

  return (
    <Layout user={authCtx.role}>
      <Switch>       
        <Route exact path="/GUFlightDetails">
          <GUFlightDetails
            currentId={currentId}
            setCurrentId={setCurrentId}
          ></GUFlightDetails>
        </Route>
        <Route exact path="/GUAllFlights">
          <GUAllFlights></GUAllFlights>
        </Route>
        <Route exact path="/AddAdmin">
        {authCtx.role === "Guest" && (
          <Route path="/" exact> 
          </Route>
        )}

        {!authCtx.isLoggedIn&&(
          <Route path="/" exact>           
            <Login />
          </Route>
        )}

        {authCtx.role=== "Admin" && authCtx.isLoggedIn &&(
          <Route path="/" exact>           
            <AdminHomePage></AdminHomePage>{" "}
          </Route>
        )}

        {/* <Route exact path="/AddAdmin">
          <AddAdmin></AddAdmin>
        </Route> */}
        <Route exact path="/ViewFlights">
          <AdminFlights setCurrentId={setCurrentId}></AdminFlights>
        </Route>
        <Route exact path="/AddFlight">
          <AdminCreateFlight></AdminCreateFlight>
        </Route>
        <Route path="/UpdateFlight" exact>
          <UpdateFlight currentId={currentId} setCurrentId={setCurrentId} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {/* <Route path="/TrackFlight">
          <AdminTrackFlight></AdminTrackFlight>
        </Route> */}
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        {/* <Route path="/Profile">
          <Profile></Profile>
        </Route> */}
        {/* <Route path="/SearchFlight">
          <AdminSearchFlight></AdminSearchFlight>
        </Route> */}
      </Switch>
    </Layout>
  );
};

export default App;
