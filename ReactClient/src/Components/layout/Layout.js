import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';
import GUSearchFlight from '../GUSearchFlight/GUSearchFlight';
import  ViewReservedFlights from '../GuestViewReservedFlights/ViewReservedFlights';
const Layout = (props) => {
  console.log(props)
  return (
    <Fragment>

      {props.user === "Admin" ||props.user === "user" ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
 
    </Fragment>
  );
};

export default Layout;
