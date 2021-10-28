import { useState } from "react";
import { Route, NavLink } from "react-router-dom";
import "./Navbar.css";
import Login from "../../Pages/Login/Login";
import Image from "./logosmall.png";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  
  
  
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);





  const IncrementHandler = () => {
    dispatch({ type: "increment" });
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
      <nav className="header">
        <ul>
          {/* <h1>{counter}</h1> */}
          {/* <button onClick={IncrementHandler}> Increment</button> */}
          <li>
            <img src={Image} alt="Logo" />
          </li>
          <li>
            <NavLink activeClassName="header active" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      <Route path="/login">
        <Login />
      </Route>
    </div>
  );
};
export default Navbar;
