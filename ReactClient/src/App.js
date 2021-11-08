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
import { useState, useEffect } from "react";
import AdminHomePage from "./Pages/AdminHomepage/AdminHomepage";
import { useDispatch } from "react-redux";
// import Front from './components/Posts/Posts';
import { getFlights } from "./Actions/flight";
import useToken from './useToken';

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const [TypeOfUser, setTypeOfUser] = useState("Admin");

  const { token, setToken } = useToken();


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
    console.log(token);

  }, [currentId, dispatch]);

  
  if(!token) {
      return <Login setToken={setToken} setTypeOfUser={setTypeOfUser} />
  }

  return (
    <Layout user={TypeOfUser}>
      <Switch>
        {TypeOfUser === "Guest" && (
          <Route path="/" exact>
  
          </Route>
        )}

        {token==="undefined" &&(
          <Route path="/" exact>           
            <Login setToken={setToken} setTypeOfUser={setTypeOfUser} />
          </Route>
        )}

        {TypeOfUser === "Admin" && token !== "undefined" &&(
          <Route path="/" exact>           
            <AdminHomePage></AdminHomePage>{" "}
          </Route>
        )}

        <Route exact path="/AddAdmin">
          <AddAdmin></AddAdmin>
        </Route>
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
        <Route path="/TrackFlight">
          <AdminTrackFlight></AdminTrackFlight>
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/Profile">
          <Profile></Profile>
        </Route>
        {/* <Route path="/SearchFlight">
          <AdminSearchFlight></AdminSearchFlight>
        </Route> */}
      </Switch>
    </Layout>
  );
};

export default App;
