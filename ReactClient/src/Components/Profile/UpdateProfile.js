import { FaUser, FaAt, FaLock, FaUnlock, FaPassport } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import AuthContext from "../../Store/auth-context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdWork } from "react-icons/md";
import { useLocation, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo2 from "../GuestNavbar/logo2.png";
import PopUp from "../PopUp/popUp";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        setEmail(resOne.data.data.email);
        setName(resOne.data.data.name);
        setRole(resOne.data.data.role);
        setLoading(true);
      })
      .catch((err) => {
        console.log("Error Can not Get the profile");
      });
  }, []);

  let inputs = {
    email: email,
    name: name,
  };

  const handleSubmit = async () => {
    await axios
      .put("http://localhost:8000/api/user/updatedetails", inputs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        history.push("/user");
      })
      .catch((err) => {
        console.log("Error update data");
      });
  };

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
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
            <div className="input-icon">
              <FaUser></FaUser>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />

            <div className="input-icon">
              <FaAt></FaAt>
            </div>
          </div>
          <div className="input-group input-group-icon">
            <input
              type="text"
              placeholder="Name"
              defaultValue={role}
              required
              disabled
            />
            <div className="input-icon">
              <MdWork></MdWork>
            </div>
          </div>
          <button
            className="buttonCancel"
            onClick={() => {
              history.push("/user");
            }}
          >
            Cancel
          </button>
          <button className="button" onClick={handleSubmit}>
            Update
          </button>
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
