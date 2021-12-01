import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';
import GUSearchFlight from '../GUSearchFlight/GUSearchFlight';
import  ViewReservedFlights from '../GuestViewReservedFlights/ViewReservedFlights';
import InfoCard from '../InfoCard/InfoCard';

import ReservationInfo from '../ReservationInfo/ReservationInfo';
const Layout = (props) => {
  return (
    <Fragment>

      {props.user === "Admin" ||props.user === "user" ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
      
 
    </Fragment>
  );
};

export default Layout;
