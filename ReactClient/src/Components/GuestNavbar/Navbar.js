import { useState } from "react";
import {  NavLink } from "react-router-dom";
import logo1 from "./logo.png";
import logo2 from "./logo2.png";


const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  // const dispatch = useDispatch();
  // const counter = useSelector((state) => state.counter);
  // const IncrementHandler = () => {
  //   dispatch({ type: "increment" });
  // };
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
      {/* <h1>{counter}</h1>
      {/* <button onClick={IncrementHandler}> Increment</button> */}

      <nav className={navbar ? "headerScrolled" : "header"}>
        <div>
          <NavLink to="/">
            {!navbar && (
              <img src={logo2} className="image" alt="Deep Kerzing" />
            )}
            {navbar && <img src={logo1} className="image" alt="Deep Kerzing" />}
          </NavLink>
          <NavLink to="/login">
            {!navbar && <button className="buttonIN">Login</button>}
            {navbar && <button className="buttonIN2">Login</button>}
          </NavLink>
          <NavLink to="/register">
            {!navbar && <button className="buttonUP">Register</button>}
            {navbar && <button className="buttonUP2">Register</button>}
          </NavLink>

          <NavLink to="/Contact-Us">
            {!navbar && <button className="NavbarOptions"> Contact Us </button>}
            {navbar && <button className="NavbarOptions2"> Contact Us </button>}
          </NavLink>
          <NavLink to="/TrackFlight">
            {!navbar && (<button className="NavbarOptions"> Track Flight </button>)}
            {navbar && (<button className="NavbarOptions2"> Track Flight </button>)}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
