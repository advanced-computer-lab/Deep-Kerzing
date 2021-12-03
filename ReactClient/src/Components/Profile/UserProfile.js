import { FaUser, FaAt, FaLock, FaUnlock, FaPassport } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import AuthContext from "../../Store/auth-context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdWork } from "react-icons/md";
import { useLocation, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo2 from "../GuestNavbar/logo2.png";

const UserProfile = () => {
  const [user, setUserId] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  console.log(token);

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        setUserId(resOne.data.data);
        setLoading(true);
        console.log(resOne.data.data);
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="containerCard">
          {" "}
          <h1>
            <FaUser />
          </h1>
          <h1>Profile</h1>
          <div className="input-group input-group-icon">
            <input
              //   onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Name"
              defaultValue={user.name}
              required
              disabled
            />
            <div className="input-icon">
              <FaUser></FaUser>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              //   onChange={(event) => setEmail(event.target.value)}
              type="email"
              value={user.email}
              disabled
            />

            <div className="input-icon">
              <FaAt></FaAt>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              //   onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Name"
              defaultValue={user.role}
              required
              disabled
            />
            <div className="input-icon">
              <MdWork></MdWork>
            </div>
          </div>{" "}
          <div>
            {/* <button
              className="Update"
              // onClick={() => {
              //   history.push("/user/UpdateProfile");
              // }}
            >
              Edit Profile
            </button> */}
          </div>
        </div>
      ) : (
        <div className="containerCard">
          <img src={logo2} className="image" alt="Deep Kerzing" />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ReactBootStrap.Spinner animation="border" />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfile;
