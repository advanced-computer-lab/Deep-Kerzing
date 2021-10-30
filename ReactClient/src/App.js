import { Switch, Route } from "react-router";
import UpdateFlight from "./Components/UpdateFlight/UpdateFlight";
import Layout from "./Components/layout/Layout";
import AddAdmin from "./Components/AddAdmin/AddAdmin";
import AdminCreateFlight from "./Components/AdminCreateFlight/adminCreateFlight";
import AdminFlights from "./Pages/AdminFlights/AdminFlights";
import Login from "./Pages/Login/Login";
import AdminTrackFlight from "./Components/AdminTrackFlight/adminTrackFlight";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <h1>Hello</h1>
        </Route>
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
      </Switch>
    </Layout>
  );
};

export default App;
