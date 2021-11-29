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
import { useState, useEffect, useContext } from "react";
import AdminHomePage from "./Pages/AdminHomepage/AdminHomepage";
import { useDispatch } from "react-redux";
import { getFlights } from "./Actions/flight";
import AuthContext from "./Store/auth-context";
import ProtectedRoutesAdmin from "./Components/ProtectedRoutes/ProtectedRoutesAdmin";
import ProtectedRoutesUser from "./Components/ProtectedRoutes/ProtectedRoutesUser";
import ViewReservedFlights from "./Components/GuestViewReservedFlights/ViewReservedFlights";

const App = () => {
  const authCtx = useContext(AuthContext);
  const role = authCtx.role;

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFlights());
  }, [currentId, dispatch]);

  return (
    <Switch>
      <Route exact path="/">
        <Layout user={""}>
          <Login />
        </Layout>
      </Route>

      
      
        <ProtectedRoutesAdmin path="/admin" exact>
        <Layout user={role}><AdminHomePage></AdminHomePage></Layout>
        </ProtectedRoutesAdmin>
        <ProtectedRoutesAdmin exact path="/admin/ViewFlights">
          <AdminFlights setCurrentId={setCurrentId}></AdminFlights>
        </ProtectedRoutesAdmin>
        <ProtectedRoutesAdmin exact path="/admin/AddFlight">
          <AdminCreateFlight></AdminCreateFlight>
        </ProtectedRoutesAdmin>
        <ProtectedRoutesAdmin path="/admin/UpdateFlight" exact>
          <UpdateFlight currentId={currentId} setCurrentId={setCurrentId} />
        </ProtectedRoutesAdmin>
        <ProtectedRoutesAdmin path="/admin/forgetpassword">
          <ForgetPassword />
        </ProtectedRoutesAdmin>
      
      

      
      
        <ProtectedRoutesUser path ="/user/Reservations" exact>
        <ViewReservedFlights></ViewReservedFlights>
        </ProtectedRoutesUser>
      


      {/* <Route path="/TrackFlight">
          <AdminTrackFlight></AdminTrackFlight>
        </Route> */}

      {/* <Route path="/Profile">
          <Profile></Profile>
        </Route> */}
      {/* <Route path="/SearchFlight">
          <AdminSearchFlight></AdminSearchFlight>
        </Route> */}
    </Switch>
  );
};

export default App;

