import { Fragment } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Navbar from "../GuestNavbar/Navbar";
import UserNavbar from "../UserNavbar/UserNavbar";
const Layout = (props) => {
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
