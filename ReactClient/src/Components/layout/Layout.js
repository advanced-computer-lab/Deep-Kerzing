import { Fragment } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Navbar from "../GuestNavbar/Navbar";
import GUSearchFlight from "../GUSearchFlight/GUSearchFlight";
import ViewReservedFlights from "../GuestViewReservedFlights/ViewReservedFlights";
import UserNavbar from "../UserNavbar/UserNavbar";
const Layout = (props) => {
  console.log(props);
  return (
    <Fragment>
      {props.user === "Admin" ? (
        <AdminNavbar />
      ) : props.user === "user" ? (
        <UserNavbar />
      ) : (
        <Navbar />
      )}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
