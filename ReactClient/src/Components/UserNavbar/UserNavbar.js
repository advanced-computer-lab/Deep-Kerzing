import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../GuestNavbar/Navbar.css";
import logo1 from "../GuestNavbar/logo.png";
import logo2 from "../GuestNavbar/logo2.png";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const UserNavbar = () => {
  const [navbar, setNavbar] = useState(false);
  // const [homePage, setHomePage] = useState(true);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
    axios
      .get("http://localhost:8000/api/user/logout")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error from Logout");
      });
  };

  const changeBackground = () => {
    // console.log(window.scrollY);
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
          <NavLink to="/admin">
            {!navbar && (
              <img src={logo1} className="image" alt="Deep Kerzing" />
            )}
            {navbar && <img src={logo2} className="image" alt="Deep Kerzing" />}
          </NavLink>
          {/* <NavLink to="/AddAdmin">
            {!navbar && <button className="buttonIN">Add Admin</button>}
            {navbar && <button className="buttonIN2">Add Admin</button>}
          </NavLink> */}
          {!navbar && (
            <div className="dropdown">
              <button className="buttonUP">
                <FaUser></FaUser>
              </button>
              <div className="dropdown-content">
                {/* <NavLink to="/MyProfile">My Profile</NavLink> */}
                <NavLink to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </div>
            </div>
          )}
          {navbar && (
            <div className="dropdown">
              <button className="buttonUP2">
                <FaUser></FaUser>
              </button>
              <div className="dropdown-content2">
                {/* <NavLink to="/MyProfile">My Profile</NavLink> */}
                <NavLink to="/">Logout</NavLink>
              </div>
            </div>
          )}
          <NavLink to="/ViewReservations">
            {!navbar && (
              <button className="NavbarOptions"> Reservations</button>
            )}
            {navbar && (
              <button className="NavbarOptions2"> Reservations </button>
            )}
          </NavLink>
          <NavLink to="/user">
            {!navbar && <button className="NavbarOptions"> My Profile</button>}
            {navbar && <button className="NavbarOptions2"> My Profile </button>}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
export default UserNavbar;
