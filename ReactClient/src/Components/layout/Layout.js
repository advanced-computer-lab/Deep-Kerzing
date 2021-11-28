import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';
import GUSearchFlight from '../GUSearchFlight/GUSearchFlight';
const Layout = (props) => {
  return (
    <Fragment>
      {props.user === "Admin" ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
