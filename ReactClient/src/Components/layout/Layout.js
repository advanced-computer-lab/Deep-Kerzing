import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';


const Layout = (props) => {
  return (
    <Fragment>
      {false ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
