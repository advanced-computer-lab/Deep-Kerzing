// import { useHistory } from "react-router-dom";
import "../../Components/searchFlight/adminSearchFlight.css";
// import { useSelector } from "react-redux";
import axios from "axios";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import AuthContext from "../../Store/auth-context";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

const UserHomePage = () => {
  const [userId, setUserId] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  console.log(token);
  const [reservations, setReservations] = useState([]);

  const history = useHistory();
  const allReservations = () => {
    history.push({
      pathname: "/",
      state: { userId },
    });
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        setUserId(resOne.data.data._id);
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });
  }, [userId]);

  return (
    <div>
      <div className="adminHomepage">
        <h1 className="WelcomeTitle">Welcome User </h1>
        <div className="QuickAccessContainer">
          <h1 className="QuickAccess">Quick Access</h1>
          <button className="button1">My Profile</button>
          <button className="button2" onClick={allReservations}>
            My Reservations
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserHomePage;
