import { useState } from "react";
import { Route, NavLink } from "react-router-dom";
import "../GuestNavbar/Navbar.css";
import logo1 from "../GuestNavbar/logo.png";
import logo2 from "../GuestNavbar/logo2.png";
import { FaUser } from "react-icons/fa";
import AddAdmin from "../AddAdmin/AddAdmin";
const AdminNavbar = () => {
  const [navbar, setNavbar] = useState(false);

  const logoutHandler = () => {
    console.log("Logout");
  };

  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div>
      <nav className={navbar ? "headerScrolled" : "header"}>
        <div>
          <NavLink to="/">
            {!navbar && (
              <img src={logo1} className="image" alt="Deep Kerzing" />
            )}
            {navbar && <img src={logo2} className="image" alt="Deep Kerzing" />}
          </NavLink>
          <NavLink to="/AddAdmin">
            {!navbar && <button className="buttonIN">Add Admin</button>}
            {navbar && <button className="buttonIN2">Add Admin</button>}
          </NavLink>

          {!navbar && (
            <div class="dropdown">
              <button class="buttonUP">
                <FaUser></FaUser>
              </button>
              <div class="dropdown-content">
                <NavLink to="/MyProfile">My Profile</NavLink>
                <NavLink onClick={logoutHandler} to="/">
                  Logout
                </NavLink>
              </div>
            </div>
          )}
          {navbar && (
            <div class="dropdown">
              <button class="buttonUP2">
                <FaUser></FaUser>
              </button>
              <div class="dropdown-content2">
                <NavLink to="/MyProfile">My Profile</NavLink>
                <NavLink onClick={logoutHandler} to="/">
                  Logout
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Route path="/AddAdmin">
        <AddAdmin></AddAdmin>
      </Route>
      {/* <Route path="/register">

      </Route> */}
    </div>
  );
};
export default AdminNavbar;
