import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';


const Layout = (props) => {
  return (
    <Fragment>
      {true ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
      {/* <Autocomplete></Autocomplete> */}
    </Fragment>
  );
};

export default Layout;
