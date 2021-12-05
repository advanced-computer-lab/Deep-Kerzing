import { FaUser, FaAt, FaLock, FaUnlock, FaPassport } from "react-icons/fa";
import "../searchFlight/adminSearchFlight.css";
import AuthContext from "../../Store/auth-context";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MdPassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useLocation, useHistory } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import logo2 from "../GuestNavbar/logo2.png";
import PopUp from "../PopUp/popUp";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [mess, setMess] = useState("");

  let inputs = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };

  const handleSubmit = async () => {
    await axios
      .put("http://localhost:8000/api/user/updatepassword", inputs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resOne) => {
        history.push("/user");
      })
      .catch((err) => {
        setMess("Password is incorrect");
        console.log("Error update data");
      });
  };

  return (
    <div>
      <div className="containerCard">
        {" "}
        <h1>
          <RiLockPasswordFill />
        </h1>
        <h1>Change Password</h1>
        <div className="input-group input-group-icon">
          <input
            type="password"
            placeholder="Current Password"
            required
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
          <div className="input-icon">
            <MdPassword></MdPassword>
          </div>
        </div>
        <div className="input-group input-group-icon">
          <input
            type="password"
            placeholder="New Password"
            required
            onChange={(event) => setNewPassword(event.target.value)}
          />

          <div className="input-icon">
            <MdPassword></MdPassword>
          </div>
        </div>
        <div className="Incorrect">{<h6>{mess}</h6>}</div>
        <button
          className="buttonCancel"
          onClick={() => {
            history.push("/user");
          }}
        >
          Cancel
        </button>
        <button className="button" onClick={handleSubmit}>
          Change Password
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
