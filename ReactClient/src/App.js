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
import { useState } from "react";
import AdminHomePage from "./Pages/AdminHomepage/AdminHomepage";
import AdminSearchFlight from "./Components/searchFlight/adminSearchFlight";
const App = () => {
  const [loggedIn, setLoggedIn] = useState("Admin");
  return (
    <Layout>
      <Switch>
        {loggedIn == "Guest" && (
          <Route path="/" exact>
            <h1>Hello</h1>
          </Route>
        )}
        {loggedIn == "Admin" && (
          <Route path="/" exact>
            <AdminHomePage></AdminHomePage>{" "}
          </Route>
        )}
        <Route exact path="/AddAdmin">
          <AddAdmin></AddAdmin>
        </Route>
        <Route exact path="/ViewFlights">
          <AdminFlights></AdminFlights>
        </Route>
        <Route exact path="/AddFlight">
          <AdminCreateFlight></AdminCreateFlight>
        </Route>
        <Route path="/UpdateFlight" exact>
          <UpdateFlight />
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
