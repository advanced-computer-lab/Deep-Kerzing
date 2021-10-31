import { Fragment } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Navbar from '../GuestNavbar/Navbar';
import Profile from '../Profile/Profile';


const Layout = (props) => {
  return (
    <Fragment>
      {true ? <AdminNavbar /> : <Navbar />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
